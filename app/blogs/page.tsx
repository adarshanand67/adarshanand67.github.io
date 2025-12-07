import { getBlogs } from "@/lib/api";
import BlogsClient from "@/components/BlogsClient";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <BlogsClient blogs={blogs} />;
}
