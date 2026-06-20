import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { ProjectHeader } from "@/components/work/ProjectMetrics";
import { ProjectHeaderImage } from "@/components/work/ProjectHeaderImage";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { extractSections } from "@/lib/sections";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const sections = extractSections(project.content);

  return (
    <CaseStudyLayout sections={sections}>
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Work
      </Link>

      <ProjectHeaderImage project={project} />
      <ProjectHeader project={project} />
      <MDXRenderer source={project.content} />
    </CaseStudyLayout>
  );
}
