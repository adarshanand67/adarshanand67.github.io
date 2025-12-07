import Link from "next/link";
import { getPapers } from "@/lib/api";

export default async function Papershelf() {
  const papers = await getPapers();

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Papershelf
        <span className="text-gray-500 text-lg ml-2">({papers.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        $ cat ~/papers/reading_list.md
      </p>

      <ul className="space-y-2 text-sm">
        {papers.map((paper: { title: string; url: string }, index: number) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-gray-500">-</span>
            <Link
              href={paper.url}
              target="_blank"
              className="text-green-700 dark:text-green-400 hover:underline"
            >
              {paper.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
