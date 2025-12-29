"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, X, Search, User, Terminal as TerminalIcon, Home, FileText,
    Tv, BookOpen, Gamepad2, Music, ExternalLink, ArrowRight, Sun,
    Moon, Laptop, Github, Linkedin, Mail, Copy, ArrowUp, ArrowDown,
    Maximize, ZoomIn, ZoomOut, RefreshCw, Printer, Code, Keyboard,
    Share2, Bookmark, Clock, QrCode, Calculator, Hash, FileJson,
    Palette, Ruler, Globe, Command as CommandIcon, MonitorPlay, Book
} from "lucide-react";

import { useStore } from "@/lib/store/useStore";
import { routes, directories } from "@/lib/constants";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "@/components/layout/theme";

// --- Hooks ---

export function useCommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
            if (e.key === "Escape") setOpen(false);
        };
        const openEvent = () => setOpen(true);
        document.addEventListener("keydown", down);
        document.addEventListener("open-command-menu", openEvent);
        return () => { document.removeEventListener("keydown", down); document.removeEventListener("open-command-menu", openEvent); };
    }, []);

    const runCommand = useCallback((command: () => unknown) => { setOpen(false); setSearch(""); command(); }, []);
    const scrollToSection = (id: string) => { const element = document.getElementById(id); if (element) element.scrollIntoView({ behavior: "smooth" }); };
    const copyToClipboard = (text: string) => { navigator.clipboard.writeText(text); };

    const commandGroups = useMemo(() => [
        {
            group: "Navigation",
            items: [
                { icon: Home, label: "Home", description: "Go to homepage", action: () => router.push("/") },
                { icon: FileText, label: "Articles", description: "Browse technical articles", action: () => router.push("/articleshelf") },
                { icon: Tv, label: "Anime", description: "View anime watchlist", action: () => router.push("/animeshelf") },
                { icon: BookOpen, label: "Books", description: "Explore reading list", action: () => router.push("/bookshelf") },
                { icon: Gamepad2, label: "Hobbies", description: "Discover hobbies & interests", action: () => router.push("/hobbyshelf") },
            ],
        },
        {
            group: "Quick Actions",
            items: [
                { icon: Copy, label: "Copy Email", description: "Copy email to clipboard", action: () => copyToClipboard(siteConfig.contact.email) },
                { icon: Link2, label: "Copy Page URL", description: "Copy current page URL", action: () => copyToClipboard(window.location.href) },
                { icon: Github, label: "Copy GitHub URL", description: "Copy GitHub profile link", action: () => copyToClipboard(`https://${siteConfig.contact.github}`) },
                { icon: Linkedin, label: "Copy LinkedIn URL", description: "Copy LinkedIn profile link", action: () => copyToClipboard(`https://${siteConfig.contact.linkedin}`) },
                { icon: Copy, label: "Copy Page Title", description: "Copy current page title", action: () => copyToClipboard(document.title) },
                { icon: TerminalIcon, label: "Open Terminal", description: "Toggle terminal view", action: () => document.querySelector<HTMLElement>("[data-terminal-toggle]")?.click() },
                { icon: Music, label: "Toggle Music", description: "Play/pause music player", action: () => document.querySelector<HTMLElement>("[data-music-toggle]")?.click() },
                { icon: ArrowUp, label: "Scroll to Top", description: "Jump to page top", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
                { icon: ArrowDown, label: "Scroll to Bottom", description: "Jump to page bottom", action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }) },
            ],
        },
        {
            group: "Appearance",
            items: [
                { icon: Sun, label: "Light Mode", description: "Switch to light theme", action: () => setTheme("light") },
                { icon: Moon, label: "Dark Mode", description: "Switch to dark theme", action: () => setTheme("dark") },
                { icon: Laptop, label: "System Theme", description: "Match system preferences", action: () => setTheme("system") },
            ],
        },
    ], [router, setTheme]);

    const filteredItems = useMemo(() => commandGroups.flatMap((g) => g.items).filter((item) => item.label.toLowerCase().includes(search.toLowerCase())), [commandGroups, search]);
    useEffect(() => { setSelectedIndex(0); }, [search]);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((prev) => (prev + 1) % filteredItems.length); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length); }
            else if (e.key === "Enter") { e.preventDefault(); if (filteredItems[selectedIndex]) runCommand(filteredItems[selectedIndex].action); }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [open, filteredItems, selectedIndex, runCommand]);

    return { open, setOpen, search, setSearch, selectedIndex, runCommand, commandGroups, filteredItems };
}

// Support components for CommandMenu
function Link2(props: any) { return <ExternalLink {...props} />; }

// --- Components ---

/** Navigation Brand Component */
export function NavBrand() {
    const pathname = usePathname();
    const router = useRouter();
    const { setHeroViewMode } = useStore();
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setHeroViewMode("profile");
        if (pathname === routes.home) {
            document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" }) || window.scrollTo({ top: 0, behavior: "smooth" });
        } else router.push(routes.home);
    };
    return (
        <button onClick={handleClick} className="text-xl font-black tracking-tight flex items-center gap-3 mr-auto group cursor-pointer text-foreground">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-zinc-800 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-black/10">~</div>
            Adarsh
        </button>
    );
}

/** Navigation Links Component */
export function NavLinks({ className, onItemClick }: { className?: string; onItemClick?: () => void }) {
    const pathname = usePathname();
    const links = [
        { href: routes.articleShelf, label: "Articles", icon: FileText },
        { href: routes.bookShelf, label: "Books", icon: Book },
        { href: routes.animeShelf, label: "Anime", icon: MonitorPlay },
        { href: routes.hobbyShelf, label: "Hobby", icon: Palette },
    ];
    return (
        <div className={`flex items-center gap-1 md:gap-2 ${className || ""}`}>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link key={link.href} href={link.href} onClick={onItemClick} className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}>
                        <link.icon size={18} className="transition-transform duration-300 group-hover:scale-110 text-black dark:text-gray-400" />
                        <span className={`text-[11px] uppercase tracking-widest whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}>{link.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}

/** Navigation Actions Component */
export function NavActions({ isMounted }: { isMounted: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-all border border-foreground/10" onClick={() => document.dispatchEvent(new Event("open-command-menu"))} aria-label="Search" title="Search (⌘K)">
                {isMounted ? (
                    <>
                        <Search size={22} className="text-black dark:text-gray-400" />
                        <span className="hidden md:inline text-sm text-foreground/50">Search</span>
                        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-foreground/5 border border-foreground/10 rounded"><span className="text-xs">⌘</span>K</kbd>
                    </>
                ) : <div className="w-5 h-5" />}
            </button>
            <ThemeToggle />
        </div>
    );
}

/** Mobile Dock Component */
export function MobileDock() {
    const pathname = usePathname();
    const navItems = [
        { icon: Home, label: "Home", path: routes.home },
        { icon: FileText, label: "Articles", path: routes.articleShelf },
        { icon: BookOpen, label: "Books", path: routes.bookShelf },
        { icon: Tv, label: "Anime", path: routes.animeShelf },
        { icon: Gamepad2, label: "Hobbies", path: routes.hobbyShelf },
    ];
    return (
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px]">
            <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 rounded-t-[32px] shadow-xl px-6 py-4 flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.label} href={item.path} className="relative flex flex-col items-center gap-1 group">
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200"}`}>{<item.icon size={20} />}</div>
                            {isActive && <motion.div layoutId="dock-dot" className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
                        </Link>
                    );
                })}
                <Link href={routes.music} className="relative flex flex-col items-center gap-1 group">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${pathname === routes.music ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 hover:text-black dark:hover:text-gray-200"}`}><Music size={20} /></div>
                    {pathname === routes.music && <motion.div layoutId="dock-dot" className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
                </Link>
            </div>
        </div>
    );
}

/** Command Menu Sub-components */
function CommandMenuInput({ value, onChange }: any) {
    return (
        <div className="flex items-center border-b border-gray-200 dark:border-white/10 px-4 h-14">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search for anything..." className="w-full bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder:text-gray-400" autoFocus />
            <span className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 font-mono">ESC</span>
        </div>
    );
}

function CommandMenuItem({ item, isSelected, onSelect }: any) {
    return (
        <button onClick={() => onSelect(item.action)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${isSelected ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-lg" : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            <div className="flex items-center gap-3 flex-1">
                <item.icon size={18} className={isSelected ? "text-white dark:text-black" : "text-gray-500"} />
                <div className="flex flex-col items-start gap-0.5"><span className="font-medium">{item.label}</span>{item.description && <span className={`text-xs ${isSelected ? "text-white/90" : "text-gray-700 dark:text-gray-300"}`}>{item.description}</span>}</div>
            </div>
            {isSelected && <div className="flex items-center gap-1.5 opacity-80"><span className="text-[10px] font-mono">Enter</span><ArrowRight size={14} /></div>}
        </button>
    );
}

function CommandMenuItems({ groups, search, selectedIndex, filteredItems, onSelect }: any) {
    if (filteredItems.length === 0) return <div className="py-12 text-center text-gray-500 text-sm">No results found for &ldquo;{search}&rdquo;</div>;
    return (
        <div className="space-y-4">
            {groups.map((group: any) => {
                const groupFiltered = group.items.filter((item: any) => item.label.toLowerCase().includes(search.toLowerCase()));
                if (groupFiltered.length === 0) return null;
                return (
                    <div key={group.group} className="space-y-1">
                        <div className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{group.group}</div>
                        {groupFiltered.map((item: any) => <CommandMenuItem key={item.label} item={item} isSelected={filteredItems.indexOf(item) === selectedIndex} onSelect={onSelect} />)}
                    </div>
                );
            })}
        </div>
    );
}

/** Command Menu Main Component */
export function CommandMenu() {
    const { open, setOpen, search, setSearch, selectedIndex, runCommand, commandGroups, filteredItems } = useCommandMenu();
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto" onClick={() => setOpen(false)} />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="w-full max-w-[600px] bg-white dark:bg-[#0a0a0a] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden pointer-events-auto">
                        <CommandMenuInput value={search} onChange={setSearch} />
                        <div className="max-h-[60vh] overflow-y-auto py-2 px-2 custom-scrollbar"><CommandMenuItems groups={commandGroups} search={search} selectedIndex={selectedIndex} filteredItems={filteredItems} onSelect={runCommand} /></div>
                        <div className="bg-gray-50 dark:bg-white/5 px-4 h-10 flex items-center justify-between text-[11px] text-gray-500 border-t"><div className="flex gap-4"><span>↑↓ Navigate</span><span>↵ Select</span></div><div><CommandIcon size={12} className="inline mr-1" />K</div></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

/** Footer Component */
export function Footer() {
    return (
        <footer className="hidden md:block relative py-16 border-t border-foreground/5 mt-auto font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.02] via-transparent to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-6 backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border border-foreground/10 p-6 shadow-2xl mb-8">
                    <Link href="/" scroll={false} className="group flex items-center gap-2 text-foreground/40 hover:text-foreground"><Home size={18} className="text-black dark:text-gray-400 group-hover:scale-110" /><span className="font-black uppercase tracking-widest text-xs">Home</span></Link>
                    <div className="w-px h-6 bg-foreground/10" />
                    <NavLinks />
                </div>
                <p className="text-gray-500 font-medium text-center text-[10px] opacity-60 pb-8 tracking-widest uppercase">©{new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </footer>
    );
}

/** Main Navbar Component */
export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            setIsScrolled(currentScroll > 20);
        };
        window.addEventListener("scroll", updateScroll);
        updateScroll();
        return () => window.removeEventListener("scroll", updateScroll);
    }, [setIsMounted]);

    return (
        <>
            <div className="h-20" />
            <div className="fixed top-0 left-0 right-0 z-[70] h-0.5 bg-transparent pointer-events-none">
                <div className="h-full bg-slate-900 dark:bg-slate-200 transition-all duration-300 shadow-sm" style={{ width: `${scrollProgress}%` }} />
            </div>
            <nav className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
                <div className={`mx-auto px-4 transition-all duration-500 ${isScrolled ? "py-3" : "py-4"}`}>
                    <div className={`max-w-7xl mx-auto backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border transition-all duration-700 ${isScrolled ? "border-foreground/10 shadow-2xl" : "border-foreground/5 shadow-xl"}`}>
                        <div className="px-6 flex items-center justify-between h-20">
                            <NavBrand />
                            <div className="hidden md:flex items-center gap-1"><NavLinks /></div>
                            <div className="hidden md:flex items-center gap-2"><NavActions isMounted={isMounted} /></div>
                            <div className="md:hidden flex items-center gap-2">
                                <NavActions isMounted={isMounted} />
                                <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95" onClick={() => setIsNavbarActive(!isNavbarActive)}>{isNavbarActive ? <X size={24} /> : <Menu size={24} />}</button>
                            </div>
                        </div>
                        {isNavbarActive && <div className="md:hidden border-t border-gray-200/50 dark:border-white/10 p-6"><NavLinks className="flex flex-col gap-1" onItemClick={() => setIsNavbarActive(false)} /></div>}
                    </div>
                </div>
            </nav>
        </>
    );
}
