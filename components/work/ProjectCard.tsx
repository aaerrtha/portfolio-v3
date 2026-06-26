"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import {
  formatProjectNumber,
  getProjectImageLabel,
  getProjectYear,
} from "@/lib/project-display";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";
import { MetricsRow } from "./ProjectMetrics";

interface ProjectCardProps {
  project: ProjectFrontmatter;
  index: number;
}

function ProjectCardContent({
  project,
  index,
  isLocked,
}: ProjectCardProps & { isLocked: boolean }) {
  const imgLabel = getProjectImageLabel(project);
  const year = getProjectYear(project.date);
  const number = formatProjectNumber(index);

  return (
    <>
      <div className="mb-[18px] flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.06em] text-meta">
        <span>
          {number} &nbsp;·&nbsp; {imgLabel}
          {isLocked && (
            <>
              &nbsp;·&nbsp; <span className="text-accent-amber">locked</span>
            </>
          )}
        </span>
        <span>{year}</span>
      </div>

      <h2
        className={`mb-[22px] w-full text-[38px] font-semibold leading-[1.08] tracking-[-0.022em] text-foreground ${isLocked ? "opacity-70" : ""}`}
      >
        {project.title}
      </h2>

      <div
        className={`relative overflow-hidden rounded-lg ${isLocked ? "" : "transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.015]"}`}
      >
        <PlaceholderBlock aspect="feed" label={imgLabel}>
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.coverAlt ?? project.title}
              width={1200}
              height={600}
              className={`h-full w-full object-cover ${isLocked ? "opacity-60" : ""}`}
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          )}
        </PlaceholderBlock>
        <span className="pointer-events-none absolute bottom-[14px] left-[18px] font-mono text-[11px] uppercase tracking-[0.08em] text-caption">
          {imgLabel}
        </span>
      </div>

      <p className={`mt-[22px] max-w-[580px] text-[15px] leading-[1.6] text-body ${isLocked ? "opacity-70" : ""}`}>
        {project.subtitle}
      </p>

      {project.metrics.length > 0 && (
        <div className={`mt-[18px] ${isLocked ? "opacity-70" : ""}`}>
          <MetricsRow metrics={project.metrics} />
        </div>
      )}
    </>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isLocked = Boolean(project.locked);

  if (isLocked) {
    return (
      <article aria-disabled="true" className="cursor-not-allowed">
        <div className="block text-inherit">
          <ProjectCardContent project={project} index={index} isLocked={isLocked} />
        </div>
      </article>
    );
  }

  return (
    <article>
      <Link href={`/work/${project.slug}`} className="group block text-inherit no-underline">
        <ProjectCardContent project={project} index={index} isLocked={isLocked} />
      </Link>
    </article>
  );
}
