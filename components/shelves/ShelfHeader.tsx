"use client";

import { Search } from "lucide-react";
import { RandomizerButton } from "@/components/ui";

interface ShelfHeaderProps {
    title: string;
    description?: string;
    count: number;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    onPickRandom?: (item: unknown) => void;
    items?: unknown[];
}

export function ShelfHeader({
    title, description, count, searchValue,
    onSearchChange, searchPlaceholder, onPickRandom, items
}: ShelfHeaderProps) {
    return (
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
                        {title}
                    </h1>
                    {description && <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed font-medium">{description}</p>}
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {count} {count === 1 ? 'Item' : 'Items'}
                    </div>
                    {onPickRandom && items && items.length > 0 && <RandomizerButton items={items} onPick={onPickRandom} />}
                </div>
            </div>
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder || "Search..."}
                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-sm group-hover:shadow-md"
                />
            </div>
        </div>
    );
}
