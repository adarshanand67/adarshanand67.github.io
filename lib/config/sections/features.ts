/**
 * @fileoverview Feature flags configuration.
 * Controls which features are enabled/disabled across the application.
 */

/**
 * Feature flags configuration object.
 * Each flag controls the visibility/functionality of a specific feature.
 * @constant
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
