"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon, Search, Book, FileText, MonitorPlay, Gamepad2, BarChart2, X, Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/features";
import { useStore } from "@/lib/store";
import { routes } from "@/lib/constants";
import { siteConfig } from "@/lib/config";

type NavItem = { href: string; label: string; icon: LucideIcon; desc: string };

const CONTENT_ITEMS: NavItem[] = [
  { href: routes.articles, label: "Articles", icon: FileText, desc: "Writing & thoughts" },
  { href: routes.books, label: "Books", icon: Book, desc: "Reading list" },
];

const EXPLORE_ITEMS: NavItem[] = [
  { href: routes.anime, label: "Anime", icon: MonitorPlay, desc: "Watchlist" },
  { href: routes.hobbies, label: "Hobbies", icon: Gamepad2, desc: "What I do for fun" },
  { href: routes.stats, label: "Stats", icon: BarChart2, desc: "By the numbers" },
];

function Dropdown({ label, items, onItemClick }: { label: string; items: NavItem[]; onItemClick?: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = items.some((i) => pathname === i.href);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 text-[11px] uppercase tracking-widest font-bold ${isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}
      >
        {label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 w-48 glass rounded-2xl border border-foreground/10 shadow-2xl overflow-hidden z-50 animate-fade-in">
          {items.map((item) => {
            const isItemActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setOpen(false); onItemClick?.(); }}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-foreground/5 transition-colors ${isItemActive ? "text-foreground" : "text-foreground/70"}`}
              >
                <item.icon size={15} className="shrink-0 text-foreground/50" />
                <div>
                  <p className={`text-xs font-bold ${isItemActive ? "font-black" : ""}`}>{item.label}</p>
                  <p className="text-[10px] text-foreground/40">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
      {siteConfig.author.name.split(" ")[0]}
    </button>
  );
}

export function NavLinks({ className, onItemClick }: { className?: string; onItemClick?: () => void }) {
  const pathname = usePathname();
  const allItems = [...CONTENT_ITEMS, ...EXPLORE_ITEMS];
  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      {allItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive ? "text-foreground bg-foreground/5" : "text-foreground/60 hover:text-foreground"}`}
          >
            <item.icon size={16} className="text-foreground/50" />
            <span className={`text-sm ${isActive ? "font-black" : "font-semibold"}`}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function NavActions({ isMounted }: { isMounted: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="flex items-center gap-2 px-3 h-9 rounded-xl hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-all border border-foreground/10"
        onClick={() => document.dispatchEvent(new Event("open-command-menu"))}
        aria-label="Search (⌘K)"
        title="Search (⌘K)"
      >
        {isMounted ? (
          <>
            <Search size={16} className="text-foreground/60" />
            <span className="hidden md:inline text-xs text-foreground/50">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-foreground/5 border border-foreground/10 rounded"><span className="text-xs">⌘</span>K</kbd>
          </>
        ) : (
          <div className="w-4 h-4" />
        )}
      </button>
      <ThemeToggle />
    </div>
  );
}

export function Navbar() {
  const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const update = () => {
      const s = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h) setScrollProgress((s / h) * 100);
      setIsScrolled(s > 20);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [setIsMounted]);

  return (
    <>
      <div className="hidden md:block h-16" />
      <div className="fixed top-0 left-0 right-0 z-[70] h-0.5 bg-transparent pointer-events-none">
        <div className="h-full bg-slate-900 dark:bg-slate-200 transition-[width] duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>
      <nav aria-label="Main navigation" className="hidden md:block fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
        <div className={`mx-auto px-4 transition-all duration-300 ${isScrolled ? "py-2" : "py-3"}`}>
          <div className={`max-w-6xl mx-auto backdrop-blur-2xl bg-white/60 dark:bg-black/50 rounded-2xl border transition-all duration-300 ${isScrolled ? "border-foreground/10 shadow-xl" : "border-foreground/5 shadow-lg"}`}>
            <div className="px-5 flex items-center justify-between h-14">
              <NavBrand />
              <div className="hidden md:flex items-center gap-0.5">
                <Dropdown label="Content" items={CONTENT_ITEMS} />
                <Dropdown label="Explore" items={EXPLORE_ITEMS} />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <NavActions isMounted={isMounted} />
              </div>
              <div className="md:hidden flex items-center gap-2">
                <NavActions isMounted={isMounted} />
                <button
                  aria-label={isNavbarActive ? "Close menu" : "Open menu"}
                  aria-expanded={isNavbarActive}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95"
                  onClick={() => setIsNavbarActive(!isNavbarActive)}
                >
                  {isNavbarActive ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
            {isNavbarActive && (
              <div className="md:hidden border-t border-foreground/10 p-4">
                <NavLinks onItemClick={() => setIsNavbarActive(false)} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
