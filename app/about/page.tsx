import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Partha Hukai — product designer and builder.",
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl text-left">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">About</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        I&apos;m Partha Hukai — a product designer who builds. I work at the
        intersection of design, strategy, and engineering to ship products that
        people actually use.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted">
        This portfolio is a collection of case studies documenting the problems
        I&apos;ve tackled, the decisions I&apos;ve made, and the impact that
        followed.
      </p>
    </section>
  );
}
