import Link from "next/link";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  active?: boolean;
}

export function NavLink({ href, children, external = false, active = false }: NavLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted transition-colors duration-150 ease-in-out hover:text-foreground"
      >
        {children} ↗
      </a>
    );
  }

  if (active) {
    return (
      <Link
        href={href}
        className="flex items-center gap-2 text-foreground transition-colors duration-150 ease-in-out"
      >
        <span
          aria-hidden="true"
          className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent-amber"
        />
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="pl-[13px] text-muted transition-colors duration-150 ease-in-out hover:text-foreground"
    >
      {children}
    </Link>
  );
}
