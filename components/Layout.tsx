"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { useMounted } from "@/lib/hooks/useMounted";
import { GlitchLink } from "@/components/UI";
import { ROUTES } from "@/lib/constants";
import * as lucideReact from "lucide-react";
import {
    ArrowUp,
    Search,
    Sun,
    Moon,
    Laptop,
    FileText,
    Home,
    BookOpen,
    Tv,
    Mail,
    Github,
    Linkedin,
    Sparkles,
    Gamepad2,
} from "lucide-react";
import { Command } from "cmdk";

// --- ThemeProvider ---
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// --- ThemeToggle ---
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { isMounted, setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    if (!isMounted) {
        return (
            <button
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
            >
                <div className="h-5 w-5" />
            </button>
        );
    }
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-900 dark:text-gray-100" />
            <Moon
                className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-900 dark:text-gray-100"
                style={{ marginTop: "-20px" }}
            />
        </button>
    );
}

// --- BackToTop ---
export function BackToTop() {
    const { isBackToTopVisible, setIsBackToTopVisible } = useStore();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsBackToTopVisible(true);
            } else {
                setIsBackToTopVisible(false);
            }
        };
        // Initial check
        toggleVisibility();

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [setIsBackToTopVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isBackToTopVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 md:p-5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all z-50 font-mono text-sm hover:scale-110"
            aria-label="Back to top"
        >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
        </button>
    );
}

// --- CommandMenu ---
export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { setTheme } = useTheme();
    const {
        toggleMatrix,
        toggleHobbiesModal,
    } = useStore();
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
        const openEvent = () => {
            setOpen(true);
        };
        document.addEventListener("keydown", down);
        document.addEventListener("open-command-menu", openEvent);
        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("open-command-menu", openEvent);
        };
    }, [open]);

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[640px]">
                <Command
                    className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-800 p-2 overflow-hidden"
                    loop
                >
                    <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3 pb-2 mb-2">
                        <Search className="w-4 h-4 text-gray-600 dark:text-gray-300 mr-2" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="w-full bg-transparent border-none outline-none text-sm h-8 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
                            autoFocus
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden px-1 scroll-py-1">
                        <Command.Empty className="py-6 text-center text-sm text-gray-700 dark:text-gray-300">
                            No results found.
                        </Command.Empty>
                        <Command.Group
                            heading="Navigation"
                            className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2"
                        >
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
                                Blogshelf
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/papershelf"))}
                                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                Papershelf
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/animeshelf"))}
                                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                            >
                                <Tv className="w-4 h-4" />
                                Animeshelf
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
                        <Command.Group heading="System Actions" className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2">
                            <Command.Item
                                onSelect={() => runCommand(toggleMatrix)}
                                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                            >
                                <Sparkles className="w-4 h-4" />
                                Toggle Matrix Rain
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(toggleHobbiesModal)}
                                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                            >
                                <Gamepad2 className="w-4 h-4" />
                                View Hobbies
                            </Command.Item>
                        </Command.Group>
                        <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                        <Command.Group heading="Theme" className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2">
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
                        <Command.Group
                            heading="Socials"
                            className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2"
                        >
                            <Command.Item
                                onSelect={() =>
                                    runCommand(() => window.open("https://github.com/adarshanand67", "_blank"))
                                }
                                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </Command.Item>
                            <Command.Item
                                onSelect={() =>
                                    runCommand(() => window.open("https://linkedin.com/in/adarshanand67", "_blank"))
                                }
                                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                            </Command.Item>
                            <Command.Item
                                onSelect={() =>
                                    runCommand(() => {
                                        window.open("mailto:adarshan20302@gmail.com");
                                    })
                                }
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
                </Command>
            </div>
        </div>
    );
}

// --- Footer ---
export function Footer() {
    return (
        <footer className="relative py-16 border-t border-gray-200/50 dark:border-gray-800/50 mt-auto font-mono overflow-hidden">
            { }
            <div className="absolute inset-0 bg-gradient-to-t from-green-50/30 via-transparent to-transparent dark:from-green-950/20 dark:via-transparent dark:to-transparent pointer-events-none"></div>
            { }
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>
            { }
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 glass rounded-2xl p-4 shadow-sm mx-auto w-fit">
                    { }
                    <Link
                        href="/"
                        scroll={false}
                        className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-sm"
                        title="Back to Home"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="font-medium hidden sm:inline-block">Home</span>
                    </Link>
                    { }
                    <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
                    { }
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { href: "/articleshelf", label: "Articles", icon: "📝" },
                            { href: "/bookshelf", label: "Books", icon: "📚" },
                            { href: "/animeshelf", label: "Anime", icon: "📺" },
                            { href: "/hobbyshelf", label: "Hobby", icon: "🎮" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                            >
                                <span className="text-xs opacity-70">{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                    { }
                    <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
                </div>
                { }
                <p className="text-gray-500 dark:text-gray-400 font-medium text-center text-xs opacity-80 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                    <span className="mr-1">©</span>
                    {new Date().getFullYear()}
                    <span className="ml-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
                        Adarsh Anand
                    </span>
                </p>
            </div>
        </footer>
    );
}

// --- Navbar ---
export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    return (
        <>
            <div className="h-24" /> {/* Spacer */}
            <nav
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="w-full max-w-5xl glass rounded-2xl shadow-sm transition-all duration-300">
                    <div className="px-4 md:px-6">
                        <div className="flex items-center h-14">
                            {/* Hamburger Menu (Mobile) */}
                            <button
                                className={`md:hidden p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isNavbarActive ? "is-active" : ""}`}
                                aria-label="menu"
                                aria-expanded={isNavbarActive}
                                onClick={() => {
                                    setIsNavbarActive(!isNavbarActive);
                                }}
                            >
                                <div className="w-5 h-4 relative flex flex-col justify-between">
                                    <span
                                        className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isNavbarActive ? "rotate-45 translate-y-1.5" : ""}`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isNavbarActive ? "opacity-0" : ""}`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isNavbarActive ? "-rotate-45 -translate-y-2" : ""}`}
                                    />
                                </div>
                            </button>
                            {/* Logo */}
                            <Link
                                href={ROUTES.HOME}
                                className="text-lg font-bold text-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2 font-mono whitespace-nowrap mr-auto md:mr-0"
                            >
                                ~/
                            </Link>
                            {/* Theme Toggle (Mobile) */}
                            <div className="md:hidden">
                                <ThemeToggle />
                            </div>
                            {/* Menu Items (Desktop) */}
                            <div className="hidden md:flex md:items-center md:ml-auto gap-1 text-sm font-medium">
                                <GlitchLink
                                    href={ROUTES.ARTICLE_SHELF}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Articleshelf
                                </GlitchLink>
                                <GlitchLink
                                    href={ROUTES.ANIME_SHELF}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Animeshelf
                                </GlitchLink>
                                <GlitchLink
                                    href={ROUTES.BOOK_SHELF}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Bookshelf
                                </GlitchLink>
                                <GlitchLink
                                    href={ROUTES.HOBBY_SHELF}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Hobbyshelf
                                </GlitchLink>
                                {/* Search & Theme */}
                                <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-2"></div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground/80 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                        onClick={() => {
                                            document.dispatchEvent(new Event("open-command-menu"));
                                        }}
                                        aria-label="Search"
                                    >
                                        {isMounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                                    </button>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                        {/* Mobile Menu Content */}
                        <div
                            id="menu"
                            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isNavbarActive ? "max-h-80 pb-6 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-2 text-sm font-mono pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
                                <Link
                                    href={ROUTES.ARTICLE_SHELF}
                                    className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                    onClick={() => setIsNavbarActive(false)}
                                >
                                    Articleshelf
                                </Link>
                                <Link
                                    href={ROUTES.ANIME_SHELF}
                                    className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                    onClick={() => setIsNavbarActive(false)}
                                >
                                    Animeshelf
                                </Link>
                                <Link
                                    href={ROUTES.BOOK_SHELF}
                                    className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                    onClick={() => setIsNavbarActive(false)}
                                >
                                    Bookshelf
                                </Link>
                                <Link
                                    href={ROUTES.HOBBY_SHELF}
                                    className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                    onClick={() => setIsNavbarActive(false)}
                                >
                                    Hobbyshelf
                                </Link>
                                <div className="flex items-center gap-2 pt-2 w-full justify-center">
                                    <button
                                        onClick={() => {
                                            document.dispatchEvent(new Event("open-command-menu"));
                                            setIsNavbarActive(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                    >
                                        {isMounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

// --- GlobalEffect ---
export const GlobalEffect = () => {
    const { setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    return null;
};

// --- ClientIcons ---
function createClientIcon(Icon: React.ComponentType<lucideReact.LucideProps>) {
    return function ClientIcon(props: lucideReact.LucideProps) {
        const mounted = useMounted();
        if (!mounted) return <div className={props.className} aria-hidden="true" />;
        return <Icon {...props} />;
    };
}
export const ClientLinkedin = createClientIcon(lucideReact.Linkedin);
export const ClientGithub = createClientIcon(lucideReact.Github);
export const ClientMail = createClientIcon(lucideReact.Mail);
