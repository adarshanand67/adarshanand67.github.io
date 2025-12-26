"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { useAudio } from "./music-player/hooks/useAudio";
import { TrackInfo } from "./music-player/TrackInfo";
import { ProgressBar } from "./music-player/ProgressBar";
import { Controls } from "./music-player/Controls";
import { VolumeControl } from "./music-player/VolumeControl";

/**
 * Re-export of the MusicToggleButton component for external use.
 * This button allows users to show/hide the music player interface.
 */
export { MusicToggleButton } from "./music-player/MusicToggleButton";

/**
 * Music Player Component
 *
 * A fully-featured audio player with playback controls, progress tracking, volume control,
 * and playlist management. Integrates with Zustand store for global state management and
 * provides a glassmorphic UI that appears in the bottom-right corner.
 *
 * @component
 * @returns {JSX.Element | null} Music player UI or null if not mounted (SSR safety)
 *
 * @remarks
 * **Features:**
 * - Play/Pause/Next/Previous track controls
 * - Shuffle and repeat modes
 * - Volume control with mute toggle
 * - Seekable progress bar with time display
 * - Track metadata display (title, artist, album art)
 * - Smooth show/hide animations
 * - Cross-origin audio support for external sources
 *
 * **State Management:**
 * - Uses Zustand store for: playback state, volume, track index, shuffle/repeat modes
 * - Uses custom `useAudio` hook for: audio element ref, time tracking, playback events
 *
 * **Architecture:**
 * - Composed of sub-components: TrackInfo, ProgressBar, Controls, VolumeControl
 * - Hidden audio element handles actual playback
 * - Visibility controlled by `showMusicPlayer` state from store
 *
 * @example
 * ```tsx
 * // In your root layout:
 * <MusicPlayer />
 * <MusicToggleButton />
 * ```
 */
export function MusicPlayer() {
    const {
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        currentTrackIndex,
        nextTrack,
        prevTrack,
        showMusicPlayer,
        toggleMusicPlayer,
        isShuffle,
        toggleShuffle,
        isRepeat,
        toggleRepeat,
    } = useStore();

    const {
        audioRef,
        currentTime,
        duration,
        setIsDraggingTime,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleEnded,
        seek,
        currentTrackSrc,
    } = useAudio();

    // SSR safety: prevent hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrackSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                crossOrigin="anonymous"
            />

            <div
                className={`fixed bottom-24 right-8 z-[100] transition-all duration-500 ease-out origin-bottom-right transform ${showMusicPlayer ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"}`}
            >
                <div className="w-[400px] backdrop-blur-[50px] bg-background/80 border border-foreground/10 shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-[3rem] p-10 flex flex-col gap-8 overflow-hidden relative group">
                    {/* Subtle aesthetic glow - very faint */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[40px]" />

                    <div className="relative z-10 flex flex-col gap-8">
                        <TrackInfo index={currentTrackIndex} onClose={toggleMusicPlayer} />

                        <div className="flex flex-col gap-6">
                            <div className="space-y-6">
                                <ProgressBar
                                    currentTime={currentTime}
                                    duration={duration}
                                    onSeek={seek}
                                    onDragStateChange={setIsDraggingTime}
                                />
                                <Controls
                                    isPlaying={isPlaying}
                                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                                    onNext={nextTrack}
                                    onPrev={prevTrack}
                                    isShuffle={isShuffle}
                                    onToggleShuffle={toggleShuffle}
                                    isRepeat={isRepeat}
                                    onToggleRepeat={toggleRepeat}
                                />
                                <VolumeControl
                                    volume={volume}
                                    isMuted={isMuted}
                                    onVolumeChange={setVolume}
                                    onToggleMute={toggleMute}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
