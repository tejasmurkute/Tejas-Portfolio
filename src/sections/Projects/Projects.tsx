import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { PROJECTS, PROJECT_FILTERS } from '@/data/projects';
import type { ProjectCategory } from '@/data/projects';
import { inView } from '@/utils/motion';
import { cn } from '@/utils/cn';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

type Filter = ProjectCategory | 'all';

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  // Empty filters would leave a hole in the layout; hide them instead.
  const filters = useMemo(
    () => PROJECT_FILTERS.filter((f) => f.id === 'all' || PROJECTS.some((p) => p.category === f.id)),
    [],
  );

  return (
    <Section id="projects" label="Projects">
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow="Selected Work"
          title="I Build Things"
          subtitle="Some of the projects I've worked on"
        />

        {/* ---- Filters ---- */}
        <Reveal delay={0.1} className="mt-12 sm:mt-14">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1 border border-line p-1"
          >
            {filters.map((f) => {
              const isActive = filter === f.id;
              const count =
                f.id === 'all'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === f.id).length;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'relative px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors duration-400 sm:px-5',
                    isActive ? 'text-white' : 'text-ink-mute hover:text-ink-dim',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-accent/85"
                    />
                  )}
                  <span className="relative">{f.label}</span>
                  <sup
                    className={cn(
                      'relative ml-1 text-[0.55em] transition-colors duration-400',
                      isActive ? 'text-white/70' : 'text-ink-faint',
                    )}
                  >
                    {count}
                  </sup>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- Grid ---- */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* ---- Footer action ---- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col items-center gap-5 sm:mt-16"
        >
          <div aria-hidden className="rule-fade w-full max-w-md" />
          <Button variant="outline" arrow="right" href="https://github.com/tejas-murkute">
            View all projects
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
