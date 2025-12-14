"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useStore } from "@/lib/store/useStore";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";

// --- GlitchLink ---
interface GlitchLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}
export function GlitchLink({ href, children, className = "", onClick }: GlitchLinkProps) {
    return (
        <Link
            href={href}
            className={`relative group inline-block overflow-hidden ${className}`}
            onClick={() => {
                if (onClick) onClick();
            }}
        >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[2px]">
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1 group-hover:translate-x-[2px]"
                aria-hidden="true"
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-2 group-hover:-translate-x-[2px]"
                aria-hidden="true"
            >
                {children}
            </span>
        </Link>
    );
}

// --- GlitchText ---
export const GlitchText = ({ text, className }: { text: string; className?: string }) => {
    return (
        <div className={cn("relative inline-block font-bold group cursor-default", className)}>
            <span className="relative z-10 block">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-70 animate-glitch-1 select-none"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-70 animate-glitch-2 select-none"
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
};

// --- MatrixRain ---
export const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isMatrixEnabled } = useStore();
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        if (!isMatrixEnabled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = new Array(columns).fill(1);
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z";
        const isDark = resolvedTheme === "dark";
        let animationId: number;
        const draw = () => {
            ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = isDark ? "#0F0" : "#15803d";
            ctx.font = "15px monospace";
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text || '', i * 20, drops[i]! * 20);
                if (drops[i]! * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i]!++;
                }
            }
            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, [isMatrixEnabled, resolvedTheme]);
    if (!isMatrixEnabled) return null;
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.1] dark:opacity-[0.4] transition-opacity duration-500"
            aria-hidden="true"
        />
    );
};

// --- SectionHeader ---
interface SectionHeaderProps {
    title: string;
    command: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: ReactNode;
}
export function SectionHeader({
    title,
    command,
    isExpanded,
    onToggle,
    rightElement,
}: SectionHeaderProps) {
    return (
        <div
            className="w-full text-left group mb-3 cursor-pointer"
            onClick={onToggle}
        >
            <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                <span className="text-primary">##</span> {title}
                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                />
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <span className="text-green-500 font-bold">$</span>
                <span>{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
            </div>
        </div>
    );
}

// --- SpotlightCard ---
export const SpotlightCard = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md",
                className
            )}
        >
            <div className="relative h-full">{children}</div>
        </div>
    );
};

// --- TerminalCursor ---
export function TerminalCursor() {
    const {
        cursorPosition,
        setCursorPosition,
        isCursorVisible,
        setIsCursorVisible,
        isCursorClicking,
        setIsCursorClicking,
        isCursorPointer,
        setIsCursorPointer
    } = useStore();

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
            if (!isCursorVisible) setIsCursorVisible(true);
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setIsCursorPointer(isClickable);
        };
        const handleMouseDown = () => setIsCursorClicking(true);
        const handleMouseUp = () => setIsCursorClicking(false);
        document.documentElement.style.cursor = 'none';
        const handleMouseEnter = () => setIsCursorVisible(true);
        const handleMouseLeave = () => setIsCursorVisible(false);
        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.style.cursor = 'auto';
        };
    }, [isCursorVisible, setCursorPosition, setIsCursorVisible, setIsCursorClicking, setIsCursorPointer]);

    if (!isCursorVisible) return null;
    return (
        <div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div
                className={`bg-green-500 transition-all duration-150 ease-out border border-green-400/50 shadow-[0_0_10px_rgba(34,197,94,0.5)] ${isCursorClicking
                    ? "w-3 h-3 scale-90"
                    : isCursorPointer
                        ? "w-6 h-6 rotate-45 opacity-80"
                        : "w-4 h-6 opacity-80 animate-pulse"
                    }`}
            />
        </div>
    );
}
