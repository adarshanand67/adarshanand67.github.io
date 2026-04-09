"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { useStore } from "@/lib/store";
import { Profile, Blog, Project } from "@/types/definitions";
import { isFeatureEnabled } from "@/lib/config";

// Dynamic Imports
const CommandMenu = dynamic(
  () =>
    import("@/components/layout/CommandMenu").then((mod) => mod.CommandMenu),
  { ssr: false },
);
const MusicToggleButton = dynamic(
  () => import("@/components/features").then((mod) => mod.MusicToggleButton),
  { ssr: false },
);
const MobileDock = dynamic(
  () => import("@/components/layout/MobileDock").then((mod) => mod.MobileDock),
  { ssr: false },
);
const TerminalPreloader = dynamic(
  () =>
    import("@/components/layout/TerminalPreloader").then(
      (mod) => mod.TerminalPreloader,
    ),
  { ssr: false },
);
const DLPProtection = dynamic(
  () => import("@/components/features").then((mod) => mod.DLPProtection),
  { ssr: false },
);
const HobbiesModal = dynamic(
  () => import("@/components/modals").then((mod) => mod.HobbiesModal),
  { ssr: false },
);
const ShortcutGuide = dynamic(
  () => import("@/components/features").then((mod) => mod.ShortcutGuide),
  { ssr: false },
);
const ScrollProgress = dynamic(
  () => import("@/components/ui").then((mod) => mod.ScrollProgress),
  { ssr: false },
);
const BackToTop = dynamic(
  () => import("@/components/ui").then((mod) => mod.BackToTop),
  { ssr: false },
);
const MusicPlayer = dynamic(
  () => import("@/components/features").then((mod) => mod.MusicPlayer),
  { ssr: false },
);

// Component Imports
import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  ExperienceSection,
  ProjectsSection,
  RecentSection,
  TechStackSection,
  ContactSection,
} from "@/components/sections";

export function ClientLayout({
  children,
  profile,
  experience,
  recentPosts,
  projects,
}: {
  children: React.ReactNode;
  profile: Profile;
  experience: any[];
  recentPosts: Blog[];
  projects: Project[];
}) {
  const { setIsMounted } = useStore();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-foreground/20 selection:text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      <DLPProtection />
      <ScrollProgress />
      <Navbar />

      {isFeatureEnabled("enableCommandMenu") && <CommandMenu blogs={recentPosts} />}
      {isFeatureEnabled("enableTerminal") && <TerminalPreloader />}
      <MobileDock />
      <ShortcutGuide />

      <main id="main-content" className="relative z-10 min-h-screen flex flex-col">
        {isHome ? (
          <>
            <Hero profile={profile} />
            <div className="space-y-4 pb-20">
              {isFeatureEnabled("enableExperience") && (
                <ExperienceSection items={experience} />
              )}

              {isFeatureEnabled("enableProjects") && (
                <ProjectsSection items={projects} />
              )}

              {recentPosts.length > 0 && (
                <RecentSection
                  title="Recent Posts"
                  command='find ~/blog -name "*.md" | head -3'
                  items={recentPosts.map((p) => ({ title: p.title, date: p.date, url: `/articles/${p.slug}` }))}
                  linkText="All articles →"
                  linkUrl="/articles"
                />
              )}

              <TechStackSection />
              <ContactSection />
            </div>
          </>
        ) : (
          <div className="pt-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        )}
      </main>

      <Footer />

      {isFeatureEnabled("enableBackToTop") && <BackToTop />}

      {isFeatureEnabled("enableMusicPlayer") && (
        <>
          <MusicPlayer />
          <MusicToggleButton />
        </>
      )}

      <HobbiesModal />
    </div>
  );
}
