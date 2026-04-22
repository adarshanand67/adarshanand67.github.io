import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on and thinking about right now.",
};

export default function NowPage() {
  return (
    <div className="section max-w-3xl mx-auto px-4 mt-12 mb-16 font-mono">
      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
        $ whoami --verbose
      </p>
      <h1 className="text-3xl font-black tracking-tight mb-2">Now</h1>
      <p className="text-xs text-foreground/30 mb-10">
        Last updated: April 2026 — Bengaluru, India
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">
            Work
          </h2>
          <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
            <p>
              Software Development Engineer at{" "}
              <span className="text-foreground font-bold">Trellix</span>, working
              on DLP (Data Loss Prevention) for Windows endpoints.
            </p>
            <p>
              Current focus: integrating third-party IRM vendors (Boldon James,
              Seclore) into the DLP policy enforcement pipeline, and migrating
              the codebase to C++20.
            </p>
            <p>
              Also building out GitHub Actions-based PR automation to reduce
              toil around stale PRs and branch hygiene.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">
            Side Projects
          </h2>
          <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
            <p>
              This website — adding sections, fixing bugs, writing. Treating it
              as a living document rather than a static resume.
            </p>
            <p>
              A{" "}
              <a href="/books" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
                book tracker
              </a>{" "}
              to keep track of what I've read and want to read. Built with Next.js and Tailwind CSS.
            </p>
            <p>
              A{" "}
              <a href="/anime" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
                anime tracker
              </a>{" "}
              for the same reason. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">
            Reading
          </h2>
          <div className="space-y-2 text-sm text-foreground/70 leading-relaxed">
            <p>
              Currently working through the backlog on my{" "}
              <a href="/books" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
                books page
              </a>
              . Reading about systems design and philosophy in parallel.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">
            Watching
          </h2>
          <div className="space-y-2 text-sm text-foreground/70 leading-relaxed">
            <p>
              Keeping up with new anime each season. Full list on my{" "}
              <a href="/anime" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
                anime page
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">
            Thinking About
          </h2>
          <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
            <p>
              The gap between how secure software claims to be and how secure it
              actually is. Most security guarantees are probabilistic and
              context-dependent, but they're sold as binary.
            </p>
            <p>
              How post-quantum cryptography migration will play out in practice
              for enterprise software with decade-long support windows.
            </p>
          </div>
        </section>
      </div>

      <p className="text-xs text-foreground/20 mt-16">
        Inspired by{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground/40 transition-colors"
        >
          nownownow.com
        </a>
      </p>
    </div>
  );
}
