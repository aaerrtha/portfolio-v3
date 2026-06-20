import Link from "next/link";
import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

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
        <MaterialIcon name="open_in_new" size={16} />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
