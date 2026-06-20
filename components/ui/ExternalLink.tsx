import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

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
      <MaterialIcon name="open_in_new" size={16} />
    </a>
  );
}
