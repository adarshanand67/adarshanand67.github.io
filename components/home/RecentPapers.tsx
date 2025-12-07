import { getPapers } from "@/lib/api";
import RecentSection from "./RecentSection";

export default async function RecentPapers() {
  const papers = await getPapers();
  const recentPapers = papers.slice(0, 5).map((paper: { title: string; url: string }) => ({
    title: paper.title,
    url: paper.url,
    isExternal: true,
  }));

  return (
    <RecentSection
      title="Recent Papers"
      command="ls ~/papers --recent"
      items={recentPapers}
      linkText="Papershelf"
      linkUrl="/papershelf"
    />
  );
}

