import { ProjectFeed } from "@/components/work/ProjectFeed";
import { getAllProjectSummaries } from "@/lib/content";

export default function HomePage() {
  const projects = getAllProjectSummaries();

  return (
    <section className="text-left">
      <ProjectFeed projects={projects} />
    </section>
  );
}
