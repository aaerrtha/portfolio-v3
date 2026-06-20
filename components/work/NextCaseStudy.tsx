import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { ProjectFrontmatter } from "@/lib/types";

interface NextCaseStudyProps {
  project: ProjectFrontmatter;
}

export function NextCaseStudy({ project }: NextCaseStudyProps) {
  return (
    <div className="mt-16 border-t border-border pt-10">
      <p className="mb-3 text-sm text-muted">Next case study</p>
      <Link
        href={`/work/${project.slug}`}
        className="group inline-flex max-w-3xl items-start gap-3 text-left transition-colors hover:text-muted"
      >
        <span className="font-serif text-xl font-semibold leading-snug text-foreground group-hover:text-muted md:text-2xl">
          {project.title}
        </span>
        <ArrowRightIcon
          className="mt-1.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
