import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  /** Technical index shown in the section header, e.g. "02". */
  index?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`border-t border-line py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <Reveal>
          <header className="max-w-3xl">
            <div className="flex items-center gap-3">
              {index && <span className="label-mono text-accent">{index}</span>}
              <span className="label-mono text-dim">{eyebrow}</span>
              <span aria-hidden className="h-px flex-1 bg-line" />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
            )}
          </header>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
