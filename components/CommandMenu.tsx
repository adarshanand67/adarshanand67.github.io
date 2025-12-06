"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Laptop,
    Moon,
    Sun,
    FileText,
    Home,
    BookOpen,
    Tv,
    Search,
    Mail,
    Github,
    Linkedin
} from "lucide-react";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { setTheme } = useTheme();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
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

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-2 z-[9999]"
            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        >
            <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3 pb-2 mb-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <Command.Input
                    placeholder="Type a command or search..."
                    className="w-full bg-transparent border-none outline-none text-sm h-8 dark:text-white placeholder:text-gray-400"
                />
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden px-1 scroll-py-1">
                <Command.Empty className="py-6 text-center text-sm text-gray-500">
                    No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-medium text-gray-400 mb-2 px-2">
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/blogs"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        Writings
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/animeshelf"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Tv className="w-4 h-4" />
                        Anime Shelf
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => router.push("/bookshelf"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <BookOpen className="w-4 h-4" />
                        Bookshelf
                    </Command.Item>
                </Command.Group>

                <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

                <Command.Group heading="Theme" className="text-xs font-medium text-gray-400 mb-2 px-2">
                    <Command.Item
                        onSelect={() => runCommand(() => setTheme("light"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Sun className="w-4 h-4" />
                        Light Mode
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setTheme("dark"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Moon className="w-4 h-4" />
                        Dark Mode
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setTheme("system"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Laptop className="w-4 h-4" />
                        System Theme
                    </Command.Item>
                </Command.Group>

                <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

                <Command.Group heading="Socials" className="text-xs font-medium text-gray-400 mb-2 px-2">
                    <Command.Item
                        onSelect={() => runCommand(() => window.open("https://github.com/adarshanand67", "_blank"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => window.open("https://linkedin.com/in/adarshanand67", "_blank"))}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => {
                            window.open("mailto:adarshan20302@gmail.com");
                        })}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Email
                    </Command.Item>
                </Command.Group>
            </Command.List>

            <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2 px-2 flex justify-between items-center text-[10px] text-gray-400">
                <span>Open with ⌘ K</span>
                <span>Select with ↵</span>
            </div>
        </Command.Dialog>
    );
}
