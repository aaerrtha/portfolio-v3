import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { LabExperiment } from "@/lib/types";

interface LabDetailTagsProps {
  experiment: LabExperiment;
}

export function LabDetailTags({ experiment }: LabDetailTagsProps) {
  const hasTags = experiment.tags && experiment.tags.length > 0;
  const hasGithub = Boolean(experiment.githubUrl);

  if (!hasTags && !hasGithub) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {experiment.tags?.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-sm text-foreground"
        >
          {tag}
        </span>
      ))}

      {experiment.githubUrl && (
        <a
          href={experiment.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
        >
          Github
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
