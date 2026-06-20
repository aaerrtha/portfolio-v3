import { ProjectFeed } from "@/components/work/ProjectFeed";
import { getAllProjects } from "@/lib/content";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <section className="text-left">
      <ProjectFeed projects={projects} />
    </section>
  );
}
