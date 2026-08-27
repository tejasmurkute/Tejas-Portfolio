import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PROFILE, SOCIALS } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';
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
    <Section id="contact" label="Contact">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Left: heading + channels ---------- */}
          <div className="lg:col-span-5">
            <SectionHeader index="07" eyebrow="Contact" title="Let's Connect" align="left" />

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-[1.75] text-ink-mute">
                Have a project in mind or just want to say hi? I&rsquo;d love to hear from you.
              </p>
            </Reveal>

            <StaggerGroup
              each={0.07}
              delay={0.15}
              as="ul"
              className="mt-10 flex flex-col border-t border-line"
            >
              {CHANNELS.map((channel) => {
                const Icon = channel.icon;
                const external = channel.href?.startsWith('http');
                const inner = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center border border-line bg-white/[0.015] text-ink-mute transition-colors duration-500 group-hover:border-accent/45 group-hover:text-accent-bright">
                      <Icon className="size-[15px]" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="meta block">{channel.label}</span>
                      <span className="mt-1.5 block truncate text-[0.85rem] text-ink-dim transition-colors duration-500 group-hover:text-ink">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <RevealItem key={channel.label} as="li" className="border-b border-line">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                        className="group flex items-center gap-4 py-4 transition-[padding] duration-500 [transition-timing-function:var(--ease-out-expo)] hover:pl-2"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 py-4">{inner}</div>
                    )}
                  </RevealItem>
                );
              })}
            </StaggerGroup>
          </div>

          {/* ---------- Right: form ---------- */}
          <Reveal delay={0.1} y={34} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
