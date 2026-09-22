import { tools } from "@/data/tools";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Tools() {
  return (
    <Section
      id="tools"
      index="05"
      eyebrow="Toolchain"
      title="Tools & Platforms"
      subtitle="The software and silicon behind the project work. Each entry lists what it is used for, not how long it has been used."
    >
      <ul className="grid-panel grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <li key={tool.name} className="grid-cell">
            <Reveal delay={(i % 3) * 60} className="h-full">
              <div className="group flex h-full items-start gap-4 p-6">
                <span
                  aria-hidden
                  className="label-mono grid size-11 shrink-0 place-items-center rounded-[2px] border border-line-2 text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
                >
                  {tool.monogram}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-semibold tracking-tight text-fg">
                    {tool.name}
                  </h3>
                  <p className="label-mono mt-2 text-dim">{tool.category}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{tool.usage}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
