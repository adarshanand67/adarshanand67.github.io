import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { tracks } from "@/lib/constants";

/**
 * Props for TrackInfo component.
 * @interface TrackInfoProps
 * @property {number} index - Current track index in playlist
 * @property {Function} onClose - Callback to close/minimize music player
 */
interface TrackInfoProps {
    index: number;
    onClose: () => void;
}

/**
 * Track Info Component - displays current track metadata and album art.
 * Shows track name, artist, and album artwork with close button.
 * @component
 * @param {TrackInfoProps} props - Component props
 */
export function TrackInfo({ index, onClose }: TrackInfoProps) {
    const track = tracks[index];

    return (
        <div className="flex gap-4 items-center">
            <div className="relative w-20 h-20 shrink-0 rounded-[1.5rem] overflow-hidden shadow-xl border border-foreground/10 group-hover:scale-105 transition-all duration-700">
                <Image
                    src={track?.image || "/icon.png"}
                    alt="Album Art"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-lg font-black line-clamp-1 text-foreground leading-tight tracking-tighter">
                    {track?.title}
                </span>
                <span className="text-xs text-foreground/40 font-bold mt-0.5 line-clamp-1 uppercase tracking-[0.2em]">
                    {track?.artist}
                </span>
            </div>
            <button
                onClick={onClose}
                className="p-1.5 hover:bg-foreground/5 rounded-full transition-all shrink-0 hover:scale-110 active:scale-90 group/close"
                aria-label="Minimize Player"
            >
                <ChevronDown
                    size={20}
                    className="text-foreground/20 group-hover/close:text-foreground transition-colors"
                />
            </button>
        </div>
    );
}
