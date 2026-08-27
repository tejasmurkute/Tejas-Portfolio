import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { inView, lineIn, stagger } from '@/utils/motion';

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the first word rises. */
  delay?: number;
  each?: number;
  /** Play immediately instead of waiting for the scroll viewport. */
  immediate?: boolean;
}

/**
 * Word-by-word masked rise. Each word sits in its own `overflow-hidden` span so
 * the letters appear to slide up from behind a solid edge rather than fading in
 * place — the difference between "animated" and "art directed".
 */
export function SplitText({
  text,
  className,
  delay = 0,
  each = 0.055,
  immediate = false,
}: SplitTextProps) {
  const words = text.split(' ');
  const play = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: inView };

  return (
    <motion.span
      className={cn('inline-flex flex-wrap', className)}
      variants={stagger(each, delay)}
      initial="hidden"
      {...play}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden py-[0.12em]" aria-hidden>
          <motion.span variants={lineIn} className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
