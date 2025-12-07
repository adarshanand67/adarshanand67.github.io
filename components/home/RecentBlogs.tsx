import { getBlogs } from "@/lib/api";
import RecentSection from "./RecentSection";

export default async function RecentBlogs() {
  const blogs = await getBlogs();
  const recentPosts = blogs.slice(0, 4).map((post) => ({
    title: post.title,
    url: `/blogshelf/${post.slug}`,
    date: post.date,
    isExternal: false,
  }));

  return (
    <RecentSection
      title="Recent Blog Posts"
      command="cat ~/blog/recent.md"
      items={recentPosts}
      linkText="Full archive"
      linkUrl="/blogshelf"
    />
  );
}

