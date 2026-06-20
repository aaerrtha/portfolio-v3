import type { ReactNode } from "react";

interface SummaryHighlightProps {
  children: ReactNode;
}

export function SummaryHighlight({ children }: SummaryHighlightProps) {
  return (
    <div className="mx-auto my-8 max-w-2xl border-t-2 border-metric pt-5 text-center">
      <p className="font-serif text-lg leading-relaxed text-foreground">{children}</p>
    </div>
  );
}
