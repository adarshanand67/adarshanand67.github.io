"use client";

import React from "react";
import Link from "next/link";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/layout";
import { Project } from "@/types/definitions";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export function ProjectsSection({ items }: { items: Project[] }) {
  const { expandedSections, toggleSectionExpanded } = useStore();
  const isExpanded = expandedSections["projects"] ?? true;

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-2 font-mono max-w-6xl mx-auto px-4 md:px-6" id="projects">
      <SectionHeader
        title="Projects"
        isExpanded={isExpanded}
        onToggle={() => toggleSectionExpanded("projects")}
        rightElement={
          <Link
            href={`https://github.com/${items[0]?.url.split("/")[3]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            View all <ExternalLink size={10} />
          </Link>
        }
      />
      <div className={`grid transition-[grid-template-rows] duration-300 ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 overflow-hidden">
            {items.map((project, i) => (
              <Link
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-all duration-300 p-4 md:p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Code2 size={14} className="opacity-40 shrink-0" />
                    <span className="font-black text-sm truncate">{project.name}</span>
                  </div>
                  <ExternalLink
                    size={13}
                    className="opacity-0 group-hover:opacity-40 transition-opacity shrink-0 mt-0.5"
                  />
                </div>

                {project.description && (
                  <p className="text-[11px] text-foreground/60 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                )}

                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50 uppercase tracking-wide"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 mt-auto pt-1 border-t border-foreground/5">
                  {project.language && (
                    <span className="flex items-center gap-1.5 text-[11px] text-foreground/50">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            languageColors[project.language] ?? "#8b949e",
                        }}
                      />
                      {project.language}
                    </span>
                  )}
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-foreground/50">
                      <Star size={11} />
                      {project.stars}
                    </span>
                  )}
                  {project.forks > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-foreground/50">
                      <GitFork size={11} />
                      {project.forks}
                    </span>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
