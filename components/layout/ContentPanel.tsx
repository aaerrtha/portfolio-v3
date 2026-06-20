import type { ReactNode } from "react";

interface ContentPanelProps {
  children: ReactNode;
}

export function ContentPanel({ children }: ContentPanelProps) {
  return (
    <main className="min-h-screen md:ml-[var(--sidebar-width)] pt-[57px] md:pt-0">
      <div className="h-screen overflow-y-auto">
        <div className="px-12 py-10 md:px-32 md:py-14 lg:pl-48 lg:pr-[364px] xl:pl-64 xl:pr-[364px]">{children}</div>
      </div>
    </main>
  );
}
