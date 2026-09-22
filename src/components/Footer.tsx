import { emailLabel, links, nav, site } from "@/data/site";

const socials = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "Upwork", href: links.upwork },
  { label: "Email", href: links.email },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-semibold tracking-tight text-fg">
              {site.name.toUpperCase()}
            </p>
            <p className="label-mono mt-3 text-dim">{site.role}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="label-mono text-dim">Navigation</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-mono text-dim">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-fg"
                  >
                    {social.label}
                    {social.label === "Email" && (
                      <span className="mt-1 block text-xs text-dim">{emailLabel}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-dim">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="label-mono text-dim">Schematic · Layout · DRC · Manufacturing</p>
        </div>

        {site.linksArePlaceholders && (
          <p className="label-mono mt-4 text-line-2">
            Placeholder links — update src/data/site.ts
          </p>
        )}
      </div>
    </footer>
  );
}
