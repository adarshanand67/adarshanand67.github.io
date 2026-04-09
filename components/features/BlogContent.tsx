import { highlightCode } from "@/lib/highlighter";
import Markdown from "markdown-to-jsx";
import React from "react";
import { CopyButton } from "./CopyButton";
import { slugify } from "@/lib/headings";

function nodeToText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (React.isValidElement(node))
    return nodeToText((node.props as { children?: React.ReactNode }).children);
  return "";
}

function HeadingWithId({ as: Tag, children, ...props }: { as: "h1" | "h2" | "h3"; children?: React.ReactNode; [k: string]: unknown }) {
  return <Tag id={slugify(nodeToText(children))} {...(props as object)}>{children}</Tag>;
}

const mdOptions = {
  overrides: {
    h1: { component: HeadingWithId, props: { as: "h1" } },
    h2: { component: HeadingWithId, props: { as: "h2" } },
    h3: { component: HeadingWithId, props: { as: "h3" } },
  },
};

interface Segment {
  type: "text" | "code";
  content: string;
  lang: string;
  highlighted?: string;
}

async function parseMarkdown(raw: string): Promise<Segment[]> {
  const segments: Segment[] = [];
  const fenceRe = /^```(\w*)\n([\s\S]*?)^```/gm;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = fenceRe.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: raw.slice(lastIndex, match.index), lang: "" });
    }
    const lang = match[1] || "text";
    const code = match[2].replace(/\n$/, "");
    const highlighted = await highlightCode(code, lang);
    segments.push({ type: "code", content: code, lang, highlighted });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    segments.push({ type: "text", content: raw.slice(lastIndex), lang: "" });
  }

  return segments;
}

export async function BlogContent({ content }: { content: string }) {
  const segments = await parseMarkdown(content);

  return (
    <div className="content prose dark:prose-invert max-w-none">
      {segments.map((seg, i) => {
        if (seg.type === "code") {
          return (
            <div key={i} className="relative group my-6 rounded-xl overflow-hidden border border-foreground/10">
              <div className="flex items-center justify-between px-4 py-2 bg-foreground/5 border-b border-foreground/10">
                <span className="text-xs font-mono text-foreground/50">{seg.lang}</span>
                <CopyButton code={seg.content} />
              </div>
              <div
                className="shiki-wrapper text-[0.85rem] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: seg.highlighted! }}
              />
            </div>
          );
        }
        return (
          <Markdown key={i} options={mdOptions}>
            {seg.content}
          </Markdown>
        );
      })}
    </div>
  );
}
