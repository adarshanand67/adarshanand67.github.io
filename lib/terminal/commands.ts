import { Command, CommandContext } from "./types";
import { DIRECTORY_MAP, DIRECTORIES, CONTACT_INFO, SYSTEM_STATS, WHOAMI_INFO } from "@/lib/constants";

export const commands: Record<string, Command> = {
    help: {
        name: "help",
        description: "List available commands",
        execute: (_, { setLines }) => {
            const helpText = [
                "Available commands:",
                "  ls              - List directories",
                "  cd [dir]        - Change directory",
                "  open [dir]      - Open directory",
                "  whoami          - Display profile info",
                "  theme [mode]    - Set theme (light/dark/system)",
                "  date            - Show current date/time",
                "  clear / cls     - Clear terminal",
                "  sudo            - Execute with superuser privileges",
                "  contact         - Show contact info",
                "  fetch           - Display system information",
                "  matrix          - Toggle Matrix Rain effect",
                "  music [cmd]     - Control music (play/pause/next/prev)",
                "  echo [text]     - Print text to terminal",
                "  pwd             - Print working directory",
                "  cat [file]      - Display file contents",
                "  skills          - Display technical skills",
                "  projects        - View featured projects",
                "  hack            - Initiate hacking sequence 😎",
            ];
            setLines((prev) => [...prev, ...helpText]);
        },
    },
    ls: {
        name: "ls",
        description: "List directories",
        execute: (_, { setLines }) => {
            setLines((prev) => [
                ...prev,
                ...DIRECTORIES.map(d => `drwxr-xr-x  ${d}/`)
            ]);
        },
    },
    cd: {
        name: "cd",
        description: "Change directory",
        execute: (args, { setLines, router }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: cd [directory]"]);
                return;
            }
            const dir = (args[0] || '').replace(/^\.\//, "").replace(/\/$/, "").replace("shelf", "");
            if (DIRECTORY_MAP[dir]) {
                setLines((prev) => [...prev, `Navigating to ${DIRECTORY_MAP[dir]}...`]);
                router.push(DIRECTORY_MAP[dir]!);
            } else {
                setLines((prev) => [...prev, `Directory not found: ${args[0] || ''}`]);
            }
        },
    },
    open: {
        name: "open",
        description: "Open directory",
        execute: (args, ctx) => commands.cd!.execute(args, ctx),
    },
    whoami: {
        name: "whoami",
        description: "Display profile info",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, ...WHOAMI_INFO]);
        },
    },
    date: {
        name: "date",
        description: "Show current date/time",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, new Date().toString()]);
        },
    },
    theme: {
        name: "theme",
        description: "Set theme (light/dark/system)",
        execute: (args, { setLines, setTheme }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: theme [light|dark|system]"]);
            } else {
                const mode = (args[0] || '').toLowerCase();
                if (["light", "dark", "system"].includes(mode)) {
                    setTheme(mode);
                    setLines((prev) => [...prev, `Theme set to ${mode}`]);
                } else {
                    setLines((prev) => [...prev, `Invalid theme: ${mode}. Use light, dark, or system.`]);
                }
            }
        },
    },
    sudo: {
        name: "sudo",
        description: "Execute with superuser privileges",
        execute: (_, { setPasswordMode, setLines }) => {
            setPasswordMode(true);
            setLines((prev) => [...prev, "Password:"]);
        },
    },
    matrix: {
        name: "matrix",
        description: "Toggle Matrix Rain effect",
        execute: (_, { toggleMatrix }) => {
            toggleMatrix();
        },
    },
    music: {
        name: "music",
        description: "Control music",
        execute: (args, { setLines, setIsPlaying, nextTrack, prevTrack, toggleMute }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: music [play|pause|next|prev|mute]"]);
            } else {
                const action = (args[0] || '').toLowerCase();
                switch (action) {
                    case "play":
                        setIsPlaying(true);
                        setLines((prev) => [...prev, "Music: Playing"]);
                        break;
                    case "pause":
                        setIsPlaying(false);
                        setLines((prev) => [...prev, "Music: Paused"]);
                        break;
                    case "next":
                        nextTrack();
                        setLines((prev) => [...prev, "Music: Next Track"]);
                        break;
                    case "prev":
                        prevTrack();
                        setLines((prev) => [...prev, "Music: Previous Track"]);
                        break;
                    case "mute":
                        toggleMute();
                        setLines((prev) => [...prev, "Music: Mute Toggled"]);
                        break;
                    default:
                        setLines((prev) => [...prev, `Invalid music command: ${action}`]);
                }
            }
        },
    },
    fetch: {
        name: "fetch",
        description: "Display system information",
        execute: (_, { setLines, isMatrixEnabled }) => {
            setLines((prev) => [...prev, ...SYSTEM_STATS(isMatrixEnabled)]);
        },
    },
    rm: {
        name: "rm",
        description: "Remove file",
        execute: (args, { setLines }) => {
            if (args.includes("-rf") && args.includes("/")) {
                setLines((prev) => [...prev, "Nice try, but I need this website."]);
            } else {
                setLines((prev) => [...prev, "Permission denied."]);
            }
        },
    },
    clear: {
        name: "clear",
        description: "Clear terminal",
        execute: (_, { setLines, setInput }) => {
            setLines([]);
            setInput("");
            // Logic for clear is special in component mostly, but here we can reset lines
        },
    },
    cls: {
        name: "cls",
        description: "Clear screen (alias)",
        execute: (args, ctx) => commands.clear!.execute(args, ctx),
    },
    contact: {
        name: "contact",
        description: "Show contact info",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, ...CONTACT_INFO]);
        },
    },
    echo: {
        name: "echo",
        description: "Print text to terminal",
        execute: (args, { setLines }) => {
            setLines((prev) => [...prev, args.join(" ")]);
        },
    },
    pwd: {
        name: "pwd",
        description: "Print working directory",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "/home/adarsh"]);
        },
    },
    cat: {
        name: "cat",
        description: "Display file contents",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: cat [file]"]);
                return;
            }
            const file = args[0]?.toLowerCase();
            if (file === "readme.md" || file === "readme") {
                setLines((prev) => [...prev,
                    "# Adarsh Anand - Portfolio",
                    "",
                    "Software Development Engineer @Trellix",
                    "Specializing in C++, Data Security, and System Programming",
                    "",
                    "Type 'help' for available commands"
                ]);
            } else if (file === "skills.txt" || file === "skills") {
                setLines((prev) => [...prev,
                    "Languages: C++, Python, JavaScript, TypeScript, Rust",
                    "Technologies: Next.js, React, Node.js, Docker",
                    "Security: Intel SGX, TDX, Cryptography, DLP",
                    "Tools: Git, Linux, LLVM, Fuzzing"
                ]);
            } else {
                setLines((prev) => [...prev, `cat: ${args[0]}: No such file or directory`]);
            }
        },
    },
    history: {
        name: "history",
        description: "Show command history",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "Use arrow keys (↑/↓) to navigate command history"]);
        },
    },
    skills: {
        name: "skills",
        description: "Display technical skills",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "Technical Skills:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "Languages:    C++ | Python | Rust | TypeScript",
                "Security:     Intel SGX/TDX | Cryptography | DLP",
                "Systems:      Linux | Docker | LLVM | Fuzzing",
                "Web:          Next.js | React | Node.js",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            ]);
        },
    },
    projects: {
        name: "projects",
        description: "View featured projects",
        execute: (_, { setLines, router }) => {
            setLines((prev) => [...prev,
                "Featured Projects:",
                "  • Intel SGX Gramine - Confidential Computing",
                "  • Intel TDX FDE - Full Disk Encryption",
                "  • Trellix DLP - Data Loss Prevention",
                "",
                "Type 'cd projects' to see all projects"
            ]);
        },
    },
    neofetch: {
        name: "neofetch",
        description: "Display system info (alias for fetch)",
        execute: (args, ctx) => commands.fetch!.execute(args, ctx),
    },
    exit: {
        name: "exit",
        description: "Close terminal (just kidding)",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "Nice try! This terminal is here to stay 😎"]);
        },
    },
    hack: {
        name: "hack",
        description: "Initiate hacking sequence",
        execute: (_, { setLines, toggleMatrix }) => {
            setLines((prev) => [...prev,
                "Initializing hacking sequence...",
                "Bypassing firewall... ✓",
                "Cracking encryption... ✓",
                "Accessing mainframe... ✓",
                "Just kidding! Try 'sudo' for real power 😄"
            ]);
            setTimeout(() => toggleMatrix(), 1000);
        },
    },
};
