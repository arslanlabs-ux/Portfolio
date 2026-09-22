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
    <nav
      aria-label="Case study sections"
      className="sticky top-14 z-40 -mx-5 border-y border-line bg-ink/90 backdrop-blur sm:-mx-8"
    >
      <ol className="flex gap-1 overflow-x-auto px-5 py-2.5 sm:px-8">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`label-mono flex items-center gap-2 rounded-[2px] px-3 py-2 whitespace-nowrap transition-colors duration-200 ${
                active === item.id
                  ? "bg-panel-2 text-accent"
                  : "text-dim hover:text-muted"
              }`}
            >
              <span aria-hidden>{item.index}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
