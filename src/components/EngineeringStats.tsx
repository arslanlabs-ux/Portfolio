import { stats } from "@/data/stats";
import { Reveal } from "./Reveal";

export function EngineeringStats() {
  return (
    <section aria-label="Capabilities and toolchain" className="border-y border-line bg-surface">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8 md:py-16">
        <Reveal>
          <dl className="grid-panel grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="grid-cell p-6">
                <dt className="label-mono text-dim">{stat.label}</dt>
                <dd className="mt-4 text-[0.9375rem] font-medium tracking-tight text-fg">
                  {stat.value}
                </dd>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stat.detail}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
