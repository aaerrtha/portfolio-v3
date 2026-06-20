import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Lab, LabExperiment } from "./types";

const LABS_DIR = path.join(process.cwd(), "content/labs");

function parseLab(filename: string): Lab | null {
  if (!filename.endsWith(".mdx") || filename.startsWith("_")) {
    return null;
  }

  const filePath = path.join(LABS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const experiment = data as LabExperiment;

  if (!experiment.slug) {
    experiment.slug = filename.replace(/\.mdx$/, "");
  }

  return {
    ...experiment,
    content,
  };
}

function sortLabs(labs: LabExperiment[]): LabExperiment[] {
  return [...labs].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getAllLabs(): LabExperiment[] {
  if (!fs.existsSync(LABS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(LABS_DIR);
  const labs = files
    .map(parseLab)
    .filter(
      (experiment): experiment is Lab =>
        experiment !== null && experiment.published,
    );

  return sortLabs(labs);
}

export function getLabBySlug(slug: string): Lab | null {
  const filePath = path.join(LABS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const experiment = data as LabExperiment;

  return {
    ...experiment,
    slug,
    content,
  };
}

export function getLabSlugs(): string[] {
  return getAllLabs().map((lab) => lab.slug);
}
