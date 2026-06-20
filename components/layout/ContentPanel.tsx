import type { ReactNode } from "react";

interface ContentPanelProps {
  children: ReactNode;
}

export function ContentPanel({ children }: ContentPanelProps) {
  return (
    <main className="min-h-screen md:ml-[var(--sidebar-width)] pt-[57px] md:pt-0">
      <div className="h-screen overflow-y-auto">
        <div className="px-12 py-10 md:px-32 md:py-14 lg:px-48 xl:px-64">{children}</div>
      </div>
    </main>
  );
}
