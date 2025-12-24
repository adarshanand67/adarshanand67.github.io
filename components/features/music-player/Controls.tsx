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
 * Features play/pause, skip, shuffle, and repeat controls with visual feedback.
 * @component
 * @param {ControlsProps} props - Component props
 */
export function Controls({
    isPlaying, onTogglePlay, onNext, onPrev, isShuffle, onToggleShuffle, isRepeat, onToggleRepeat
}: ControlsProps) {
    return (
        <div className="flex items-center justify-between px-1">
            <button
                onClick={onToggleShuffle}
                className={`p-2 rounded-xl transition-all ${isShuffle ? 'text-green-500 bg-green-500/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                title="Shuffle"
            >
                <Shuffle size={18} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-5">
                <button
                    onClick={onPrev}
                    className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all hover:scale-110 active:scale-95"
                    title="Previous"
                >
                    <SkipBack size={20} fill="currentColor" strokeWidth={0} />
                </button>

                <button
                    onClick={onTogglePlay}
                    className="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl dark:shadow-white/5 active:shadow-inner group"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ?
                        <Pause size={24} className="text-white dark:text-black" fill="currentColor" strokeWidth={0} /> :
                        <Play size={24} className="text-white dark:text-black ml-1" fill="currentColor" strokeWidth={0} />
                    }
                </button>

                <button
                    onClick={onNext}
                    className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all hover:scale-110 active:scale-95"
                    title="Next"
                >
                    <SkipForward size={20} fill="currentColor" strokeWidth={0} />
                </button>
            </div>

            <button
                onClick={onToggleRepeat}
                className={`p-2 rounded-xl transition-all relative ${isRepeat ? 'text-green-500 bg-green-500/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                title="Repeat"
            >
                <Repeat size={18} strokeWidth={2.5} />
                {isRepeat && <span className="absolute top-1 right-1 text-[8px] font-black">1</span>}
            </button>
        </div>
    );
}
