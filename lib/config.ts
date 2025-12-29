/**
 * @fileoverview Main configuration file.
 * Centralizes site metadata, SEO settings, contact info, author details,
 * feature flags, shelf configurations, and theme settings.
 */

import { Designation, Skill } from "@/data/enums";
import { ShelfType } from "@/types/definitions";

/** Application base path for asset URLs and routing. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Site configuration object.
 * Central configuration for site metadata, author info, SEO, and contact details.
 */
export const siteConfig = {
    name: "Adarsh Anand",
    title: "Adarsh Anand - Software Engineer",
    description:
        "Personal portfolio showcasing my work in software engineering, system design, and security.",
    url: "https://adarshanand.dev",
    author: {
        name: "Adarsh Anand",
        email: "adarshan20302@gmail.com",
        role: Designation.SDE_Trellix,
        location: "India",
        github: "adarshanand67",
        linkedin: "adarshanand67",
    },
    seo: {
        keywords: [
            "Software Engineer",
            Skill.Cpp,
            Skill.SystemDesign,
            Skill.Security,
            "Full Stack Developer",
            "Backend Engineer",
        ],
        ogImage: "/ogImage.png",
        twitterHandle: "@adarshanand67",
    },
    contact: {
        email: "adarshan20302@gmail.com",
        linkedin: "linkedin.com/in/adarshanand67",
        github: "github.com/adarshanand67",
    },
    whoami: {
        user: "Adarsh Anand",
        role: Designation.SDE_Trellix,
        expertise: `${Skill.Cpp}, ${Skill.SystemDesign}, ${Skill.Security}`,
        status: "Online",
    },
} as const;

/** Type definition for site config. */
export type SiteConfig = typeof siteConfig;

/**
 * Feature flags configuration object.
 * Each flag controls the visibility/functionality of a specific feature.
 */
export const featuresConfig = {
    enableBlog: true,
    enableProjects: true,
    enableExperience: true,
    enablePapers: true,
    enableBooks: true,
    enableAnime: true,
    enableHobbies: true,
    enableUses: true,
    enableMusicPlayer: true,
    enableTerminal: true,
    enableMatrixRain: false,
    enableGitHubStats: true,
    enableWeatherWidget: false,
    enableCommandMenu: true,
    enableBackToTop: true,
    enableThemeToggle: true,
    enableSearch: true,
    enableComments: false,
    enableNewsletter: false,
    enableAnalytics: false,
} as const;

/** Type definition for features config. */
export type FeaturesConfig = typeof featuresConfig;

/**
 * Check if a specific feature is enabled.
 * @param {keyof FeaturesConfig} feature - Feature key to check
 * @returns {boolean} Whether the feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeaturesConfig): boolean {
    return featuresConfig[feature];
}

/**
 * Configuration interface for a content shelf.
 */
export interface ShelfConfig {
    title: string;
    description: string;
    command: string;
    searchPlaceholder: string;
    type: ShelfType;
}

/**
 * Shelf configurations mapped by shelf key.
 * Contains settings for all content shelves in the application.
 */
export const shelfConfigs: Record<string, ShelfConfig> = {
    books: {
        title: "Bookshelf",
        description: "A curated collection of books I've read and recommend.",
        command: "ls ~/books",
        searchPlaceholder: "Search books...",
        type: ShelfType.Book,
    },
    articles: {
        title: "Articles",
        description: "Research papers and thoughts on technology.",
        command: "ls ~/articles",
        searchPlaceholder: "Search articles...",
        type: ShelfType.Article,
    },
    anime: {
        title: "Animeshelf",
        description: "Anime series I've watched and enjoyed.",
        command: "ls ~/anime",
        searchPlaceholder: "Search anime & movies...",
        type: ShelfType.Anime,
    },
    blogs: {
        title: "Blogshelf",
        description: "Thoughts, tutorials, and insights on technology.",
        command: 'find ~/blog -type f -name "*.md"',
        searchPlaceholder: "Search blogs...",
        type: ShelfType.Blog,
    },
    hobby: {
        title: "HobbyShelf",
        description: "What I do when I'm not coding.",
        command: "ls -la ~/freetime",
        searchPlaceholder: "Search hobby...",
        type: ShelfType.Hobby,
    },
};

/**
 * Theme configuration object.
 * Controls visual styling including colors, fonts, effects, and animations.
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
