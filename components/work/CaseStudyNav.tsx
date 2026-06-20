"use client";

import { useEffect, useState } from "react";
import type { PageHeading } from "@/lib/headings";

interface CaseStudyNavProps {
  headings: PageHeading[];
}

export function CaseStudyNav({ headings }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

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
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="On this page"
      className="hidden w-44 shrink-0 lg:block"
    >
      <div className="sticky top-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">
          On this page
        </p>
        <ul className="flex flex-col gap-2.5 border-l border-border pl-4">
          {headings.map(({ id, title }) => {
            const isActive = activeId === id;

            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setActiveId(id)}
                  className={`block text-sm leading-snug transition-colors ${
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
