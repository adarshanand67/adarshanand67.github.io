"use client";

import booksData from "@/data/books.json";
import Link from "next/link";
import { ExternalLink, Search, Star } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface Book {
  title: string;
  author: string;
  image?: string;
  notes?: string;
  recommended?: boolean;
  status?: string;
  rating?: number;
}

export default function Bookshelf() {
  const books: Book[] = booksData;
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBooks = useMemo(() => {
    if (searchQuery.trim() === "") return books;
    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
  }, [searchQuery, books]);

  const getAmazonSearchUrl = (title: string, author: string) => {
    const searchQuery = encodeURIComponent(`${title} ${author}`);
    return `https://www.amazon.in/s?k=${searchQuery}`;
  };

  if (!mounted) return null;

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Bookshelf
        <span className="text-gray-500 text-lg ml-2">({filteredBooks.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">$ ls ~/books</p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No books found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        <div className="space-y-2">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                <Link
                  href={getAmazonSearchUrl(book.title, book.author)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 dark:text-green-400 hover:underline flex items-center gap-2 group"
                >
                  {book.title}
                  {book.recommended && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
                  )}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <span className="text-gray-500 text-sm italic">by {book.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
