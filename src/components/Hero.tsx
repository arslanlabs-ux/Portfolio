import { PcbVisual } from "./PcbVisual";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 hidden opacity-[0.35] md:block"
      />
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-14 px-5 pt-16 pb-20 sm:px-8 md:pt-20 md:pb-28 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-2 text-accent">
              PCB Design
              <span aria-hidden className="text-line-2">
                •
              </span>
              Embedded Systems
              <span aria-hidden className="text-line-2">
                •
              </span>
              Electronics
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance text-fg sm:text-5xl lg:text-[3.5rem]">
              Hardware, designed from schematic to reality.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I design reliable, manufacturing-ready PCBs and embedded hardware for
              products, prototypes, and connected systems.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-fg"
              >
                View Projects
                <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-[2px] border border-line-2 px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Let&apos;s Work Together
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-9 flex items-start gap-2.5 text-sm text-dim">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              Open to freelance PCB design and embedded hardware projects.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="rounded-[3px] border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="label-mono text-muted">Board view — top</span>
              <span className="label-mono flex items-center gap-2 text-dim">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                Rev 01
              </span>
            </div>
            <div className="p-3 sm:p-5">
              <PcbVisual className="h-auto w-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
