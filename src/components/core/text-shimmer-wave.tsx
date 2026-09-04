import type { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface TextShimmerWaveProps {
  children: string;
  className?: string;
  duration?: number;
  spread?: number;
  zDistance?: number;
  delay?: number;
}

export const TextShimmerWave: FC<TextShimmerWaveProps> = ({
  children,
  className,
  duration = 1.2,
  spread = 1,
  zDistance = 2,
  delay = 0,
}) => {
  const characters = children.split('');

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        className
      )}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            y: [0, -zDistance, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay + (i * spread) * 0.06,
            ease: 'easeInOut',
          }}
          className="inline-block whitespace-pre"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
