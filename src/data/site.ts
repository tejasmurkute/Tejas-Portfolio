export type SectionId =
  | 'home'
  | 'projects'
  | 'software'
  | 'experience'
  | 'beyond'
  | 'about'
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
  /** Two-digit index shown in the mobile overlay and nav tooltips. */
  index: string;
}

/** Sections that appear in the persistent navigation, in scroll order. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'projects', label: 'I Build Things', index: '02' },
  { id: 'software', label: 'Software', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'beyond', label: 'Beyond Code', index: '05' },
  { id: 'about', label: 'About', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' },
];

/** Every section on the page, including the landing gate. */
export const ALL_SECTION_IDS: SectionId[] = NAV_ITEMS.map((n) => n.id);

export const PROFILE = {
  firstName: 'Tejas',
  lastName: 'Murkute',
  fullName: 'Tejas Murkute',
  initials: 'TM',
  role: 'Computer Science Engineer',
  age: '20',
  location: 'Pune, India',
  email: 'tejas.murkute@example.com',
  phone: '+91 12345 67890',
  availability: 'Open to opportunities',
  resumeUrl: '/resume.pdf',
  tagline: 'I build digital experiences that make an impact.',
  intro:
    'Computer Science Engineer focused on building products, solving problems and creating meaningful solutions.',
} as const;

/**
 * Image slots. Leave a value empty to render the designed placeholder instead.
 * Drop a file in `public/` and point at it (e.g. '/portrait.jpg') to swap in a
 * real photo — no component changes needed.
 */
export const MEDIA = {
  portrait: '',
  portraitAbout: '',
} as const;

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'mail';
}

export const SOCIALS: SocialLink[] = [
  {
    label: 'GitHub',
    handle: 'github.com/tejas-murkute',
    href: 'https://github.com/tejas-murkute',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/tejas-murkute',
    href: 'https://linkedin.com/in/tejas-murkute',
    icon: 'linkedin',
  },
  {
    label: 'Twitter',
    handle: '@tejasmurkute',
    href: 'https://twitter.com/tejasmurkute',
    icon: 'twitter',
  },
  {
    label: 'Instagram',
    handle: '@tejasmurkute',
    href: 'https://instagram.com/tejasmurkute',
    icon: 'instagram',
  },
  {
    label: 'Email',
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: 'mail',
  },
];

/** Compact stats strip on the Home section. */
export const STATS = [
  { value: '10+', label: 'Projects Completed' },
  { value: '5+', label: 'Technologies' },
  { value: '1+', label: 'Years Learning' },
  { value: '∞', label: 'Curiosity' },
] as const;

export const TRAITS = ['Problem Solver', 'Quick Learner', 'Team Player', 'Detail Oriented'] as const;
