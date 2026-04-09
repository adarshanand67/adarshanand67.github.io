import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music",
  description: "Anime soundtrack playlist — stream and discover the tracks I loop while coding.",
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
