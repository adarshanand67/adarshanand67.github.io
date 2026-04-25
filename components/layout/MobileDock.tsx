"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BookOpen, Tv, Gamepad2, Music, BarChart2 } from "lucide-react";
import { routes, NAV_ITEMS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  Home, Articles: FileText, Books: BookOpen, Anime: Tv, Hobbies: Gamepad2, Stats: BarChart2,
};

function DockItem({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} aria-label={label} aria-current={isActive ? "page" : undefined} className="relative flex flex-col items-center group">
      <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200"}`}>
        <Icon size={20} />
      </div>
      {isActive && <span className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
    </Link>
  );
}

export function MobileDock() {
  return (
    <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-[100]">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        {NAV_ITEMS.map((item) => (
          <DockItem key={item.label} href={item.path} label={item.label} icon={ICON_MAP[item.label] || Home} />
        ))}
        <DockItem href={routes.music} label="Music" icon={Music} />
      </div>
    </nav>
  );
}
