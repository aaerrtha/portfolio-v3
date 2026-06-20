import type { Metadata } from "next";
import { LabGrid } from "@/components/labs/LabGrid";
import { getAllLabs } from "@/lib/labs";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experiments, prototypes, and side projects.",
};

export default function LabsPage() {
  const experiments = getAllLabs();

  return (
    <section className="w-full text-left">
      <LabGrid experiments={experiments} />
    </section>
  );
}
