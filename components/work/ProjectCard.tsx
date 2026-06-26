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

export function ProjectCard({ project, index }: ProjectCardProps) {
  const imgLabel = getProjectImageLabel(project);
  const year = getProjectYear(project.date);
  const number = formatProjectNumber(index);

  return (
    <article>
      <Link href={`/work/${project.slug}`} className="group block text-inherit no-underline">
        <div className="mb-[18px] flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.06em] text-meta">
          <span>
            {number} &nbsp;·&nbsp; {imgLabel}
          </span>
          <span>{year}</span>
        </div>

        <h2 className="mb-[22px] max-w-[640px] text-[38px] font-semibold leading-[1.08] tracking-[-0.022em] text-foreground">
          {project.title}
        </h2>

        <div className="relative overflow-hidden rounded-lg transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.015]">
          <PlaceholderBlock aspect="feed" label={imgLabel}>
            {project.coverImage && (
              <Image
                src={project.coverImage}
                alt={project.coverAlt ?? project.title}
                width={1200}
                height={600}
                className="h-full w-full object-cover"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            )}
          </PlaceholderBlock>
          <span className="pointer-events-none absolute bottom-[14px] left-[18px] font-mono text-[11px] uppercase tracking-[0.08em] text-caption">
            {imgLabel}
          </span>
        </div>

        <p className="mt-[22px] max-w-[580px] text-[15px] leading-[1.6] text-body">
          {project.subtitle}
        </p>

        {project.metrics.length > 0 && (
          <div className="mt-[18px]">
            <MetricsRow metrics={project.metrics} />
          </div>
        )}
      </Link>
    </article>
  );
}
