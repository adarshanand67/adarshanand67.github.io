import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { basePath, techLinks } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  if (path.startsWith(basePath)) return path;
  return `${basePath}${path}`;
}

const bookGradients = [
  "from-red-900 to-red-950",
  "from-blue-900 to-blue-950",
  "from-green-900 to-green-950",
  "from-amber-900 to-amber-950",
  "from-slate-800 to-slate-900",
  "from-purple-900 to-purple-950",
  "from-indigo-900 to-indigo-950",
  "from-rose-900 to-rose-950",
];

function titleHash(title: string) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = title.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

export const getBookStyle = (title: string) =>
  ["bg-red-900","bg-blue-900","bg-green-900","bg-amber-900","bg-slate-800","bg-purple-900","bg-indigo-900","bg-rose-900"][titleHash(title) % 8];

export const getBookGradient = (title: string) => bookGradients[titleHash(title) % bookGradients.length];

export class AppError extends Error {
  constructor(message: string, public code?: string, public statusCode?: number) {
    super(message);
    this.name = "AppError";
  }
}

export async function safeAsync<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

export function logError(error: Error, context?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error);
    if (context) console.error("Context:", context);
  } else {
    console.error(error.message);
  }
}

export function getErrorMessage(error: unknown, fallback = "An error occurred"): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
}

export function linkifyTech(text: string): string {
  let result = text;
  const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);
  for (const tech of sortedTechs) {
    const url = techLinks[tech];
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(
      new RegExp(`(?<!<a[^>]*>)\\b(${escaped})\\b(?![^<]*<\\/a>)`, "gi"),
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-bold text-neutral-900 dark:!text-white underline decoration-neutral-900/30 dark:decoration-white/50 hover:decoration-neutral-900 dark:hover:decoration-white hover:decoration-2 underline-offset-2 transition-all group/link text-xs">${tech}<span class="inline-block transform transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover/link:opacity-100 text-neutral-900 dark:text-white"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></span></a>`,
    );
  }
  return result;
}

export function parseAnsi(text: string) {
  if (!text) return text;
  const colors: Record<string, string> = {
    "30": "text-black dark:text-gray-900", "31": "text-red-500", "32": "text-green-500",
    "33": "text-yellow-500", "34": "text-blue-500", "35": "text-purple-500",
    "36": "text-cyan-500", "37": "text-white dark:text-gray-100", "90": "text-gray-500", "1": "font-bold",
  };
  return text
    .replace(/\x1b\[(\d+)m/g, (_, code) => code === "0" ? "</span>" : colors[code] ? `<span class="${colors[code]}">` : "")
    .replace(/\x1b\[.*?m/g, "");
}
