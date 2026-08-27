import { motion } from 'framer-motion';
import type { Experience } from '@/data/experience';
import { inView } from '@/utils/motion';

interface ExperienceItemProps {
  item: Experience;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <motion.li
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="group relative pl-12 sm:pl-16 lg:pl-24"
    >
      {/* ---- Timeline node ---- */}
      <motion.span
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
        }}
        className="absolute left-[13px] top-8 z-10 flex size-2.5 -translate-x-1/2 items-center justify-center sm:left-[19px] lg:left-[27px]"
        aria-hidden
      >
        <span className="size-2.5 rounded-full border border-accent bg-void transition-colors duration-500 group-hover:bg-accent" />
        <span className="absolute size-2.5 rounded-full bg-accent/40 blur-[6px]" />
        {item.current && (
          <span className="absolute size-2.5 animate-ping rounded-full bg-accent/50" />
        )}
      </motion.span>

      {/* ---- Entry ---- */}
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 26 },
          show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
        }}
        className="relative border border-line bg-white/[0.012] p-5 transition-[transform,border-color,background-color] duration-[700ms] [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1 hover:border-white/14 hover:bg-white/[0.026] sm:p-6 lg:p-7"
      >
        {/* Connector from the rail into the card */}
        <span
          aria-hidden
          className="absolute -left-8 top-[35px] h-px w-8 bg-linear-to-r from-accent/50 to-line sm:-left-10 sm:w-10 lg:-left-14 lg:w-14"
        />

        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="flex min-w-0 items-start gap-4">
            {/* Company mark */}
            <span className="flex size-11 shrink-0 items-center justify-center border border-line-strong bg-white/[0.02] font-display text-[0.95rem] font-semibold text-ink-dim transition-colors duration-500 group-hover:border-accent/45 group-hover:text-accent-bright sm:size-12">
              {item.mark}
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-[1.05rem] leading-tight font-medium tracking-tight text-ink sm:text-[1.2rem]">
                {item.role}
              </h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-ink-mute">
                <span className="text-accent/90">{item.company}</span>
                <span aria-hidden className="text-ink-faint">
                  /
                </span>
                <span>{item.type}</span>
                <span aria-hidden className="text-ink-faint">
                  /
                </span>
                <span>{item.location}</span>
              </p>
            </div>
          </div>

          <span className="meta shrink-0 whitespace-nowrap text-ink-dim">{item.period}</span>
        </div>

        <p className="mt-5 text-[0.85rem] leading-relaxed text-ink-dim">{item.summary}</p>

        <ul className="mt-4 flex flex-col gap-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.82rem] leading-relaxed text-ink-mute">
              <span
                aria-hidden
                className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ink-faint transition-colors duration-500 group-hover:bg-accent/70"
              />
              {point}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="border border-line px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-ink-mute transition-colors duration-500 group-hover:border-white/12 group-hover:text-ink-dim"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Index watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-5 font-display text-[2.75rem] leading-none font-bold text-white/[0.028] transition-colors duration-700 group-hover:text-white/[0.05]"
        >
          {item.index}
        </span>
      </motion.article>
    </motion.li>
  );
}
