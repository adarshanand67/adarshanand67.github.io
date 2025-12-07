"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-background/80 backdrop-blur-md transition-all duration-300"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="navbar-brand flex items-center justify-between w-full md:w-auto">
              <Link
                href="/"
                className="text-2xl font-bold text-foreground font-serif hover:opacity-80 transition-opacity"
              >
                Adarsh Anand
              </Link>
              <button
                className={`md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded="false"
                onClick={() => setIsActive(!isActive)}
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isActive ? "rotate-45 translate-y-2" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isActive ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isActive ? "-rotate-45 -translate-y-2.5" : ""}`}
                  />
                </div>
              </button>
            </div>

            <div
              id="menu"
              className={`absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 md:static md:bg-transparent md:border-none md:flex md:items-center p-4 md:p-0 transition-all duration-200 ${
                isActive ? "opacity-100 visible" : "opacity-0 invisible md:visible md:opacity-100"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1">
                <Link
                  href="/blogs"
                  className="px-4 py-2 font-bold text-lg text-foreground/80 hover:text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                >
                  Blogshelf
                </Link>
                <Link
                  href="/papershelf"
                  className="px-4 py-2 font-bold text-lg text-foreground/80 hover:text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                >
                  Papershelf
                </Link>
                <Link
                  href="/animeshelf"
                  className="px-4 py-2 font-bold text-lg text-foreground/80 hover:text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                >
                  Animeshelf
                </Link>
                <Link
                  href="/bookshelf"
                  className="px-4 py-2 font-bold text-lg text-foreground/80 hover:text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                >
                  Bookshelf
                </Link>

                <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block" />

                <button
                  className="px-4 py-2 flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  onClick={() => document.dispatchEvent(new Event("open-command-menu"))}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden lg:inline text-sm font-medium">Search</span>
                  <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </button>

                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
