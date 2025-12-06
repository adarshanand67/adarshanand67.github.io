import Link from "next/link";
import WeatherWidget from "./WeatherWidget";

export default function Footer() {
  return (
    <footer className="py-12 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-serif font-bold text-xl">Adarsh Anand</span>
          <span className="text-gray-500 text-sm">© {new Date().getFullYear()} All rights reserved.</span>
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
