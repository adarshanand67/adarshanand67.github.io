import Link from "next/link";
import { getBlogs } from "@/lib/api";

interface Blog {
  date: string;
  title: string;
  slug: string;
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  // Group blogs by year
  const blogsByYear = blogs.reduce((acc: Record<string, Blog[]>, blog: Blog) => {
    const year = blog.date.split("-")[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(blog);
    return acc;
  }, {} as Record<string, Blog[]>);

  const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Blogshelf
        <span className="text-gray-500 text-lg ml-2">({blogs.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        $ ls ~/blog --all
      </p>

      {years.map((year) => (
        <div key={year} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-500">## {year}</h2>
          <ul className="space-y-2 text-sm">
            {blogsByYear[year].map((post) => (
              <li key={post.slug} className="flex items-baseline gap-2">
                <span className="text-gray-500 min-w-[80px]">{post.date}</span>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-green-700 dark:text-green-400 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
