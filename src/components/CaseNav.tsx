"use client";

import { useEffect, useState } from "react";

type CaseNavProps = {
  items: { id: string; index: string; title: string }[];
};

/**
 * Sticky section index for a case study.
 *
 * Highlights the section currently crossing the upper third of the viewport;
 * the observer band is what keeps the highlight stable while scrolling between
 * two short sections.
 */
export function CaseNav({ items }: CaseNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = items.find((item) => visible.has(item.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/*
        Narrow screens: a native select. Nine long titles cannot fit a
        horizontal strip inside the content width, and a scrolling strip hides
        the last entries behind an affordance nobody notices. The OS picker
        shows every section at once and needs no custom control.
      */}
      <nav
        aria-label="Jump to section"
        className="sticky top-14 z-40 -mx-5 border-b border-line bg-ink/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden"
      >
        <select
          value={active}
          onChange={(event) => {
            window.location.hash = event.target.value;
          }}
          className="label-mono w-full rounded-[2px] border border-line bg-panel px-3 py-2.5 text-fg"
        >
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.index} — {item.title}
            </option>
          ))}
        </select>
      </nav>

      {/* Wide screens: contents list, sticky beside the article. */}
      <aside className="hidden lg:block">
        <nav aria-label="Case study sections" className="sticky top-24">
          <p className="label-mono text-dim">Contents</p>
          <ol className="mt-4">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`label-mono flex items-center gap-2.5 border-l-2 py-2.5 pl-3 transition-colors duration-200 ${
                    active === item.id
                      ? "border-accent text-fg"
                      : "border-transparent text-dim hover:border-line-2 hover:text-muted"
                  }`}
                >
                  <span
                    aria-hidden
                    className={active === item.id ? "text-accent" : "text-line-2"}
                  >
                    {item.index}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </>
  );
}
