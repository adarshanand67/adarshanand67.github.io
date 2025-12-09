export const PLAYLIST = [
    "https://archive.org/download/tvtunes_30971/One%20Punch%20Man.mp3",
    "https://archive.org/download/fav-mikezillak/Pokemon%20Theme%20-%20Billy%20Crawford.mp3",
    "https://archive.org/download/cowboy-bebop-tank-the-best/Tank!%20(TV%20stretch).mp3",
    "https://archive.org/download/mythium/JLS_ATI.mp3",
] as const;

export const TRACK_NAMES = [
    "A Cruel Angel's Thesis",
    "THE HERO!! (One Punch Man)",
    "Tank! (Cowboy Bebop)",
    "Lofi Chill Session",
] as const;

export const INTRO_LINES = (toLeet: (t: string) => string) => [
    "> ./adarsh_profile.sh",
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

export const CONTACT_INFO = [
    "Email: adarshan20302@gmail.com",
    "LinkedIn: linkedin.com/in/adarshanand67",
    "GitHub: github.com/adarshanand67"
] as const;

export const SYSTEM_STATS = (isMatrix: boolean) => [
    "       Adarsh's Portfolio",
    "       ------------------",
    "OS:     Mac OS X (simulated)",
    "Host:   Personal Website",
    "Kernel: Next.js 16",
    "Uptime: Forever",
    "Shell:  Zsh (React)",
    "Theme:  Cyberpunk",
    `Matrix: ${isMatrix ? "Active" : "Disabled"}`
] as const;

export const WHOAMI_INFO = [
    "User: Adarsh Anand",
    "Role: SDE @ Trellix",
    "Expertise: C++, System Design, Security",
    "Status: Online"
] as const;
