"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

interface Blog {
  date: string;
  title: string;
  slug: string;
}

export default function BlogsClient({ blogs }: { blogs: Blog[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    if (searchQuery.trim() === "") return blogs;
    const query = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) => blog.title.toLowerCase().includes(query) || blog.date.includes(query)
    );
  }, [searchQuery, blogs]);

  // Group blogs by year
  const blogsByYear = filteredBlogs.reduce(
    (acc: Record<string, Blog[]>, blog: Blog) => {
      const year = blog.date.split("-")[0];
      if (!acc[year]) acc[year] = [];
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, Blog[]>
  );

  const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Blogshelf
        <span className="text-gray-500 text-lg ml-2">({filteredBlogs.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        $ find ~/blog -type f -name &quot;*.md&quot;
      </p>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No blogs found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        years.map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-gray-500">##</span> {year}
            </h2>
            <div className="space-y-2">
              {blogsByYear[year].map((post) => (
                <div
                  key={post.slug}
                  className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                    <span className="text-gray-500 text-xs min-w-[80px]">{post.date}</span>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-green-700 dark:text-green-400 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
