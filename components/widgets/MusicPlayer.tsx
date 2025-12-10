"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Disc, SkipForward, SkipBack, X } from "lucide-react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { PLAYLIST, TRACK_NAMES, AUDIO_CONFIG, ERROR_MESSAGES } from "@/lib";
import { useMounted } from "@/lib/hooks";
import { POSITION_STYLES, BUTTON_STYLES } from "@/lib/styles";

export default function MusicPlayer() {
    const {
        isPlaying, setIsPlaying,
        volume, setVolume,
        isMuted, toggleMute,
        currentTrackIndex, nextTrack, prevTrack,
        showMusicPlayer, toggleMusicPlayer
    } = useGlobalState();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mounted = useMounted();

    // Dragging state
    const [position, setPosition] = useState({ x: 20, y: 20 }); // Position from bottom-right (simulated by initial calc or just fixed)
    // Actually simpler to use top-left or relative to viewport. Let's use fixed style.
    // Initial state: undefined to let it start at default CSS position, then track?
    // Easiest is to start with a fixed default position (e.g. bottom-right equivalent)
    // But fixed bottom-right is hard to drag freely without complex calculations.
    // Let's use left/top and initialize to a tailored position.

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const playerRef = useRef<HTMLDivElement>(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Initialize position safely on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Start at bottom right: window.innerWidth - width - 20, window.innerHeight - height - 20
            // For simplicity, let's start it at fixed coordinates that resemble bottom-right
            setPosition({
                x: window.innerWidth - 350,
                y: window.innerHeight - 150
            });
        }
    }, [mounted]);

    const handleMouseDown = (e: React.MouseEvent) => {
        // Prevent drag when clicking controls
        if ((e.target as HTMLElement).closest('button, input')) return;

        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]); // Dependencies for closure stability

    // Update time
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Try to autoplay on mount
    useEffect(() => {
        // give valid user interaction a chance or just try
        const timer = setTimeout(() => {
            if (audioRef.current && !isPlaying) {
                // Initial autoplay might still be blocked, but state is now global
                // audioRef.current.play().then(() => setIsPlaying(true)).catch(...)
                // We'll leave strict autoplay off or handled by user interaction for safer UX
            }
        }, AUDIO_CONFIG.AUTOPLAY_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle play/pause sync
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error(ERROR_MESSAGES.AUDIO.PLAYBACK_FAILED, e);
                    setIsPlaying(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex, setIsPlaying]);

    // Ensure we reset playing state if track changes and we were playing
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            // Check if readyState is sufficient (HAVE_FUTURE_DATA = 3 or HAVE_ENOUGH_DATA = 4)
            if (audioRef.current.readyState >= 3) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleTrackError = () => {
        if (errorTimeoutRef.current) return; // Prevent cascading errors

        console.warn(ERROR_MESSAGES.AUDIO.TRACK_LOAD_FAILED);

        // Wait 2 seconds before trying next track to prevent rapid loops
        errorTimeoutRef.current = setTimeout(() => {
            nextTrack();
            errorTimeoutRef.current = null;
        }, 2000);
    };

    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted;
        toggleMute();
    };

    if (!mounted) {
        return null;
    }

    // Don't render if music player is hidden
    if (!showMusicPlayer) {
        return null;
    }

    return (
        <div
            ref={playerRef}
            className={`fixed z-50 font-mono select-none cursor-move`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
            onMouseDown={handleMouseDown}
        >
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrackIndex]}
                onEnded={nextTrack}
                onError={handleTrackError}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                crossOrigin="anonymous"
            />

            <div className={`relative bg-[#1e1e1e]/90 backdrop-blur-sm border p-4 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-start gap-4 transition-all hover:border-green-400 ${isDragging ? 'border-green-400 cursor-grabbing' : 'border-green-500/50'}`}>
                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMusicPlayer();
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/20 border border-gray-700 hover:border-red-500 transition-colors cursor-pointer"
                    aria-label="Close Music Player"
                >
                    <X size={14} className="text-gray-400 hover:text-red-500" />
                </button>

                {/* Animated Icon */}
                <div className={`relative w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-gray-700 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <Disc className={`w-6 h-6 text-green-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                </div>

                <div className="flex flex-col gap-1 w-48">
                    <div className="text-xs text-green-400 font-bold uppercase tracking-wider flex justify-between w-full gap-4">
                        <span>{isPlaying ? "Now Playing" : "Paused"}</span>
                        <span className="text-[10px] opacity-70">Track {currentTrackIndex + 1}/{PLAYLIST.length}</span>
                    </div>
                    <div className="text-xs text-gray-400 w-full truncate">
                        {TRACK_NAMES[currentTrackIndex] || "Unknown Track"}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-500 w-8 text-right">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-grow h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full"
                        />
                        <span className="text-[10px] text-gray-500 w-8">{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 justify-center">
                        <button
                            onClick={prevTrack}
                            className={`${BUTTON_STYLES.ICON_BUTTON} cursor-pointer`}
                            aria-label="Previous Track"
                        >
                            <SkipBack size={16} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className={`${BUTTON_STYLES.ICON_BUTTON} cursor-pointer`}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        <button
                            onClick={nextTrack}
                            className={`${BUTTON_STYLES.ICON_BUTTON} cursor-pointer`}
                            aria-label="Next Track"
                        >
                            <SkipForward size={16} />
                        </button>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleMute}
                                className={`${BUTTON_STYLES.ICON_BUTTON} cursor-pointer`}
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>

                            <input
                                type="range"
                                min={AUDIO_CONFIG.MIN_VOLUME}
                                max={AUDIO_CONFIG.MAX_VOLUME}
                                step={AUDIO_CONFIG.VOLUME_STEP}
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full hover:bg-gray-600 transition-colors"
                                aria-label="Volume Control"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

