import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { basePath } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
    if (path.startsWith(basePath)) {
        return path;
    }
    return `${basePath}${path}`;
}
