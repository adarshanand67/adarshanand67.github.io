import { Designation, Skill } from "@/types/definitions";
import { CollectionType } from "@/types/definitions";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
    ogImage: "/images/ogImage.png",
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

export type SiteConfig = typeof siteConfig;

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

export type FeaturesConfig = typeof featuresConfig;

export function isFeatureEnabled(feature: keyof FeaturesConfig): boolean {
  return featuresConfig[feature];
}

export interface CollectionConfig {
  title: string;
  description: string;
  command: string;
  searchPlaceholder: string;
  type: CollectionType;
}

export const collectionConfigs: Record<string, CollectionConfig> = {
  books: {
    title: "Books",
    description: "A curated collection of books I've read and recommend.",
    command: "ls ~/books",
    searchPlaceholder: "Search books...",
    type: CollectionType.Book,
  },
  articles: {
    title: "Articles",
    description: "Research papers and thoughts on technology.",
    command: "ls ~/articles",
    searchPlaceholder: "Search articles...",
    type: CollectionType.Article,
  },
  anime: {
    title: "Anime",
    description: "Anime series I've watched and enjoyed.",
    command: "ls ~/anime",
    searchPlaceholder: "Search anime & movies...",
    type: CollectionType.Anime,
  },
  blogs: {
    title: "Blogs",
    description: "Thoughts, tutorials, and insights on technology.",
    command: 'find ~/blog -type f -name "*.md"',
    searchPlaceholder: "Search blogs...",
    type: CollectionType.Blog,
  },
  hobby: {
    title: "Hobbies",
    description: "What I do when I'm not coding.",
    command: "ls -la ~/freetime",
    searchPlaceholder: "Search hobby...",
    type: CollectionType.Hobby,
  },
};

