import type { BoardKind } from "@/data/projects";

/**
 * Line-drawing board silhouettes used on project cards.
 *
 * These are schematic-style technical drawings, not photographs or renders of
 * the actual boards — they read as CAD artwork and stay honest until real
 * screenshots are available.
 */

const drawings: Record<BoardKind, React.ReactNode> = {
  "dev-board": (
    <>
      <rect x="70" y="40" width="260" height="200" rx="6" />
      <rect x="128" y="96" width="120" height="86" rx="2" className="text-accent" />
      <path d="M150 96V80h8V68h8v12h8V68h8v12h8V68h8v12h8v16" />
      <rect x="164" y="186" width="48" height="14" rx="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <circle cx="92" cy={70 + i * 30} r="3.5" />
          <circle cx="110" cy={70 + i * 30} r="3.5" />
          <circle cx="308" cy={70 + i * 30} r="3.5" />
          <circle cx="290" cy={70 + i * 30} r="3.5" />
        </g>
      ))}
      <path d="M128 110H110V70h-18M128 138H102v-8M128 166H94v26M252 110h20V70h18M252 138h26v30M252 166h34v24" />
    </>
  ),
  buck: (
    <>
      <rect x="70" y="40" width="260" height="200" rx="6" />
      <rect x="98" y="86" width="58" height="44" rx="2" className="text-accent" />
      <path d="M98 108H78M156 108h30" />
      <circle cx="222" cy="108" r="30" />
      <circle cx="222" cy="108" r="22" />
      <path d="M252 108h34v52h44" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={186 + i * 22} y="178" width="12" height="26" rx="1" />
      ))}
      <path d="M186 191h-32V108M318 168h-16" />
      <path d="M98 150v46h72" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={110 + i * 46} cy="212" r="3.5" />
      ))}
    </>
  ),
  tracker: (
    <>
      <rect x="82" y="34" width="236" height="212" rx="14" />
      <rect x="112" y="66" width="112" height="76" rx="2" className="text-accent" />
      <path d="M232 66V50h10v-12h10v12h10v-12h10v12h10v16" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={118 + i * 26} y="164" width="18" height="18" rx="1" />
      ))}
      <rect x="118" y="200" width="86" height="24" rx="3" />
      <path d="M232 104h48v70h-32M232 120h32M112 104H96v72h22" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={266} cy={190 + i * 16} r="3" />
      ))}
    </>
  ),
};

type BoardArtworkProps = {
  kind: BoardKind;
  className?: string;
};

export function BoardArtwork({ kind, className = "" }: BoardArtworkProps) {
  return (
    <svg
      viewBox="56 20 288 240"
      role="img"
      aria-label="Technical line drawing of the board outline"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {drawings[kind]}
    </svg>
  );
}
