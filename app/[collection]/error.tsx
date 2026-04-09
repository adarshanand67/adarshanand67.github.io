"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function CollectionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 mt-20 text-center font-mono">
      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
        $ cat /var/log/error.log
      </p>
      <h1 className="text-4xl font-black tracking-tighter mb-3">
        Failed to load
      </h1>
      <p className="text-sm text-foreground/50 mb-8">
        {error.message || "Something went wrong loading this collection."}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-80 transition-opacity"
        >
          <RefreshCw size={14} />
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-foreground/5 border border-foreground/10 rounded-xl text-sm font-bold hover:bg-foreground/10 transition-colors"
        >
          ~/home
        </Link>
      </div>
    </div>
  );
}
