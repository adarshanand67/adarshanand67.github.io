import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and tools I use daily.",
};

const sections = [
  {
    title: "Hardware",
    items: [
      {
        name: "MacBook Air 15\" M4",
        detail:
          "10-core CPU, 16 GB RAM. Primary machine for everything outside Windows development. Handles compiling, running containers, and day-to-day work without complaint.",
      },
      {
        name: "Work Machine (Windows)",
        detail:
          "Dell workstation running Windows 11 at Trellix. Used for C++ kernel-mode development, DLP testing, and anything that needs a real Windows environment.",
      },
      {
        name: "Displays",
        detail: "Built-in Retina display (1440×932). No external monitors — I travel light.",
      },
    ],
  },
  {
    title: "Editor & Terminal",
    items: [
      {
        name: "VS Code",
        detail:
          "Daily driver for TypeScript, Python, and web work. Extensions: ESLint, Prettier, GitLens, Error Lens, Tailwind CSS IntelliSense.",
      },
      {
        name: "Visual Studio / CLion",
        detail:
          "Visual Studio 2022 for Windows C++ and kernel development at Trellix. CLion occasionally for cross-platform C++ work.",
      },
      {
        name: "JetBrains Mono",
        detail:
          "Font of choice in every editor and terminal. Ligatures on.",
      },
      {
        name: "iTerm2 + zsh",
        detail: "iTerm2 with a minimal prompt. zsh with a few aliases and nothing exotic.",
      },
    ],
  },
  {
    title: "Dev Tools",
    items: [
      {
        name: "Docker",
        detail: "All local services run in containers. Avoids polluting the host system.",
      },
      {
        name: "GitHub Actions",
        detail: "CI/CD for every project. This site deploys via Actions on push to main.",
      },
      {
        name: "Homebrew",
        detail: "295 packages and growing. The only sane way to manage tools on macOS.",
      },
      {
        name: "WinDbg",
        detail: "Kernel debugging on Windows. Indispensable for driver and minifilter work.",
      },
    ],
  },
  {
    title: "Productivity",
    items: [
      {
        name: "Notion",
        detail: "Notes, reading lists, task tracking. Single source of truth for personal knowledge.",
      },
      {
        name: "Arc Browser",
        detail: "Spaces for separating work and personal contexts. The tab management alone makes it worth switching.",
      },
      {
        name: "Raycast",
        detail: "Spotlight replacement. Clipboard history, window management, and custom extensions.",
      },
    ],
  },
  {
    title: "This Site",
    items: [
      {
        name: "Next.js 16 + TypeScript",
        detail: "Static export deployed to GitHub Pages. App Router, server components.",
      },
      {
        name: "Tailwind CSS v4",
        detail: "CSS-first config, no tailwind.config.js. Custom design tokens in CSS variables.",
      },
      {
        name: "CSS animations",
        detail: "Custom keyframe animations defined in globals.css — no runtime animation library.",
      },
      {
        name: "Zustand",
        detail: "Global state for music player, terminal, and UI preferences.",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="section max-w-3xl mx-auto px-4 mt-12 mb-16 font-mono">
      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
        $ cat ~/dotfiles/setup.md
      </p>
      <h1 className="text-3xl font-black tracking-tight mb-2">Uses</h1>
      <p className="text-sm text-foreground/50 mb-10">
        Hardware, software, and tools I use daily. Inspired by{" "}
        <a
          href="https://uses.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          uses.tech
        </a>
        .
      </p>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="border-l-2 border-foreground/10 pl-4"
                >
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
