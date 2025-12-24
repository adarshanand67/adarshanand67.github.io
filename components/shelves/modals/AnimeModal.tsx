"use client";

import Image from "next/image";
import { X, Tv, Check, Star, ExternalLink, Calendar, Film } from "lucide-react";
import { motion } from "framer-motion";
import { WatchStatus } from '@/types/definitions';

interface AnimeModalProps {
    item: any;
    onClose: () => void;
    onTagClick: (tag: string) => void;
}

export function AnimeModal({ item, onClose, onTagClick }: AnimeModalProps) {
    return (
        <div className="fixed inset-0 z-[1001] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                layoutId={`anime-${item.title}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.8 }}
                className="bg-white dark:bg-zinc-900 w-full max-w-5xl h-[95vh] md:h-auto md:max-h-[90vh] md:rounded-3xl rounded-t-[32px] shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10"
            >
                {/* Mobile Handle */}
                <div className="md:hidden w-full flex flex-col items-center pt-3 pb-2 sticky top-0 bg-white dark:bg-zinc-900 z-30 border-b border-gray-100 dark:border-white/5">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-gray-100/80 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm"
                >
                    <X size={20} className="text-gray-700 dark:text-gray-300" />
                </button>

                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 md:p-12 border-b border-gray-200 dark:border-white/10">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                            {/* Anime Cover */}
                            <div className="shrink-0 mx-auto md:mx-0">
                                {item.image ? (
                                    <div className="relative w-36 md:w-48 aspect-[2/3] shadow-2xl rounded-xl overflow-hidden ring-4 ring-white/50 dark:ring-white/10 group">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="w-36 md:w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                        <Tv className="text-gray-400" size={56} />
                                    </div>
                                )}
                            </div>

                            {/* Anime Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">
                                    <span className="px-2.5 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                                        Recently Watched
                                    </span>
                                    {item.status === WatchStatus.Completed && (
                                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] md:text-[10px] font-bold flex items-center gap-1 border border-emerald-500/20">
                                            <Check size={10} /> Completed
                                        </span>
                                    )}
                                    {item.recommended && (
                                        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-[9px] md:text-[10px] font-bold flex items-center gap-1 border border-amber-500/20">
                                            <Star size={10} fill="currentColor" /> Must Watch
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 text-gray-900 dark:text-white leading-tight">
                                    {item.title}
                                </h2>

                                {/* Meta Info Badges */}
                                <div className="flex flex-wrap gap-2 mb-4 md:mb-6 justify-center md:justify-start">
                                    {item.year && (
                                        <span className="px-2.5 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1.5 border border-gray-200 dark:border-white/10">
                                            <Calendar size={11} /> {item.year}
                                        </span>
                                    )}
                                    {item.rating && (
                                        <span className="px-2.5 py-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1.5 border border-amber-500/20">
                                            <Star size={11} fill="currentColor" /> {item.rating}
                                        </span>
                                    )}
                                    {item.seasons && (
                                        <span className="px-2.5 py-1.5 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1.5 border border-blue-500/20">
                                            <Film size={11} /> {item.seasons}
                                        </span>
                                    )}
                                </div>

                                {item.description && (
                                    <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-12 space-y-6 md:space-y-8">
                        {/* Key Learnings */}
                        {item.keyLearnings && item.keyLearnings.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-4 md:mb-6">
                                    <div className="h-1 w-1 rounded-full bg-green-500" />
                                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                                        Key Takeaways
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-green-500/20 to-transparent" />
                                </div>

                                <div className="grid gap-3 md:gap-4">
                                    {item.keyLearnings.map((learning: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative flex gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-green-500/20 transition-colors">
                                                <div className="shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5 group-hover:bg-green-500/20 transition-colors">
                                                    <Check size={14} className="text-green-600 dark:text-green-400" />
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed flex-1">
                                                    {learning}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {item.tags && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-1 rounded-full bg-gray-400" />
                                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                        Categories
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-gray-300/20 to-transparent" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
                                            className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-xl text-[10px] md:text-xs font-semibold border border-gray-100 dark:border-white/5 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Button */}
                        <div className="pt-2 md:pt-4">
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' trailer')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black font-bold text-sm md:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                                Watch Trailer
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
