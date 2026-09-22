import { process } from "@/data/process";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Process() {
  return (
    <Section
      id="process"
      index="03"
      eyebrow="Workflow"
      title="From Requirements to Production Files"
      subtitle="Every project runs through the same pipeline, so nothing reaches a fabricator before it has been captured, laid out, validated and packaged."
    >
      <Reveal>
        <p className="label-mono mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 rounded-[3px] border border-line bg-surface px-4 py-3 text-dim">
          {process.map((step, i) => (
            <span key={step.index} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-line-2">
                  &rarr;
                </span>
              )}
              <span className="text-muted">{step.title}</span>
            </span>
          ))}
        </p>
      </Reveal>

      <ol className="grid-panel grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((step) => (
          <li key={step.index} className="grid-cell group relative p-6">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
            />
            <div className="flex items-baseline gap-3">
              <span className="label-mono text-accent">{step.index}</span>
              <span aria-hidden className="h-px flex-1 bg-line" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-fg">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {step.outputs.map((output) => (
                <li
                  key={output}
                  className="label-mono rounded-[2px] border border-line px-2 py-1.5 text-dim"
                >
                  {output}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
