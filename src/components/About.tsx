import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const facts = [
  { label: "Role", value: site.role },
  { label: "Disciplines", value: "PCB design · Embedded hardware · Electronics" },
  { label: "Toolchain", value: "Altium Designer · KiCad" },
  { label: "Platforms", value: "ESP32 · STM32" },
  { label: "Engagement", value: "Freelance project work" },
];

export function About() {
  return (
    <Section
      id="about"
      index="04"
      eyebrow="Profile"
      title="About"
      subtitle="Product-oriented hardware engineering, from first schematic to a fabrication package a manufacturer can build from."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <Reveal>
          <figure className="relative overflow-hidden rounded-[3px] border border-dashed border-line-2 bg-surface">
            <div aria-hidden className="hatch absolute inset-0 opacity-40" />
            <div className="relative flex aspect-[4/5] items-center justify-center">
              <span className="label-mono text-3xl tracking-[0.3em] text-line-2">MA</span>
            </div>
            <figcaption className="label-mono relative border-t border-dashed border-line-2 bg-ink/60 px-4 py-3 text-dim">
              Portrait — pending
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-muted">
            <p>
              I&apos;m Muhammad Arslan, a PCB designer and embedded systems engineer. I work
              on the hardware side of products: capturing the schematic, choosing the
              components, laying out the board, and producing the manufacturing data that
              turns a design into a physical assembly.
            </p>
            <p>
              My work sits between electronics and product requirements. That means
              treating power distribution, grounding, signal routing and design-rule
              compliance as first-class design decisions rather than clean-up work at the
              end of a layout — and keeping the embedded side in view, so the firmware
              team receives hardware that behaves predictably.
            </p>
            <p>
              I work with Altium Designer and KiCad, and with ESP32 and STM32 platforms for
              connected and embedded products. I take on freelance project work, from a
              single board revision through to a complete schematic-to-manufacturing
              package.
            </p>

            <dl className="mt-8 grid-panel grid-cols-1 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="grid-cell px-4 py-3.5">
                  <dt className="label-mono text-dim">{fact.label}</dt>
                  <dd className="mt-2 text-sm text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
