"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/layout";
import { skillCategories, techLinks } from "@/lib/constants";
import { getTechIcon } from "@/lib/icons";

export function TechStackSection() {
  const { expandedSections, toggleSectionExpanded } = useStore();
  const isExpanded = expandedSections["techstack"] ?? false;

  return (
    <div className="font-mono max-w-6xl mx-auto px-4 md:px-6 mb-4">
      <SectionHeader
        title="Tech Stack"
        isExpanded={isExpanded}
        onToggle={() => toggleSectionExpanded("techstack")}
      />
      <div className={`grid transition-[grid-template-rows] duration-300 ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
            <div className="grid grid-cols-1 gap-2 mt-2">
              {Object.entries(skillCategories).map(([cat, skills]) => (
                <div
                  key={cat}
                  className="group relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300 overflow-hidden"
                >
                  <div className="p-3">
                    <h3 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">
                      {cat}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => {
                        const url = techLinks[skill];
                        const Icon = getTechIcon(skill);

                        return (
                          <Link
                            key={skill}
                            href={url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-full text-xs font-bold hover:bg-foreground/10 transition-all group"
                          >
                            {Icon && (
                              <Icon size={13} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                            )}
                            {skill}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
