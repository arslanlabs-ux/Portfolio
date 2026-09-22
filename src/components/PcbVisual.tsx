/**
 * Stylised hero artwork: a routed, multi-layer board drawn as CAD line work.
 *
 * Drawn rather than rendered on purpose — it is a technical object that stays
 * legible at every viewport size and costs no JavaScript or image payload.
 */

const modulePads = Array.from({ length: 10 }, (_, i) => 206 + i * 14);
const headerPads = Array.from({ length: 11 }, (_, i) => 110 + i * 29);

/** Module pad → header pad, routed with a vertical bus per net. */
function tracePath(fromX: number, toX: number, y: number, endY: number, busX: number) {
  return `M${fromX} ${y} H${busX} V${endY} H${toX}`;
}

const leftTraces = modulePads.map((y, i) =>
  tracePath(244, 124, y, headerPads[i], 208 - i * 6),
);
const rightTraces = modulePads.map((y, i) =>
  tracePath(436, 556, y, headerPads[i], 472 + i * 6),
);

const viaPoints = [2, 5, 8].flatMap((i) => [
  { x: 208 - i * 6, y: modulePads[i] },
  { x: 472 + i * 6, y: modulePads[i] },
]);

const mountingHoles = [
  { x: 62, y: 58 },
  { x: 618, y: 58 },
  { x: 62, y: 462 },
  { x: 618, y: 462 },
];

const rulerTicks = [100, 180, 260, 340, 420, 500, 580];

export function PcbVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 680 520"
      role="img"
      aria-label="Technical drawing of a multi-layer printed circuit board with routed traces, vias, mounting holes and a microcontroller module"
      className={className}
    >
      <defs>
        <pattern id="pcb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#23282c" strokeWidth="0.5" />
        </pattern>
        <clipPath id="board-clip">
          <rect x="28" y="22" width="624" height="476" rx="12" />
        </clipPath>
      </defs>

      {/* Board outline and inner grid */}
      <g clipPath="url(#board-clip)">
        <rect x="28" y="22" width="624" height="476" fill="#101214" />
        <rect x="28" y="22" width="624" height="476" fill="url(#pcb-grid)" />
      </g>
      <rect
        x="28"
        y="22"
        width="624"
        height="476"
        rx="12"
        fill="none"
        className="text-line-2"
        stroke="currentColor"
        strokeWidth="1.25"
      />

      {/* Coordinate ruler along the top edge */}
      <g className="text-line-2" stroke="currentColor" strokeWidth="1">
        {rulerTicks.map((x, i) => (
          <path key={x} d={`M${x} 4 v${i % 2 === 0 ? 9 : 5}`} />
        ))}
        <path d="M28 4h624" opacity="0.6" />
      </g>
      <g className="text-dim" fill="currentColor" fontSize="8" fontFamily="var(--font-jetbrains)">
        {rulerTicks.map((x, i) => (
          <text key={x} x={x + 3} y="20">
            {i * 20}
          </text>
        ))}
        <text x="648" y="20">
          mm
        </text>
      </g>

      {/* Copper routing */}
      <g
        className="text-copper"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        opacity="0.55"
      >
        {leftTraces.map((d) => (
          <path key={d} d={d} />
        ))}
        {rightTraces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* One highlighted net, animated to show signal flow */}
      <path
        d={leftTraces[4]}
        className="trace-flow text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        opacity="0.9"
      />

      {/* Vias */}
      <g className="text-copper" stroke="currentColor" fill="#0a0b0c" strokeWidth="1.25">
        {viaPoints.map(({ x, y }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" />
        ))}
      </g>

      {/* Mounting holes with keep-out rings */}
      <g className="text-line-2" stroke="currentColor" fill="none">
        {mountingHoles.map(({ x, y }) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="14" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx={x} cy={y} r="8.5" strokeWidth="1.5" />
          </g>
        ))}
      </g>

      {/* Breakout headers */}
      <g className="text-copper" fill="currentColor">
        {headerPads.map((y) => (
          <g key={y}>
            <circle cx="100" cy={y} r="4" />
            <circle cx="124" cy={y} r="4" />
            <circle cx="556" cy={y} r="4" />
            <circle cx="580" cy={y} r="4" />
          </g>
        ))}
      </g>
      <g className="text-line-2" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="86" y="96" width="52" height="318" rx="2" />
        <rect x="542" y="96" width="52" height="318" rx="2" />
      </g>

      {/* Microcontroller module with antenna */}
      <g className="text-line-2" fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="250" y="196" width="180" height="150" rx="3" />
        <rect
          x="254"
          y="200"
          width="172"
          height="142"
          rx="2"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <path d="M330 196V168h9v-14h9v14h9v-14h9v14h9v-14h9v14h9v28" />
      </g>
      <g className="text-copper" fill="currentColor">
        {modulePads.map((y) => (
          <g key={y}>
            <rect x="242" y={y - 3} width="12" height="6" rx="1" />
            <rect x="426" y={y - 3} width="12" height="6" rx="1" />
          </g>
        ))}
        <rect x="300" y="342" width="80" height="6" rx="1" />
      </g>

      {/* USB-C connector */}
      <g className="text-line-2">
        <rect
          x="310"
          y="452"
          width="60"
          height="36"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <rect x="322" y="462" width="36" height="16" rx="4" fill="#1b1f22" />
      </g>

      {/* Silkscreen annotations */}
      <g className="text-dim" fill="currentColor" fontSize="9" fontFamily="var(--font-jetbrains)" letterSpacing="1.2">
        <text x="46" y="486">MA-ESP32-DEV</text>
        <text x="634" y="48" textAnchor="end">REV 01</text>
        <text x="252" y="190">U1</text>
        <text x="300" y="290">ESP32 MODULE</text>
        <text x="310" y="446">J1 USB-C</text>
        <text x="92" y="90">J2</text>
        <text x="588" y="90">J3</text>
      </g>

      {/* Layer legend and status stamp */}
      <g>
        <rect
          x="420"
          y="428"
          width="176"
          height="58"
          rx="2"
          fill="#0a0b0c"
          className="text-line-2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <g
          className="text-dim"
          fill="currentColor"
          fontSize="8"
          fontFamily="var(--font-jetbrains)"
          letterSpacing="1"
        >
          <text x="432" y="444">L1 TOP / SIG</text>
          <text x="432" y="456">L2 GND</text>
          <text x="432" y="468">L3 PWR</text>
          <text x="432" y="480">L4 BOTTOM / SIG</text>
        </g>
        <rect x="536" y="436" width="48" height="30" rx="2" className="text-accent-deep" fill="none" stroke="currentColor" strokeWidth="1" />
        <text
          className="text-accent"
          x="560"
          y="448"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.5"
          fontFamily="var(--font-jetbrains)"
          letterSpacing="0.8"
        >
          DRC
        </text>
        <text
          className="text-accent"
          x="560"
          y="459"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.5"
          fontFamily="var(--font-jetbrains)"
          letterSpacing="0.8"
        >
          PASSED
        </text>
      </g>
    </svg>
  );
}
