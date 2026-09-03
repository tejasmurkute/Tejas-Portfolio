import { Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PROFILE, SOCIALS } from '@/data/site';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { ContactForm } from '@/components/ContactForm/ContactForm';

const github = SOCIALS.find((s) => s.icon === 'github');
const linkedin = SOCIALS.find((s) => s.icon === 'linkedin');

const CHANNELS: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Location', value: PROFILE.location },
  { icon: Linkedin, label: 'LinkedIn', value: linkedin?.handle ?? '', href: linkedin?.href },
  { icon: Github, label: 'GitHub', value: github?.handle ?? '', href: github?.href },
];

export function Contact() {
  return (
    <section id="contact" className="relative bg-void pt-32 pb-16 overflow-hidden border-t border-line">
      <div className="shell relative z-20 mb-20 sm:mb-32">
        <SectionHeader
          index="07"
          eyebrow="Contact"
          title="Let's Connect"
          subtitle="Have a project in mind?"
          align="left"
        />
      </div>

      <div className="shell relative z-20 flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
        
        {/* Left: Channels */}
        <div className="w-full lg:w-5/12">
          <ul className="flex flex-col border-t border-line">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              const external = channel.href?.startsWith('http');
              const inner = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.015] text-ink-mute transition-colors duration-500 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent-bright">
                    <Icon className="size-[18px]" strokeWidth={1.5} />
                  </span>
                  <div className="flex flex-col ml-6">
                    <span className="text-[0.75rem] font-mono tracking-widest uppercase text-ink-dim mb-1">{channel.label}</span>
                    <span className="text-lg text-ink group-hover:text-accent-bright transition-colors duration-500">
                      {channel.value}
                    </span>
                  </div>
                  {channel.href && (
                    <ArrowUpRight className="ml-auto size-5 text-ink-faint opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent" />
                  )}
                </>
              );

              return (
                <li key={channel.label} className="border-b border-line group">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="flex items-center py-6 transition-[padding] duration-500 [transition-timing-function:var(--ease-out-expo)] hover:pl-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center py-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full lg:w-7/12">
          <div className="p-8 sm:p-12 rounded-3xl border border-line bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-700">
            <h3 className="text-3xl font-display text-ink mb-8">Send a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Colossal Footer Typography */}
      <div className="w-full overflow-hidden flex justify-center pb-8 border-t border-line/50 pt-16 mt-16">
        <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-ink to-ink/20 mix-blend-difference pointer-events-none select-none hover:opacity-80 transition-opacity">
          LET'S TALK.
        </h1>
      </div>
    </section>
  );
}
