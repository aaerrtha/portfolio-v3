import type { ProjectFrontmatter } from "./types";

export function getProjectImageLabel(project: ProjectFrontmatter): string {
  if (project.coverAlt) {
    return project.coverAlt.toLowerCase();
  }
  if (project.tags?.[0]) {
    return project.tags[0].toLowerCase();
  }
  return project.slug.replace(/^sample-/, "").replace(/-/g, " ");
}

export function getProjectYear(date: string): string {
  return new Date(date).getFullYear().toString();
}

export function formatProjectNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
