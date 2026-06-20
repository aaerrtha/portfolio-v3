import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Writing on design, product, and building.",
};

export default function NotesPage() {
  return (
    <section className="max-w-3xl text-left">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">Notes</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Short essays and reflections on design, product thinking, and the craft
        of building digital experiences. More coming soon.
      </p>
    </section>
  );
}
