"use client";

import React from "react";
import { parseAnsi } from "@/lib/terminal/ansi";

interface TerminalContentProps {
    lines: string[];
    isIntroDone: boolean;
    passwordMode: boolean;
    input: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function TerminalContent({
    lines, isIntroDone, passwordMode, input,
    containerRef, inputRef, handleKeyDown, onChange, onBlur
}: TerminalContentProps) {
    return (
        <div
            ref={containerRef}
            className="p-4 text-gray-800 dark:text-gray-300 h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
            {lines.map((line, i) => (
                <div
                    key={i}
                    className={`whitespace-pre leading-snug tracking-wide ${line.startsWith('$ ') ? 'text-green-600 dark:text-green-400 font-semibold' : ''}`}
                >
                    {line.includes('\x1b[') ? parseAnsi(line) : line}
                </div>
            ))}

            {isIntroDone && (
                <div className="flex items-center">
                    <span className="mr-2 text-green-600 dark:text-green-400 font-bold">$</span>
                    <input
                        ref={inputRef}
                        type={passwordMode ? "password" : "text"}
                        value={input}
                        onBlur={onBlur}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-green-600 dark:text-green-400 flex-grow font-medium focus:ring-0 focus:outline-none"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        placeholder={passwordMode ? "●●●●●●●●" : ""}
                    />
                    {passwordMode && input.length === 0 && (
                        <span className="animate-pulse text-green-600 dark:text-green-400">▊</span>
                    )}
                </div>
            )}
        </div>
    );
}
