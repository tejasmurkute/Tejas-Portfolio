export type ProjectCategory = 'web' | 'mobile' | 'aiml' | 'other';

/** Key of the procedurally drawn SVG used as the card's thumbnail. */
export type ProjectVisual = 'scanner' | 'network' | 'lattice' | 'tower' | 'horizon' | 'chart';

export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  visual: ProjectVisual;
  /** Hue drives the thumbnail's tint so the grid reads as a spectrum, not a palette. */
  hue: number;
  year: string;
  href?: string;
  repo?: string;
}

export const PROJECT_FILTERS: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'aiml', label: 'AI/ML' },
  { id: 'other', label: 'Other' },
];

export const PROJECTS: Project[] = [
  {
    id: 'safescan',
    index: '01',
    title: 'SafeScan',
    description: 'QR & document scanner with security and analytics.',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'web',
    visual: 'scanner',
    hue: 258,
    year: '2026',
  },
  {
    id: 'grromio',
    index: '02',
    title: 'Grromio',
    description: 'Pet care platform connecting pet owners and service providers.',
    tech: ['React Native', 'Node.js', 'Tailwind'],
    category: 'mobile',
    visual: 'network',
    hue: 200,
    year: '2026',
  },
  {
    id: 'pharmacy',
    index: '03',
    title: 'Pharmacy Management System',
    description: 'Manage inventory, sales and prescriptions efficiently.',
    tech: ['Java', 'MySQL', 'Swing'],
    category: 'other',
    visual: 'lattice',
    hue: 312,
    year: '2025',
  },
  {
    id: 'student',
    index: '04',
    title: 'Student Management System',
    description: 'Desktop application to manage student records and attendance.',
    tech: ['Java', 'MySQL', 'Swing'],
    category: 'other',
    visual: 'tower',
    hue: 224,
    year: '2025',
  },
  {
    id: 'vr-game',
    index: '05',
    title: 'VR Game',
    description: 'Virtual reality game built with immersive experience in mind.',
    tech: ['Unity', 'C#'],
    category: 'other',
    visual: 'horizon',
    hue: 292,
    year: '2025',
  },
  {
    id: 'data-analysis',
    index: '06',
    title: 'Data Analysis System',
    description: 'Analyze and visualize data to derive meaningful insights.',
    tech: ['Python', 'Pandas', 'Chart.js'],
    category: 'aiml',
    visual: 'chart',
    hue: 212,
    year: '2024',
  },
];
