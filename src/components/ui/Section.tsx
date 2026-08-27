import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Renders the fading hairline that separates this section from the one above. */
  divider?: boolean;
  label: string;
}

/**
 * Consistent vertical rhythm for every section. All sections share one spacing
 * scale so the page has a single measured cadence instead of eight arbitrary
 * paddings.
 */
export function Section({ id, children, className, divider = true, label }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn('relative scroll-mt-20 py-24 outline-none sm:py-32 lg:py-40', className)}
    >
      {divider && (
        <div aria-hidden className="rule-fade shell absolute inset-x-0 top-0 opacity-70" />
      )}
      {children}
    </section>
  );
}
