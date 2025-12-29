// Consolidated layout exports
export { Hero } from "./hero";
export { Experience } from "./experience";
export { TechStack } from "./techStack";
export { ShelvesSection } from "./shelves";
export { RecentSection } from "./recent";
export { ContactSection } from "./contact";
export { Terminal, TerminalPreloader } from "./terminal";
export { Navbar, Footer, MobileDock, CommandMenu } from "./navbar";

// Re-export from submodules that are already lean or needed
export * from "./effects";
export { ThemeProvider, ThemeToggle, ClientLinkedin, ClientGithub, ClientMail } from "./theme";
export { SectionHeader, SpotlightCard, SystemStatus } from "./ui";
