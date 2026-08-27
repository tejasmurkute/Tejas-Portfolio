import { cn } from '@/utils/cn';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';
import React from 'react';

export type PresetType =
  | 'blur'
  | 'fade-in-blur'
  | 'scale'
  | 'fade'
  | 'slide';

export type PerType = 'word' | 'char' | 'line';

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  style?: React.CSSProperties;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onSegmentAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
};

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const presetVariants: Record<
  PresetType,
  { container?: Variants; item?: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(8px)', willChange: 'filter, opacity' },
      visible: { opacity: 1, filter: 'blur(0px)', willChange: 'filter, opacity' },
      exit: { opacity: 0, filter: 'blur(8px)', willChange: 'filter, opacity' },
    },
  },
  'fade-in-blur': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(8px)', y: 12, willChange: 'filter, transform, opacity' },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0, willChange: 'filter, transform, opacity' },
      exit: { opacity: 0, filter: 'blur(8px)', y: -12, willChange: 'filter, transform, opacity' },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.8, willChange: 'transform, opacity' },
      visible: { opacity: 1, scale: 1, willChange: 'transform, opacity' },
      exit: { opacity: 0, scale: 0.8, willChange: 'transform, opacity' },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, willChange: 'opacity' },
      visible: { opacity: 1, willChange: 'opacity' },
      exit: { opacity: 0, willChange: 'opacity' },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 16, willChange: 'transform, opacity' },
      visible: { opacity: 1, y: 0, willChange: 'transform, opacity' },
      exit: { opacity: 0, y: -16, willChange: 'transform, opacity' },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: PerType;
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className="block transform-gpu">
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre transform-gpu"
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className="inline-block whitespace-pre transform-gpu">
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre transform-gpu"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  style,
  preset = 'fade',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
}: TextEffectProps) {
  let segments: string[] = [];

  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const baseVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const stagger = defaultStaggerTimes[per] / speedReveal;
  const baseDuration = Math.max(0.2, 0.3 / speedSegment);

  const customItemVariants: Variants = {
    hidden: {
      ...baseVariants.item?.hidden,
      ...variants?.item?.hidden,
    },
    visible: {
      ...baseVariants.item?.visible,
      ...variants?.item?.visible,
      transition: {
        duration: baseDuration,
        ease: [0.16, 1, 0.3, 1],
        ...segmentTransition,
      },
    },
    exit: {
      ...baseVariants.item?.exit,
      ...variants?.item?.exit,
      transition: {
        duration: baseDuration * 0.7,
        ease: [0.16, 1, 0.3, 1],
        ...segmentTransition,
      },
    },
  };

  const customContainerVariants: Variants = {
    hidden: {
      ...baseVariants.container?.hidden,
      ...variants?.container?.hidden,
    },
    visible: {
      ...baseVariants.container?.visible,
      ...variants?.container?.visible,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
        ...containerTransition,
      },
    },
    exit: {
      ...baseVariants.container?.exit,
      ...variants?.container?.exit,
      transition: {
        staggerChildren: stagger * 0.5,
        staggerDirection: -1,
        ...containerTransition,
      },
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<any>;

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <MotionComponent
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={customContainerVariants}
          onAnimationComplete={onAnimationComplete}
          className={cn('whitespace-pre-wrap transform-gpu', className)}
          style={style}
        >
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={customItemVariants}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionComponent>
      )}
    </AnimatePresence>
  );
}
