/**
 * Props for ProgressBar component.
 * @interface ProgressBarProps
 * @property {number} currentTime - Current playback time in seconds
 * @property {number} duration - Total track duration in seconds
 * @property {Function} onSeek - Callback when user seeks to a new position
 * @property {Function} onDragStateChange - Callback when drag state changes
 */
interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
    onDragStateChange: (isDragging: boolean) => void;
}

/**
 * Progress Bar Component - seekable playback progress indicator.
 * Displays current time, total duration, and allows seeking via slider with an Apple Music style.
 * @component
 * @param {ProgressBarProps} props - Component props
 */
export function ProgressBar({
    currentTime,
    duration,
    onSeek,
    onDragStateChange,
}: ProgressBarProps) {
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = (currentTime / (duration || 1)) * 100;

    return (
        <div className="space-y-1.5 group/progress">
            <div className="relative h-2 w-full bg-foreground/10 rounded-full cursor-pointer">
                <div
                    className="absolute top-0 left-0 h-full bg-foreground rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />

                {/* Thumb/Knob - only visible on hover of the container */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full shadow-xl shadow-foreground/20 opacity-0 group-hover/progress:opacity-100 transition-opacity border-2 border-background"
                    style={{ left: `calc(${progress}% - 8px)` }}
                />

                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={(e) => onSeek(parseFloat(e.target.value))}
                    onMouseDown={() => onDragStateChange(true)}
                    onMouseUp={() => onDragStateChange(false)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
            </div>

            <div className="flex justify-between text-[11px] font-black uppercase text-foreground/40 tabular-nums tracking-widest mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
