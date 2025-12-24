import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackNames, trackImages } from "@/lib/constants";

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
    return (
        <div className="flex gap-4 items-center">
            <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/20 group-hover:scale-105 transition-transform duration-500">
                <Image
                    src={trackImages[index] || "/icon.png"}
                    alt="Album Art"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-black line-clamp-1 text-gray-900 dark:text-white leading-tight tracking-tight">
                    {trackNames[index]}
                </span>
                <span className="text-[10px] text-green-600 dark:text-green-400 font-black mt-0.5 tracking-widest uppercase opacity-70">
                    {siteConfig.author.name}
                </span>
            </div>
            <button
                onClick={onClose}
                className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all shrink-0 hover:scale-110 active:scale-95 group"
                aria-label="Minimize Player"
            >
                <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" />
            </button>
        </div>
    );
}
