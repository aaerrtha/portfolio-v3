import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import type { LabExperiment } from "@/lib/types";

interface LabDetailHeaderProps {
  experiment: LabExperiment;
}

export function LabDetailHeader({ experiment }: LabDetailHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-base font-semibold text-foreground"
          style={
            experiment.iconBg ? { backgroundColor: experiment.iconBg } : undefined
          }
        >
          {experiment.iconImage ? (
            <Image
              src={experiment.iconImage}
              alt={experiment.iconAlt ?? `${experiment.title} icon`}
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          ) : (
            <span aria-hidden="true">{experiment.title.charAt(0)}</span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-xl font-semibold leading-tight text-foreground md:text-2xl">
              {experiment.title}
            </h1>
            {experiment.badge && (
              <span className="rounded-full border border-border bg-card px-2 py-0.5 text-xs font-medium text-muted">
                {experiment.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {experiment.downloadUrl && (
        <a
          href={experiment.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <GlobeAltIcon className="h-4 w-4" aria-hidden="true" />
          Download
        </a>
      )}
    </header>
  );
}
