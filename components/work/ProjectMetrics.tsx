import type { ProjectFrontmatter, ImpactMetric } from "@/lib/types";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

function MetricArrow({ direction }: { direction?: ImpactMetric["direction"] }) {
  if (direction === "up") {
    return <ArrowUpIcon className="ml-0.5 inline h-4 w-4 align-middle" aria-hidden="true" />;
  }
  if (direction === "down") {
    return <ArrowDownIcon className="ml-0.5 inline h-4 w-4 align-middle" aria-hidden="true" />;
  }
  return null;
}

export function MetricsRow({ metrics }: { metrics: ImpactMetric[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-metric">
      {metrics.map((metric) => (
        <span key={metric.label}>
          {metric.label}
          <MetricArrow direction={metric.direction} />
        </span>
      ))}
    </div>
  );
}

export function ProjectHeader({ project }: { project: ProjectFrontmatter }) {
  return (
    <header className="w-full text-left">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight">
        {project.title}
      </h1>
      <p className="mt-3 text-base text-muted leading-relaxed">{project.subtitle}</p>
      {project.metrics.length > 0 && (
        <div className="mt-4">
          <MetricsRow metrics={project.metrics} />
        </div>
      )}
    </header>
  );
}
