// Centralized configuration constants
export const CONFIG = {
    // Deployment
    BASE_PATH: "",

    // Audio
    AUDIO: {
        AUTOPLAY_DELAY_MS: 1000,
        VOLUME_STEP: 0.1,
        MIN_VOLUME: 0,
        MAX_VOLUME: 1,
        DEFAULT_VOLUME: 0.5,
    },

    // Z-Index layers
    Z_INDEX: {
        NAVBAR: 50,
        MUSIC_PLAYER: 50,
        MODAL: 60,
        TOOLTIP: 70,
        MATRIX_RAIN: 40,
        TERMINAL_CURSOR: 50,
    },

    // Animation durations (ms)
    ANIMATION: {
        FAST: 150,
        NORMAL: 300,
        SLOW: 500,
    },

    // Breakpoints (matches Tailwind)
    BREAKPOINTS: {
        SM: 640,
        MD: 768,
        LG: 1024,
        XL: 1280,
    },
} as const;
