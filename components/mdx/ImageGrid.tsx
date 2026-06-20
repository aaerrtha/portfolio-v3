import type { ReactNode } from "react";

interface ImageGridProps {
  columns?: 2 | 3;
  children: ReactNode;
}

export function ImageGrid({ columns = 2, children }: ImageGridProps) {
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 gap-6 md:grid-cols-3"
      : "grid grid-cols-1 gap-6 md:grid-cols-2";

  return <div className={`${gridClass} my-8 w-full text-left`}>{children}</div>;
}
