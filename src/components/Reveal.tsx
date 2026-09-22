"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in milliseconds, for revealing siblings in sequence. */
  delay?: number;
  className?: string;
};

/**
 * Fades content in once it scrolls into view. The transition itself lives in
 * globals.css behind a prefers-reduced-motion guard, so this only has to flip
 * the attribute.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.revealed = "true";
        observer.disconnect();
      },
      // The oversized top margin means anything already scrolled past — for
      // example when landing on /#projects from a shared link — renders
      // immediately instead of staying invisible. Only content still below the
      // fold animates in.
      { rootMargin: "100000px 0px -8% 0px", threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
