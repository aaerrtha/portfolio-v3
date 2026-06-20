import type { ReactNode } from "react";
import { isValidElement } from "react";

export interface PageHeading {
  id: string;
  title: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): PageHeading[] {
  const headings: PageHeading[] = [];
  const regex = /^##\s+(.+)$/gm;
  let match = regex.exec(content);

  while (match) {
    const title = match[1].trim();
    headings.push({ id: slugifyHeading(title), title });
    match = regex.exec(content);
  }

  return headings;
}

export function getHeadingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getHeadingText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getHeadingText(node.props.children);
  }

  return "";
}
