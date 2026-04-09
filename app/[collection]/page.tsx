import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBooks, getAnime, getHobby, getArticles } from "@/lib/api";
import { UniversalCollection } from "@/components/collections";
import { collectionConfigs } from "@/lib/config";

const COLLECTION_MAPPING = {
  articles: { api: getArticles, config: collectionConfigs.articles },
  books: { api: getBooks, config: collectionConfigs.books },
  anime: { api: getAnime, config: collectionConfigs.anime },
  hobbies: { api: getHobby, config: collectionConfigs.hobby },
} as const;

type CollectionSlug = keyof typeof COLLECTION_MAPPING;

const META: Record<string, { title: string; description: string }> = {
  articles: { title: "Articles", description: "Technical writing on software engineering, security, and systems programming." },
  books: { title: "Books", description: "Books I've read — engineering, philosophy, and fiction." },
  anime: { title: "Anime", description: "Anime series and films I've watched and enjoyed." },
  hobbies: { title: "Hobbies", description: "What I do outside of work — hobbies and interests." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const m = META[collection];
  return m ? { title: m.title, description: m.description } : {};
}

export async function generateStaticParams() {
  return [
    { collection: "articles" },
    { collection: "books" },
    { collection: "anime" },
    { collection: "hobbies" },
  ];
}

export const dynamicParams = false;

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = COLLECTION_MAPPING[collection as CollectionSlug];

  if (!collectionData) {
    notFound();
  }

  const items = await collectionData.api();
  return <UniversalCollection config={collectionData.config} items={items} />;
}
