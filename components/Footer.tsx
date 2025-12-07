import Link from "next/link";
import WeatherWidget from "./WeatherWidget";

export default function Footer() {
  return (
    <footer className="py-12 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-serif font-bold text-xl">Adarsh Anand</span>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} Adarsh Anand. All rights reserved.
          </p>
          <p className="text-zinc-400 dark:text-zinc-600 text-xs mt-1">
            Inspired by{" "}
            <Link
              href="https://arpitbhayani.me"
              target="_blank"
              className="text-green-700 dark:text-green-400 hover:underline"
            >
              Arpit Bhayani
            </Link>
          </p>
          <p className="text-zinc-400 dark:text-zinc-600 text-xs mt-2 hidden md:block">
            Press <kbd className="font-mono">⌘K</kbd> to navigate
          </p>
        </div>

        <div className="flex items-center gap-6">
          <WeatherWidget />
          <Link href="https://github.com/adarshanand67" target="_blank" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/adarshanand67" target="_blank" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
