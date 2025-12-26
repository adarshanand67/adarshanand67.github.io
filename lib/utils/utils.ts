/**
 * @fileoverview Utility functions for asset path handling.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { basePath } from "@/lib/constants";

/**
 * Merges class names with Tailwind CSS conflict resolution.
 *
 * @param {ClassValue[]} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a relative asset path to an absolute path with basePath prefix.
 *
 * @param {string} path - Relative or absolute asset path
 * @returns {string} Absolute path with basePath prefix
 *
 * @example
 * ```ts
 * getAssetPath("/logo.png") // Returns "/basePath/logo.png"
 * ```
 */
export function getAssetPath(path: string): string {
    if (path.startsWith(basePath)) {
        return path;
    }
    return `${basePath}${path}`;
}
