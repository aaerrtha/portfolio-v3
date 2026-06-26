import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { CaseStudyGate } from "@/components/work/CaseStudyGate";
import { ProjectHeader } from "@/components/work/ProjectMetrics";
import { ProjectHeaderImage } from "@/components/work/ProjectHeaderImage";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { isProjectPasswordProtected, isProjectUnlocked } from "@/lib/work-auth";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

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

  const isProtected = isProjectPasswordProtected(project);
  const isUnlocked = !isProtected || (await isProjectUnlocked(slug));

  return (
    <article className="w-full text-left">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="h-[18px] w-[18px]" aria-hidden="true" />
        Work
      </Link>

      {isUnlocked ? (
        <>
          <ProjectHeaderImage project={project} />
          <ProjectHeader project={project} />
          <MDXRenderer source={project.content} />
        </>
      ) : (
        <CaseStudyGate slug={slug} title={project.title} subtitle={project.subtitle} />
      )}
    </article>
  );
}
