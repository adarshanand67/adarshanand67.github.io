"use client";

import { Music } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

/**
 * Music Toggle Button Component - floating action button to open music player.
 * Features animated pulse effect when music is playing and ping indicator.
 * Fixed position in bottom-right corner with scale animations on hover/click.
 * @component
 */
export function MusicToggleButton() {
    const { toggleMusicPlayer, isPlaying } = useStore();
    return (
        <button
            onClick={toggleMusicPlayer}
            className="fixed bottom-8 right-8 z-[101] w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-90 transition-all duration-300 group"
            title="Open Music Player"
        >
            <div className={`relative ${isPlaying ? "animate-pulse" : ""}`}>
                <Music size={22} />
                {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white dark:bg-black"></span>
                    </span>
                )}
            </div>
        </button>
    );
}
