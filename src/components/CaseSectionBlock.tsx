import { ArchitectureDiagram } from "./ArchitectureDiagram";
import type { CaseSection } from "@/data/projects";
import { ArtworkFrame } from "./ArtworkFrame";
import { Reveal } from "./Reveal";

type CaseSectionBlockProps = {
  section: CaseSection;
  /** Board silhouette used by the artwork slots in this project's sections. */
  board: "dev-board" | "buck" | "tracker";
};

export function CaseSectionBlock({ section, board }: CaseSectionBlockProps) {
  return (
    <section id={section.id} className="scroll-mt-28 border-t border-line py-12 md:py-16">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">{section.index}</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {section.title}
        </h2>

        {section.body && (
          <div className="mt-5 max-w-3xl space-y-4 text-[0.9375rem] leading-relaxed text-muted">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        {section.list && (
          <ul className="mt-6 max-w-3xl rounded-[3px] border border-line bg-panel">
            {section.list.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-line px-5 py-3.5 text-sm text-muted last:border-b-0"
              >
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-[1px] bg-accent-deep" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {section.diagram && <ArchitectureDiagram blocks={section.diagram} />}

        {section.pending && (
          <div className="mt-6 max-w-3xl rounded-[3px] border border-dashed border-line-2 bg-surface px-5 py-4">
            <p className="label-mono text-dim">Documentation pending</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{section.pending}</p>
          </div>
        )}

        {section.artifacts && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.artifacts.map((artifact) => (
              <ArtworkFrame
                key={artifact.label}
                label={artifact.label}
                note={artifact.note}
                kind={board}
              />
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
