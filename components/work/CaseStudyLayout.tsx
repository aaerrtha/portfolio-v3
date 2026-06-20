import type { ReactNode } from "react";
import type { Section } from "@/lib/sections";
import { SectionIndicator } from "./SectionIndicator";

interface CaseStudyLayoutProps {
  sections: Section[];
  children: ReactNode;
}

export function CaseStudyLayout({ sections, children }: CaseStudyLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl justify-center gap-12 xl:gap-16">
      <article className="min-w-0 flex-1 max-w-3xl text-center">{children}</article>
      <SectionIndicator sections={sections} />
    </div>
  );
}
