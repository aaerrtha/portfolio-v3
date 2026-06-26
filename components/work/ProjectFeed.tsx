import type { ProjectFrontmatter } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectFeedProps {
  projects: ProjectFrontmatter[];
}

export function ProjectFeed({ projects }: ProjectFeedProps) {
  return (
    <div className="flex flex-col gap-[60px]">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
