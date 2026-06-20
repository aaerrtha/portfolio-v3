"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectFrontmatter } from "@/lib/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";
import { MetricsRow } from "./ProjectMetrics";

interface ProjectCardProps {
  project: ProjectFrontmatter;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article whileHover={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Link href={`/work/${project.slug}`} className="block text-left">
        <PlaceholderBlock aspect="wide" className="mb-8" label={project.coverAlt ?? project.title}>
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.coverAlt ?? project.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          )}
        </PlaceholderBlock>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight">
          {project.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted leading-relaxed">
          {project.subtitle}
        </p>
        {project.metrics.length > 0 && (
          <div className="mt-4">
            <MetricsRow metrics={project.metrics} />
          </div>
        )}
      </Link>
    </motion.article>
  );
}
