import { motion, MotionValue, useTransform } from 'framer-motion';
import React, { useMemo } from 'react';

interface ScrollRevealTextProps {
  text: string;
  progress: MotionValue<number>;
  className?: string;
}

export function ScrollRevealText({ text, progress, className = '' }: ScrollRevealTextProps) {
  // Split the text into words to animate them individually.
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <p className={className}>
      {words.map((word, i) => {
        // The word reveals linearly across the progress range
        const start = (i / words.length) * 0.9;
        const end = ((i + 1) / words.length) * 0.9;
        
        return (
          <React.Fragment key={i}>
            <Word progress={progress} range={[start, end]}>
              {word}
            </Word>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  // Instead of scrubbing the color slowly across the scroll range, we use a microscopic step.
  // This causes the color value to instantly snap to white when the scroll crosses the start threshold.
  const startThreshold = range[0];
  const color = useTransform(
    progress,
    [startThreshold, startThreshold + 0.0001],
    ['#333333', '#e5e5e5']
  );

  return (
    // The browser's CSS transition takes over the actual fade, completely independent of scroll speed!
    <motion.span style={{ color }} className="transition-colors duration-300">
      {children}
    </motion.span>
  );
}
