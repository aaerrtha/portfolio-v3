import type { ProjectFrontmatter, ImpactMetric } from "@/lib/types";

function MetricArrow({ direction }: { direction?: ImpactMetric["direction"] }) {
  if (direction === "down") {
    return <span className="text-accent-amber">↓</span>;
  }
  if (direction === "up" || direction === undefined) {
    return <span className="text-accent-amber">↑</span>;
  }
  return null;
}

export function MetricsRow({ metrics }: { metrics: ImpactMetric[] }) {
  return (
    <div className="flex flex-wrap gap-7 font-mono text-[13px] text-metric">
      {metrics.map((metric) => (
        <span key={metric.label}>
          {metric.label} <MetricArrow direction={metric.direction} />
        </span>
      ))}
    </div>
  );
}

export function ProjectHeader({ project }: { project: ProjectFrontmatter }) {
  return (
    <header className="w-full text-left">
      <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl">
        {project.title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-body">{project.subtitle}</p>
      {project.metrics.length > 0 && (
        <div className="mt-4">
          <MetricsRow metrics={project.metrics} />
        </div>
      )}
    </header>
  );
}
