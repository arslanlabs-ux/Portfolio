type TagProps = {
  children: React.ReactNode;
  tone?: "default" | "muted";
};

export function Tag({ children, tone = "default" }: TagProps) {
  return (
    <span
      className={`label-mono inline-flex items-center rounded-[2px] border px-2 py-1.5 ${
        tone === "muted"
          ? "border-line text-dim"
          : "border-line-2 text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** Small dashed marker for information that is not yet confirmed. */
export function PendingTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-mono inline-flex items-center gap-1.5 rounded-[2px] border border-dashed border-line-2 px-2 py-1.5 text-dim">
      <span aria-hidden className="size-1 rounded-full bg-accent-deep" />
      {children}
    </span>
  );
}
