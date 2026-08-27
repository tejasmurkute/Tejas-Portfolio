export interface Experience {
  id: string;
  index: string;
  role: string;
  company: string;
  /** Single-letter mark rendered in the timeline node badge. */
  mark: string;
  period: string;
  type: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
  current?: boolean;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'bhoomitrace',
    index: '01',
    role: 'Frontend Developer Intern',
    company: 'Bhoomitrace',
    mark: 'B',
    period: 'May 2026 — Present',
    type: 'Internship',
    location: 'Pune, India',
    summary: 'Building the web and mobile surface of the BHT product line.',
    points: [
      'Working on BHT web & mobile applications',
      'Building reusable UI components',
      'Integrating APIs',
      'Collaborating with the development team',
      'Debugging production issues',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    current: true,
  },
  {
    id: 'abc-tech',
    index: '02',
    role: 'Web Developer Intern',
    company: 'ABC Tech Solutions',
    mark: 'A',
    period: 'Jan 2026 — Apr 2026',
    type: 'Internship',
    location: 'Remote',
    summary: 'Shipped responsive product surfaces and tightened performance.',
    points: [
      'Developed responsive web applications',
      'Worked with React, Node.js and MySQL',
      'Improved performance and fixed critical bugs',
    ],
    stack: ['React', 'Node.js', 'MySQL'],
  },
  {
    id: 'open-source',
    index: '03',
    role: 'Open Source Contributor',
    company: 'Various Projects',
    mark: '{ }',
    period: '2023 — Present',
    type: 'Community',
    location: 'Distributed',
    summary: 'Learning in public by improving the tools I use every day.',
    points: [
      'Contributed to open source projects',
      'Fixed bugs',
      'Improved documentation',
      'Added features',
    ],
    stack: ['Git', 'GitHub', 'JavaScript'],
    current: true,
  },
];
