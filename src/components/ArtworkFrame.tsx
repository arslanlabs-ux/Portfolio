import type { BoardKind } from "@/data/projects";
import { BoardArtwork } from "./BoardArtwork";

type ArtworkFrameProps = {
  label: string;
  note: string;
  kind?: BoardKind;
  /** Turns the frame into a zoomable figure when real artwork is supplied. */
  className?: string;
};

/**
 * Documentation slot for an engineering artifact that does not exist yet.
 *
 * It is deliberately styled as a labelled technical slot rather than a broken
 * image, so the case study reads as work in progress instead of as a finished
 * screenshot of a board nobody has seen.
 */
export function ArtworkFrame({ label, note, kind, className = "" }: ArtworkFrameProps) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[3px] border border-dashed border-line-2 bg-surface ${className}`}
    >
      <div
        aria-hidden
        className="hatch absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-20"
      />

      <div className="relative flex aspect-[4/3] items-center justify-center px-6">
        {kind ? (
          <BoardArtwork
            kind={kind}
            className="w-full max-w-[260px] text-line-2 transition-colors duration-300 group-hover:text-dim"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-8 text-line-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
          </svg>
        )}
      </div>

      <figcaption className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-dashed border-line-2 bg-ink/60 px-4 py-3">
        <span className="label-mono text-muted">{label}</span>
        <span className="label-mono text-dim">{note}</span>
      </figcaption>
    </figure>
  );
}
