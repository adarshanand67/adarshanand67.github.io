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
        <div className="flex gap-6 items-center">
            <div className="relative w-24 h-24 shrink-0 rounded-[2rem] overflow-hidden shadow-2xl border border-foreground/10 group-hover:scale-105 transition-transform duration-700">
                <Image
                    src={track?.image || "/icon.png"}
                    alt="Album Art"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xl font-black line-clamp-1 text-foreground leading-tight tracking-tighter">
                    {track?.title}
                </span>
                <span className="text-sm text-foreground/50 font-bold mt-1 line-clamp-1 uppercase tracking-widest">
                    {track?.artist}
                </span>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-foreground/5 rounded-full transition-all shrink-0 hover:scale-110 active:scale-90 group"
                aria-label="Minimize Player"
            >
                <ChevronDown
                    size={24}
                    className="text-foreground/40 group-hover:text-foreground transition-colors"
                />
            </button>
        </div>
    );
}
