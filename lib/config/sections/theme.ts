/**
 * @fileoverview Theme configuration.
 * Defines color schemes, fonts, effects, and animation settings.
 */

/**
 * Theme configuration object.
 * Controls visual styling including colors, fonts, effects, and animations.
 * @constant
 */
export const themeConfig = {
    colors: {
        primary: "#00bf40",
        primaryDark: "#22c55e",
        accent: "#15803d",
        background: {
            light: "#f0f0f0",
            dark: "#050505",
        },
        foreground: {
            light: "#111111",
            dark: "#e0e0e0",
        },
    },
    fonts: {
        sans: "Assistant",
        mono: "JetBrains Mono",
        serif: "var(--font-mono)",
    },
    effects: {
        matrixRain: false,
        glitchText: true,
        terminalCursor: true,
        glassmorphism: true,
    },
    animations: {
        enablePageTransitions: false,
        enableScrollAnimations: false,
        enableHoverEffects: true,
    },
} as const;

/** Type definition for theme config. */
export type ThemeConfig = typeof themeConfig;
