"use client";

import { motion, type Variants } from "framer-motion";
import type { ProjectFrontmatter } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectFeedProps {
  projects: ProjectFrontmatter[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function ProjectFeed({ projects }: ProjectFeedProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-20 md:gap-24"
    >
      {projects.map((project) => (
        <motion.div key={project.slug} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
