import { systemStats, skillCategories } from "@/lib/constants";
import { siteConfig } from "@/lib/config";

// ─── ANSI Color Helpers ────────────────────────────────────────────────────────
const R = "\x1b[0m";
const B = "\x1b[1m";
const red = (s: string) => `\x1b[31m${s}${R}`;
const grn = (s: string) => `\x1b[32m${s}${R}`;
const yel = (s: string) => `\x1b[33m${s}${R}`;
const mag = (s: string) => `\x1b[35m${s}${R}`;
const cyn = (s: string) => `\x1b[36m${s}${R}`;
const gry = (s: string) => `\x1b[90m${s}${R}`;
const bld = (s: string) => `${B}${s}${R}`;

// ─── Virtual Filesystem ────────────────────────────────────────────────────────
export const mockFiles: Record<string, string> = {
  "README.md": [
    bld("# Adarsh Anand — Portfolio Terminal"),
    ``,
    `Welcome to my interactive portfolio terminal!`,
    `Type ${grn("help")} to see all available commands.`,
    ``,
    `  ${cyn("neofetch")}   — system info`,
    `  ${cyn("experience")} — work history`,
    `  ${cyn("skills")}     — tech stack`,
    `  ${cyn("contact")}    — get in touch`,
    `  ${cyn("projects")}   — open source work`,
  ].join("\n"),

  "about.md": [
    bld("# About Adarsh Anand"),
    ``,
    `Software Engineer at ${yel("Trellix")}, focused on endpoint security & DLP.`,
    `Passionate about systems programming, C++, and kernel-level development.`,
    ``,
    `Previously at ${yel("Intel")} — confidential computing (SGX/TDX), fuzzing,`,
    `full-disk encryption, and vLLM benchmarking on Xeon processors.`,
    ``,
    `Education: B.E. Computer Science`,
    `Location:  Bengaluru, Karnataka, India`,
  ].join("\n"),

  "contact.txt": [
    bld("Contact Information"),
    ``,
    `  ${cyn("Email")}    ${siteConfig.contact.email}`,
    `  ${cyn("LinkedIn")} ${siteConfig.contact.linkedin}`,
    `  ${cyn("GitHub")}   ${siteConfig.contact.github}`,
    `  ${cyn("Website")}  adarshanand.dev`,
  ].join("\n"),

  "experience.md": [
    bld("# Work Experience"),
    ``,
    `${grn("Software Engineer")} — ${yel("Trellix")}  ${gry("Jul 2025 – Present")}`,
    `  Windows kernel minifilter driver development (C++)`,
    `  Data Loss Prevention (DLP) endpoint security`,
    `  Chrome/Edge native registry management for injection-free protection`,
    ``,
    `${grn("Software Engineer")} — ${yel("Intel")}    ${gry("Jun 2024 – Jul 2025")}`,
    `  Intel SGX/TDX — Gramine contributions, distro support`,
    `  SGX fuzzing with libFuzzer — 8+ CVEs, 97% branch coverage`,
    `  TDX full-disk encryption, 30% image size reduction (Rust)`,
    `  Post-Quantum Cryptography via Crypto API Toolkit`,
    `  vLLM benchmarking: 20K+ runs on 5th Gen Xeon Emerald Rapids`,
    ``,
    `${grn("Graduate Technical Intern")} — ${yel("Intel")}  ${gry("Jun 2023 – Dec 2023")}`,
    `  FIDO Device Onboarding — Zero-Touch Provisioning`,
    `  OpenSSL 3.0 migration — 15% Client SDK reduction`,
  ].join("\n"),

  "skills.md": [
    bld("# Technical Skills"),
    ``,
    `${cyn("Languages")}   C, C++, Python, JavaScript, TypeScript, Bash`,
    `${cyn("Systems")}     Windows Internals, Intel SGX/TDX, System Programming`,
    `${cyn("Security")}    DLP, EDR/XDR, Endpoint Security, Trellix ePO`,
    `${cyn("AI/ML")}       PyTorch, vLLM, OpenVINO, CUDA, MLflow`,
    `${cyn("Web")}         Next.js, React, Tailwind CSS, Framer Motion`,
    `${cyn("DevOps")}      Docker, Kubernetes, GitHub Actions, AWS`,
  ].join("\n"),

  "projects.md": [
    bld("# Open Source Projects"),
    ``,
    `View all: ${grn("https://github.com/adarshanand67")}`,
    `Or type ${cyn("projects")} to list them here.`,
  ].join("\n"),
};

export const directories = [
  "blogs",
  "papers",
  "books",
  "anime",
  "hobby",
] as const;

export const directoryStructure = {
  root: {
    files: mockFiles,
    dirs: {
      blogs: {
        "hello-world.md": "My first blog post.",
        "cpp20-features.md": "C++20: Concepts, Ranges, std::format...",
        "windows-dlp-internals.md": "Kernel-mode DLP architecture.",
      },
      papers: {},
      books: {},
      anime: {},
      hobby: {},
    },
  },
};

// ─── Fortune Quotes ────────────────────────────────────────────────────────────
const fortunes = [
  "The best way to predict the future is to invent it. — Alan Kay",
  "Any sufficiently advanced technology is indistinguishable from magic. — Arthur C. Clarke",
  "Programs must be written for people to read. — Hal Abelson",
  "Debugging is twice as hard as writing the code in the first place. — Brian Kernighan",
  "The most dangerous phrase: 'We've always done it this way.' — Grace Hopper",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Simplicity is the ultimate sophistication. — Leonardo da Vinci",
  "There are only 10 types of people: those who understand binary, and those who don't.",
  "It's not a bug — it's an undocumented feature.",
  "In theory, theory and practice are the same. In practice, they aren't.",
  "A language that doesn't affect the way you think about programming is not worth knowing. — Alan Perlis",
  "Measuring progress by lines of code is like measuring flight by fuel spent. — Gates",
  "Software is like entropy: it always increases. — Norman Augustine",
  "Walking on water and developing software from a spec are easy if both are frozen. — Berard",
];

// ─── ASCII Banner ──────────────────────────────────────────────────────────────
const asciiArt = [
  grn(`  ___       _                _      `),
  grn(` / _ \\   __| | __ _ _ __ ___| |__  `),
  grn(`/ /_\\ \\ / _\` |/ _\` | '__/ __| '_ \\ `),
  grn(`/  _  |/ (_| | (_| | |  \\__ \\ | | |`),
  grn(`\\_/ \\_/ \\__,_|\\__,_|_|  |___/_| |_|`),
  ``,
  `  ${cyn("Software Engineer")}  ·  ${yel("Systems & Security")}  ·  ${mag("adarshanand.dev")}`,
];

// ─── Page Navigation Map ───────────────────────────────────────────────────────
const pageMap: Record<string, string> = {
  home: "/",
  "/": "/",
  ".": "/",
  "~": "/",
  blog: "/articles",
  blogs: "/articles",
  articles: "/articles",
  article: "/articles",
  paper: "/articles",
  papers: "/articles",
  book: "/books",
  books: "/books",
  anime: "/anime",
  animes: "/anime",
  hobby: "/hobbies",
  hobbies: "/hobbies",
  music: "/music",
  experience: "/experience",
  exp: "/experience",
  uses: "/uses",
  now: "/now",
  stats: "/stats",
};

// ─── Man Pages ─────────────────────────────────────────────────────────────────
const manPages: Record<string, string[]> = {
  cat: [
    bld("NAME"),
    `    cat — display file contents`,
    ``,
    bld("SYNOPSIS"),
    `    cat <filename>`,
    ``,
    bld("DESCRIPTION"),
    `    Display a file from the virtual filesystem.`,
    `    ${gry("Files: " + Object.keys(mockFiles).join(", "))}`,
  ],
  cd: [
    bld("NAME"),
    `    cd — change directory / navigate to page`,
    ``,
    bld("SYNOPSIS"),
    `    cd <page>`,
    ``,
    bld("EXAMPLES"),
    `    cd blogs     → /articles`,
    `    cd books     → /books`,
    `    cd anime     → /anime`,
    `    cd home      → /`,
    `    cd now       → /now`,
    `    cd uses      → /uses`,
  ],
  theme: [
    bld("NAME"),
    `    theme — change the color theme`,
    ``,
    bld("SYNOPSIS"),
    `    theme [dark|light|system]`,
    ``,
    bld("DESCRIPTION"),
    `    Set the color theme. Without args, toggles dark/light.`,
    `    Uses next-themes under the hood.`,
  ],
  skills: [
    bld("NAME"),
    `    skills — list technical skills`,
    ``,
    bld("SYNOPSIS"),
    `    skills [category]`,
    ``,
    bld("CATEGORIES"),
    `    lang, sys, sec, ai, web, devops, db`,
  ],
  todo: [
    bld("NAME"),
    `    todo — manage a todo list`,
    ``,
    bld("SYNOPSIS"),
    `    todo                  list todos`,
    `    todo add <text>       add a todo`,
    `    todo done <n>         toggle done`,
    `    todo rm <n>           remove a todo`,
    `    todo clear            remove all`,
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function lsOutput(args: string[], setLines: any) {
  const path = args[0]?.toLowerCase();
  if (path === "blogs" || path === "blog") {
    setLines((l: string[]) => [
      ...l,
      bld("~/blogs"),
      `  ${grn("hello-world.md")}            ${gry("2025-12-10")}`,
      `  ${grn("cpp20-features.md")}         ${gry("2025-08-15")}`,
      `  ${grn("windows-dlp-internals.md")}  ${gry("2025-09-20")}`,
      gry("3 files"),
    ]);
    return;
  }
  const fileList = Object.keys(mockFiles).map((f) => `  ${grn(f)}`).join("\n");
  const dirList = [...directories].map((d) => `  ${cyn(d + "/")}`).join("\n");
  setLines((l: string[]) => [
    ...l,
    bld("~/"),
    fileList,
    dirList,
    gry(`${Object.keys(mockFiles).length} files  ${directories.length} dirs`),
  ]);
}

// ─── Command Registry ──────────────────────────────────────────────────────────
export const commands: Record<
  string,
  { execute: (args: string[], ctx: any, prev?: any) => void | Promise<void> }
> = {
  // ── Help ───────────────────────────────────────────────────────────────────
  help: {
    execute: (args, { setLines }) => {
      if (args[0] && manPages[args[0]]) {
        setLines((l: string[]) => [...l, ...manPages[args[0]]!]);
        return;
      }
      setLines((l: string[]) => [
        ...l,
        `${bld("Available Commands")}  ${gry("man <cmd> for details")}`,
        ``,
        `${cyn("── Navigation ─────────────────────────────")}`,
        `  ${grn("cd")} / ${grn("goto")}   <page>   navigate to a page`,
        `  ${grn("open")}        <url>    open URL in browser`,
        `  ${grn("repo")}                 open GitHub profile`,
        ``,
        `${cyn("── Filesystem ─────────────────────────────")}`,
        `  ${grn("ls")}          [path]   list files & directories`,
        `  ${grn("cat")}         <file>   display file contents`,
        `  ${grn("pwd")}                  print working directory`,
        ``,
        `${cyn("── Portfolio ──────────────────────────────")}`,
        `  ${grn("neofetch")}             system & hardware info`,
        `  ${grn("whoami")}               about me`,
        `  ${grn("contact")}              contact details`,
        `  ${grn("experience")}           work history`,
        `  ${grn("skills")}    [cat]      tech stack by category`,
        `  ${grn("projects")}             open source projects`,
        ``,
        `${cyn("── Terminal ───────────────────────────────")}`,
        `  ${grn("clear")}                clear screen`,
        `  ${grn("history")}              command history`,
        `  ${grn("echo")}        <text>   print text`,
        `  ${grn("date")}                 date & time`,
        `  ${grn("uname")}       [-a]     system info`,
        `  ${grn("banner")}               ASCII art`,
        `  ${grn("man")}         <cmd>    command manual`,
        ``,
        `${cyn("── Fun ────────────────────────────────────")}`,
        `  ${grn("theme")}       [mode]   dark / light / system`,
        `  ${grn("fortune")}              random quote`,
        `  ${grn("ping")}        [host]   ping a host`,
        `  ${grn("sudo")}        <cmd>    try to be root`,
        `  ${grn("todo")}        <sub>    todo list manager`,
        `  ${grn("hack")}                 hack the mainframe`,
        `  ${grn("matrix")}               follow the white rabbit`,
        `  ${grn("curl")}        wttr.in  weather forecast`,
      ]);
    },
  },

  // ── Core ───────────────────────────────────────────────────────────────────
  clear: {
    execute: (_, { setLines }) => setLines([]),
  },

  // ── Filesystem ─────────────────────────────────────────────────────────────
  ls: {
    execute: (args, { setLines }) => lsOutput(args, setLines),
  },

  cat: {
    execute: (args, { setLines }) => {
      const filename = args[0];
      if (!filename) {
        setLines((l: string[]) => [...l, red("Usage: cat <filename>")]);
        return;
      }
      const content =
        mockFiles[filename] ??
        mockFiles[filename + ".md"] ??
        mockFiles[filename + ".txt"];
      if (!content) {
        setLines((l: string[]) => [
          ...l,
          red(`cat: ${filename}: No such file or directory`),
          gry(`Available: ${Object.keys(mockFiles).join("  ")}`),
        ]);
        return;
      }
      setLines((l: string[]) => [...l, ...content.split("\n")]);
    },
  },

  pwd: {
    execute: (_, { setLines }) =>
      setLines((l: string[]) => [...l, grn("/home/adarsh")]),
  },

  // ── Portfolio ──────────────────────────────────────────────────────────────
  neofetch: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [...l, ...systemStats()]);
    },
  },

  whoami: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        bld(siteConfig.whoami.user),
        `  ${cyn("Role")}       ${siteConfig.whoami.role}`,
        `  ${cyn("Expertise")}  ${siteConfig.whoami.expertise}`,
        `  ${cyn("Status")}     ${grn(siteConfig.whoami.status)}`,
        `  ${cyn("Location")}   ${siteConfig.author.location}`,
        `  ${cyn("GitHub")}     github.com/${siteConfig.author.github}`,
        `  ${cyn("Email")}      ${siteConfig.author.email}`,
      ]);
    },
  },

  contact: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        bld("Contact Adarsh Anand"),
        ``,
        `  ${cyn("Email")}    ${siteConfig.contact.email}`,
        `  ${cyn("LinkedIn")} linkedin.com/in/${siteConfig.author.linkedin}`,
        `  ${cyn("GitHub")}   github.com/${siteConfig.author.github}`,
        `  ${cyn("Website")}  adarshanand.dev`,
      ]);
    },
  },

  experience: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        bld("Work Experience"),
        ``,
        `${grn("Software Engineer")} — ${yel("Trellix")}  ${gry("Jul 2025 – Present")}`,
        `  ${gry("•")} Windows kernel minifilter driver development (C++)`,
        `  ${gry("•")} Data Loss Prevention (DLP) endpoint security`,
        `  ${gry("•")} Chrome/Edge native registry management`,
        `  ${gry("•")} CppUnit test automation frameworks`,
        ``,
        `${grn("Software Engineer")} — ${yel("Intel")}    ${gry("Jun 2024 – Jul 2025")}`,
        `  ${gry("•")} Intel SGX/TDX — Gramine contributions (Ubuntu 24.04, CentOS 9, RHEL 9)`,
        `  ${gry("•")} SGX fuzzing with libFuzzer — 8+ CVEs, 97% branch coverage`,
        `  ${gry("•")} TDX full-disk encryption, 30% image size reduction (Rust)`,
        `  ${gry("•")} Post-Quantum Cryptography via Crypto API Toolkit (PKCS11)`,
        `  ${gry("•")} vLLM benchmarking: 20K+ runs on 5th Gen Xeon Emerald Rapids`,
        ``,
        `${grn("Graduate Technical Intern")} — ${yel("Intel")}  ${gry("Jun 2023 – Dec 2023")}`,
        `  ${gry("•")} FIDO Device Onboarding — Zero-Touch Provisioning`,
        `  ${gry("•")} OpenSSL 3.0 migration — 15% Client SDK size reduction`,
        `  ${gry("•")} Bare Metal Onboarding POC with React dashboard`,
        ``,
        gry("type 'cat experience.md' or visit /experience for full details"),
      ]);
    },
  },

  skills: {
    execute: (args, { setLines }) => {
      const input = args.join(" ").toLowerCase();
      const catMap: Record<string, string> = {
        lang: "Languages",
        languages: "Languages",
        sys: "System & Kernel",
        system: "System & Kernel",
        kernel: "System & Kernel",
        sec: "Security & Privacy",
        security: "Security & Privacy",
        ai: "AI & Machine Learning",
        ml: "AI & Machine Learning",
        db: "Databases & Tools",
        databases: "Databases & Tools",
        web: "Frontend & Web",
        frontend: "Frontend & Web",
        devops: "DevOps & Infrastructure",
        infra: "DevOps & Infrastructure",
      };
      const target = catMap[input];
      const entries = Object.entries(skillCategories);
      const filtered = target ? entries.filter(([k]) => k === target) : entries;

      const lines: string[] = [bld("Technical Skills")];
      if (!target)
        lines.push(
          gry("  skills [lang|sys|sec|ai|web|devops|db]  for a category"),
          ``,
        );

      for (const [cat, skills] of filtered) {
        lines.push(cyn(cat));
        for (let i = 0; i < skills.length; i += 5) {
          lines.push("  " + skills.slice(i, i + 5).join("  ·  "));
        }
        lines.push("");
      }
      setLines((l: string[]) => [...l, ...lines]);
    },
  },

  projects: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `${bld("Open Source Projects")}  ${gry("github.com/adarshanand67")}`,
        ``,
        `  ${grn("personal-website")}      Next.js portfolio with interactive terminal`,
        `  ${grn("gramine")}               Intel SGX confidential computing (contributor)`,
        `  ${grn("sgx-fuzzer")}            libFuzzer harnesses for Intel SGX TCB`,
        `  ${grn("tdx-fde")}              TDX full-disk encryption (Rust)`,
        `  ${grn("lart")}                  LLM Adversarial Robustness Toolkit (vLLM)`,
        `  ${grn("fdo-client")}            FIDO Device Onboarding Zero-Touch Provisioning`,
        ``,
        gry("type 'repo' to open GitHub  ·  visit adarshanand.dev for more"),
      ]);
    },
  },

  // ── Navigation ─────────────────────────────────────────────────────────────
  cd: {
    execute: (args, { setLines, router }) => {
      const target = args[0]?.toLowerCase();
      if (!target) {
        setLines((l: string[]) => [...l, grn("/home/adarsh")]);
        return;
      }
      const page = pageMap[target];
      if (page) {
        setLines((l: string[]) => [
          ...l,
          `${gry("→")} Navigating to ${grn(page)}...`,
        ]);
        setTimeout(() => router.push(page), 300);
      } else {
        setLines((l: string[]) => [
          ...l,
          red(`cd: ${target}: No such directory`),
          gry(
            `Available: ${Object.keys(pageMap)
              .filter((k) => !k.startsWith("/") && k !== "." && k !== "~")
              .join(", ")}`,
          ),
        ]);
      }
    },
  },

  goto: {
    execute: (args, ctx) => commands.cd!.execute(args, ctx),
  },

  navigate: {
    execute: (args, ctx) => commands.cd!.execute(args, ctx),
  },

  open: {
    execute: (args, { setLines }) => {
      const url = args[0];
      if (!url) {
        setLines((l: string[]) => [...l, red("Usage: open <url>")]);
        return;
      }
      const target = url.startsWith("http") ? url : `https://${url}`;
      setLines((l: string[]) => [...l, `${gry("→")} Opening ${grn(target)}...`]);
      setTimeout(() => window.open(target, "_blank"), 300);
    },
  },

  repo: {
    execute: (_, { setLines }) => {
      const url = `https://github.com/${siteConfig.author.github}`;
      setLines((l: string[]) => [...l, `${gry("→")} Opening ${grn(url)}...`]);
      setTimeout(() => window.open(url, "_blank"), 300);
    },
  },

  // ── Appearance ─────────────────────────────────────────────────────────────
  theme: {
    execute: (args, { setLines, setTheme }) => {
      const mode = args[0]?.toLowerCase();
      if (mode === "dark" || mode === "light" || mode === "system") {
        setTheme(mode);
        setLines((l: string[]) => [...l, `${gry("→")} Theme: ${grn(mode)}`]);
      } else {
        // Toggle based on document class (next-themes sets class="dark" on html)
        const isDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        setTheme(next);
        setLines((l: string[]) => [...l, `${gry("→")} Theme: ${grn(next)}`]);
      }
    },
  },

  // ── Terminal Utilities ─────────────────────────────────────────────────────
  date: {
    execute: (_, { setLines }) => {
      const now = new Date();
      setLines((l: string[]) => [
        ...l,
        `${cyn(now.toDateString())}  ${gry(now.toLocaleTimeString())}`,
        gry(`Unix timestamp: ${Math.floor(now.getTime() / 1000)}`),
      ]);
    },
  },

  echo: {
    execute: (args, { setLines }) => {
      setLines((l: string[]) => [...l, args.join(" ")]);
    },
  },

  uname: {
    execute: (args, { setLines }) => {
      if (args[0] === "-a") {
        setLines((l: string[]) => [
          ...l,
          `${grn("Darwin")} Adarshs-MacBook-Air.local 27.0.0 Darwin Kernel Version 27.0.0 arm64 Apple M4`,
        ]);
      } else {
        setLines((l: string[]) => [...l, grn("Darwin")]);
      }
    },
  },

  uptime: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `${gry("up")} 3 days, 16 hrs  —  load avg: ${grn("0.42")}  ${grn("0.38")}  ${grn("0.35")}`,
      ]);
    },
  },

  history: {
    execute: (_, { setLines, history }) => {
      if (!history?.length) {
        setLines((l: string[]) => [...l, gry("No command history yet.")]);
        return;
      }
      const lines = [...history]
        .slice(0, 20)
        .map((cmd: string, i: number) => `  ${gry(String(i + 1).padStart(3))}  ${cmd}`);
      setLines((l: string[]) => [...l, bld("Command History"), ...lines]);
    },
  },

  banner: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [...l, ...asciiArt]);
    },
  },

  man: {
    execute: (args, { setLines }) => {
      const cmd = args[0];
      if (!cmd) {
        setLines((l: string[]) => [
          ...l,
          red("Usage: man <command>"),
          gry(`Commands with manuals: ${Object.keys(manPages).join(", ")}`),
        ]);
        return;
      }
      const page = manPages[cmd];
      if (page) {
        setLines((l: string[]) => [...l, ...page]);
      } else if (commands[cmd]) {
        setLines((l: string[]) => [
          ...l,
          bld("NAME"),
          `    ${cmd} — portfolio terminal command`,
          ``,
          bld("SYNOPSIS"),
          `    ${cmd} [args]`,
          ``,
          bld("DESCRIPTION"),
          `    Type 'help' for usage overview.`,
        ]);
      } else {
        setLines((l: string[]) => [
          ...l,
          red(`man: no manual entry for '${cmd}'`),
        ]);
      }
    },
  },

  // ── Todo ───────────────────────────────────────────────────────────────────
  todo: {
    execute: (args, { setLines, todos, addTodo, toggleTodo, removeTodo, clearTodos }) => {
      const sub = args[0]?.toLowerCase();

      if (sub === "add") {
        const text = args.slice(1).join(" ");
        if (!text) {
          setLines((l: string[]) => [...l, red("Usage: todo add <text>")]);
          return;
        }
        addTodo(text);
        setLines((l: string[]) => [...l, `${grn("+")} Added: ${text}`]);
        return;
      }

      if (sub === "rm" || sub === "remove" || sub === "del" || sub === "delete") {
        const idx = parseInt(args[1] ?? "");
        if (isNaN(idx) || idx < 1 || idx > todos.length) {
          setLines((l: string[]) => [...l, red("Usage: todo rm <number>")]);
          return;
        }
        const item = todos[idx - 1];
        removeTodo(item.id);
        setLines((l: string[]) => [...l, `${red("−")} Removed: ${item.text}`]);
        return;
      }

      if (sub === "done" || sub === "toggle" || sub === "check") {
        const idx = parseInt(args[1] ?? "");
        if (isNaN(idx) || idx < 1 || idx > todos.length) {
          setLines((l: string[]) => [...l, red("Usage: todo done <number>")]);
          return;
        }
        const item = todos[idx - 1];
        toggleTodo(item.id);
        const icon = item.completed ? gry("○") : grn("✓");
        setLines((l: string[]) => [...l, `${icon} ${item.text}`]);
        return;
      }

      if (sub === "clear") {
        clearTodos();
        setLines((l: string[]) => [...l, gry("Todo list cleared.")]);
        return;
      }

      if (!todos?.length) {
        setLines((l: string[]) => [
          ...l,
          `${bld("Todo List")} ${gry("(empty)")}`,
          gry("  todo add <text>  ·  todo done <n>  ·  todo rm <n>  ·  todo clear"),
        ]);
        return;
      }

      const items = todos.map(
        (t: { text: string; completed: boolean }, i: number) =>
          `  ${gry(String(i + 1) + ".")}  ${t.completed ? gry(`[x] ${t.text}`) : `[ ] ${t.text}`}`,
      );
      setLines((l: string[]) => [
        ...l,
        `${bld("Todo List")} ${gry(`(${todos.length} items)`)}`,
        ...items,
        ``,
        gry("  todo add <text>  ·  todo done <n>  ·  todo rm <n>  ·  todo clear"),
      ]);
    },
  },

  // ── Fun / Easter Eggs ──────────────────────────────────────────────────────
  fortune: {
    execute: (_, { setLines }) => {
      const quote = fortunes[Math.floor(Math.random() * fortunes.length)]!;
      setLines((l: string[]) => [...l, `${mag("✦")} ${quote}`]);
    },
  },

  ping: {
    execute: (args, { setLines }) => {
      const host = args[0] ?? "adarshanand.dev";
      setLines((l: string[]) => [
        ...l,
        `PING ${host} (127.0.0.1): 56 data bytes`,
      ]);
      let count = 0;
      const iv = setInterval(() => {
        const ms = (Math.random() * 10 + 1).toFixed(3);
        setLines((l: string[]) => [
          ...l,
          `64 bytes from ${host}: icmp_seq=${count} ttl=64 time=${grn(ms + " ms")}`,
        ]);
        count++;
        if (count >= 4) {
          clearInterval(iv);
          setLines((l: string[]) => [
            ...l,
            ``,
            `--- ${host} ping statistics ---`,
            `4 packets transmitted, 4 received, ${grn("0%")} packet loss`,
            `rtt min/avg/max = ${grn("1.2/3.4/9.1 ms")}`,
          ]);
        }
      }, 400);
    },
  },

  sudo: {
    execute: (args, { setLines, setPasswordMode }) => {
      const subcmd = args.join(" ");
      if (!subcmd) {
        setLines((l: string[]) => [...l, red("sudo: no command specified")]);
        return;
      }
      setLines((l: string[]) => [...l, `[sudo] password for adarsh:`]);
      setPasswordMode(true);
    },
  },

  hack: {
    execute: (_, { setLines }) => {
      const steps = [
        `${grn("[")}${gry(".......")}${grn("]")} Initializing hack sequence...`,
        `${grn("[")}${grn("###")}${gry("....")}${grn("]")} Bypassing firewall...`,
        `${grn("[")}${grn("######")}${gry(".")}${grn("]")} Decrypting mainframe...`,
        `${grn("[")}${grn("########")}${grn("]")} Root access ${grn("GRANTED")}`,
        ``,
        `${red("Just kidding.")} ${gry("This is a portfolio site.")}`,
        gry("Try 'experience' or 'projects' instead."),
      ];
      steps.forEach((line, i) => {
        setTimeout(() => setLines((l: string[]) => [...l, line]), i * 350);
      });
    },
  },

  matrix: {
    execute: (_, { setLines }) => {
      const chars = "アイウエオカキクケコサシスセソタチツテトハヒフヘホ01アイウエオ";
      const rows = Array.from({ length: 8 }, () =>
        Array.from({ length: 44 }, () =>
          chars[Math.floor(Math.random() * chars.length)],
        ).join(""),
      );
      setLines((l: string[]) => [
        ...l,
        ...rows.map((r) => grn(r)),
        ``,
        gry("There is no spoon."),
      ]);
    },
  },

  curl: {
    execute: (args, { setLines }) => {
      const url = args[0] ?? "";
      if (url.includes("wttr") || url.includes("weather")) {
        setLines((l: string[]) => [
          ...l,
          `Weather: ${yel("Bengaluru, Karnataka, India")}`,
          ``,
          `       ${yel("\\   /")}     ${grn("Sunny")}`,
          `        ${yel(".")}        ${grn("29")} °C  feels like ${grn("32")} °C`,
          `     ${yel("─(   )─")}    ↗ ${grn("15")} km/h`,
          `        ${yel("'")}        Visibility: ${grn("10")} km`,
          `       ${yel("/ \\")}      Humidity: ${grn("55%")}`,
        ]);
      } else {
        setLines((l: string[]) => [
          ...l,
          red("curl: (6) Could not resolve host"),
          gry("Tip: try  curl wttr.in/Bengaluru"),
        ]);
      }
    },
  },

  // ── Misc Aliases ───────────────────────────────────────────────────────────
  exit: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        gry("No escape from this portfolio. Type 'help' instead."),
      ]);
    },
  },

  quit: {
    execute: (args, ctx) => commands.exit!.execute(args, ctx),
  },

  q: {
    execute: (args, ctx) => commands.exit!.execute(args, ctx),
  },

  whoami_alias: {
    execute: (args, ctx) => commands.whoami!.execute(args, ctx),
  },
};
