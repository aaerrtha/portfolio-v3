import type { ReactNode } from "react";

interface SummaryHighlightProps {
  children: ReactNode;
}

export function SummaryHighlight({ children }: SummaryHighlightProps) {
  return (
    <div className="my-8 w-full border-l-2 border-metric pl-5 text-left">
      <p className="font-serif text-lg leading-relaxed text-foreground">{children}</p>
    </div>
  );
}
