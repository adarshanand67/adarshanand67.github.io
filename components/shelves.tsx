"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search, X, ExternalLink, BookOpen, Check, Star,
    Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store/useStore";
import { WatchStatus, ShelfType } from '@/types/definitions';
import { ShelfConfig } from "@/lib/config";
import { ShelfStrategyFactory, ShelfItem } from "@/lib/shelfStrategies";
import { RandomizerButton } from "@/components/ui";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { routes } from "@/lib/constants";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Shelf Header component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
    title,
    description,
    count,
    searchValue,
    onSearchChange,
    searchPlaceholder,
    onPickRandom,
    items
}: ShelfHeaderProps) {
    return (
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {count} {count === 1 ? 'Item' : 'Items'}
                    </div>
                    {onPickRandom && items && items.length > 0 && (
                        <RandomizerButton
                            items={items}
                            onPick={onPickRandom}
                        />
                    )}
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Universal Shelf Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface UniversalShelfProps {
    config: ShelfConfig;
    items: unknown[];
}

export function UniversalShelf({ config, items }: UniversalShelfProps) {
    const {
        searchQuery,
        setSearchQuery,
        hobbySelectedItem,
        setHobbySelectedItem,
        bookSelectedItem,
        setBookSelectedItem,
        animeSelectedItem,
        setAnimeSelectedItem,
        animeSelectedTag,
        setAnimeSelectedTag
    } = useStore();

    const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setSearchQuery("");
        // Clear anime tag filter when navigating to anime shelf
        if (config.type === ShelfType.Anime) {
            setAnimeSelectedTag(null);
        }
    }, [config.type, setSearchQuery, setAnimeSelectedTag]);

    const filteredItems = useMemo(() => {
        let filtered = strategy.filter(items as ShelfItem[], searchQuery);

        // Apply tag filter for anime
        if (config.type === ShelfType.Anime && animeSelectedTag) {
            filtered = filtered.filter((item: any) =>
                item.tags && item.tags.includes(animeSelectedTag)
            );
        }

        return filtered;
    }, [items, searchQuery, strategy, config.type, animeSelectedTag]);

    const randomizerItems = useMemo(() => {
        if (config.type === ShelfType.Anime) {
            return filteredItems.filter((item: any) => item.status === WatchStatus.Completed);
        }
        return filteredItems;
    }, [filteredItems, config.type]);

    if (!mounted) {
        return (
            <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-12 font-mono">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
                <div className="space-y-4 mb-12">
                    <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    const iconMap: Record<string, React.ElementType> = {
        Dumbbell, Tv, Book: Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
    };

    const getIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName];
        if (!IconComponent) return <span className="text-4xl mb-4">🎮</span>;
        return <IconComponent className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />;
    };

    return (
        <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-24 font-mono relative">
            <Breadcrumbs items={[{ label: config.title }]} />

            <ShelfHeader
                title={config.title}
                description={config.description}
                count={filteredItems.length}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={config.searchPlaceholder}
                items={randomizerItems}
                onPickRandom={(item) => {
                    if (config.type === ShelfType.Anime) {
                        const { setAnimeSelectedItem } = useStore.getState();
                        setAnimeSelectedItem(item as any);
                    } else if (config.type === ShelfType.Hobby) {
                        setHobbySelectedItem(item as any);
                    } else if (config.type === ShelfType.Book) {
                        setBookSelectedItem(item as any);
                    } else {
                        const element = document.getElementById(`shelf-item-${(item as any).title}`);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            element.classList.add('ring-4', 'ring-green-500', 'ring-offset-2');
                            setTimeout(() => element.classList.remove('ring-4', 'ring-green-500', 'ring-offset-2'), 2000);
                        }
                    }
                }}
            />

            {/* Clear Filters Button */}
            {config.type === ShelfType.Anime && (searchQuery || animeSelectedTag) && (
                <div className="mb-2 flex justify-end">
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setAnimeSelectedTag(null);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-red-500/20 hover:border-red-500/40"
                    >
                        <X size={14} />
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Tag Filter for Anime */}
            {config.type === ShelfType.Anime && mounted && (() => {
                const allTags = Array.from(new Set(
                    (items as any[]).flatMap(item => item.tags || [])
                )).sort();

                return allTags.length > 0 ? (
                    <div className="mb-8">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Filter by Tag</h4>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setAnimeSelectedTag(null)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!animeSelectedTag
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                                    }`}
                            >
                                All
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setAnimeSelectedTag(animeSelectedTag === tag ? null : tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${animeSelectedTag === tag
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null;
            })()}

            {filteredItems.length === 0 ? (
                <div className="py-24 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No items found matching &quot;{searchQuery}&quot;
                    </p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {strategy.renderList(filteredItems as any[])}
                </motion.div>
            )}



            <AnimatePresence>
                {hobbySelectedItem && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setHobbySelectedItem(null)}
                        />
                        <motion.div
                            layoutId={`hobby-${hobbySelectedItem.name}`}
                            className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10"
                        >
                            <button
                                onClick={() => setHobbySelectedItem(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
                            >
                                <X size={20} />
                            </button>
                            <div className="p-10">
                                <div className="flex flex-col items-center text-center">
                                    {getIcon(hobbySelectedItem.icon)}
                                    <h2 className="text-3xl font-bold mb-3">{hobbySelectedItem.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
                                        {hobbySelectedItem.description}
                                    </p>
                                    {(hobbySelectedItem as any).link && (
                                        <a
                                            href={(hobbySelectedItem as any).link}
                                            target={(hobbySelectedItem as any).link?.startsWith('http') ? "_blank" : undefined}
                                            rel={(hobbySelectedItem as any).link?.startsWith('http') ? "noopener noreferrer" : undefined}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <ExternalLink size={16} />
                                            Explore More
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {bookSelectedItem && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setBookSelectedItem(null)}
                        />
                        <motion.div
                            layoutId={`book-${bookSelectedItem.title}`}
                            className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-gray-200 dark:border-white/10"
                        >
                            <button
                                onClick={() => setBookSelectedItem(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="md:w-1/3 bg-gray-50 dark:bg-white/5 p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5">
                                {bookSelectedItem.image ? (
                                    <div className="relative w-48 aspect-[2/3] shadow-2xl rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
                                        <Image
                                            src={bookSelectedItem.image}
                                            alt={bookSelectedItem.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <BookOpen className="text-gray-400" size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="md:w-2/3 p-10">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Featured Book</span>
                                <h2 className="text-3xl font-bold mb-2">{bookSelectedItem.title}</h2>
                                <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-medium">by {bookSelectedItem.author}</h3>



                                {bookSelectedItem.description && (
                                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                                        {bookSelectedItem.description}
                                    </p>
                                )}

                                {bookSelectedItem.notes && (
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base italic border-l-4 border-green-500/30 pl-4 py-2">
                                        {bookSelectedItem.notes}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {animeSelectedItem && (
                    <div className="fixed inset-0 z-[1001] flex items-end md:items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setAnimeSelectedItem(null)}
                        />
                        <motion.div
                            layoutId={`anime-${animeSelectedItem.title}`}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                            className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[92vh] md:h-auto md:max-h-[85vh] md:rounded-3xl rounded-t-[32px] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-gray-200 dark:border-white/10"
                        >
                            {/* Mobile Drag Handle & Close area */}
                            <div className="md:hidden w-full flex flex-col items-center pt-3 pb-2 sticky top-0 bg-white dark:bg-zinc-900 z-30 border-b border-gray-100 dark:border-white/5 shadow-sm">
                                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2" />
                                <button
                                    onClick={() => setAnimeSelectedItem(null)}
                                    className="absolute right-4 top-2 p-2 rounded-full bg-gray-100 dark:bg-white/5 transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Desktop Close Button */}
                            <button
                                onClick={() => setAnimeSelectedItem(null)}
                                className="hidden md:flex absolute top-6 right-6 p-2 rounded-full bg-gray-100/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-sm transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-hidden">
                                <div className="md:w-1/3 w-full bg-gray-50 dark:bg-white/5 p-8 md:p-10 flex items-center justify-center md:border-r border-gray-100 dark:border-white/5 shrink-0">
                                    {animeSelectedItem.image ? (
                                        <div className="relative w-44 md:w-48 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105 ring-1 ring-black/5 dark:ring-white/10">
                                            <Image
                                                src={animeSelectedItem.image}
                                                alt={animeSelectedItem.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-44 md:w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                                            <Tv className="text-gray-400" size={48} />
                                        </div>
                                    )}
                                </div>

                                <div className="md:w-2/3 w-full p-8 md:p-10 md:overflow-y-auto pb-24 md:pb-10">
                                    <div className="max-w-2xl">
                                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest block mb-1 md:mb-2">Recently Watched</span>
                                        <h2 className="text-2xl md:text-4xl font-bold mb-4 flex items-center flex-wrap gap-2 md:gap-3 leading-tight">
                                            {animeSelectedItem.title}
                                            {animeSelectedItem.status === WatchStatus.Completed && (
                                                <Check className="text-green-500 w-6 h-6 md:w-8 md:h-8" />
                                            )}
                                        </h2>

                                        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                                            {animeSelectedItem.year && (
                                                <span className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-full text-[10px] md:text-xs font-bold ring-1 ring-inset ring-gray-200 dark:ring-white/10">
                                                    {animeSelectedItem.year}
                                                </span>
                                            )}
                                            {animeSelectedItem.rating && (
                                                <span className="px-3 py-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 ring-1 ring-inset ring-amber-500/20">
                                                    <Star size={12} fill="currentColor" className="text-amber-500" />
                                                    {animeSelectedItem.rating}
                                                </span>
                                            )}
                                            {animeSelectedItem.seasons && (
                                                <span className="px-3 py-1.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 ring-1 ring-inset ring-blue-500/20">
                                                    <Tv size={12} className="text-blue-500" />
                                                    {animeSelectedItem.seasons}
                                                </span>
                                            )}
                                        </div>

                                        {animeSelectedItem.description && (
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 md:mb-10 text-base md:text-lg font-medium">
                                                {animeSelectedItem.description}
                                            </p>
                                        )}

                                        {animeSelectedItem.keyLearnings && animeSelectedItem.keyLearnings.length > 0 && (
                                            <div className="mb-8 md:mb-10 p-6 md:p-8 rounded-[24px] bg-gradient-to-br from-green-500/5 to-emerald-500/10 dark:from-green-500/10 dark:to-emerald-500/20 border border-green-500/20 shadow-inner">
                                                <h4 className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-4 md:mb-6">Key Takeaways</h4>
                                                <ul className="space-y-4 md:space-y-5">
                                                    {animeSelectedItem.keyLearnings.map((learning, i) => (
                                                        <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
                                                            <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center mt-0.5">
                                                                <Check size={14} className="text-green-600 dark:text-green-400" />
                                                            </div>
                                                            {learning}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {animeSelectedItem.tags && (
                                            <div className="space-y-3 mb-10">
                                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categories</h4>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {animeSelectedItem.tags.map((tag, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setAnimeSelectedTag(tag);
                                                                setAnimeSelectedItem(null);
                                                            }}
                                                            className="px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-xl text-[10px] md:text-xs font-semibold border border-gray-100 dark:border-white/5 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all cursor-pointer shadow-sm"
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <a
                                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(animeSelectedItem.title + ' trailer')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={18} />
                                                Watch Trailer
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
