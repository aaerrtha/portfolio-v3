import Link from "next/link";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  active?: boolean;
}

export function NavLink({ href, children, external = false, active = false }: NavLinkProps) {
  const className = `text-sm transition-colors ${
    active
      ? "text-foreground font-medium"
      : "text-muted hover:text-foreground"
  }`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} inline-flex items-center gap-1`}
      >
        {children}
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
