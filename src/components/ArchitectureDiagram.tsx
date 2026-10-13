type ArchitectureDiagramProps = {
  /** Blocks in signal or power flow order, first to last. */
  blocks: string[];
};

/**
 * Functional flow, laid out vertically.
 *
 * Horizontal was the first attempt and it does not survive real content: the
 * blocks carry names like "Inductor + Output Caps", so five of them already
 * fill the article column and six wrap. A wrapped row of `flex-1` boxes
 * stretches whatever lands on it, so the boxes ended up different widths on
 * different rows. Stacking removes the wrapping case entirely, and the reading
 * order is then the same on a phone as on a desktop.
 */
export function ArchitectureDiagram({ blocks }: ArchitectureDiagramProps) {
  const last = blocks.length - 1;

  return (
    <figure className="mt-8 rounded-[3px] border border-line bg-panel p-6 sm:p-7">
      <figcaption className="label-mono text-dim">
        Block diagram — functional flow
      </figcaption>

      <ol className="mt-6">
        {blocks.map((block, i) => (
          <li key={block} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4">
            {/*
              The node and the connector share one flex column, so the line is
              measured by the row rather than positioned at a hand-tuned
              offset. The node stays at the top; the line takes what is left.
              `mt-2.5` drops the 28px node onto the centre line of the 48px box
              beside it (`py-3.5` plus `text-sm`), which is fixed by those two
              utilities rather than by the label length.
            */}
            <div className="flex flex-col items-center">
              <span className="label-mono mt-2.5 grid size-7 shrink-0 place-items-center rounded-[2px] border border-line-2 bg-ink text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < last && <span aria-hidden className="mt-2.5 w-px flex-1 bg-line-2" />}
            </div>

            <div className={i < last ? "pb-5" : undefined}>
              <div className="rounded-[2px] border border-line-2 bg-ink px-4 py-3.5 text-sm text-fg">
                {block}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
