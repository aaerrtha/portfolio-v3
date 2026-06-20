import type { ReactNode } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-muted transition-colors"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
