import { getBlogs } from "@/lib/api";
import UniversalShelf from "@/components/shelves/UniversalShelf";
import { shelfConfigs } from "@/config/shelves";
export default async function Blogshelf() {
  const blogs = await getBlogs();
  return <UniversalShelf config={shelfConfigs.blogs!} items={blogs} />;
}
