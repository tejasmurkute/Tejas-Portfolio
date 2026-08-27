export type InterestVisual = 'pulse' | 'pages' | 'aperture' | 'contour' | 'waveform' | 'constellation';

export interface Interest {
  id: string;
  index: string;
  title: string;
  body: string;
  /** Editorial pull-quote shown only on the feature-sized entries. */
  note?: string;
  /** Small metadata stat, keeps the layout feeling documented rather than decorative. */
  stat: string;
  visual: InterestVisual;
  hue: number;
  /** Desktop column span within a 12-column editorial grid. */
  span: 4 | 5 | 7 | 8;
  /** Feature entries lead with the visual and get more vertical room. */
  feature?: boolean;
}

export const INTERESTS: Interest[] = [
  {
    id: 'fitness',
    index: '01',
    title: 'Fitness',
    body: 'I love staying fit through workouts, running and outdoor activities.',
    note: 'Discipline built at 6am transfers directly to the keyboard.',
    stat: '5× / week',
    visual: 'pulse',
    hue: 258,
    span: 7,
    feature: true,
  },
  {
    id: 'reading',
    index: '02',
    title: 'Reading',
    body: 'Books help me explore new ideas and perspectives.',
    stat: 'Non-fiction',
    visual: 'pages',
    hue: 216,
    span: 5,
  },
  {
    id: 'photography',
    index: '03',
    title: 'Photography',
    body: 'Capturing moments, exploring nature and telling stories.',
    stat: '35mm',
    visual: 'aperture',
    hue: 288,
    span: 5,
  },
  {
    id: 'travel',
    index: '04',
    title: 'Travel',
    body: 'I love exploring new places, experiencing new cultures and meeting people.',
    note: 'Every new city is a different answer to the same problem.',
    stat: 'Western Ghats',
    visual: 'contour',
    hue: 198,
    span: 7,
    feature: true,
  },
  {
    id: 'music',
    index: '05',
    title: 'Music',
    body: 'Music keeps me motivated and helps me focus while coding.',
    stat: 'Lo-fi · Rock',
    visual: 'waveform',
    hue: 268,
    span: 4,
  },
  {
    id: 'learning',
    index: '06',
    title: 'Learning',
    body: "I'm always curious to learn new things and upskill myself.",
    stat: 'Always on',
    visual: 'constellation',
    hue: 240,
    span: 8,
  },
];
