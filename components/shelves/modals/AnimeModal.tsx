"use client";

import Image from "next/image";
import { X, Tv, Check, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { WatchStatus } from '@/types/definitions';

interface AnimeModalProps {
    item: any;
    onClose: () => void;
    onTagClick: (tag: string) => void;
}

export function AnimeModal({ item, onClose, onTagClick }: AnimeModalProps) {
    return (
        <div className="fixed inset-0 z-[1001] flex items-end md:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <motion.div layoutId={`anime-${item.title}`} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }} className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[92vh] md:h-auto md:max-h-[85vh] md:rounded-3xl rounded-t-[32px] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-gray-200 dark:border-white/10"
            >
                <div className="md:hidden w-full flex flex-col items-center pt-3 pb-2 sticky top-0 bg-white dark:bg-zinc-900 z-30 border-b border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2" />
                    <button onClick={onClose} className="absolute right-4 top-2 p-2 rounded-full bg-gray-100 dark:bg-white/5"><X size={18} /></button>
                </div>
                <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 p-2 rounded-full bg-gray-100/50 dark:bg-white/5 hover:bg-gray-100 transition-colors z-20"><X size={20} /></button>
                <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-hidden">
                    <div className="md:w-1/3 w-full bg-gray-50 dark:bg-white/5 p-8 md:p-10 flex items-center justify-center md:border-r border-gray-100 dark:border-white/5 shrink-0">
                        {item.image ? (
                            <div className="relative w-44 md:w-48 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                                <Image src={item.image} alt={item.title} fill className="object-cover" priority />
                            </div>
                        ) : (
                            <div className="w-44 md:w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center"><Tv className="text-gray-400" size={48} /></div>
                        )}
                    </div>
                    <div className="md:w-2/3 w-full p-8 md:p-10 md:overflow-y-auto pb-24 md:pb-10">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest block mb-2">Recently Watched</span>
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 flex items-center flex-wrap gap-3 leading-tight">
                                {item.title} {item.status === WatchStatus.Completed && <Check className="text-green-500 w-6 h-6 md:w-8 md:h-8" />}
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.year && <span className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-full text-[10px] font-bold ring-1 ring-gray-200 dark:ring-white/10">{item.year}</span>}
                                {item.rating && <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-bold flex items-center gap-1.5 ring-1 ring-amber-500/20"><Star size={12} fill="currentColor" />{item.rating}</span>}
                                {item.seasons && <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-bold flex items-center gap-1.5 ring-1 ring-blue-500/20"><Tv size={12} />{item.seasons}</span>}
                            </div>
                            {item.description && <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base md:text-lg font-medium">{item.description}</p>}
                            {item.keyLearnings && item.keyLearnings.length > 0 && (
                                <div className="mb-8 p-6 md:p-8 rounded-[24px] bg-gradient-to-br from-green-500/5 to-emerald-500/10 dark:from-green-500/10 dark:to-emerald-500/20 border border-green-500/20">
                                    <h4 className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-4">Key Takeaways</h4>
                                    <ul className="space-y-4">
                                        {item.keyLearnings.map((learning: string, i: number) => (
                                            <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-200 text-sm md:text-base">
                                                <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5"><Check size={14} className="text-green-600" /></div>
                                                {learning}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {item.tags && (
                                <div className="space-y-3 mb-10">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categories</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {item.tags.map((tag: string, i: number) => (
                                            <button key={i} onClick={(e) => { e.stopPropagation(); onTagClick(tag); }} className="px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-xl text-[10px] font-semibold border border-gray-100 dark:border-white/5 hover:bg-green-500 hover:text-white transition-all">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' trailer')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-full shadow-xl hover:scale-[1.02] transition-all w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink size={18} /> Watch Trailer
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
