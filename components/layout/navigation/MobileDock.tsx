"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Tv, BookOpen, Music } from "lucide-react";
import { routes } from "@/lib/constants";
import { useStore } from "@/lib/store/useStore";
import { motion } from "framer-motion";

const navItems = [
    { icon: Home, label: "Home", path: routes.home },
    { icon: FileText, label: "Articles", path: routes.articleShelf },
    { icon: BookOpen, label: "Books", path: routes.bookShelf },
    { icon: Tv, label: "Anime", path: routes.animeShelf },
];

/**
 * Mobile Dock Component - floating bottom navigation for mobile devices.
 * Features glassmorphic design with active state indicators and search button.
 * Only visible on mobile screens (md breakpoint and below).
 * @component
 */
export function MobileDock() {
    const pathname = usePathname();

    const { toggleMusicPlayer, isPlaying } = useStore();

    return (
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px]">
            <div className="glass-apple dark:bg-black/80 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 rounded-t-[32px] shadow-2xl px-6 py-4 flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            className="relative flex flex-col items-center gap-1 group"
                        >
                            <div
                                className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200"}`}
                            >
                                <item.icon size={20} />
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="dock-dot"
                                    className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
                <button
                    onClick={toggleMusicPlayer}
                    className={`flex flex-col items-center gap-1 transition-all p-2 rounded-xl ${isPlaying ? "text-blue-500 animate-pulse" : "text-black dark:text-gray-400 hover:text-black dark:hover:text-gray-200"}`}
                >
                    <Music size={22} />
                </button>
            </div>
        </div>
    );
}
