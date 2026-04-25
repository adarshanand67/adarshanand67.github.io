"use client";

import React from "react";
import Link from "next/link";
import { Rss } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/books", label: "Books" },
  { href: "/anime", label: "Anime" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/stats", label: "Stats" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/experience", label: "Experience" },
];

export function Footer() {
  return (
    <footer className="py-10 border-t border-foreground/5 mt-auto font-mono">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/40 hover:text-foreground transition-colors text-[11px] font-bold uppercase tracking-widest">
              {link.label}
            </Link>
          ))}
          <a href="/rss.xml" aria-label="RSS feed" className="text-foreground/30 hover:text-foreground transition-colors">
            <Rss size={13} />
          </a>
        </div>
        <p className="text-[10px] text-gray-500 opacity-60 tracking-widest uppercase">©{new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
}
