import { cn } from '@/utils/cn';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';
import { useState, useEffect, Children } from 'react';
import React from 'react';

export type TextLoopProps = {
  children: React.ReactNode;
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  onComplete?: () => void;
  loop?: boolean;
  trigger?: boolean;
  mode?: 'wait' | 'popLayout';
  initial?: boolean;
};

export function TextLoop({
  children,
  className,
  interval = 2.2,
  transition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  variants,
  onIndexChange,
  onComplete,
  loop = true,
  trigger = true,
  mode = 'wait',
  initial = true,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    if (!trigger) return;

    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (!loop && current >= items.length - 1) {
          clearInterval(timer);
          return items.length; // Triggers exit animation for the final item
        }
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger, loop]);

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    ...variants,
  };

  const isExited = currentIndex >= items.length;

  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence
        mode={mode}
        initial={initial}
        onExitComplete={() => {
          if (isExited) {
            onComplete?.();
          }
        }}
      >
        {!isExited && (
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            variants={motionVariants}
            className="transform-gpu"
            style={{ willChange: 'transform, opacity' }}
          >
            {items[currentIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
