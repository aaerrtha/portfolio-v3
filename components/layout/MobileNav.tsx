"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/constants";
import { NavLink } from "./NavLink";
import { SiteRoles } from "./SiteRoles";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <NavLink href="/">
          <span className="text-sm font-medium text-foreground">{siteConfig.name}</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex items-center justify-center text-foreground"
        >
          {open ? (
            <XMarkIcon className="h-[22px] w-[22px]" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-[22px] w-[22px]" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[57px] bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative border-b border-border bg-background px-6 py-8"
            >
              <div className="flex flex-col gap-6">
                <SiteRoles />

                <div className="flex flex-col gap-3">
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
                </div>

                <div className="flex flex-col gap-3">
                  {siteConfig.external.map((item) => (
                    <NavLink key={item.href} href={item.href} external>
                      {item.label}
                    </NavLink>
                  ))}
                </div>

                <ThemeToggle />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
