import { TerminalSquare } from "lucide-react";

export function GuestbookHeader() {
    return (
        <div className="bg-foreground/5 px-4 py-2 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground/60">
                <TerminalSquare size={16} />
                <span className="text-sm font-bold tracking-wider">/var/log/guestbook.log</span>
            </div>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10"></div>
            </div>
        </div>
    );
}
