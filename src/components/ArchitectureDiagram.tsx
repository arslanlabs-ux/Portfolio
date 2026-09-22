type ArchitectureDiagramProps = {
  /** Blocks in signal or power flow order, left to right. */
  blocks: string[];
};

export function ArchitectureDiagram({ blocks }: ArchitectureDiagramProps) {
  return (
    <figure className="mt-8 rounded-[3px] border border-line bg-panel p-6">
      <figcaption className="label-mono text-dim">
        Block diagram — functional flow
      </figcaption>

      <ol className="mt-6 flex flex-wrap items-stretch gap-3">
        {blocks.map((block, i) => (
          <li key={block} className="flex flex-1 items-stretch gap-3">
            {i > 0 && (
              <span
                aria-hidden
                className="flex items-center text-line-2"
              >
                &rarr;
              </span>
            )}
            <span className="flex min-w-[9rem] flex-1 items-center rounded-[2px] border border-line-2 bg-ink px-4 py-3.5 text-sm text-fg">
              {block}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
