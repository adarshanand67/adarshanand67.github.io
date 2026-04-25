"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Github, User, Terminal as TerminalIcon } from "lucide-react";
import { useStore } from "@/lib/store";
import { siteConfig } from "@/lib/config";
import { Profile } from "@/types/definitions";
import { Terminal } from "@/components/layout";
import { TiltWrapper, SystemStatus } from "@/components/features";

const SOCIALS = [
  { label: "LinkedIn", name: "Connect", icon: Linkedin, href: () => `https://${siteConfig.contact.linkedin}` },
  { label: "Email", name: "Say Hello", icon: Mail, href: () => `mailto:${siteConfig.contact.email}` },
  { label: "GitHub", name: "Codebase", icon: Github, href: () => `https://${siteConfig.contact.github}` },
];

export const ViewToggle = ({ viewMode, setViewMode }: { viewMode: "profile" | "terminal"; setViewMode: (mode: "profile" | "terminal") => void }) => (
  <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 ml-auto gap-1">
    {(["profile", "terminal"] as const).map((mode) => (
      <button
        key={mode}
        onClick={() => setViewMode(mode)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${viewMode === mode ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"}`}
      >
        {mode === "profile" ? <User size={13} /> : <TerminalIcon size={13} />}
        {mode}
      </button>
    ))}
  </div>
);

export function Hero({ profile }: { profile: Profile }) {
  const { heroViewMode, setHeroViewMode } = useStore();
  return (
    <section id="hero" className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-8">
      {heroViewMode === "profile" ? (
        <div className="glass rounded-2xl p-5 md:p-8 border border-white/10 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-7 items-center md:items-start text-center md:text-left">
            <TiltWrapper intensity={12}>
              <div className="relative w-28 h-28 md:w-44 md:h-44 rounded-3xl overflow-hidden border-2 border-foreground/10 shadow-lg">
                <picture>
                  <source srcSet="/images/dp.webp" type="image/webp" />
                  <Image src={profile.avatar || ""} alt={profile.name} fill sizes="(max-width: 768px) 112px, 176px" className="object-cover" priority unoptimized />
                </picture>
              </div>
            </TiltWrapper>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase">{profile.name}</h1>
                <ViewToggle viewMode={heroViewMode} setViewMode={setHeroViewMode} />
              </div>
              <SystemStatus />
              <blockquote className="text-base md:text-lg font-medium text-foreground/80 mt-4 pl-4 border-l-2 border-foreground/10 italic">
                {profile.bio.paragraphs[0]}
              </blockquote>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {SOCIALS.map((s) => (
              <Link key={s.label} href={s.href()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all">
                <div className="w-9 h-9 bg-background rounded-xl flex items-center justify-center border border-foreground/10 shrink-0">
                  <s.icon size={17} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{s.label}</p>
                  <p className="text-sm font-bold">{s.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative animate-scale-in">
          <div className="absolute top-4 right-6 z-20">
            <ViewToggle viewMode={heroViewMode} setViewMode={setHeroViewMode} />
          </div>
          <Terminal />
        </div>
      )}
    </section>
  );
}
