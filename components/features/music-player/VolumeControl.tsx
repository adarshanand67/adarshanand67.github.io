import { Volume2, VolumeX } from "lucide-react";

/**
 * Props for VolumeControl component.
 * @interface VolumeControlProps
 * @property {number} volume - Current volume level (0-1)
 * @property {boolean} isMuted - Whether audio is muted
 * @property {Function} onVolumeChange - Callback when volume changes
 * @property {Function} onToggleMute - Callback to toggle mute
 */
interface VolumeControlProps {
    volume: number;
    isMuted: boolean;
    onVolumeChange: (val: number) => void;
    onToggleMute: () => void;
}

/**
 * Volume Control Component - adjustable volume slider with mute toggle.
 * Features visual feedback and mute button.
 * @component
 * @param {VolumeControlProps} props - Component props
 */
export function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }: VolumeControlProps) {
    return (
        <div className="flex items-center gap-4 px-1 group/volume">
            <button
                onClick={onToggleMute}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors shrink-0"
                title={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="flex-1 h-1.5 bg-black/5 dark:bg-white/10 rounded-full relative overflow-hidden border border-black/5 dark:border-white/5">
                <div
                    className="absolute top-0 left-0 h-full bg-gray-500 dark:bg-green-500/80 rounded-full transition-all"
                    style={{ width: `${volume * 100}%` }}
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
            </div>
        </div>
    );
}
