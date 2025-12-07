import { toLeetSpeak } from "@/lib/utils/leet";
import { cn } from "@/lib/utils";

interface LeetTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function LeetText({ text, className, as: Component = "span" }: LeetTextProps) {
  const leetText = toLeetSpeak(text);

  return (
    <Component className={cn("font-mono", className)} aria-label={text}>
      {leetText}
    </Component>
  );
}
