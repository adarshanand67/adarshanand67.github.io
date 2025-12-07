"use client";

import { cn } from "@/lib/utils";

export const GlitchText = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => {
    return (
        <div
            className={cn("relative inline-block font-bold text-white group cursor-default", className)}
        >
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2"
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
};
