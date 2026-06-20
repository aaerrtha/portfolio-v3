"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/constants";
import { NavLink } from "./NavLink";
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-[var(--sidebar-width)] flex-col bg-background px-8 py-10">
      <div className="flex flex-col gap-8">
        <NavLink href="/" active={pathname === "/"}>
          <span className="text-sm font-medium text-foreground">{siteConfig.name}</span>
        </NavLink>

        <nav className="flex flex-col gap-3">
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

        <nav className="flex flex-col gap-3">
          {siteConfig.external.map((item) => (
            <NavLink key={item.href} href={item.href} external>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
