"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/lib/sections";

interface SectionIndicatorProps {
  sections: Section[];
}

export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Page sections"
      className="hidden xl:block w-44 shrink-0"
    >
      <div className="sticky top-32">
        <p className="mb-4 text-xs uppercase tracking-widest text-muted">Sections</p>
        <ul className="relative flex flex-col gap-4 border-l border-border pl-4">
          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <li key={section.id} className="relative">
                <span
                  className={`absolute -left-[17px] top-1.5 h-2 w-2 rounded-full transition-colors ${
                    isActive ? "bg-foreground" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-sm leading-snug transition-colors ${
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {section.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
