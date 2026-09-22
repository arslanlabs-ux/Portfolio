import { expertise } from "@/data/expertise";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Expertise() {
  return (
    <Section
      id="expertise"
      index="02"
      eyebrow="Capability"
      title="What I Work With"
      subtitle="The board-level and embedded disciplines behind each project, and the toolchain used to produce release-ready documentation."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {expertise.map((group, i) => (
          <Reveal key={group.title} delay={i * 70} className="h-full">
            <div className="flex h-full flex-col rounded-[3px] border border-line bg-panel">
              <div className="border-b border-line p-6">
                <span className="label-mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.caption}</p>
              </div>
              <ul className="flex-1 p-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-line/60 py-2.5 text-sm text-muted last:border-b-0"
                  >
                    <span aria-hidden className="size-1 shrink-0 rounded-[1px] bg-line-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
