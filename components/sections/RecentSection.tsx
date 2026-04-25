"use client";

import React from "react";
import Link from "next/link";

export function RecentSection({ title, items, linkText, linkUrl }: { title: string; command?: string; items: { title: string; date: string; url: string }[]; linkText: string; linkUrl: string }) {
  return (
    <section className="font-mono max-w-6xl mx-auto px-4 md:px-12 mb-6">
      <h2 className="text-base font-black flex items-center gap-2 opacity-90 mb-3">
        <span className="opacity-20">##</span>
        {title}
      </h2>
      <div className="glass p-5 rounded-2xl border border-white/10 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="pl-3 border-l-2 border-foreground/10">
            <span className="text-[10px] font-black opacity-30 uppercase tracking-widest block mb-0.5">{item.date}</span>
            <Link href={item.url} className="text-sm font-bold hover:underline decoration-foreground/20 underline-offset-4">
              {item.title}
            </Link>
          </div>
        ))}
      </div>
      <Link href={linkUrl} className="mt-3 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity block">
        → {linkText}
      </Link>
    </section>
  );
}
