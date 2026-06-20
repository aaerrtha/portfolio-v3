import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { ProjectHeader } from "@/components/work/ProjectMetrics";
import { ProjectHeaderImage } from "@/components/work/ProjectHeaderImage";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

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

  return (
    <article className="w-full text-left">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Work
      </Link>

      <ProjectHeaderImage project={project} />
      <ProjectHeader project={project} />
      <MDXRenderer source={project.content} />
    </article>
  );
}
