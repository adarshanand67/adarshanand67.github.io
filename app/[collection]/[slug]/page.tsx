import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getPost, getBlogs } from "@/lib/api";
import { ReadingProgress, BlogContent, ShareButtons } from "@/components/features";
import { StructuredData } from "@/components/seo";
import { generateBlogPostSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({
    collection: "articles",
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { collection: string; slug: string };
}): Promise<Metadata> {
  const { collection, slug } = await params;
  if (collection !== "articles") return {};
  const blogs = await getBlogs();
  const meta = blogs.find((b) => b.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.excerpt ?? `${meta.title} — ${siteConfig.name}`,
    openGraph: {
      title: meta.title,
      description: meta.excerpt ?? meta.title,
      type: "article",
      publishedTime: meta.date,
      authors: [siteConfig.author.name],
    },
  };
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function GenericCollectionItem({
  params,
}: {
  params: { collection: string; slug: string };
}) {
  const { collection, slug } = await params;
  if (collection !== "articles") notFound();

  const [content, blogs] = await Promise.all([getPost(slug), getBlogs()]);
  const meta = blogs.find((b) => b.slug === slug);
  if (!content || !meta) notFound();

  const mins = readingTime(content);

  return (
    <div className="max-w-3xl mx-auto px-4 mt-8 mb-20">
      <StructuredData data={generateBlogPostSchema({ title: meta.title, date: meta.date, excerpt: meta.excerpt ?? "", slug })} />
      <ReadingProgress />

      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-10 font-mono"
      >
        <ArrowLeft size={14} />
        All articles
      </Link>

      <h1 className="text-4xl font-bold mb-3 leading-tight">{meta.title}</h1>

      <div className="flex items-center gap-4 text-sm text-foreground/50 font-mono mb-12">
        <span>{meta.date}</span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {mins} min read
        </span>
      </div>

      <BlogContent content={content} />
      <ShareButtons
        url={`${siteConfig.url}/articles/${slug}`}
        title={meta.title}
      />
    </div>
  );
}
