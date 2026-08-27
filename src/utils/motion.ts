import type { Transition, Variants } from 'framer-motion';

/** Shared easing — a long, expo-style settle. Nothing in this site bounces. */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;

export const transition = (duration = 0.8, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Standard viewport trigger: fire once, slightly before the element is centred. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -12% 0px' } as const;

/** Rise + fade. The workhorse reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: transition(0.85) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(1) },
};

/** Container that staggers its children's reveals. */
export const stagger = (each = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Per-word / per-line entrance used for the big display headlines. */
export const lineIn: Variants = {
  hidden: { opacity: 0, y: '38%' },
  show: { opacity: 1, y: '0%', transition: transition(1) },
};

/** Clip-path wipe for images and thumbnails. */
export const wipeIn: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  show: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.1, ease: EASE },
  },
};
