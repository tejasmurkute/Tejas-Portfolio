interface PortraitPlaceholderProps {
  /** Unique suffix so multiple placeholders don't collide on SVG ids. */
  uid: string;
}

/**
 * Stand-in artwork for the portrait slots.
 *
 * Deliberately *designed* rather than a grey box with a camera icon: a lit
 * silhouette against the same violet atmosphere as the rest of the site, so an
 * empty image slot still looks art-directed. Dropping a real photo into
 * `MEDIA.portrait` replaces it with no layout change.
 */
export function PortraitPlaceholder({ uid }: PortraitPlaceholderProps) {
  const g = (name: string) => `${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      role="img"
      aria-label="Portrait placeholder"
    >
      <defs>
        <linearGradient id={g('bg')} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#0d0c1a" />
          <stop offset="55%" stopColor="#08080f" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>

        <radialGradient id={g('halo')} cx="0.62" cy="0.32" r="0.55">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#6d3bf5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6d3bf5" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={g('figure')} x1="0.15" y1="0" x2="1" y2="0.9">
          <stop offset="0%" stopColor="#15142a" />
          <stop offset="60%" stopColor="#0c0b18" />
          <stop offset="100%" stopColor="#08070f" />
        </linearGradient>

        <linearGradient id={g('rim')} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>

        <pattern id={g('scan')} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="1" fill="#ffffff" fillOpacity="0.022" />
        </pattern>

        {/* Clip so the rim light only paints along the silhouette edge */}
        <clipPath id={g('clip')}>
          <path d="M200 118c30 0 52 24 52 56 0 20-7 37-18 47 10 6 22 11 36 17 42 18 66 44 74 82 5 24 8 54 9 90H47c1-36 4-66 9-90 8-38 32-64 74-82 14-6 26-11 36-17-11-10-18-27-18-47 0-32 22-56 52-56z" />
        </clipPath>
      </defs>

      <rect width="400" height="520" fill={`url(#${g('bg')})`} />
      <rect width="400" height="520" fill={`url(#${g('halo')})`} />

      {/* Silhouette */}
      <path
        d="M200 118c30 0 52 24 52 56 0 20-7 37-18 47 10 6 22 11 36 17 42 18 66 44 74 82 5 24 8 54 9 90H47c1-36 4-66 9-90 8-38 32-64 74-82 14-6 26-11 36-17-11-10-18-27-18-47 0-32 22-56 52-56z"
        fill={`url(#${g('figure')})`}
      />

      {/* Rim light along the upper-right edge, matching the planet's key light */}
      <g clipPath={`url(#${g('clip')})`}>
        <path
          d="M200 118c30 0 52 24 52 56 0 20-7 37-18 47 10 6 22 11 36 17 42 18 66 44 74 82 5 24 8 54 9 90"
          fill="none"
          stroke={`url(#${g('rim')})`}
          strokeWidth="3"
        />
      </g>

      <rect width="400" height="520" fill={`url(#${g('scan')})`} />

      {/* Framing ticks — the "specimen under observation" language */}
      <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1">
        <path d="M28 28h22M28 28v22" />
        <path d="M372 28h-22M372 28v22" />
        <path d="M28 492h22M28 492v-22" />
        <path d="M372 492h-22M372 492v-22" />
      </g>

      <circle cx="200" cy="174" r="86" fill="none" stroke="#8b5cf6" strokeOpacity="0.12" />
    </svg>
  );
}
