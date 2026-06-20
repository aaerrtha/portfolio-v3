export interface Section {
  id: string;
  title: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractSections(content: string): Section[] {
  const sections: Section[] = [];
  const seen = new Map<string, number>();
  const regex = /^##\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const title = match[1].trim();
    const baseId = slugify(title);
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    sections.push({ id, title });
  }

  return sections;
}
