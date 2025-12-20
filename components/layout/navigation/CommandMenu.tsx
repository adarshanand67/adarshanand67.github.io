"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Search,
    Home,
    FileText,
    BookOpen,
    Tv,
    Sparkles,
    Gamepad2,
    Sun,
    Moon,
    Laptop,
    Github,
    Linkedin,
    Mail
} from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { siteConfig } from "@/lib/config";

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { setTheme } = useTheme();
    const { toggleMatrix, toggleHobbiesModal } = useStore();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        const openEvent = () => setOpen(true);
        document.addEventListener("keydown", down);
        document.addEventListener("open-command-menu", openEvent);
        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("open-command-menu", openEvent);
        };
    }, []);

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false);
        setSearch("");
        command();
    }, []);

    if (!open) return null;

    const commands = [
        { icon: Home, label: "Home", action: () => router.push("/") },
        { icon: FileText, label: "Blogshelf", action: () => router.push("/blogs") },
        { icon: FileText, label: "Papershelf", action: () => router.push("/papershelf") },
        { icon: Tv, label: "Animeshelf", action: () => router.push("/animeshelf") },
        { icon: BookOpen, label: "Bookshelf", action: () => router.push("/bookshelf") },
        { icon: Sparkles, label: "Toggle Matrix Rain", action: toggleMatrix },
        { icon: Gamepad2, label: "View Hobbies", action: toggleHobbiesModal },
        { icon: Sun, label: "Light Mode", action: () => setTheme("light") },
        { icon: Moon, label: "Dark Mode", action: () => setTheme("dark") },
        { icon: Laptop, label: "System Theme", action: () => setTheme("system") },
        { icon: Github, label: "GitHub", action: () => window.open(`https://${siteConfig.contact.github}`, "_blank") },
        { icon: Linkedin, label: "LinkedIn", action: () => window.open(`https://${siteConfig.contact.linkedin}`, "_blank") },
        { icon: Mail, label: "Contact Email", action: () => window.open(`mailto:${siteConfig.contact.email}`) },
    ];

    const filtered = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[640px]">
                <div className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-800 p-2">
                    <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3 pb-2 mb-2">
                        <Search className="w-4 h-4 text-gray-600 dark:text-gray-300 mr-2" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Type a command or search..."
                            className="w-full bg-transparent border-none outline-none text-sm h-8 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
                            autoFocus
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto px-1">
                        {filtered.length === 0 ? (
                            <div className="py-6 text-center text-sm text-gray-700 dark:text-gray-300">
                                No results found.
                            </div>
                        ) : (
                            filtered.map((cmd, i) => (
                                <button
                                    key={i}
                                    onClick={() => runCommand(cmd.action)}
                                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                                >
                                    <cmd.icon className="w-4 h-4" />
                                    {cmd.label}
                                </button>
                            ))
                        )}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2 px-2 flex justify-between items-center text-[10px] text-gray-400">
                        <span>Open with ⌘ K</span>
                        <span>Select with ↵</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
