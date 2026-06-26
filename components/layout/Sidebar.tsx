"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/constants";
import { NavLink } from "./NavLink";
import { SiteRoles } from "./SiteRoles";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[var(--sidebar-width)] shrink-0 flex-col md:flex md:sticky md:top-20 md:self-start">
      <div className="text-xl font-bold tracking-[-0.01em] text-foreground">
        {siteConfig.name}
      </div>

      <SiteRoles />

      <nav className="mt-[42px] flex flex-col gap-[11px] text-[15px] font-medium">
        {siteConfig.nav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            active={
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <nav className="mt-[42px] flex flex-col gap-[9px] font-mono text-xs">
        {siteConfig.external.map((item) => (
          <NavLink key={item.href} href={item.href} external>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-12">
        <ThemeToggle />
      </div>
    </aside>
  );
}
