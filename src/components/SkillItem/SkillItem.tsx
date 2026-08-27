import { motion } from 'framer-motion';
import type { Skill } from '@/data/skills';
import { cn } from '@/utils/cn';

interface SkillItemProps {
  skill: Skill;
  /** Category name, shown as the resting caption. */
  group: string;
}

/**
 * One technology, rendered as a module in a rack rather than a logo tile.
 *
 * The monogram is deliberate: 29 brand SVGs would be a logo wall, which is
 * exactly what this section is supposed to avoid. A consistent mono glyph
 * tinted with each brand's colour keeps the grid typographic and lets the
 * hover state carry the actual information.
 */
export function SkillItem({ skill, group }: SkillItemProps) {
  return (
    <motion.li
      // Variants are inherited from the group's motion.section through React
      // context, so the plain <ul> in between costs nothing.
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={cn(
        'group relative flex flex-col justify-between gap-4 border border-line bg-white/[0.012] p-3.5 sm:p-4',
        'transition-[transform,border-color,background-color] duration-500 [transition-timing-function:var(--ease-out-expo)]',
        'hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/[0.045]',
      )}
    >
      {/* Monogram tile */}
      <div className="flex items-start justify-between">
        <span
          className="flex size-9 items-center justify-center border font-mono text-[0.6rem] font-semibold tracking-[0.02em] transition-all duration-500 sm:size-10 sm:text-[0.66rem]"
          style={{
            color: skill.color,
            borderColor: `color-mix(in oklab, ${skill.color} 26%, transparent)`,
            backgroundColor: `color-mix(in oklab, ${skill.color} 7%, transparent)`,
          }}
        >
          {skill.mono}
        </span>

        {/* Proficiency segments — three ticks, no percentages, no fake precision */}
        <span
          aria-hidden
          className="flex gap-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={cn(
                'h-3 w-px transition-colors duration-500',
                n <= skill.level ? 'bg-accent' : 'bg-white/12',
              )}
            />
          ))}
        </span>
      </div>

      <div>
        <p className="truncate text-[0.8rem] font-medium text-ink-dim transition-colors duration-500 group-hover:text-ink">
          {skill.name}
        </p>

        {/* Caption swaps to technical metadata on hover, in a fixed-height
            slot so nothing in the grid shifts. */}
        <div className="relative mt-1 h-3.5 overflow-hidden">
          <span className="meta absolute inset-x-0 top-0 truncate text-ink-faint transition-all duration-400 group-hover:-translate-y-2 group-hover:opacity-0">
            {group}
          </span>
          <span className="meta absolute inset-x-0 top-0 translate-y-2 truncate text-accent/90 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            {skill.meta}
          </span>
        </div>
      </div>

      {/* Corner tick */}
      <span
        aria-hidden
        className="absolute right-0 top-0 size-2 border-r border-t border-transparent transition-colors duration-500 group-hover:border-accent/60"
      />
    </motion.li>
  );
}
