export function splitLabContent(content: string): {
  intro: string;
  body: string;
} {
  const trimmed = content.trim();

  if (!trimmed) {
    return { intro: "", body: "" };
  }

  const sections = trimmed.split(/\n(?=##\s)/);
  const intro = sections[0]?.trim() ?? "";
  const body = sections.slice(1).join("\n").trim();

  return { intro, body };
}
