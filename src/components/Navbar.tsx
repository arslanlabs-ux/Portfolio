"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";

/**
 * Flips to the opposite of whatever scheme is currently in effect, then stores
 * the choice. With no stored value the CSS follows the operating system, so
 * "opposite" has to be read from the browser rather than from state.
 */
function toggleTheme() {
  const root = document.documentElement;
  const explicit = root.dataset.theme;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const isLight = explicit ? explicit === "light" : prefersLight;
  const next = isLight ? "dark" : "light";

  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode or blocked storage: the choice just will not persist.
  }
}

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ink/85 backdrop-blur transition-colors duration-300 ${
        compact ? "border-line" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-5 transition-all duration-300 sm:px-8 ${
          compact ? "h-14" : "h-20"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-[2px] border border-line-2 transition-colors duration-300 group-hover:border-accent"
          >
            <span className="size-2.5 bg-accent" />
          </span>
          <span className="leading-none">
            <span className="block text-[0.9375rem] font-semibold tracking-tight text-fg">
              {site.name.toUpperCase()}
            </span>
            <span
              className={`label-mono block overflow-hidden text-dim transition-all duration-300 ${
                compact ? "mt-0 max-h-0 opacity-0" : "mt-1.5 max-h-4 opacity-100"
              }`}
            >
              PCB / Embedded
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden rounded-[2px] border border-accent-deep bg-accent-deep/15 px-4 py-2.5 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-ink sm:inline-block"
          >
            Start a Project
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Switch colour theme"
            className="grid size-10 place-items-center rounded-[2px] border border-line text-muted transition-colors duration-200 hover:border-line-2 hover:text-fg"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="theme-icon-sun size-4"
            >
              <circle cx="10" cy="10" r="3.6" />
              <path d="M10 1.4v2.4M10 16.2v2.4M18.6 10h-2.4M3.8 10H1.4M16.1 3.9l-1.7 1.7M5.6 14.4l-1.7 1.7M16.1 16.1l-1.7-1.7M5.6 5.6 3.9 3.9" />
            </svg>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="theme-icon-moon size-4"
            >
              <path d="M16.6 12.3A7.1 7.1 0 0 1 7.7 3.4a7.1 7.1 0 1 0 8.9 8.9Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-[2px] border border-line text-muted transition-colors duration-200 hover:text-fg lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-ink lg:hidden">
        <nav aria-label="Primary mobile" className="mx-auto grid w-full max-w-[1180px] px-5 py-2 sm:px-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="label-mono border-b border-line/60 py-4 text-muted last:border-b-0 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="label-mono mt-4 mb-2 rounded-[2px] border border-accent-deep bg-accent-deep/15 py-4 text-center text-accent"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
