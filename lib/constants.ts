import { siteConfig } from "@/config";
import { CONFIG } from "./config";

// Re-export for backward compatibility
export const BASE_PATH = CONFIG.BASE_PATH;

export const PLAYLIST = [
    `${BASE_PATH}/assets/music/cruel_angels_thesis.mp3`,
    `${BASE_PATH}/assets/music/one_punch_man.mp3`,
    `${BASE_PATH}/assets/music/pokemon_theme.mp3`,
    `${BASE_PATH}/assets/music/tank.mp3`,
    `${BASE_PATH}/assets/music/unravel.mp3`,
    `${BASE_PATH}/assets/music/battlecry.mp3`,
    `${BASE_PATH}/assets/music/blue_bird.mp3`,
    `${BASE_PATH}/assets/music/go.mp3`,
    `${BASE_PATH}/assets/music/the_world.mp3`,
    `${BASE_PATH}/assets/music/guren_no_yumiya.mp3`
] as const;

export const TRACK_NAMES = [
    "A Cruel Angel's Thesis (Evangelion)",
    "THE HERO!! (One Punch Man)",
    "Pokemon Theme (Instrumental)",
    "Tank! (Cowboy Bebop)",
    "Unravel (Tokyo Ghoul)",
    "Battlecry (Samurai Champloo)",
    "Blue Bird (Naruto)",
    "GO!!! (Naruto)",
    "The World (Death Note)",
    "Guren no Yumiya (Attack on Titan)",
] as const;

export const TRACK_IMAGES = [
    "https://m.media-amazon.com/images/M/MV5BYTlhNzJjYzYtNGU3My00ZDNiLWEyZjItYTdiOTIxOTc1YWQ0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg", // Evangelion
    "https://m.media-amazon.com/images/M/MV5BZjJlNzE5YzEtYzQwYS00NTBjLTk5YzEtYWQ3ZTI5YjgzNzNhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg", // One Punch Man
    "https://m.media-amazon.com/images/M/MV5BNDc2NjdmMjItZjlkNy00NjZjLTk0NjUtODZkMjRkMjNlMmRjXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_.jpg", // Pokemon
    "https://m.media-amazon.com/images/M/MV5BNzJlNGNkNDctMjcwYy00YjkzLTk3YjMtNGRjN2Y1ZWY4NzJiXkEyXkFqcGdeQXVyNjI4OTE5OTM@._V1_.jpg", // Cowboy Bebop
    "https://m.media-amazon.com/images/M/MV5BYjg3YjM3MGEtNTZkOS00ZDQ5LWFkN2YtOWFjMGE5MWMyYzZjXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg", // Tokyo Ghoul
    "https://m.media-amazon.com/images/M/MV5BNTBjZTJmNTctYTZkYS00ZmJhLWFkOTgtNjgzMzZmMjJiNzJlXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg", // Samurai Champloo
    "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg", // Naruto
    "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg", // Naruto
    "https://m.media-amazon.com/images/M/MV5BNzhiYjY3ZjUtZWJkMi00ZWNiLWFjNGMtNjkwZjMyNWJiMzRhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg", // Death Note
    "https://m.media-amazon.com/images/M/MV5BNzc5MTczNjQtOWFkNS00MjJmLWJiMzYtZjhjMDk5NTI2NmM5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg", // Attack on Titan
] as const;

export const INTRO_LINES = (toLeet: (t: string) => string) => [
    `> ./${siteConfig.author.name.toLowerCase().replace(' ', '_')}_profile.sh`,
    "> Initializing SDE protocol...",
    "> Loading modules: C++, Make, Git...",
    `> Access granted :${toLeet("Type 'help' for commands.")}`,
] as const;

export const DIRECTORIES = ["blogs", "papers", "books", "anime", "HobbyShelf"] as const;

export const ROUTES = {
    HOME: "/",
    BLOG_SHELF: "/blogshelf",
    PAPER_SHELF: "/papershelf",
    BOOK_SHELF: "/bookshelf",
    ANIME_SHELF: "/animeshelf",
    HOBBY_SHELF: "/HobbyShelf", // CamelCase as requested
} as const;

export const DIRECTORY_MAP: Record<string, string> = {
    blog: ROUTES.BLOG_SHELF,
    blogs: ROUTES.BLOG_SHELF,
    paper: ROUTES.PAPER_SHELF,
    papers: ROUTES.PAPER_SHELF,
    book: ROUTES.BOOK_SHELF,
    books: ROUTES.BOOK_SHELF,
    anime: ROUTES.ANIME_SHELF,
    animes: ROUTES.ANIME_SHELF,
    hobby: ROUTES.HOBBY_SHELF,
    hobbies: ROUTES.HOBBY_SHELF,
    HobbyShelf: ROUTES.HOBBY_SHELF,
    home: ROUTES.HOME,
    "~": ROUTES.HOME,
    ".": ROUTES.HOME,
};

// Contact info from config
export const CONTACT_INFO = [
    `Email: ${siteConfig.contact.email}`,
    `LinkedIn: ${siteConfig.contact.linkedin}`,
    `GitHub: ${siteConfig.contact.github}`
] as const;

export const SYSTEM_STATS = (isMatrix: boolean) => [
    `       ${siteConfig.name}'s Portfolio`,
    "       ------------------",
    "OS:     Mac OS X (simulated)",
    "Host:   Personal Website",
    "Kernel: Next.js 16",
    "Uptime: Forever",
    "Shell:  Zsh (React)",
    "Theme:  Cyberpunk",
    `Matrix: ${isMatrix ? "Active" : "Disabled"}`
] as const;

// Whoami info from config
export const WHOAMI_INFO = [
    `User: ${siteConfig.whoami.user}`,
    `Role: ${siteConfig.whoami.role}`,
    `Expertise: ${siteConfig.whoami.expertise}`,
    `Status: ${siteConfig.whoami.status}`
] as const;
