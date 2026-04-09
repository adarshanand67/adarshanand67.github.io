"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Tv,
  FileText,
  Github,
  Star,
  GitFork,
  Users,
  Code2,
  Terminal,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  following: number;
  contributions: number | null;
}

interface Props {
  stats: {
    blogs: number;
    books: number;
    anime: number;
    github: string;
  };
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  href?: string;
  color: string;
}) {
  const inner = (
    <div
      className={`group relative glass rounded-2xl p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default ${href ? "cursor-pointer" : ""}`}
    >
      <div className={`inline-flex p-2.5 rounded-xl mb-4 ${color}`}>
        <Icon size={20} />
      </div>
      <div className="text-4xl font-black tracking-tight mb-1">{value}</div>
      <div className="text-sm font-semibold text-foreground/70">{label}</div>
      {sub && (
        <div className="text-xs text-foreground/40 mt-1 font-mono">{sub}</div>
      )}
      {href && (
        <ArrowUpRight
          size={14}
          className="absolute top-4 right-4 text-foreground/20 group-hover:text-foreground/60 transition-colors"
        />
      )}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function GitHubSection({ github }: { github: string }) {
  const [gh, setGh] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch(`https://api.github.com/users/${github}`, { signal })
      .then((r) => r.json())
      .then((data) => {
        if (signal.aborted) return;
        setGh({
          repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          stars: 0,
          contributions: null,
        });
        return fetch(
          `https://api.github.com/users/${github}/repos?per_page=100&type=public`,
          { signal },
        );
      })
      .then((r) => r?.json())
      .then((repos: { stargazers_count?: number }[]) => {
        if (!repos || signal.aborted) return;
        const stars = repos.reduce(
          (acc, r) => acc + (r.stargazers_count ?? 0),
          0,
        );
        setGh((prev) => prev && { ...prev, stars });
      })
      .catch(() => {})
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [github]);

  const ghCards = loading
    ? [
        { icon: Code2, label: "Public Repos", value: "…", color: "bg-blue-500/10 text-blue-500" },
        { icon: Star, label: "Total Stars", value: "…", color: "bg-yellow-500/10 text-yellow-500" },
        { icon: Users, label: "Followers", value: "…", color: "bg-purple-500/10 text-purple-500" },
        { icon: GitFork, label: "Following", value: "…", color: "bg-green-500/10 text-green-500" },
      ]
    : [
        {
          icon: Code2,
          label: "Public Repos",
          value: gh?.repos ?? 0,
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: Star,
          label: "Total Stars",
          value: gh?.stars ?? 0,
          color: "bg-yellow-500/10 text-yellow-500",
        },
        {
          icon: Users,
          label: "Followers",
          value: gh?.followers ?? 0,
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: GitFork,
          label: "Following",
          value: gh?.following ?? 0,
          color: "bg-green-500/10 text-green-500",
        },
      ];

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Github size={18} className="text-foreground/60" />
        <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40">
          GitHub
        </h2>
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-foreground/30 hover:text-foreground/60 transition-colors ml-auto flex items-center gap-1"
        >
          @{github} <ArrowUpRight size={10} />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ghCards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}

export function StatsClient({ stats }: Props) {
  const startDate = new Date("2023-06-01");
  const daysCoding = Math.floor(
    (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const portfolioCards = [
    {
      icon: FileText,
      label: "Blog Posts",
      value: stats.blogs,
      sub: "technical articles",
      href: "/articles",
      color: "bg-foreground/10 text-foreground",
    },
    {
      icon: BookOpen,
      label: "Books Read",
      value: stats.books,
      sub: "and counting",
      href: "/books",
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      icon: Tv,
      label: "Anime Completed",
      value: stats.anime,
      sub: "series & films",
      href: "/anime",
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      icon: Calendar,
      label: "Days Coding",
      value: daysCoding.toLocaleString(),
      sub: "since Jun 2023",
      color: "bg-cyan-500/10 text-cyan-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 mb-20">
      <div className="flex items-center gap-3 mb-2">
        <Terminal size={14} className="text-foreground/40" />
        <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest font-mono">
          cat ~/.stats
        </p>
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-2">Stats</h1>
      <p className="text-sm text-foreground/50 mb-12 font-mono">
        Numbers that tell the story.
      </p>

      <div className="space-y-12">
        {/* Portfolio stats */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-6">
            Portfolio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioCards.map((c) => (
              <StatCard key={c.label} {...c} />
            ))}
          </div>
        </section>

        {/* GitHub stats */}
        <GitHubSection github={stats.github} />

        {/* Tech stack summary */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-6">
            Stack
          </h2>
          <div className="glass rounded-2xl p-6 border border-foreground/10 font-mono text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {[
                ["Primary languages", "C++, Python, TypeScript"],
                ["Systems", "Windows Internals, Intel SGX/TDX"],
                ["Security", "DLP, EDR/XDR, Endpoint Security"],
                ["Web", "Next.js, React, Tailwind CSS"],
                ["AI/ML", "PyTorch, vLLM, OpenVINO, CUDA"],
                ["DevOps", "Docker, K8s, GitHub Actions, AWS"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-foreground/30 shrink-0 w-36">{k}</span>
                  <span className="text-foreground/80">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
