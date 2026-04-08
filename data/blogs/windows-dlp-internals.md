---
title: "How Windows DLP Intercepts Files"
date: "2025-09-20"
excerpt: "A look at the kernel-mode architecture behind Windows Data Loss Prevention — minifilters, IRPs, and how policy enforcement actually works."
---

# How Windows DLP Intercepts Files

Data Loss Prevention software blocks files from leaving a machine — copying to USB, uploading to the web, printing to PDF. The product description is simple. The implementation involves kernel drivers, intercepted I/O, and a policy engine that has to make decisions in milliseconds. Here's how it actually works.

## The Problem

When a user tries to copy a sensitive file to a USB drive, something needs to intercept that operation before it completes. This interception has to happen at the right layer — low enough that applications can't route around it, but not so deep that it destabilizes the OS.

Windows provides the answer: the file system minifilter driver framework.

## Minifilter Drivers

The I/O Manager in the Windows kernel routes all file system operations through a stack of filter drivers before they reach the file system itself. Each filter gets a chance to examine, modify, or block the operation.

Minifilter drivers sit in this stack. They register callbacks for specific I/O operations — file create, read, write, cleanup, close. When those operations occur, the minifilter's pre-operation callback runs:

```c
FLT_PREOP_CALLBACK_STATUS PreOperationCallback(
    PFLT_CALLBACK_DATA Data,
    PCFLT_RELATED_OBJECTS FltObjects,
    PVOID *CompletionContext
)
{
    // Inspect the operation
    // Return FLT_PREOP_SUCCESS_NO_CALLBACK to allow
    // Return FLT_PREOP_COMPLETE with STATUS_ACCESS_DENIED to block
}
```

The minifilter can block the operation by returning an error status. The application sees an `ACCESS_DENIED` error. The file never reaches the USB drive.

## What Gets Intercepted

A naive DLP implementation would intercept `IRP_MJ_WRITE` (write operations). That's not sufficient. File data can leave a machine through many paths:

- **Write to removable media** — intercepted at `IRP_MJ_WRITE` or `IRP_MJ_CREATE` (blocking the file from being created)
- **Clipboard** — requires intercepting clipboard operations via a different mechanism
- **Network upload** — requires a network inspection layer (different from file I/O)
- **Print to PDF** — intercepted at the print spooler level
- **Screen capture** — can't be intercepted at the kernel level; requires userspace mechanisms

Each egress channel needs its own interception strategy. The DLP minifilter handles file I/O. Other Trellix components handle network traffic, clipboard, and printing.

## The Policy Decision

When the minifilter intercepts an operation, it needs to answer: is this operation allowed?

That decision requires context:
1. **What file is being accessed?** (Path, extension, containing directory)
2. **What process is accessing it?** (Application identity, trust level)
3. **Where is the data going?** (Removable media, network share, cloud sync folder)
4. **What does the file contain?** (This requires content inspection)

Content inspection is expensive — scanning a 100MB document for credit card numbers takes real time. The minifilter can't block an I/O operation while running a content scan; that would freeze the file system. Solutions:

- **Shadow copying**: Allow the write, copy the data to a shadow buffer, scan asynchronously, block subsequent operations if the scan finds a violation
- **Pre-fetch scanning**: Scan files proactively when they're accessed, cache the result, use the cached result at copy time
- **Policy short-circuiting**: Skip content inspection if other signals (file path, process identity) are sufficient to make a decision

Real DLP products use combinations of these. The tradeoff is between accuracy (scanning content) and latency (blocking while scanning).

## User Mode and Kernel Mode

The minifilter runs in kernel mode. The policy engine — with its rules, regular expressions, and classification logic — runs in user mode. They communicate via a communication port:

```
Kernel minifilter ←→ FltSendMessage / FltGetMessage ←→ User-mode service
```

The minifilter sends operation details to the user-mode service, which evaluates policy and returns an allow/block decision. The minifilter waits for the response.

This means the policy service needs to be reliable. If it crashes, the minifilter falls back to a default posture (allow or deny everything, depending on configuration). Getting this fault tolerance right is a significant chunk of the engineering work.

## Whitelisting

Not every file operation should be inspected. The DLP agent itself, antivirus, backup software, and system processes all need to access files without triggering policy checks. Minifilters maintain a whitelist of trusted processes by process ID or image path.

Whitelisting is also a common attack vector — malware can impersonate whitelisted processes to bypass DLP. Getting process identity right requires verifying image signatures, not just matching process names.

---

Building a DLP system means working across kernel drivers, user-mode services, IPC channels, and policy engines simultaneously. Each piece has different reliability and performance requirements. The interesting engineering problems are mostly in the boundaries between them.
