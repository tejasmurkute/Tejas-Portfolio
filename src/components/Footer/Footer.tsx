import { ArrowUp } from 'lucide-react';
import { PROFILE, SOCIALS } from '@/data/site';
import { scrollToSection } from '@/utils/cn';

const LINKS = SOCIALS.filter((s) => ['github', 'linkedin', 'mail'].includes(s.icon));

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="shell flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-center text-[0.78rem] text-ink-mute sm:text-left">
          &copy; 2026 {PROFILE.fullName}.
          <span className="mt-1 block text-ink-faint sm:mt-0 sm:ml-2 sm:inline">
            Designed &amp; built by {PROFILE.fullName}.
          </span>
        </p>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="meta transition-colors duration-400 hover:text-accent-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollToSection('landing')}
            aria-label="Back to top"
            className="group flex size-9 items-center justify-center rounded-full border border-line text-ink-mute transition-colors duration-500 hover:border-accent/50 hover:text-accent-bright"
          >
            <ArrowUp
              className="size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
