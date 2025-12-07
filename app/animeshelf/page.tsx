"use client";

import entertainmentData from "@/data/entertainment.json";
import { Star, Search } from "lucide-react";
import { useState, useMemo } from "react";

interface EntertainmentItem {
  title: string;
  type: string;
  status: string;
  notes?: string;
  recommended?: boolean;
}

export default function AnimeShelf() {
  const items: EntertainmentItem[] = entertainmentData;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (searchQuery.trim() === "") return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.notes?.toLowerCase().includes(query) ?? false)
    );
  }, [searchQuery, items]);

  const anime = filteredItems.filter((item) => item.type === "Anime");
  const movies = filteredItems.filter((item) => item.type === "Movie");

  const Card = ({ item }: { item: EntertainmentItem }) => (
    <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors py-2">
      <div className="flex items-start gap-2">
        <span className="font-bold text-sm">{item.title}</span>
        {item.recommended && (
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5" />
        )}
      </div>
      {item.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.notes}</p>}
      <span
        className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${item.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"}`}
      >
        {item.status}
      </span>
    </div>
  );

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Animeshelf
        <span className="text-gray-500 text-lg ml-2">({filteredItems.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">$ ls ~/anime ~/movies</p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anime or movies..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No items found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        <>
          {/* Anime */}
          {anime.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                Anime <span className="text-gray-400 text-lg">({anime.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {anime.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Movies */}
          {movies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                Movies <span className="text-gray-400 text-lg">({movies.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {movies.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
