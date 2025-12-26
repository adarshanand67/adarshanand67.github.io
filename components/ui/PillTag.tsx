/**
 * @fileoverview Pill Tag Component - reusable pill-shaped tag button.
 * Provides consistent styling for tags across the application.
 */

import React from "react";

/**
 * Props for PillTag component.
 */
interface PillTagProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
    variant?: "default" | "filter";
}

/**
 * Pill Tag Component - clean black/white pill-shaped tag button.
 */
export function PillTag({ label, selected = false, onClick, variant = "default" }: PillTagProps) {
    // Base styles
    const baseClasses =
        "px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap";

    // Proper contrast: dark bg with light text when unselected, light bg with dark text when selected
    const variantClasses = selected
        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md scale-105"
        : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200";

    const classes = `${baseClasses} ${variantClasses}`;

    if (onClick) {
        return (
            <button onClick={onClick} className={classes}>
                {label}
            </button>
        );
    }

    return <span className={classes}>{label}</span>;
}
