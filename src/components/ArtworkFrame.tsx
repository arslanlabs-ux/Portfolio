import Image from "next/image";
import type { BoardKind, CaseArtifact } from "@/data/projects";
import { BoardArtwork } from "./BoardArtwork";

type ArtworkFrameProps = {
  label: string;
  note: string;
  kind?: BoardKind;
  /** Real artwork. When absent the frame stays an empty labelled slot. */
  image?: CaseArtifact["image"];
  className?: string;
};

/**
 * Documentation slot for an engineering artifact.
 *
 * With no image it renders as a labelled technical slot rather than a broken
 * image, so the case study reads as work in progress. With an image it renders
 * the capture in the same frame, so both states share one layout and the page
 * does not reflow when artwork is added later.
 */
export function ArtworkFrame({
  label,
  note,
  kind,
  image,
  className = "",
}: ArtworkFrameProps) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[3px] border bg-surface ${
        image ? "border-line-2" : "border-dashed border-line-2"
      } ${className}`}
    >
      {image ? (
        /*
          Fixed 2:1 frame with `fill`, so no intrinsic width or height is
          needed and every artifact occupies the same slot regardless of the
          capture's own proportions. These are tool screenshots with the useful
          content on one side and empty canvas on the other, so the crop is
          biased by `object-position` instead of being centred.
        */
        <div className="relative aspect-[2/1] bg-panel">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            /*
              The artifact grid is auto-fit, so a section holding one capture
              renders it across the full column and a section holding four
              renders them three-up. No single `vw` figure describes both, and
              guessing low serves a 1100px-wide image from a 640px source. The
              captures are lazy-loaded below the fold, so the extra bytes cost
              a resize request rather than anything the reader waits on.
            */
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "left center" }}
          />
        </div>
      ) : (
        <>
          <div
            aria-hidden
            className="hatch absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-20"
          />

          <div className="relative flex aspect-[2/1] items-center justify-center px-6">
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
        </>
      )}

      <figcaption className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line-2 bg-ink/60 px-4 py-3">
        <span className="label-mono text-muted">{label}</span>
        <span className="label-mono text-dim">{note}</span>
      </figcaption>
    </figure>
  );
}
