import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "./types";

const WORK_DIR = path.join(process.cwd(), "content/work");

function isPublishedProject(project: Project): boolean {
  return project.published;
}

function isViewableProject(project: Project): boolean {
  return project.published && !project.locked;
}

function parseProject(filename: string): Project | null {
  if (!filename.endsWith(".mdx") || filename.startsWith("_")) {
    return null;
  }

  const filePath = path.join(WORK_DIR, filename);
  return parseProjectFile(filePath);
}

function parseProjectFile(filePath: string, slugOverride?: string): Project | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ProjectFrontmatter;
  const filename = path.basename(filePath);

  if (!frontmatter.slug) {
    frontmatter.slug = filename.replace(/\.mdx$/, "");
  }

  return {
    ...frontmatter,
    slug: slugOverride ?? frontmatter.slug,
    content,
  };
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function findProjectBySlug(slug: string): Project | null {
  const directPath = path.join(WORK_DIR, `${slug}.mdx`);
  if (fs.existsSync(directPath)) {
    return parseProjectFile(directPath, slug);
  }

  if (!fs.existsSync(WORK_DIR)) {
    return null;
  }

  for (const filename of fs.readdirSync(WORK_DIR)) {
    if (!filename.endsWith(".mdx") || filename.startsWith("_")) {
      continue;
    }

    const filePath = path.join(WORK_DIR, filename);
    const project = parseProjectFile(filePath);
    if (project?.slug === slug) {
      return project;
    }
  }

  return null;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(WORK_DIR)) {
    return [];
  }

  const files = fs.readdirSync(WORK_DIR);
  const projects = files
    .map(parseProject)
    .filter((project): project is Project => project !== null && isPublishedProject(project));

  return sortProjects(projects);
}

export function getViewableProjects(): Project[] {
  return getAllProjects().filter(isViewableProject);
}

export function toProjectSummary(project: Project): ProjectFrontmatter {
  const { content: _content, ...summary } = project;
  return summary;
}

export function getAllProjectSummaries(): ProjectFrontmatter[] {
  return getAllProjects().map(toProjectSummary);
}

export function getProjectBySlug(slug: string): Project | null {
  const project = findProjectBySlug(slug);
  if (!project || !isViewableProject(project)) {
    return null;
  }

  return project;
}

export function getProjectSlugs(): string[] {
  return getViewableProjects().map((project) => project.slug);
}
