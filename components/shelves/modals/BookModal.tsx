"use client";

import Image from "next/image";
import { X, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface BookModalProps {
    item: any;
    onClose: () => void;
}

export function BookModal({ item, onClose }: BookModalProps) {
    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <motion.div layoutId={`book-${item.title}`} className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-gray-200 dark:border-white/10">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"><X size={20} /></button>
                <div className="md:w-1/3 bg-gray-50 dark:bg-white/5 p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5">
                    {item.image ? (
                        <div className="relative w-48 aspect-[2/3] shadow-2xl rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center"><BookOpen className="text-gray-400" size={48} /></div>
                    )}
                </div>
                <div className="md:w-2/3 p-10 overflow-y-auto max-h-[80vh]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Featured Book</span>
                    <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                    <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-medium">by {item.author}</h3>

                    {item.description && <p className="text-gray-700 dark:text-gray-300 mb-6">{item.description}</p>}

                    {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                        <div className="space-y-4 mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-green-600 dark:text-green-400">Key Takeaways</h4>
                            <ul className="space-y-3">
                                {item.keyTakeaways.map((takeaway: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                        {takeaway}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {item.notes && !item.keyTakeaways && (
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base italic border-l-4 border-green-500/30 pl-4 py-2 mb-8">
                            {item.notes}
                        </p>
                    )}

                    {item.amazonLink && (
                        <a
                            href={item.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-500/10"
                        >
                            Get it on Amazon
                            <BookOpen size={16} />
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
