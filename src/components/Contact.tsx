import { links } from "@/data/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3px] border border-line bg-surface px-6 py-14 sm:px-10 md:px-14 md:py-20">
            <div aria-hidden className="blueprint absolute inset-0 opacity-30" />
            <div className="relative max-w-2xl">
              <p className="label-mono text-accent">Contact</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl md:text-[2.75rem]">
                Have a hardware idea?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                Let&apos;s turn your schematic, prototype, or product concept into a
                manufacturable PCB.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={links.email}
                  className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-fg"
                >
                  Start a Project
                  <span aria-hidden>&rarr;</span>
                </a>
                <a
                  href={links.github}
                  className="inline-flex items-center rounded-[2px] border border-line-2 px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  View GitHub
                </a>
                <a
                  href={links.upwork}
                  className="inline-flex items-center rounded-[2px] border border-line-2 px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  View Upwork
                </a>
              </div>

              <dl className="mt-12 grid-panel grid-cols-1 sm:grid-cols-3">
                {[
                  { label: "Scope", value: "Schematic → PCB layout → DRC" },
                  { label: "Deliverables", value: "Gerbers, drill files, BOM" },
                  { label: "Engagement", value: "Freelance, project-based" },
                ].map((item) => (
                  <div key={item.label} className="grid-cell px-4 py-3.5">
                    <dt className="label-mono text-dim">{item.label}</dt>
                    <dd className="mt-2 text-sm text-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
