import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

/**
 * Props for music player Controls component.
 * @interface ControlsProps
 * @property {boolean} isPlaying - Whether music is currently playing
 * @property {Function} onTogglePlay - Callback to toggle play/pause
 * @property {Function} onNext - Callback to skip to next track
 * @property {Function} onPrev - Callback to go to previous track
 * @property {boolean} isShuffle - Whether shuffle mode is enabled
 * @property {Function} onToggleShuffle - Callback to toggle shuffle mode
 * @property {boolean} isRepeat - Whether repeat mode is enabled
 * @property {Function} onToggleRepeat - Callback to toggle repeat mode
 */
interface ControlsProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onNext: () => void;
    onPrev: () => void;
    isShuffle: boolean;
    onToggleShuffle: () => void;
    isRepeat: boolean;
    onToggleRepeat: () => void;
}

/**
 * Music Player Controls Component - playback control buttons.
 * Features play/pause, skip, shuffle, and repeat controls with an Apple Music aesthetic.
 * @component
 * @param {ControlsProps} props - Component props
 */
export function Controls({
    isPlaying,
    onTogglePlay,
    onNext,
    onPrev,
    isShuffle,
    onToggleShuffle,
    isRepeat,
    onToggleRepeat,
}: ControlsProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <button
                onClick={onToggleShuffle}
                className={`p-2 transition-all ${isShuffle ? "text-foreground" : "text-foreground/30 hover:text-foreground"}`}
                title="Shuffle"
            >
                <Shuffle size={20} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-8">
                <button
                    onClick={onPrev}
                    className="text-foreground hover:opacity-100 opacity-60 transition-opacity active:scale-90"
                    title="Previous"
                >
                    <SkipBack size={32} fill="currentColor" strokeWidth={0} />
                </button>

                <button
                    onClick={onTogglePlay}
                    className="w-20 h-20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all group bg-foreground rounded-full shadow-2xl"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause
                            size={44}
                            className="text-background"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    ) : (
                        <Play
                            size={44}
                            className="text-background ml-1"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    )}
                </button>

                <button
                    onClick={onNext}
                    className="text-foreground hover:opacity-100 opacity-60 transition-opacity active:scale-90"
                    title="Next"
                >
                    <SkipForward size={32} fill="currentColor" strokeWidth={0} />
                </button>
            </div>

            <button
                onClick={onToggleRepeat}
                className={`p-2 transition-all relative ${isRepeat ? "text-foreground" : "text-foreground/30 hover:text-foreground"}`}
                title="Repeat"
            >
                <Repeat size={20} strokeWidth={2.5} />
                {isRepeat && (
                    <span className="absolute top-1 right-0 text-[10px] font-black">1</span>
                )}
            </button>
        </div>
    );
}
