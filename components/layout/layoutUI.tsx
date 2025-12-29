/**
 * @fileoverview Layout UI components - section headers, status, and spotlight effects.
 */

"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, Clock, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store/useStore";
import { SystemStatusLabel } from "@/data/enums";

// ============================================================================
// SectionHeader Component
// ============================================================================

interface SectionHeaderProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
}

/**
 * Section Header Component - collapsible section header with animated chevron.
 */
export function SectionHeader({ title, isExpanded, onToggle, rightElement }: SectionHeaderProps) {
    return (
        <div className="w-full text-left group mb-2 cursor-pointer" onClick={onToggle}>
            <div className="flex items-center gap-3 mb-1">
                <div
                    className={`h-6 w-1 rounded-full bg-gray-300 dark:bg-zinc-800 transition-all duration-300 ${isExpanded ? "scale-y-100" : "scale-y-50 opacity-50"}`}
                />
                <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight text-gray-900 dark:text-white group-hover:text-foreground transition-colors">
                    {title}
                    <ChevronDown
                        size={20}
                        className={`transition-all duration-500 text-black dark:text-gray-400 ${isExpanded ? "rotate-180" : "-rotate-90 opacity-40 group-hover:opacity-100"}`}
                    />
                </h2>
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </div>
        </div>
    );
}

// ============================================================================
// SpotlightCard Component
// ============================================================================

/**
 * Spotlight Card Component - interactive card with mouse-tracking spotlight effect.
 */
export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(161, 161, 170, 0.08)",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty("--mouse-x", `${x}px`);
        divRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`
                relative overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-800/50 
                bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm transition-all hover:shadow-lg 
                group/spotlight ${className}
            `}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative h-full z-10">{children}</div>
        </div>
    );
};

// ============================================================================
// SystemStatus Component
// ============================================================================

/**
 * System Status Component - displays real-time IST clock, dynamic status, and location.
 */
export function SystemStatus() {
    const [time, setTime] = useState("");
    const [status, setStatus] = useState<SystemStatusLabel>(SystemStatusLabel.Available);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(istTime);

            const hour = now.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                hour12: false,
            });
            const h = parseInt(hour);
            if (h >= 0 && h < 7) setStatus(SystemStatusLabel.Sleeping);
            else if (h >= 9 && h < 18) setStatus(SystemStatusLabel.Coding);
            else setStatus(SystemStatusLabel.Available);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-3 mt-6"
        >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20">
                <Clock size={14} className="text-black dark:text-gray-400" />
                <span className="text-[11px] font-mono font-black text-foreground/60 tabular-nums uppercase tracking-widest">
                    {time} IST
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20">
                <Activity size={14} className="text-black dark:text-gray-400" />
                <span className="text-[11px] font-mono font-black text-foreground/60 uppercase tracking-widest">
                    {status}
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20">
                <MapPin size={14} className="text-black dark:text-gray-400" />
                <span className="text-[11px] font-mono font-black text-foreground/60 uppercase tracking-widest">
                    Bengaluru, IN
                </span>
            </div>
        </motion.div>
    );
}
