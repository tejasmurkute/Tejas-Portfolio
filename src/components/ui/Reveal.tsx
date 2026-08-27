import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { inView, riseIn, stagger } from '@/utils/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
}

/** Single-element scroll reveal. */
export function Reveal({ children, className, delay = 0, y = 26, as = 'div' }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  each?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol';
}

/** Parent that staggers `RevealItem` children. */
export function StaggerGroup({
  children,
  className,
  each = 0.07,
  delay = 0,
  as = 'div',
}: StaggerProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={stagger(each, delay)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </Tag>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

export function RevealItem({ children, className, as = 'div' }: ItemProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={riseIn}>
      {children}
    </Tag>
  );
}
