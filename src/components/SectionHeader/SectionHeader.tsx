import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { inView } from '@/utils/motion';
import { SplitText } from '@/components/ui/SplitText';

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  /** Uppercase word shown beside the index, e.g. "Selected Work". */
  eyebrow?: string;
  align?: 'center' | 'left';
  className?: string;
}

/**
 * The one heading treatment used by every section. Keeping this in a single
 * component is what stops the eight sections from drifting into eight
 * different websites.
 */
export function SectionHeader({
  index,
  title,
  subtitle,
  eyebrow,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <header
      className={cn(
        'relative flex flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {/* Index + hairline + eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex items-center gap-4', centered && 'justify-center')}
      >
        <span className="meta text-accent/90">{index}</span>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inView}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block h-px w-14 origin-left bg-linear-to-r from-accent/70 to-transparent sm:w-20"
        />
        {eyebrow && <span className="meta">{eyebrow}</span>}
      </motion.div>

      {/* Display title */}
      <h2
        className={cn(
          'display mt-5 text-ink',
          'text-[clamp(2.25rem,7.2vw,4.75rem)]',
          centered && 'justify-center',
        )}
      >
        <SplitText text={title} className={centered ? 'justify-center' : ''} each={0.06} />
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-mute',
            centered && 'mx-auto',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
