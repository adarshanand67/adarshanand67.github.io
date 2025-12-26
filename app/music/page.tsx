"use client";

import {
    Heart,
    MoreVertical,
    ArrowLeft,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    ListMusic,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tracks } from "@/lib/constants/music";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function MusicPage() {
    const {
        currentTrackIndex,
        isPlaying,
        setIsPlaying,
        setCurrentTrack,
        nextTrack,
        prevTrack,
        isShuffle,
        toggleShuffle,
        isRepeat,
        toggleRepeat,
        volume,
        setVolume,
        currentTime,
        duration,
        requestSeek,
    } = useStore();

    // Calculate progress percentage
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Handle seeking
    const handleSeek = (vals: number[]) => {
        const newTime = (vals[0] / 100) * duration;
        requestSeek(newTime);
    };

    // Format time (mm:ss)
    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs} `;
    };

    // Local state for volume slider to separate from immediate store updates if needed
    const handleVolumeChange = (vals: number[]) => {
        setVolume(vals[0]);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const currentTrack = tracks[currentTrackIndex];

    return (
        <div
            className={cn(
                "min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-all duration-500 ease-in-out",
                isMaximized ? "pb-0" : "pb-32 md:pb-0"
            )}
        >
            {/* Desktop Maximize/Minimize Toggle */}
            <div className="hidden sm:flex fixed top-6 right-6 z-50">
                <button
                    onClick={toggleMaximize}
                    className="bg-white dark:bg-neutral-900 p-3 rounded-full hover:scale-110 transition-all shadow-lg border border-gray-200 dark:border-gray-700 text-black dark:text-white"
                    aria-label={isMaximized ? "Minimize player" : "Maximize player"}
                >
                    {isMaximized ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 3h6v6" />
                            <path d="M9 21H3v-6" />
                            <path d="M21 3l-7 7" />
                            <path d="M3 21l7-7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Header - iOS Style - Increased Top Padding */}
            <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-4 pt-8 md:pt-4 flex items-center justify-center md:hidden border-b border-black/5 dark:border-white/5">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full absolute top-2" />
                <Link
                    href="/"
                    className="absolute left-4 p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors pt-6 md:pt-2"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <span className="font-semibold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mt-2 md:mt-0">
                    NOW PLAYING
                </span>
                <button className="absolute right-4 p-2 -mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors pt-6 md:pt-2">
                    <MoreVertical className="w-6 h-6" />
                </button>
            </div>

            {/* Main Player Content - Responsive Layout */}
            <div
                className={cn(
                    "transition-all duration-500 ease-in-out",
                    isMaximized
                        ? "px-8 pt-6 flex flex-col h-full max-w-7xl mx-auto md:grid md:grid-cols-2 md:gap-24 md:px-16 md:items-center md:h-screen md:pt-0"
                        : "px-8 pt-6 flex flex-col h-full max-w-lg mx-auto md:gap-12 md:px-12 md:items-center md:pt-20"
                )}
            >
                {/* Album Art Section */}
                <div
                    className={cn(
                        "w-full relative aspect-square mb-10 md:mb-0 transition-transform duration-500 ease-out",
                        isMaximized ? "md:scale-100" : "md:scale-95"
                    )}
                    style={{ transform: isPlaying ? "scale(1)" : "scale(0.9)" }}
                >
                    {/* Glow Effect */}
                    <div
                        className={cn(
                            "absolute inset-4 rounded-[2rem] bg-black/20 dark:bg-white/10 blur-3xl translate-y-4 transition-opacity duration-1000",
                            isPlaying ? "opacity-100" : "opacity-30"
                        )}
                    />

                    {/* Album Art Container */}
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.1)] border border-black/5 dark:border-white/5">
                        {currentTrack?.image && (
                            <Image
                                src={currentTrack.image}
                                alt={currentTrack.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        )}
                    </div>
                </div>

                {/* Controls & Details Section */}
                <div className="flex flex-col justify-center w-full">
                    {/* Track Info */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex-1 min-w-0 mr-4">
                            <h1
                                className={cn(
                                    "font-bold mb-2 text-gray-900 dark:text-gray-50 truncate tracking-tight transition-all",
                                    isMaximized ? "text-4xl md:text-5xl" : "text-3xl"
                                )}
                            >
                                {currentTrack?.title}
                            </h1>
                            <p
                                className={cn(
                                    "text-pink-500 dark:text-pink-400 font-medium truncate",
                                    isMaximized ? "text-2xl" : "text-xl"
                                )}
                            >
                                {currentTrack?.artist}
                            </p>
                        </div>
                        <button className="p-3 bg-gray-100 dark:bg-white/10 rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 active:scale-95 transition-all">
                            <Heart
                                className={cn(
                                    "transition-all",
                                    isMaximized ? "w-8 h-8" : "w-6 h-6"
                                )}
                            />
                        </button>
                    </div>

                    {/* Progress Slider */}
                    <div className="mb-8 group w-full">
                        <Slider
                            value={[progress]}
                            min={0}
                            max={100}
                            step={0.1}
                            onValueChange={handleSeek}
                            className="cursor-pointer py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-[-6px] font-medium font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Main Controls - iOS Style */}
                    <div className="flex items-center justify-between mb-10 px-2 lg:px-8">
                        <button
                            onClick={toggleShuffle}
                            className={cn(
                                "p-2 transition-colors",
                                isShuffle
                                    ? "text-pink-500"
                                    : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            <Shuffle className={cn(isMaximized ? "w-6 h-6" : "w-5 h-5")} />
                        </button>

                        <button
                            onClick={prevTrack}
                            className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-transform active:scale-90"
                        >
                            <SkipBack
                                className={cn(
                                    "fill-current",
                                    isMaximized ? "w-12 h-12" : "w-10 h-10"
                                )}
                            />
                        </button>

                        <button
                            onClick={handlePlayPause}
                            className={cn(
                                "bg-gray-100 dark:bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
                                isMaximized ? "w-24 h-24" : "w-20 h-20"
                            )}
                        >
                            {isPlaying ? (
                                <Pause
                                    className={cn(
                                        "fill-current",
                                        isMaximized ? "w-12 h-12" : "w-10 h-10"
                                    )}
                                />
                            ) : (
                                <Play
                                    className={cn(
                                        "fill-current ml-1",
                                        isMaximized ? "w-12 h-12" : "w-10 h-10"
                                    )}
                                />
                            )}
                        </button>

                        <button
                            onClick={nextTrack}
                            className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-transform active:scale-90"
                        >
                            <SkipForward
                                className={cn(
                                    "fill-current",
                                    isMaximized ? "w-12 h-12" : "w-10 h-10"
                                )}
                            />
                        </button>

                        <button
                            onClick={toggleRepeat}
                            className={cn(
                                "p-2 transition-colors",
                                isRepeat
                                    ? "text-pink-500"
                                    : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            <Repeat className={cn(isMaximized ? "w-6 h-6" : "w-5 h-5")} />
                        </button>
                    </div>

                    {/* Volume Slider - iOS Style */}
                    <div className="flex items-center gap-4 px-2 mb-8 lg:px-6">
                        <Volume2 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <Slider
                            value={[volume * 100]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(val) => handleVolumeChange([val[0] / 100])}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Playlist Sheet / Next Up - Only show if NOT maximized relative to view height or standard layout */}
            <div
                className={cn(
                    "px-6 pb-6 md:px-12 transition-all duration-500",
                    isMaximized ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
                )}
            >
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <ListMusic className="w-5 h-5" />
                    <h2 className="text-lg font-bold">Up Next</h2>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-4 space-y-2">
                    {tracks.map((track, index) => {
                        const isCurrent = currentTrackIndex === index;
                        return (
                            <div
                                key={track.src}
                                onClick={() => setCurrentTrack(index)}
                                className={cn(
                                    "flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer group",
                                    isCurrent
                                        ? "bg-white dark:bg-white/10 shadow-sm"
                                        : "hover:bg-gray-100 dark:hover:bg-white/5 active:scale-[0.98]"
                                )}
                            >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                    <Image
                                        src={track.image}
                                        alt={track.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    {isCurrent && isPlaying && (
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-[3px]">
                                            <div className="w-[3px] h-3 bg-white animate-music-bar-1" />
                                            <div className="w-[3px] h-5 bg-white animate-music-bar-2" />
                                            <div className="w-[3px] h-2 bg-white animate-music-bar-3" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={cn(
                                            "font-semibold truncate text-base",
                                            isCurrent
                                                ? "text-pink-500 dark:text-pink-400"
                                                : "text-gray-900 dark:text-white"
                                        )}
                                    >
                                        {track.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {track.artist}
                                    </p>
                                </div>
                                <div className="text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
