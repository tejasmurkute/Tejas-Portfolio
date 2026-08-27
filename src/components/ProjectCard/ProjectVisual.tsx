import { useId } from 'react';
import type { ProjectVisual as VisualKey } from '@/data/projects';

interface ProjectVisualProps {
  visual: VisualKey;
  hue: number;
}

/**
 * Procedurally drawn thumbnails.
 *
 * Every project gets a diagram of what it *is* rather than a screenshot or a
 * stock image — a scanner reticle, a service graph, an inventory lattice. They
 * share one drawing language (hairline strokes, single hue, soft core glow) so
 * the grid reads as a set of technical plates from the same archive.
 */
export function ProjectVisual({ visual, hue }: ProjectVisualProps) {
  const raw = useId();
  const uid = raw.replace(/:/g, '');
  const g = (n: string) => `${n}-${uid}`;

  const line = `hsl(${hue} 80% 74%)`;
  const soft = `hsl(${hue} 70% 62%)`;

  return (
    <svg viewBox="0 0 480 300" className="size-full" aria-hidden focusable="false">
      <defs>
        <radialGradient id={g('core')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={line} stopOpacity="0.34" />
          <stop offset="60%" stopColor={soft} stopOpacity="0.08" />
          <stop offset="100%" stopColor={soft} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('fade')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={line} stopOpacity="0.55" />
          <stop offset="100%" stopColor={line} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={g('sweep')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={line} stopOpacity="0" />
          <stop offset="50%" stopColor={line} stopOpacity="0.7" />
          <stop offset="100%" stopColor={line} stopOpacity="0" />
        </linearGradient>
        <pattern id={g('grid')} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Shared ground: faint measure grid + a core glow behind the subject */}
      <rect width="480" height="300" fill={`url(#${g('grid')})`} />
      <ellipse cx="240" cy="150" rx="170" ry="120" fill={`url(#${g('core')})`} />

      <g
        stroke={line}
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
        style={{ transformOrigin: '240px 150px' }}
      >
        {visual === 'scanner' && <Scanner id={g} line={line} />}
        {visual === 'network' && <Network line={line} />}
        {visual === 'lattice' && <Lattice line={line} />}
        {visual === 'tower' && <Tower id={g} />}
        {visual === 'horizon' && <Horizon id={g} line={line} />}
        {visual === 'chart' && <Chart id={g} line={line} />}
      </g>
    </svg>
  );
}

type IdFn = (n: string) => string;

/* -------- SafeScan: a reticle locking onto a document -------- */
function Scanner({ id, line }: { id: IdFn; line: string }) {
  return (
    <>
      <rect x="186" y="86" width="108" height="128" opacity="0.4" />
      <g opacity="0.75">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) =>
            (r + c) % 2 === 0 ? (
              <rect
                key={`${r}-${c}`}
                x={202 + c * 26}
                y={102 + r * 26}
                width="16"
                height="16"
                fill={line}
                fillOpacity="0.16"
              />
            ) : null,
          ),
        )}
      </g>
      {/* Corner brackets */}
      <g strokeWidth="1.4">
        <path d="M158 106V78h28M322 106V78h-28M158 194v28h28M322 194v28h-28" />
      </g>
      {/* Scan sweep */}
      <rect
        x="150"
        y="148"
        width="180"
        height="2"
        fill={`url(#${id('sweep')})`}
        stroke="none"
        className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-[-38px]"
      />
      <circle cx="240" cy="150" r="74" opacity="0.16" />
    </>
  );
}

/* -------- Grromio: a service graph around one owner node -------- */
function Network({ line }: { line: string }) {
  const nodes = [
    [240, 150, 9],
    [150, 96, 5],
    [332, 104, 5],
    [138, 208, 5],
    [344, 200, 5],
    [240, 62, 4],
    [240, 238, 4],
  ] as const;

  return (
    <>
      <g opacity="0.42">
        {nodes.slice(1).map(([x, y], i) => (
          <path key={i} d={`M240 150L${x} ${y}`} />
        ))}
      </g>
      <path d="M150 96L332 104M138 208L344 200" opacity="0.14" />
      {nodes.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={line}
          fillOpacity={i === 0 ? 0.28 : 0.14}
          strokeWidth={i === 0 ? 1.4 : 1}
        />
      ))}
      <circle cx="240" cy="150" r="34" opacity="0.22" />
      <circle
        cx="240"
        cy="150"
        r="58"
        opacity="0.12"
        strokeDasharray="3 7"
        className="origin-center transition-transform duration-[1200ms] group-hover:rotate-45"
      />
    </>
  );
}

/* -------- Pharmacy: an inventory lattice, some cells stocked -------- */
function Lattice({ line }: { line: string }) {
  const cols = 7;
  const rows = 4;
  const filled = new Set([2, 5, 9, 12, 16, 18, 23, 25]);

  return (
    <>
      <g>
        {Array.from({ length: rows * cols }, (_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          const x = 128 + c * 32;
          const y = 92 + r * 32;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="22"
              height="22"
              opacity={filled.has(i) ? 0.85 : 0.22}
              fill={filled.has(i) ? line : 'none'}
              fillOpacity={filled.has(i) ? 0.16 : 0}
            />
          );
        })}
      </g>
      {/* Shelf rails */}
      <g opacity="0.3">
        <path d="M116 84h248M116 212h248" />
      </g>
      <path d="M116 148h248" opacity="0.14" strokeDasharray="2 6" />
    </>
  );
}

/* -------- Student records: a stacked data tower with a beacon -------- */
function Tower({ id }: { id: IdFn }) {
  return (
    <>
      <g>
        {[0, 1, 2, 3].map((i) => {
          const w = 132 - i * 24;
          const y = 208 - i * 34;
          return (
            <g key={i} opacity={0.35 + i * 0.16}>
              <path d={`M${240 - w / 2} ${y}h${w}l-18 22h-${w - 36}z`} />
              <path d={`M${240 - w / 2} ${y}l18 -22h${w - 36}l18 22`} opacity="0.5" />
            </g>
          );
        })}
      </g>
      {/* Beacon */}
      <path d="M240 96V58" strokeWidth="1.4" />
      <circle cx="240" cy="52" r="5" />
      <path
        d="M212 78l28-26 28 26"
        opacity="0.4"
        className="transition-transform duration-[900ms] group-hover:-translate-y-1.5"
      />
      <rect x="150" y="238" width="180" height="1.5" fill={`url(#${id('fade')})`} stroke="none" />
    </>
  );
}

/* -------- VR: a perspective grid receding to a lit horizon -------- */
function Horizon({ id, line }: { id: IdFn; line: string }) {
  return (
    <>
      <path d="M60 186h360" opacity="0.4" />
      {/* Receding verticals */}
      <g opacity="0.28">
        {Array.from({ length: 11 }, (_, i) => {
          const x = 60 + i * 36;
          return <path key={i} d={`M${x} 186L${240 + (x - 240) * 3.4} 282`} />;
        })}
      </g>
      {/* Depth bands, tightening toward the horizon */}
      <g opacity="0.24">
        {[196, 210, 230, 256, 282].map((y, i) => (
          <path key={y} d={`M${60 - i * 22} ${y}h${360 + i * 44}`} />
        ))}
      </g>
      {/* Sun */}
      <circle cx="240" cy="186" r="52" fill={`url(#${id('core')})`} stroke="none" />
      <path d="M188 186a52 52 0 0 1 104 0" strokeWidth="1.4" />
      <g opacity="0.5">
        <path d="M198 158h84M206 142h68M216 128h48" stroke={line} />
      </g>
      {/* Headset silhouette */}
      <path d="M186 92h108a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-30l-24 16-24-16h-30a10 10 0 0 1-10-10v-22a10 10 0 0 1 10-10z" opacity="0.5" />
    </>
  );
}

/* -------- Data analysis: columns under a trend line -------- */
function Chart({ id, line }: { id: IdFn; line: string }) {
  const bars = [42, 74, 58, 96, 82, 118, 104];
  return (
    <>
      <g opacity="0.32">
        <path d="M104 226h276M104 226V80" />
      </g>
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={124 + i * 36}
            y={226 - h}
            width="20"
            height={h}
            fill={`url(#${id('fade')})`}
            stroke={line}
            strokeOpacity="0.45"
            className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-y-105"
            style={{ transformOrigin: `0px 226px` }}
          />
        ))}
      </g>
      <path
        d="M134 176l36-28 36 16 36-38 36 12 36-32 36 10"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <g fill={line} stroke="none">
        {[
          [134, 176],
          [206, 164],
          [278, 138],
          [350, 116],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2.5" />
        ))}
      </g>
      <g opacity="0.2" strokeDasharray="2 6">
        <path d="M104 116h276M104 168h276" />
      </g>
    </>
  );
}
