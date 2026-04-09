"use client";

import { useEffect, useRef, useState } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/lib/headings";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-10% 0% -80% 0%", threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden xl:block fixed top-32 right-8 w-52 max-h-[60vh] overflow-y-auto text-xs"
      >
        <p className="font-bold uppercase tracking-widest text-foreground/30 mb-3 text-[10px]">
          On this page
        </p>
        <ul className="space-y-1.5">
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
              <a
                href={`#${id}`}
                className={`block transition-colors leading-snug hover:text-foreground ${
                  activeId === id
                    ? "text-foreground font-semibold"
                    : "text-foreground/40"
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: floating toggle */}
      <div className="xl:hidden fixed bottom-24 left-4 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Table of contents"
          className="w-10 h-10 bg-background border border-foreground/10 rounded-full shadow-lg flex items-center justify-center"
        >
          <List size={16} />
        </button>
        {open && (
          <nav
            aria-label="Table of contents"
            className="absolute bottom-12 left-0 w-64 bg-background border border-foreground/10 rounded-2xl shadow-xl p-4 text-xs animate-scale-in"
          >
            <p className="font-bold uppercase tracking-widest text-foreground/30 mb-3 text-[10px]">
              On this page
            </p>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {headings.map(({ id, text, level }) => (
                <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block transition-colors leading-snug hover:text-foreground ${
                      activeId === id
                        ? "text-foreground font-semibold"
                        : "text-foreground/40"
                    }`}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
