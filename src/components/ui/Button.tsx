import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'outline' | 'quiet';
type Arrow = 'right' | 'up-right' | 'none';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  arrow?: Arrow;
  icon?: ReactNode;
  className?: string;
  full?: boolean;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  href?: never;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: never;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

type Props = ButtonProps | LinkProps;

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden ' +
  'px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] font-mono ' +
  'transition-[transform,border-color,color,background-color] duration-500 ' +
  '[transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 ' +
  'disabled:pointer-events-none disabled:opacity-40';

const variants: Record<Variant, string> = {
  // Solid violet — reserved for the single primary action on a screen.
  primary:
    'text-white border border-accent/60 bg-accent ' +
    'shadow-[0_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_10px_40px_-12px_rgba(139,92,246,0.75)] ' +
    'hover:border-accent-bright',
  // Hairline box that fills with a whisper of accent on hover.
  outline:
    'text-ink border border-line-strong bg-white/[0.015] ' +
    'hover:border-accent/60 hover:bg-accent/[0.07] hover:text-white',
  // Text-only, for tertiary navigation.
  quiet: 'text-ink-dim border border-transparent px-2 hover:text-ink',
};

export function Button(props: Props) {
  const {
    children,
    variant = 'outline',
    arrow = 'none',
    icon,
    className,
    full = false,
  } = props;

  const Arrow = arrow === 'up-right' ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      {/* Sheen that sweeps across on hover — one layer, GPU-only properties. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/12 to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-full"
      />
      {icon && <span className="relative shrink-0 [&>svg]:size-[15px]">{icon}</span>}
      <span className="relative">{children}</span>
      {arrow !== 'none' && (
        <Arrow
          className={cn(
            'relative size-[15px] shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]',
            arrow === 'right'
              ? 'group-hover/btn:translate-x-1'
              : 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
          )}
          strokeWidth={1.75}
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], full && 'w-full', className);

  if ('href' in props && props.href !== undefined) {
    const external = props.external ?? /^https?:/.test(props.href);
    return (
      <a
        href={props.href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
