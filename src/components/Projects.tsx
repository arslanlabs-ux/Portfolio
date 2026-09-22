import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      index="01"
      eyebrow="Portfolio"
      title="Selected Engineering Work"
      subtitle="Hardware projects designed with a focus on signal integrity, manufacturability, power, and real-world constraints."
    >
      <div className="grid gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
