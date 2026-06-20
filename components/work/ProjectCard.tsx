"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
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
      <Link href={`/work/${project.slug}`} className="group block text-left">
        <div className="relative mb-8">
          <PlaceholderBlock aspect="wide" label={project.coverAlt ?? project.title}>
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

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black opacity-0 shadow-[0_0_24px_rgba(255,255,255,0.45)] transition-opacity duration-200 group-hover:opacity-100"
          >
            <ArrowUpRightIcon className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
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
