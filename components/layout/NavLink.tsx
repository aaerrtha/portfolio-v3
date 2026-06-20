import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

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
        <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
