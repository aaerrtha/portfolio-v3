import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experiments, prototypes, and side projects.",
};

export default function LabsPage() {
  return (
    <section className="max-w-3xl text-left">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">Labs</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        A space for experiments, prototypes, and work-in-progress ideas. New
        projects will land here as they take shape.
      </p>
    </section>
  );
}
