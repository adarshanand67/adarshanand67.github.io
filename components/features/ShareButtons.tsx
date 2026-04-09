"use client";

import { useState } from "react";
import { Copy, Check, Twitter, Share2 } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url }).catch(() => copy());
    } else {
      copy();
    }
  };

  const tweet = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );

  const hasNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex items-center gap-3 mt-16 pt-8 border-t border-foreground/10">
      <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest mr-1">
        Share
      </span>
      <button
        onClick={tweet}
        aria-label="Share on Twitter"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-foreground/5 hover:bg-foreground/10 transition-colors"
      >
        <Twitter size={13} />
        Twitter
      </button>
      {hasNativeShare ? (
        <button
          onClick={share}
          aria-label="Share via system share sheet"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-foreground/5 hover:bg-foreground/10 transition-colors"
        >
          <Share2 size={13} />
          Share
        </button>
      ) : (
        <button
          onClick={copy}
          aria-label={copied ? "Link copied" : "Copy link"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-foreground/5 hover:bg-foreground/10 transition-colors min-w-[90px]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      )}
    </div>
  );
}
