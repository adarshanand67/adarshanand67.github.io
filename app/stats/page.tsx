import type { Metadata } from "next";
import { StatsClient } from "./StatsClient";
import { booksData } from "@/data/books";
import { anime, movies } from "@/data/anime";
import { getBlogs } from "@/lib/api";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Stats",
  description: "Numbers that tell the story — GitHub activity, books read, anime watched, and more.",
};

export const dynamic = "force-static";

export default async function StatsPage() {
  const [blogs] = await Promise.all([getBlogs()]);

  const allAnime = [...anime, ...movies];
  const completedAnime = allAnime.filter(
    (a) => a.status === "Completed",
  ).length;

  const stats = {
    blogs: blogs.length,
    books: booksData.length,
    anime: completedAnime,
    github: siteConfig.author.github,
  };

  return <StatsClient stats={stats} />;
}
