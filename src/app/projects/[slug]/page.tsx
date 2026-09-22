import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseNav } from "@/components/CaseNav";
import { CaseSectionBlock } from "@/components/CaseSectionBlock";
import { Reveal } from "@/components/Reveal";
import { PendingTag, Tag } from "@/components/Tag";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      <div className="mx-auto w-full max-w-[1180px] px-5 pt-12 sm:px-8 md:pt-16">
        <Reveal>
          <Link
            href="/#projects"
            className="label-mono inline-flex items-center gap-2 text-dim transition-colors duration-200 hover:text-accent"
          >
            <span aria-hidden>&larr;</span>
            All projects
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="label-mono text-accent">Project {project.index}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="label-mono text-dim">Case study</span>
          </div>

          <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid-panel grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {project.specs.map((spec) => (
              <div key={spec.label} className="grid-cell px-5 py-4">
                <p className="label-mono text-dim">{spec.label}</p>
                <p className="mt-2.5 text-sm text-fg">{spec.value}</p>
              </div>
            ))}
            {project.pendingSpecs.map((spec) => (
              <div key={spec} className="grid-cell px-5 py-4">
                <p className="label-mono text-dim">{spec}</p>
                <p className="label-mono mt-2.5 text-line-2">Pending</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-6 rounded-[3px] border border-dashed border-line-2 bg-surface px-5 py-4">
            <p className="label-mono text-dim">Project status</p>
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted">
              This case study is being published in stages. Sections marked as pending
              are held back until the design documentation and artwork are cleared for
              release — nothing on this page is a stand-in specification.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1180px] px-5 sm:px-8">
        <CaseNav
          items={project.sections.map((section) => ({
            id: section.id,
            index: section.index,
            title: section.title,
          }))}
        />
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 sm:px-8">
        {project.sections.map((section) => (
          <CaseSectionBlock key={section.id} section={section} board={project.board} />
        ))}

        <div className="mt-8 grid-panel grid-cols-1 sm:grid-cols-2">
          <div className="grid-cell p-6">
            <p className="label-mono text-dim">Design scope</p>
            <ul className="mt-4 space-y-2">
              {project.scope.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-[1px] bg-accent-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid-cell p-6">
            <p className="label-mono text-dim">Next project</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group mt-4 inline-flex flex-wrap items-center gap-3 text-lg font-semibold tracking-tight text-fg transition-colors duration-200 hover:text-accent"
            >
              {nextProject.title}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              {nextProject.summary}
            </p>
            <div className="mt-5">
              <PendingTag>Full documentation pending</PendingTag>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p className="text-sm text-muted">
            Need a board like this designed?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-fg"
          >
            Start a Project
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
