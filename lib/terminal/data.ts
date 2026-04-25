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
        `${cyn("── Text Utils ─────────────────────────────")}`,
        `  ${grn("grep")}        <pat>    search file contents`,
        `  ${grn("wc")}          <file>   word/line count`,
        `  ${grn("head")}        <file>   first N lines`,
        `  ${grn("tail")}        <file>   last N lines`,
        `  ${grn("rev")}         <text>   reverse text`,
        `  ${grn("base64")}      [-d]     encode / decode`,
        `  ${grn("rot13")}       <text>   ROT13 cipher`,
        `  ${grn("calc")}        <expr>   calculator  e.g. 2**32`,
        ``,
        `${cyn("── System ─────────────────────────────────")}`,
        `  ${grn("top")} / ${grn("htop")}        process monitor`,
        `  ${grn("ps")}          [aux]    process list`,
        `  ${grn("df")}                   disk usage`,
        `  ${grn("free")}                 memory usage`,
        `  ${grn("env")}                  environment variables`,
        `  ${grn("which")}       <cmd>    find command path`,
        `  ${grn("alias")}                show aliases`,
        ``,
        `${cyn("── Dev Tools ──────────────────────────────")}`,
        `  ${grn("git")}         [sub]    git [log|status|diff|push]`,
        `  ${grn("docker")}      [sub]    docker [ps|images]`,
        `  ${grn("npm")}         [sub]    npm [install|run]`,
        `  ${grn("brew")}        [sub]    brew [install|list|update]`,
        `  ${grn("python")} / ${grn("node")}     REPL stubs`,
        ``,
        `${cyn("── Fun ────────────────────────────────────")}`,
        `  ${grn("theme")}       [mode]   dark / light / system`,
        `  ${grn("fortune")}              random quote`,
        `  ${grn("cowsay")}      <text>   🐄 wisdom`,
        `  ${grn("weather")}     [city]   live weather data`,
        `  ${grn("ping")}        [host]   ping a host`,
        `  ${grn("sl")}                   🚂 steam locomotive`,
        `  ${grn("lolcat")}      <text>   rainbow text`,
        `  ${grn("sudo")}        <cmd>    try to be root`,
        `  ${grn("todo")}        <sub>    todo list manager`,
        `  ${grn("hack")}                 hack the mainframe`,
        `  ${grn("matrix")}               follow the white rabbit`,
        `  ${grn("vim")} / ${grn("nano")} / ${grn("emacs")}  editors (sort of)`,
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
      setLines((l: string[]) => [...l, ...systemStats]);
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

  // ── Git (Easter Egg) ───────────────────────────────────────────────────────
  git: {
    execute: (args, { setLines }) => {
      const sub = args[0]?.toLowerCase();
      if (sub === "log") {
        setLines((l: string[]) => [
          ...l,
          bld("commit 94ab2d9") + gry(" (HEAD -> main, origin/main)"),
          `Author: Adarsh Anand <adarshan20302@gmail.com>`,
          `Date:   ${new Date().toDateString()}`,
          ``,
          `    feat: syntax highlighting, blog SEO, 50+ terminal commands`,
          ``,
          bld("commit 5673df0"),
          `    perf: reduce bundle, remove unused deps, audio optimization`,
          ``,
          bld("commit 94da75c"),
          `    fix+feat: fix terminal crash, add /now, /uses, blog posts`,
          ``,
          bld("commit 3fcbb0f"),
          `    feat: add GitHub projects section (closes #1)`,
          gry(`...and many more. Type 'repo' to see the full history.`),
        ]);
      } else if (sub === "status") {
        setLines((l: string[]) => [
          ...l,
          `On branch ${grn("main")}`,
          `Your branch is up to date with ${grn("'origin/main'")}.`,
          ``,
          `nothing to commit, working tree clean`,
        ]);
      } else if (sub === "diff") {
        setLines((l: string[]) => [
          ...l,
          gry("No local changes — everything is committed."),
        ]);
      } else if (sub === "branch") {
        setLines((l: string[]) => [...l, `* ${grn("main")}`]);
      } else if (sub === "clone") {
        const repo = args[1] ?? "repo";
        setLines((l: string[]) => [
          ...l,
          `Cloning into '${repo}'...`,
          `remote: Enumerating objects: 42, done.`,
          `remote: Counting objects: 100% (42/42), done.`,
          `Receiving objects: 100% (42/42), ${grn("done")}.`,
        ]);
      } else if (sub === "push") {
        setLines((l: string[]) => [
          ...l,
          `Enumerating objects: 3, done.`,
          `Writing objects: 100% (3/3), 1.23 KiB | 1.23 MiB/s, done.`,
          `To github.com/adarshanand67/personal-website`,
          `   94ab2d9..${Math.random().toString(16).slice(2, 9)}  main -> main`,
        ]);
      } else {
        setLines((l: string[]) => [
          ...l,
          gry("usage: git [log|status|diff|branch|clone|push]"),
        ]);
      }
    },
  },

  // ── Process / System Monitor ───────────────────────────────────────────────
  top: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `${bld("Processes:")} 312 total  ${grn("3")} running  309 sleeping`,
        `${bld("CPU usage:")} ${grn("2.5%")} user  1.2% sys  ${grn("96.3%")} idle`,
        `${bld("MemRegions:")} 142K total, 5.5G resident, 0B private, 2.1G shared`,
        `${bld("PhysMem:")}   3.2G used (${grn("1.9G")} wired, 1.3G app), 12.8G unused`,
        ``,
        `${gry("PID")}    ${gry("COMMAND")}                 ${gry("%CPU")}  ${gry("MEM")}`,
        `${grn("1")}      kernel_task              0.5   3.1G`,
        `${grn("284")}    WindowServer             0.8   312M`,
        `${grn("1042")}   node (next-server)       1.2   148M`,
        `${grn("1143")}   Google Chrome            2.1   812M`,
        `${grn("2048")}   Code (VSCode)            0.9   430M`,
        `${grn("3891")}   Terminal                 0.1    28M`,
        gry("Press q to quit (this is a simulation)"),
      ]);
    },
  },

  htop: {
    execute: (args, ctx) => commands.top!.execute(args, ctx),
  },

  ps: {
    execute: (args, { setLines }) => {
      const isAux = args.includes("aux") || args.includes("-aux");
      setLines((l: string[]) => [
        ...l,
        `${gry("PID")}    ${gry("TTY")}    ${gry("STAT")} ${gry("TIME")}  ${gry("COMMAND")}`,
        `  1      ??     Ss    0:01  /sbin/launchd`,
        `  284    ??     S     1:23  /System/Library/PrivateFrameworks/SkyLight`,
        `  1042   s001   Ss    0:00  -zsh`,
        `  1143   s001   R+    0:00  ps ${args.join(" ")}`,
        ...(isAux
          ? [
              `  2048   ??     S     5:12  /Applications/Code.app/Contents/MacOS/Electron`,
              `  3891   ??     S     0:33  /Applications/Terminal.app/Contents/MacOS/Terminal`,
              `  4200   ??     S     2:01  /Applications/Safari.app/Contents/MacOS/Safari`,
            ]
          : []),
      ]);
    },
  },

  df: {
    execute: (args, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `${gry("Filesystem")}       ${gry("Size")}  ${gry("Used")} ${gry("Avail")} ${gry("Capacity")}  ${gry("Mounted on")}`,
        `/dev/disk3s1s1    228G   23G   180G      12%     /`,
        `devfs             210K  210K     0B     100%     /dev`,
        `/dev/disk3s6      228G    3G   180G       2%     /System/Volumes/VM`,
        `/dev/disk3s2      228G  3.5G   180G       2%     /System/Volumes/Preboot`,
        gry("Disk: 228GB total  ·  23GB used  ·  180GB available"),
      ]);
    },
  },

  free: {
    execute: (args, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `              total        used        free    available`,
        `Mem:          ${grn("16384")}        3226       13158       13158`,
        `Swap:          2048           0        2048        2048`,
        gry("All values in MiB"),
      ]);
    },
  },

  // ── Text Utilities ─────────────────────────────────────────────────────────
  grep: {
    execute: (args, { setLines }) => {
      const pattern = args[0];
      const filename = args[1];
      if (!pattern) {
        setLines((l: string[]) => [...l, red("Usage: grep <pattern> [file]")]);
        return;
      }
      const searchIn = filename
        ? [filename]
        : Object.keys(mockFiles);
      const results: string[] = [];
      for (const name of searchIn) {
        const content = mockFiles[name];
        if (!content) continue;
        const lines = content.split("\n");
        for (const line of lines) {
          if (line.toLowerCase().includes(pattern.toLowerCase())) {
            const highlighted = line.replace(
              new RegExp(pattern, "gi"),
              (m) => grn(m),
            );
            results.push(`${cyn(name)}: ${highlighted}`);
          }
        }
      }
      if (results.length === 0) {
        setLines((l: string[]) => [
          ...l,
          gry(`grep: no matches for '${pattern}'`),
        ]);
      } else {
        setLines((l: string[]) => [
          ...l,
          ...results,
          gry(`${results.length} match${results.length !== 1 ? "es" : ""}`),
        ]);
      }
    },
  },

  wc: {
    execute: (args, { setLines }) => {
      const filename = args[0];
      if (!filename) {
        setLines((l: string[]) => [...l, red("Usage: wc <file>")]);
        return;
      }
      const content =
        mockFiles[filename] ??
        mockFiles[filename + ".md"] ??
        mockFiles[filename + ".txt"];
      if (!content) {
        setLines((l: string[]) => [
          ...l,
          red(`wc: ${filename}: No such file`),
        ]);
        return;
      }
      const lines = content.split("\n").length;
      const words = content.trim().split(/\s+/).length;
      const chars = content.length;
      setLines((l: string[]) => [
        ...l,
        `  ${grn(String(lines))} lines  ${grn(String(words))} words  ${grn(String(chars))} chars  ${filename}`,
      ]);
    },
  },

  head: {
    execute: (args, { setLines }) => {
      const nFlag = args.indexOf("-n");
      const n = nFlag >= 0 ? parseInt(args[nFlag + 1] ?? "10") : 10;
      const filename = args.find((a) => !a.startsWith("-") && !/^\d+$/.test(a));
      if (!filename) {
        setLines((l: string[]) => [...l, red("Usage: head [-n N] <file>")]);
        return;
      }
      const content =
        mockFiles[filename] ?? mockFiles[filename + ".md"] ?? mockFiles[filename + ".txt"];
      if (!content) {
        setLines((l: string[]) => [...l, red(`head: ${filename}: No such file`)]);
        return;
      }
      setLines((l: string[]) => [
        ...l,
        ...content.split("\n").slice(0, n),
      ]);
    },
  },

  tail: {
    execute: (args, { setLines }) => {
      const nFlag = args.indexOf("-n");
      const n = nFlag >= 0 ? parseInt(args[nFlag + 1] ?? "10") : 10;
      const filename = args.find((a) => !a.startsWith("-") && !/^\d+$/.test(a));
      if (!filename) {
        setLines((l: string[]) => [...l, red("Usage: tail [-n N] <file>")]);
        return;
      }
      const content =
        mockFiles[filename] ?? mockFiles[filename + ".md"] ?? mockFiles[filename + ".txt"];
      if (!content) {
        setLines((l: string[]) => [...l, red(`tail: ${filename}: No such file`)]);
        return;
      }
      const lines = content.split("\n");
      setLines((l: string[]) => [...l, ...lines.slice(-n)]);
    },
  },

  rev: {
    execute: (args, { setLines }) => {
      const text = args.join(" ");
      if (!text) {
        setLines((l: string[]) => [...l, red("Usage: rev <text>")]);
        return;
      }
      setLines((l: string[]) => [...l, text.split("").reverse().join("")]);
    },
  },

  base64: {
    execute: (args, { setLines }) => {
      const decode = args.includes("-d") || args.includes("--decode");
      const text = args.filter((a) => !a.startsWith("-")).join(" ");
      if (!text) {
        setLines((l: string[]) => [
          ...l,
          red("Usage: base64 [-d] <text>"),
        ]);
        return;
      }
      try {
        const result = decode
          ? atob(text)
          : btoa(text);
        setLines((l: string[]) => [...l, grn(result)]);
      } catch {
        setLines((l: string[]) => [...l, red("base64: invalid input")]);
      }
    },
  },

  rot13: {
    execute: (args, { setLines }) => {
      const text = args.join(" ");
      if (!text) {
        setLines((l: string[]) => [...l, red("Usage: rot13 <text>")]);
        return;
      }
      const result = text.replace(/[a-zA-Z]/g, (c) => {
        const base = c < "a" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      });
      setLines((l: string[]) => [...l, grn(result)]);
    },
  },

  // ── Calculator ─────────────────────────────────────────────────────────────
  calc: {
    execute: (args, { setLines }) => {
      const expr = args.join(" ").replace(/[^0-9+\-*/().\s%]/g, "");
      if (!expr.trim()) {
        setLines((l: string[]) => [...l, red("Usage: calc <expression>  e.g. calc 2+2")]);
        return;
      }
      try {
        // eslint-disable-next-line no-eval
        const result = Function(`"use strict"; return (${expr})`)();
        setLines((l: string[]) => [...l, `${gry(expr + " =")} ${grn(String(result))}`]);
      } catch {
        setLines((l: string[]) => [...l, red(`calc: invalid expression: ${expr}`)]);
      }
    },
  },

  bc: {
    execute: (args, ctx) => commands.calc!.execute(args, ctx),
  },

  // ── Cowsay ─────────────────────────────────────────────────────────────────
  cowsay: {
    execute: (args, { setLines }) => {
      const text = args.join(" ") || "Moo!";
      const pad = text.length + 2;
      const top = " " + "_".repeat(pad);
      const bot = " " + "-".repeat(pad);
      setLines((l: string[]) => [
        ...l,
        grn(top),
        grn(`< ${text} >`),
        grn(bot),
        grn(`        \\   ^__^`),
        grn(`         \\  (oo)\\_______`),
        grn(`            (__)\\       )\\/\\`),
        grn(`                ||----w |`),
        grn(`                ||     ||`),
      ]);
    },
  },

  // ── Environment ────────────────────────────────────────────────────────────
  env: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `${cyn("USER")}=adarsh`,
        `${cyn("HOME")}=/home/adarsh`,
        `${cyn("SHELL")}=/bin/zsh`,
        `${cyn("TERM")}=portfolio-terminal-1.0`,
        `${cyn("PATH")}=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`,
        `${cyn("EDITOR")}=vim`,
        `${cyn("LANG")}=en_US.UTF-8`,
        `${cyn("NODE_ENV")}=production`,
        `${cyn("NEXT_PUBLIC_BASE_PATH")}=`,
      ]);
    },
  },

  which: {
    execute: (args, { setLines }) => {
      const cmd = args[0];
      if (!cmd) {
        setLines((l: string[]) => [...l, red("Usage: which <command>")]);
        return;
      }
      if (commands[cmd]) {
        setLines((l: string[]) => [...l, grn(`/usr/local/bin/${cmd}`)]);
      } else {
        setLines((l: string[]) => [...l, red(`which: ${cmd}: not found`)]);
      }
    },
  },

  type: {
    execute: (args, { setLines }) => {
      const cmd = args[0];
      if (!cmd) {
        setLines((l: string[]) => [...l, red("Usage: type <command>")]);
        return;
      }
      if (commands[cmd]) {
        setLines((l: string[]) => [
          ...l,
          `${grn(cmd)} is a shell builtin`,
        ]);
      } else {
        setLines((l: string[]) => [
          ...l,
          red(`${cmd}: not found`),
        ]);
      }
    },
  },

  alias: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        bld("Defined aliases"),
        `  ${cyn("goto")}     → cd`,
        `  ${cyn("navigate")} → cd`,
        `  ${cyn("htop")}     → top`,
        `  ${cyn("bc")}       → calc`,
        `  ${cyn("q")}        → exit`,
        `  ${cyn("quit")}     → exit`,
      ]);
    },
  },

  // ── Weather (client-side fetch) ────────────────────────────────────────────
  weather: {
    execute: async (args, { setLines }) => {
      const city = args.join("+") || "Bengaluru";
      setLines((l: string[]) => [...l, gry(`Fetching weather for ${city}...`)]);
      try {
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
          { signal: AbortSignal.timeout(5000) },
        );
        const data = await res.json();
        const cur = data.current_condition?.[0];
        if (!cur) throw new Error("no data");
        const temp = cur.temp_C;
        const feels = cur.FeelsLikeC;
        const desc = cur.weatherDesc?.[0]?.value ?? "Unknown";
        const humidity = cur.humidity;
        const wind = cur.windspeedKmph;
        setLines((l: string[]) => [
          ...l,
          `${yel("Weather")} — ${bld(city.replace(/\+/g, " "))}`,
          `  ${cyn("Condition")}  ${desc}`,
          `  ${cyn("Temp")}       ${grn(temp + "°C")} (feels ${grn(feels + "°C")})`,
          `  ${cyn("Humidity")}   ${grn(humidity + "%")}`,
          `  ${cyn("Wind")}       ${grn(wind + " km/h")}`,
        ]);
      } catch {
        setLines((l: string[]) => [
          ...l,
          red("weather: could not fetch data (offline?)"),
          gry("Try: curl wttr.in/Bengaluru"),
        ]);
      }
    },
  },

  // ── Network (Easter Eggs) ──────────────────────────────────────────────────
  ifconfig: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `${grn("lo0")}: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384`,
        `     inet ${grn("127.0.0.1")} netmask 0xff000000`,
        ``,
        `${grn("en0")}: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500`,
        `     inet ${grn("192.168.1.42")} netmask 0xffffff00 broadcast 192.168.1.255`,
        `     ether aa:bb:cc:dd:ee:ff`,
        `     status: active`,
      ]);
    },
  },

  ssh: {
    execute: (args, { setLines }) => {
      const host = args[0] ?? "server";
      setLines((l: string[]) => [
        ...l,
        `ssh: connect to host ${host} port 22: Connection refused`,
        gry("(This is a static portfolio — no SSH server running)"),
      ]);
    },
  },

  // ── Editors (Easter Eggs) ──────────────────────────────────────────────────
  vim: {
    execute: (args, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        mag("VIM - Vi IMproved 9.1"),
        gry(""),
        gry("  ~"),
        gry("  ~"),
        gry("  ~  Stuck? :q! to quit."),
        gry("  ~"),
        gry('  "' + (args[0] ?? "newfile") + '" [New File]'),
      ]);
    },
  },

  nano: {
    execute: (args, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        mag(`GNU nano 7.2  ${args[0] ?? "newfile"}`),
        ``,
        `  (empty file — nano doesn't work here)`,
        ``,
        gry("^X Exit  ^O Save  ^W Find"),
      ]);
    },
  },

  emacs: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        mag("Welcome to GNU Emacs"),
        gry("C-x C-c  to quit  (just kidding, this is a terminal)"),
      ]);
    },
  },

  // ── Package Managers (Easter Eggs) ─────────────────────────────────────────
  brew: {
    execute: (args, { setLines }) => {
      const sub = args[0];
      if (sub === "install" && args[1]) {
        setLines((l: string[]) => [
          ...l,
          `==> Fetching ${grn(args[1])}`,
          `==> Downloading https://formulae.brew.sh/api/formula/${args[1]}.json`,
          `Already downloaded: ${gry("/Users/adarsh/Library/Caches/Homebrew/" + args[1])}`,
          `==> Installing ${grn(args[1])}`,
          `  /usr/local/Cellar/${args[1]}: ${Math.floor(Math.random() * 200 + 50)} files, ${Math.floor(Math.random() * 10 + 1)}.${Math.floor(Math.random() * 9)}MB`,
        ]);
      } else if (sub === "list") {
        setLines((l: string[]) => [
          ...l,
          `bat  curl  git  jq  node  nvim  ripgrep  tmux  wget  zsh`,
          gry("295 packages installed"),
        ]);
      } else if (sub === "update") {
        setLines((l: string[]) => [
          ...l,
          `Updated 2 taps (homebrew/core, homebrew/cask).`,
          `==> New Formulae`,
          `  mojo  uv  claude-code`,
          `==> Updated Formulae`,
          `  node  python  rust`,
        ]);
      } else {
        setLines((l: string[]) => [
          ...l,
          `${grn("brew")} [install|list|update] <formula>`,
        ]);
      }
    },
  },

  npm: {
    execute: (args, { setLines }) => {
      const sub = args[0];
      if (sub === "install" || sub === "i") {
        const pkg = args[1] ?? "dependencies";
        setLines((l: string[]) => [
          ...l,
          `npm warn deprecated old-package@0.1.0: Use new-package instead`,
          ``,
          `added ${Math.floor(Math.random() * 100 + 10)} packages in ${(Math.random() * 5 + 1).toFixed(1)}s`,
          ``,
          grn(`${Math.floor(Math.random() * 3)} packages are looking for funding`),
          gry("run 'npm fund' for details"),
        ]);
      } else if (sub === "run") {
        setLines((l: string[]) => [
          ...l,
          grn(`> personal-website@1.0.1 ${args[1] ?? "start"}`),
          `> next ${args[1] ?? "dev"}`,
          gry("(simulated — run this in a real terminal)"),
        ]);
      } else {
        setLines((l: string[]) => [...l, gry("npm [install|run] <args>")]);
      }
    },
  },

  // ── Docker (Easter Egg) ────────────────────────────────────────────────────
  docker: {
    execute: (args, { setLines }) => {
      const sub = args[0];
      if (sub === "ps") {
        setLines((l: string[]) => [
          ...l,
          `${gry("CONTAINER ID")}   ${gry("IMAGE")}          ${gry("STATUS")}       ${gry("PORTS")}    ${gry("NAMES")}`,
          `a3f2b1c9d0e1   next:latest    Up 2 hours   :3000->3000/tcp   portfolio`,
          `b4g3c2d1e0f1   redis:alpine   Up 2 hours   6379/tcp          cache`,
        ]);
      } else if (sub === "images") {
        setLines((l: string[]) => [
          ...l,
          `${gry("REPOSITORY")}    ${gry("TAG")}     ${gry("SIZE")}`,
          `next          latest  312MB`,
          `redis         alpine   28MB`,
          `ubuntu        22.04   77.8MB`,
        ]);
      } else {
        setLines((l: string[]) => [...l, gry("docker [ps|images] — (simulation)")]);
      }
    },
  },

  // ── REPL Easter Eggs ───────────────────────────────────────────────────────
  python: {
    execute: (args, { setLines }) => {
      if (args[0] === "-c" && args[1]) {
        const code = args.slice(1).join(" ");
        if (code.includes("print(")) {
          const content = code.match(/print\(["']([^"']+)["']\)/)?.[1] ?? "Hello, World!";
          setLines((l: string[]) => [...l, content]);
        } else {
          setLines((l: string[]) => [...l, gry(">>> " + code), gry("SyntaxError: invalid syntax")]);
        }
      } else {
        setLines((l: string[]) => [
          ...l,
          `Python 3.13.0 (main) [Clang 16.0.0 (Apple)] on darwin`,
          `Type "help", "copyright", "credits" or "license" for more info.`,
          gry(">>> (not a real REPL — use python3 in your terminal)"),
        ]);
      }
    },
  },

  python3: {
    execute: (args, ctx) => commands.python!.execute(args, ctx),
  },

  node: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [
        ...l,
        `Welcome to Node.js v23.6.0.`,
        `Type ".exit" to quit.`,
        gry("> (not a real REPL — use node in your terminal)"),
      ]);
    },
  },

  // ── Fun Extras ─────────────────────────────────────────────────────────────
  sl: {
    execute: (_, { setLines }) => {
      const frames = [
        `      ====        ________                ___________`,
        `  _D _|  |_______/        \\__I_I_____===__|___________|`,
        `   |(_)---  |  H\\________/ |   |        =|___ ___|`,
        `   /     |  |   H  |  |    |   |         ||_| |_||`,
        `  |      |  |   H  |__--------------------| [___] |`,
        `  | ________|___H__/__|_____/[][]~\\_______|`,
        `  |/ |   |-----------I_____I [][] []  D   |=======|__`,
      ];
      setLines((l: string[]) => [
        ...l,
        ...frames.map((f) => grn(f)),
        ``,
        gry("Choo choo! 🚂  (You meant 'ls', didn't you?)"),
      ]);
    },
  },

  yes: {
    execute: (args, { setLines }) => {
      const text = args.join(" ") || "y";
      setLines((l: string[]) => [
        ...l,
        ...(Array(12).fill(text)),
        gry("(yes would run forever — showing 12 lines)"),
      ]);
    },
  },

  sleep: {
    execute: (args, { setLines }) => {
      const n = parseInt(args[0] ?? "1");
      if (isNaN(n) || n < 0) {
        setLines((l: string[]) => [...l, red("sleep: invalid interval")]);
        return;
      }
      setLines((l: string[]) => [
        ...l,
        gry(`Sleeping for ${n} second${n !== 1 ? "s" : ""}...`),
      ]);
      setTimeout(() => {
        setLines((l: string[]) => [...l, grn("Done.")]);
      }, Math.min(n * 1000, 5000));
    },
  },

  jobs: {
    execute: (_, { setLines }) => {
      setLines((l: string[]) => [...l, gry("[1]  Running  portfolio --serve")]);
    },
  },

  kill: {
    execute: (args, { setLines }) => {
      const pid = args[0];
      if (!pid) {
        setLines((l: string[]) => [...l, red("Usage: kill <pid>")]);
        return;
      }
      if (pid === "1") {
        setLines((l: string[]) => [...l, red("kill: (1) Operation not permitted")]);
      } else {
        setLines((l: string[]) => [
          ...l,
          gry(`Sending SIGTERM to process ${pid}`),
          gry(`(process not found — this is a simulation)`),
        ]);
      }
    },
  },

  // ── Misc ───────────────────────────────────────────────────────────────────
  time: {
    execute: (args, { setLines }) => {
      const cmd = args[0];
      if (!cmd || !commands[cmd]) {
        setLines((l: string[]) => [
          ...l,
          red("Usage: time <command>"),
        ]);
        return;
      }
      const start = performance.now();
      commands[cmd]!.execute(args.slice(1), { setLines });
      const elapsed = ((performance.now() - start) / 1000).toFixed(4);
      setLines((l: string[]) => [
        ...l,
        ``,
        `real    ${grn("0m" + elapsed + "s")}`,
        `user    0m0.001s`,
        `sys     0m0.000s`,
      ]);
    },
  },

  lolcat: {
    execute: (args, { setLines }) => {
      const text = args.join(" ") || "Hello, World!";
      const colors = [red, grn, yel, mag, cyn];
      const rainbow = text
        .split("")
        .map((c, i) => colors[i % colors.length]!(c))
        .join("");
      setLines((l: string[]) => [...l, rainbow]);
    },
  },
};
