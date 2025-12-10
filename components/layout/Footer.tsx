import Link from "next/link";
import WeatherWidget from "@/components/widgets/WeatherWidget";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-gray-200/50 dark:border-gray-800/50 mt-auto font-mono overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent dark:from-gray-900/50 dark:to-transparent pointer-events-none"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-sm">
          {/* Terminal prompt */}
          <div className="mb-6 group">
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-green-500 font-bold group-hover:scale-110 transition-transform">$</span>
              <span className="opacity-75">cat ~/footer.txt</span>
              <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle ml-1"></span>
            </p>
          </div>

          {/* Copyright with gradient */}
          <p className="mb-6 text-gray-700 dark:text-gray-300 font-medium">
            <span className="text-gray-500 mr-2">©</span>
            {new Date().getFullYear()}
            <span className="ml-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent font-bold">
              Adarsh Anand
            </span>
          </p>

          {/* Links section with enhanced styling */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-green-500 font-bold">→</span>

            <Link
              href="https://github.com/adarshanand67"
              target="_blank"
              className="group relative inline-flex items-center gap-1 text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
            >
              <span className="relative">
                GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <span className="text-gray-400">•</span>

            <Link
              href="https://linkedin.com/in/adarshanand67"
              target="_blank"
              className="group relative inline-flex items-center gap-1 text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
            >
              <span className="relative">
                LinkedIn
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <span className="text-gray-400">•</span>

            <span className="text-gray-500 text-xs flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
              <span className="opacity-75">Inspired by</span>
              <Link
                href="https://arpitbhayani.me"
                target="_blank"
                className="text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium transition-colors"
              >
                arpitbhayani.me
              </Link>
            </span>

            <span className="text-gray-400">•</span>

            <div className="flex items-center">
              <WeatherWidget />
            </div>
          </div>

          {/* Keyboard shortcut hint with modern design */}
          <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 group">
              <span className="opacity-75">Press</span>
              <kbd className="px-2 py-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:scale-105 transition-transform">
                ⌘K
              </kbd>
              <span className="opacity-75">to navigate</span>
              <span className="ml-2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
            </p>
          </div>

          {/* Made with love badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">♥</span>
            <span>and</span>
            <span className="text-green-500">⚡</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
