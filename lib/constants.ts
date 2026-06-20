import type { ExternalLink, NavItem, RoleLine } from "./types";

export const siteConfig = {
  name: "Partha Hukai",
  description: "Product designer and builder — case studies, experiments, and notes.",
  roles: [
    {
      prefix: "Currently @",
      company: "bigbasket",
      href: "https://www.bigbasket.com",
    },
    {
      prefix: "Previously @",
      company: "Electronic Arts",
      href: "https://www.ea.com",
    },
  ] satisfies RoleLine[],
  nav: [
    { label: "Work", href: "/" },
    { label: "Labs", href: "/labs" },
    { label: "Notes", href: "/notes" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
  external: [
    { label: "LinkedIn", href: "https://linkedin.com/in/parthahukai" },
    { label: "X", href: "https://x.com/parthahukai" },
    { label: "Github", href: "https://github.com/parthahukai" },
    { label: "Email", href: "mailto:hello@parthahukai.com" },
  ] satisfies ExternalLink[],
};

export const SIDEBAR_WIDTH = 260;
