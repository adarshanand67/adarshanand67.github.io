import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-mono">
      <div className="max-w-lg w-full">
        <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
          $ cat /dev/null
        </p>
        <h1 className="text-8xl font-black tracking-tighter mb-2">404</h1>
        <div className="h-px w-full bg-foreground/10 mb-6" />
        <h2 className="text-xl font-bold mb-3">Page not found</h2>
        <p className="text-sm text-foreground/50 mb-8 leading-relaxed">
          The path you followed leads nowhere.
          <br />
          <span className="text-foreground/30">
            No file or directory at this location.
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-80 transition-opacity"
          >
            ~/home
          </Link>
          <Link
            href="/articles"
            className="px-5 py-2.5 bg-foreground/5 border border-foreground/10 text-foreground rounded-xl text-sm font-bold hover:bg-foreground/10 transition-colors"
          >
            ~/articles
          </Link>
          <Link
            href="/now"
            className="px-5 py-2.5 bg-foreground/5 border border-foreground/10 text-foreground rounded-xl text-sm font-bold hover:bg-foreground/10 transition-colors"
          >
            ~/now
          </Link>
        </div>
      </div>
    </div>
  );
}
