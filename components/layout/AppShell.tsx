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
      <Sidebar />
      <MobileNav />
      <ContentPanel>
        <PageTransition>{children}</PageTransition>
      </ContentPanel>
    </div>
  );
}
