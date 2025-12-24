/**
 * @fileoverview Main configuration barrel - re-exports all config sections.
 */

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export * from "./config/sections/site";
export * from "./config/sections/theme";
export * from "./config/sections/features";
export * from "./config/sections/shelves";
