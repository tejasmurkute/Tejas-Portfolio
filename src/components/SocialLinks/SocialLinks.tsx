import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SOCIALS } from '@/data/site';
import type { SocialLink } from '@/data/site';
import { cn } from '@/utils/cn';

const ICONS: Record<SocialLink['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

interface SocialLinksProps {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  /** Stagger start, so the rail can join the landing sequence. */
  delay?: number;
  items?: SocialLink[];
}

export function SocialLinks({
  orientation = 'vertical',
  className,
  delay = 0,
  items = SOCIALS,
}: SocialLinksProps) {
  const vertical = orientation === 'vertical';

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={cn('flex items-center gap-1', vertical ? 'flex-col' : 'flex-row', className)}
    >
      {items.map((social) => {
        const Icon = ICONS[social.icon];
        const external = social.href.startsWith('http');
        return (
          <motion.li
            key={social.label}
            variants={{
              hidden: { opacity: 0, [vertical ? 'x' : 'y']: vertical ? -10 : 10 },
              show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <a
              href={social.href}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="group relative flex size-9 items-center justify-center text-ink-mute transition-colors duration-400 hover:text-accent-bright"
            >
              <span className="sr-only">{social.label}</span>
              <Icon className="relative size-[16px]" strokeWidth={1.5} />
              {/* Hover halo — appears from nothing, no permanent chrome */}
              <span
                aria-hidden
                className="absolute inset-0 scale-75 rounded-full border border-accent/0 bg-accent/0 opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-100 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:opacity-100"
              />
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
