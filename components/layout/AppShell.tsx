"use client";

import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ContentPanel } from "./ContentPanel";
import { PageTransition } from "@/components/ui/PageTransition";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <MobileNav />
      <div className="mx-auto flex min-h-screen max-w-[1280px] flex-col gap-12 px-6 py-12 md:flex-row md:gap-24 md:px-16 md:py-20">
        <Sidebar />
        <ContentPanel>
          <PageTransition>{children}</PageTransition>
        </ContentPanel>
      </div>
    </div>
  );
}
