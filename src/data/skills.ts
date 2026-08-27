export interface Skill {
  name: string;
  /** 2–3 character monogram rendered in the module tile. */
  mono: string;
  /** Brand colour, used at low opacity for the tile tint. */
  color: string;
  /** Tiny technical note revealed on hover. */
  meta: string;
  /** 1–3, rendered as a discreet segment indicator. */
  level: 1 | 2 | 3;
}

export interface SkillGroup {
  id: string;
  label: string;
  index: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    index: '01',
    skills: [
      { name: 'JavaScript', mono: 'JS', color: '#f7df1e', meta: 'ES2023', level: 3 },
      { name: 'TypeScript', mono: 'TS', color: '#3178c6', meta: 'strict mode', level: 3 },
      { name: 'Python', mono: 'PY', color: '#3776ab', meta: 'v3.12', level: 2 },
      { name: 'Java', mono: 'JV', color: '#e76f00', meta: 'JDK 21', level: 2 },
      { name: 'SQL', mono: 'SQL', color: '#4a90d9', meta: 'ANSI', level: 2 },
      { name: 'C++', mono: 'C++', color: '#00599c', meta: 'C++17', level: 2 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    index: '02',
    skills: [
      { name: 'React', mono: 'RE', color: '#61dafb', meta: 'v19 · hooks', level: 3 },
      { name: 'Next.js', mono: 'NX', color: '#e8e8f0', meta: 'app router', level: 2 },
      { name: 'Tailwind CSS', mono: 'TW', color: '#38bdf8', meta: 'v4', level: 3 },
      { name: 'HTML5', mono: 'H5', color: '#e34f26', meta: 'semantic', level: 3 },
      { name: 'CSS3', mono: 'C3', color: '#1572b6', meta: 'grid · flex', level: 3 },
      { name: 'Redux', mono: 'RX', color: '#764abc', meta: 'toolkit', level: 2 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    index: '03',
    skills: [
      { name: 'Node.js', mono: 'ND', color: '#5fa04e', meta: 'LTS', level: 3 },
      { name: 'Express.js', mono: 'EX', color: '#e8e8f0', meta: 'v5', level: 3 },
      { name: 'REST APIs', mono: 'API', color: '#8b5cf6', meta: 'OpenAPI', level: 3 },
      { name: 'GraphQL', mono: 'GQ', color: '#e10098', meta: 'schema-first', level: 1 },
      { name: 'Socket.io', mono: 'IO', color: '#e8e8f0', meta: 'realtime', level: 2 },
    ],
  },
  {
    id: 'data',
    label: 'Databases & Cloud',
    index: '04',
    skills: [
      { name: 'MySQL', mono: 'MY', color: '#00758f', meta: 'InnoDB', level: 3 },
      { name: 'MongoDB', mono: 'MG', color: '#47a248', meta: 'atlas', level: 3 },
      { name: 'PostgreSQL', mono: 'PG', color: '#4169e1', meta: 'v16', level: 2 },
      { name: 'Firebase', mono: 'FB', color: '#ffca28', meta: 'auth · rtdb', level: 2 },
      { name: 'AWS', mono: 'AWS', color: '#ff9900', meta: 'ec2 · s3', level: 1 },
      { name: 'Docker', mono: 'DK', color: '#2496ed', meta: 'compose', level: 2 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Others',
    index: '05',
    skills: [
      { name: 'Git', mono: 'GIT', color: '#f05032', meta: 'rebase flow', level: 3 },
      { name: 'GitHub', mono: 'GH', color: '#e8e8f0', meta: 'actions', level: 3 },
      { name: 'VS Code', mono: 'VS', color: '#007acc', meta: 'daily driver', level: 3 },
      { name: 'Postman', mono: 'PM', color: '#ff6c37', meta: 'collections', level: 2 },
      { name: 'Figma', mono: 'FG', color: '#f24e1e', meta: 'auto layout', level: 2 },
      { name: 'Linux', mono: 'LX', color: '#fcc624', meta: 'ubuntu', level: 2 },
    ],
  },
];

export const SKILL_COUNT = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);
