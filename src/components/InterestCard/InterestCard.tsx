import { motion } from 'framer-motion';
import type { Interest } from '@/data/interests';
import { cn } from '@/utils/cn';
import { inView } from '@/utils/motion';
import { InterestVisual } from './InterestVisual';

interface InterestCardProps {
  item: Interest;
}

const SPANS: Record<Interest['span'], string> = {
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
};

/**
 * Editorial entry, not a hobby tile.
 *
 * Feature entries lead with a large image plate and carry a pull-quote;
 * the rest are typographic with the artwork demoted to a background wash.
 * That variation is what keeps six items from reading as a six-up card grid.
 */
export function InterestCard({ item }: InterestCardProps) {
  const feature = !!item.feature;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col overflow-hidden border border-line bg-white/[0.012]',
        'transition-[transform,border-color,background-color] duration-[800ms] [transition-timing-function:var(--ease-out-expo)]',
        'hover:-translate-y-1 hover:border-white/14 hover:bg-white/[0.024]',
        SPANS[item.span],
        feature ? 'lg:row-span-1' : '',
      )}
    >
      {/* ---- Feature: full image plate on top ---- */}
      {feature ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line sm:aspect-[2/1] lg:aspect-[16/8]">
          <InterestVisual visual={item.visual} hue={item.hue} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/25 to-transparent"
          />
          <span className="meta absolute left-5 top-5 text-ink-dim sm:left-6 sm:top-6">
            {item.index}
          </span>
          <span className="meta absolute right-5 top-5 border border-white/12 bg-void/50 px-2.5 py-1.5 text-ink-dim backdrop-blur-sm sm:right-6 sm:top-6">
            {item.stat}
          </span>
        </div>
      ) : (
        // ---- Non-feature: artwork demoted to a corner wash ----
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 h-52 w-72 opacity-45 transition-opacity duration-[900ms] group-hover:opacity-70"
        >
          <InterestVisual visual={item.visual} hue={item.hue} />
          <div className="absolute inset-0 bg-linear-to-l from-transparent via-void/45 to-void" />
        </div>
      )}

      <div
        className={cn(
          'relative flex flex-1 flex-col p-5 sm:p-6',
          feature ? 'lg:p-7' : 'pt-6 sm:pt-8 lg:p-7',
        )}
      >
        {!feature && (
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="meta text-ink-faint">{item.index}</span>
            <span className="meta text-ink-faint">{item.stat}</span>
          </div>
        )}

        <h3
          className={cn(
            'font-display font-medium tracking-tight text-ink transition-colors duration-500 group-hover:text-accent-bright',
            feature ? 'text-[1.5rem] sm:text-[1.85rem]' : 'text-[1.25rem] sm:text-[1.4rem]',
          )}
        >
          {item.title}
        </h3>

        <p
          className={cn(
            'mt-3 leading-relaxed text-ink-mute',
            feature ? 'max-w-md text-[0.9rem]' : 'text-[0.85rem]',
          )}
        >
          {item.body}
        </p>

        {item.note && (
          <p className="mt-auto pt-6">
            <span className="block border-l border-accent/45 pl-4 font-display text-[0.95rem] leading-snug font-light italic text-ink-dim">
              {item.note}
            </span>
          </p>
        )}

        {/* Baseline accent that draws in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-accent to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
        />
      </div>
    </motion.article>
  );
}
