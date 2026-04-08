---
title: "C++20 Features I Actually Use"
date: "2025-08-15"
excerpt: "A practical look at the C++20 features that changed how I write day-to-day C++ — concepts, ranges, std::format, and a few smaller wins."
---

# C++20 Features I Actually Use

I've been working in C++ at Trellix for over a year now, and when we started the migration to C++20 I expected most of it to be theoretical — things you learn about but never reach for. That turned out to be wrong. A handful of features immediately changed how I write code.

## Concepts

This is the big one. Before concepts, constraining template parameters meant SFINAE — which worked, but produced error messages that were essentially unreadable.

```cpp
// C++17 — SFINAE
template <typename T, typename = std::enable_if_t<std::is_integral_v<T>>>
void process(T value) { /* ... */ }

// C++20 — Concepts
template <std::integral T>
void process(T value) { /* ... */ }
```

The error messages when you violate a concept are an order of magnitude clearer. More importantly, concepts make intent explicit. The template declaration tells you what the parameter is supposed to be, not just what it syntactically supports.

For our DLP codebase, concepts cleaned up a lot of policy-matching templates that had accumulated layers of `enable_if` over the years.

## std::format

`printf` is unsafe. `std::cout` with stream operators is verbose. `std::format` is neither:

```cpp
std::string msg = std::format("File {} blocked by policy {}", path, policyId);
```

Type-safe, readable, composable. I now reach for this almost everywhere I previously used `sprintf` or string concatenation. The compile-time format string checking (with `std::format_string`) catches mistakes at build time rather than runtime.

## Ranges

The ranges library (`std::ranges::*`) replaces most hand-written loops over containers. The algorithm compositions are the real win:

```cpp
// Filter and transform in one readable pass
auto names = files
    | std::views::filter([](const File& f) { return f.size > threshold; })
    | std::views::transform([](const File& f) { return f.name; });
```

No intermediate containers, lazy evaluation, and no explicit iterators. It's not a perfect API — some edge cases are still awkward — but for 80% of collection processing it's noticeably better.

## Designated Initializers

Small but useful. Struct initialization now reads like documentation:

```cpp
PolicyConfig config = {
    .enabled = true,
    .maxFileSizeBytes = 100 * 1024 * 1024,
    .scanOnRead = false,
};
```

Out-of-order or partial initialization is caught at compile time. Much better than positional initialization where swapping two `int` fields compiles silently.

## std::span

A non-owning view over contiguous data. Replaces the `(pointer, length)` pair pattern that was everywhere in C-style APIs:

```cpp
// Before
void scan(const uint8_t* data, size_t length);

// After  
void scan(std::span<const uint8_t> data);
```

Bounds checking in debug builds, no allocation, zero overhead. If your codebase does anything with buffers, this is immediately useful.

## What I Don't Use Yet

Coroutines are interesting but the library support is still maturing. I've read through them, written toy examples, but haven't found a natural fit in production code yet. Modules are still a build system headache. I expect both to become more practical as toolchain support improves.

---

C++20 isn't a new language — it's a significant quality-of-life upgrade to the one that already existed. The features above pay for their learning cost quickly.
