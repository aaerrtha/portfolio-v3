import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { CaseStudyNav } from "@/components/work/CaseStudyNav";
import { NextCaseStudy } from "@/components/work/NextCaseStudy";
import { ProjectHeader } from "@/components/work/ProjectMetrics";
import { ProjectHeaderImage } from "@/components/work/ProjectHeaderImage";
import { extractHeadings } from "@/lib/headings";
import { getAllProjects, getNextProject, getProjectBySlug } from "@/lib/content";

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

  const headings = extractHeadings(project.content);
  const nextProject = getNextProject(slug);

  return (
    <div className="flex w-full items-start gap-10 xl:gap-16">
      <div className="min-w-0 flex-1">
        <article className="w-full text-left">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            Work
          </Link>

          <ProjectHeaderImage project={project} />
          <ProjectHeader project={project} />
          <MDXRenderer source={project.content} />
        </article>

        {nextProject && <NextCaseStudy project={nextProject} />}
      </div>

      <CaseStudyNav headings={headings} />
    </div>
  );
}
