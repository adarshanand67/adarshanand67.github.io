"use client";

import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("lang-", "") ?? "text";

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-foreground/10">
      <div className="flex items-center justify-between px-4 py-2 bg-foreground/5 border-b border-foreground/10">
        <span className="text-xs font-mono text-foreground/50">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/80 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={resolvedTheme === "dark" ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.85rem",
          lineHeight: "1.6",
          background: "transparent",
        }}
        showLineNumbers={children.split("\n").length > 5}
        wrapLines
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="content prose dark:prose-invert max-w-none">
      <Markdown
        options={{
          overrides: {
            code: {
              component: CodeBlock,
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
