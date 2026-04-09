export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function parseHeadings(markdown: string): Heading[] {
  const headingRe = /^(#{1,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRe.exec(markdown)) !== null) {
    const text = match[2].replace(/\*\*/g, "").replace(/`/g, "");
    headings.push({ level: match[1].length, text, id: slugify(text) });
  }
  return headings;
}
