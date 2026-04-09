"use client";

import React from "react";
import Link from "next/link";
import { Home, Rss } from "lucide-react";
import { NavLinks } from "./Navbar"; // Importing NavLinks from sibling component

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-foreground/5 mt-auto font-mono overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3 backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border border-foreground/10 p-5 shadow-2xl">
          <Link
            href="/"
            className="group flex items-center gap-2 text-foreground/40 hover:text-foreground"
          >
            <Home
              size={18}
              className="text-black dark:text-gray-400 group-hover:scale-110"
            />
            <span className="font-black uppercase tracking-widest text-xs">
              Home
            </span>
          </Link>
          <div className="hidden sm:block w-px h-6 bg-foreground/10" />
          <NavLinks />
          <div className="hidden sm:block w-px h-6 bg-foreground/10" />
          <Link href="/now" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-black uppercase tracking-widest">
            Now
          </Link>
          <Link href="/uses" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-black uppercase tracking-widest">
            Uses
          </Link>
          <Link href="/experience" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-black uppercase tracking-widest">
            Experience
          </Link>
          <div className="hidden sm:block w-px h-6 bg-foreground/10" />
          <a
            href="/rss.xml"
            title="RSS Feed"
            className="text-foreground/30 hover:text-foreground transition-colors"
          >
            <Rss size={14} />
          </a>
        </div>
        <p className="text-gray-500 font-medium text-center text-[10px] opacity-60 tracking-widest uppercase">
          ©{new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
