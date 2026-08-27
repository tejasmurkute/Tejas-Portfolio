import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { Project } from '@/data/projects';
import { useIsTouch } from '@/hooks/useMediaQuery';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isTouch = useIsTouch();
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  // Pointer-tracked spotlight. Two motion values feeding one gradient — no
  // React re-renders, so it stays smooth while the grid is animating.
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${px}% ${py}%, hsl(${project.hue} 85% 70% / 0.10), transparent 62%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 100);
    py.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.article
      layout
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col border border-line bg-white/[0.012] transition-[transform,border-color,background-color] duration-[700ms] [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-white/16 hover:bg-white/[0.028]"
    >
      {/* Pointer spotlight */}
      <motion.span
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Outer bloom that only exists on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: `hsl(${project.hue} 80% 60% / 0.22)` }}
      />

      {/* ---- Header rail ---- */}
      <div className="relative flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="meta text-ink-faint transition-colors duration-500 group-hover:text-accent">
          {project.index}
        </span>
        <div className="flex items-center gap-3">
          <span className="meta text-ink-faint">{project.year}</span>
          <ArrowUpRight
            className="size-4 text-ink-faint transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-bright"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* ---- Visual ---- */}
      <div className="relative aspect-[8/5] overflow-hidden border-b border-line bg-[#060610]">
        <div className="absolute inset-0 transition-transform duration-[1100ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:-translate-y-1">
          <ProjectVisual visual={project.visual} hue={project.hue} />
        </div>
        {/* Vignette keeps the diagram from touching the card edges visually */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_40%,rgba(3,3,5,0.85)_100%)]"
        />
      </div>

      {/* ---- Body ---- */}
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-[1.15rem] leading-tight font-medium tracking-tight text-ink transition-colors duration-500 group-hover:text-accent-bright sm:text-[1.28rem]">
          {project.title}
        </h3>
        <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-mute">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <li
              key={t}
              className="border border-line px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-ink-mute transition-colors duration-500 group-hover:border-white/12 group-hover:text-ink-dim"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Bottom accent rule that draws in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-accent via-accent-bright to-transparent transition-transform duration-[800ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
        />
      </div>
    </motion.article>
  );
}
