import type { ReactNode } from "react";

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
      <span aria-hidden="true">↗</span>
    </a>
  );
}
