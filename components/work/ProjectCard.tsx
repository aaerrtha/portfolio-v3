"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectFrontmatter } from "@/lib/types";
import { MetricsRow } from "./ProjectMetrics";

interface ProjectCardProps {
  project: ProjectFrontmatter;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
      <Link href={`/work/${project.slug}`} className="group block text-left">
        <div className="mb-8 overflow-hidden rounded-2xl aspect-[16/9] bg-[#D0E7FF]">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.coverAlt ?? project.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0QwRTdGRiIvPjwvc3ZnPg=="
            />
          ) : null}
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight group-hover:text-muted transition-colors">
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
