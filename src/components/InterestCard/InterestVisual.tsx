import { useId } from 'react';
import type { InterestVisual as VisualKey } from '@/data/interests';

interface InterestVisualProps {
  visual: VisualKey;
  hue: number;
}

/**
 * Stand-in "photography" for the Beyond Code entries.
 *
 * These are intentionally softer and larger-formed than the project diagrams —
 * washes and long curves rather than hairline schematics — so the section reads
 * as an editorial spread rather than more engineering plates.
 */
export function InterestVisual({ visual, hue }: InterestVisualProps) {
  const uid = useId().replace(/:/g, '');
  const g = (n: string) => `${n}-${uid}`;

  const tone = `hsl(${hue} 78% 72%)`;

  return (
    <svg viewBox="0 0 600 400" className="size-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id={g('wash')} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 60% 30%)`} stopOpacity="0.30" />
          <stop offset="55%" stopColor={`hsl(${hue} 55% 18%)`} stopOpacity="0.12" />
          <stop offset="100%" stopColor="#050508" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id={g('bloom')} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" stopColor={tone} stopOpacity="0.26" />
          <stop offset="100%" stopColor={tone} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('stroke')} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={tone} stopOpacity="0.9" />
          <stop offset="100%" stopColor={tone} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill={`url(#${g('wash')})`} />
      <rect width="600" height="400" fill={`url(#${g('bloom')})`} />

      <g
        fill="none"
        stroke={`url(#${g('stroke')})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
        style={{ transformOrigin: '300px 200px' }}
      >
        {visual === 'pulse' && <Pulse tone={tone} />}
        {visual === 'pages' && <Pages />}
        {visual === 'aperture' && <Aperture tone={tone} />}
        {visual === 'contour' && <Contour />}
        {visual === 'waveform' && <Waveform tone={tone} />}
        {visual === 'constellation' && <Constellation tone={tone} />}
      </g>
    </svg>
  );
}

function Pulse({ tone }: { tone: string }) {
  return (
    <>
      <g opacity="0.2">
        {[70, 120, 170].map((r) => (
          <circle key={r} cx="300" cy="200" r={r} />
        ))}
      </g>
      <path
        d="M40 200h130l22-54 26 116 24-78 22 38 26-16 20 12h250"
        strokeWidth="1.8"
      />
      <circle cx="218" cy="262" r="4" fill={tone} stroke="none" />
      <g opacity="0.35">
        <path d="M40 250h180M380 250h180M40 150h150M410 150h150" strokeDasharray="1 8" />
      </g>
    </>
  );
}

function Pages() {
  return (
    <>
      {/* Open spread in perspective */}
      <path d="M300 120c-46-24-96-32-146-26v186c50-6 100 2 146 26" opacity="0.75" />
      <path d="M300 120c46-24 96-32 146-26v186c-50-6-100 2-146 26" opacity="0.75" />
      <path d="M300 120v186" opacity="0.5" />
      {/* Text ruling */}
      <g opacity="0.3">
        {[152, 176, 200, 224, 248].map((y, i) => (
          <g key={y}>
            <path d={`M186 ${y}h${86 - i * 3}`} />
            <path d={`M328 ${y}h${86 - i * 3}`} />
          </g>
        ))}
      </g>
      {/* Stack beneath */}
      <g opacity="0.28">
        <path d="M164 292q136 30 272 0" />
        <path d="M170 304q130 28 260 0" />
      </g>
    </>
  );
}

function Aperture({ tone }: { tone: string }) {
  const blades = Array.from({ length: 6 }, (_, i) => i * 60);
  return (
    <>
      <circle cx="300" cy="200" r="128" opacity="0.35" />
      <circle cx="300" cy="200" r="146" opacity="0.16" />
      <g opacity="0.6">
        {blades.map((a) => (
          <path
            key={a}
            d="M300 90 L395 145 L300 200 Z"
            transform={`rotate(${a} 300 200)`}
            fill={tone}
            fillOpacity="0.05"
          />
        ))}
      </g>
      <circle cx="300" cy="200" r="34" opacity="0.8" />
      <g opacity="0.4" strokeDasharray="2 10">
        <circle cx="300" cy="200" r="96" />
      </g>
    </>
  );
}

function Contour() {
  // Nested closed curves — a topographic map of somewhere unnamed.
  const rings = [
    'M120 250q40-96 132-116t184 44q68 52 32 118t-160 62q-124 4-176-42t-12-66z',
    'M162 246q34-74 112-90t152 36q56 42 26 96t-132 50q-102 4-146-34t-12-58z',
    'M204 242q28-52 92-74t120 28q44 32 20 74t-104 38q-80 4-114-26t-14-40z',
    'M246 238q22-30 72-52t88 20q32 22 14 52t-76 26q-58 4-84-18t-14-28z',
    'M288 234q14-14 44-30t56 12q20 14 8 32t-48 14q-36 2-52-10t-8-18z',
  ];
  return (
    <>
      {rings.map((d, i) => (
        <path key={i} d={d} opacity={0.22 + i * 0.13} />
      ))}
      <g opacity="0.4">
        <path d="M60 330h480" strokeDasharray="1 9" />
        <path d="M330 60v280" strokeDasharray="1 9" opacity="0.5" />
      </g>
    </>
  );
}

function Waveform({ tone }: { tone: string }) {
  const bars = [
    18, 42, 26, 66, 92, 54, 118, 74, 140, 96, 62, 108, 132, 78, 46, 88, 116, 60, 34, 70, 96, 44, 24,
    58, 30,
  ];
  return (
    <>
      <path d="M40 200h520" opacity="0.25" />
      <g stroke="none" fill={tone}>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={48 + i * 21}
            y={200 - h / 2}
            width="3"
            height={h}
            rx="1.5"
            fillOpacity={0.28 + (h / 140) * 0.55}
          />
        ))}
      </g>
      <g opacity="0.3" strokeDasharray="2 10">
        <path d="M40 130h520M40 270h520" />
      </g>
    </>
  );
}

function Constellation({ tone }: { tone: string }) {
  const pts: [number, number][] = [
    [110, 268],
    [178, 176],
    [258, 232],
    [312, 128],
    [396, 196],
    [452, 116],
    [488, 258],
    [352, 300],
    [214, 320],
  ];
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join('');
  return (
    <>
      <path d={path} opacity="0.42" />
      <path d="M178 176L312 128M258 232L396 196M352 300L488 258" opacity="0.18" />
      <g stroke="none" fill={tone}>
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.6} fillOpacity="0.85" />
            <circle cx={x} cy={y} r={i % 3 === 0 ? 11 : 8} fillOpacity="0.08" />
          </g>
        ))}
      </g>
    </>
  );
}
