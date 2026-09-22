import Link from "next/link";
import type { Project } from "@/data/projects";
import { BoardArtwork } from "./BoardArtwork";
import { PendingTag, Tag } from "./Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[3px] border border-line bg-panel transition-colors duration-300 hover:border-line-2 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="relative border-b border-line lg:border-r lg:border-b-0">
        <div aria-hidden className="hatch absolute inset-0 opacity-30" />
        <div className="relative flex h-full items-center justify-center p-8">
          <BoardArtwork
            kind={project.board}
            className="w-full text-line-2 transition-colors duration-500 group-hover:text-copper"
          />
        </div>
        <span className="label-mono absolute top-4 left-4 text-dim">
          PCB {project.index}
        </span>
        <span className="label-mono absolute right-4 bottom-4 text-dim">
          Technical drawing
        </span>
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">Project {project.index}</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-200 after:absolute after:inset-0 hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <dl className="mt-7 grid-panel grid-cols-1 sm:grid-cols-2">
          {project.specs.map((spec) => (
            <div key={spec.label} className="grid-cell px-4 py-3">
              <dt className="label-mono text-dim">{spec.label}</dt>
              <dd className="mt-2 text-sm text-fg">{spec.value}</dd>
            </div>
          ))}
          <div className="grid-cell px-4 py-3">
            <dt className="label-mono text-dim">Key engineering focus</dt>
            <dd className="mt-2 text-sm text-muted">{project.scope.slice(0, 3).join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <PendingTag>Specs pending verification</PendingTag>
          <span className="label-mono inline-flex items-center gap-2 text-fg transition-colors duration-200 group-hover:text-accent">
            View Case Study
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
