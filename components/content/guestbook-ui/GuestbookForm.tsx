import { Send } from "lucide-react";

interface GuestbookFormProps {
    name: string;
    onNameChange: (val: string) => void;
    message: string;
    onMessageChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

export function GuestbookForm({
    name,
    onNameChange,
    message,
    onMessageChange,
    onSubmit,
    isSubmitting,
}: GuestbookFormProps) {
    return (
        <div className="border-t border-foreground/10 bg-foreground/5 p-4">
            <form onSubmit={onSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded px-3 py-2 sm:w-1/3 focus-within:border-foreground/30 transition-colors">
                        <span className="text-foreground/40 text-xs font-bold">USER:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Enter alias..."
                            className="bg-transparent border-none outline-none text-foreground text-sm w-full placeholder-foreground/20"
                            maxLength={20}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded px-3 py-2 focus-within:border-foreground/30 transition-colors">
                        <span className="text-foreground/40 text-xs font-bold">&gt;</span>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            placeholder='echo "Write a message..."'
                            className="bg-transparent border-none outline-none text-foreground text-sm w-full placeholder-foreground/20"
                            maxLength={140}
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !message.trim() || !name.trim()}
                            className="text-foreground/60 hover:text-foreground disabled:opacity-30 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
