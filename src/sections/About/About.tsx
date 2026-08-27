import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { MEDIA, PROFILE, TRAITS } from '@/data/site';
import { inView } from '@/utils/motion';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';
import { Portrait } from '@/components/Portrait/Portrait';

const EASE = [0.16, 1, 0.3, 1] as const;

const FACTS: { label: string; value: string; href?: string }[] = [
  { label: 'Name', value: PROFILE.fullName },
  { label: 'Age', value: PROFILE.age },
  { label: 'Location', value: PROFILE.location },
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: 'Availability', value: PROFILE.availability },
];

export function About() {
  return (
    <Section id="about" label="About me">
      <div className="shell">
        <SectionHeader
          index="06"
          eyebrow="Profile"
          title="About Me"
          subtitle="Get to know me better"
          align="left"
        />

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Portrait ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 1, ease: EASE }}
            className="mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-4"
          >
            <Portrait
              src={MEDIA.portraitAbout || undefined}
              alt={`Portrait of ${PROFILE.fullName}`}
              variant="framed"
            />

            {/* Plate caption */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-4"
            >
              <span className="meta">{PROFILE.initials} &middot; {PROFILE.location}</span>
              <span className="meta text-ink-faint">Fig. 01</span>
            </motion.div>
          </motion.div>

          {/* ---------- Copy ---------- */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.15rem,2.3vw,1.55rem)] leading-[1.45] font-light text-ink">
                I&rsquo;m {PROFILE.fullName}, a Computer Science Engineer who is passionate about
                building products that solve real-world problems.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[0.92rem] leading-[1.8] text-ink-mute">
                I enjoy working with modern technologies, exploring new ideas and turning them into
                reality. I&rsquo;m a quick learner, team player and always ready for new challenges.
              </p>
            </Reveal>

            {/* ---- Fact sheet ---- */}
            <StaggerGroup
              each={0.06}
              delay={0.15}
              as="ul"
              className="mt-10 flex flex-col border-t border-line"
            >
              {FACTS.map((fact) => (
                <RevealItem
                  key={fact.label}
                  as="li"
                  className="group flex items-baseline gap-4 border-b border-line py-3.5"
                >
                  <span className="meta w-24 shrink-0 sm:w-28">{fact.label}</span>
                  {/* Dotted leader — the archival index look */}
                  <span
                    aria-hidden
                    className="h-px min-w-4 flex-1 self-center border-b border-dashed border-white/8 transition-colors duration-500 group-hover:border-accent/30"
                  />
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="text-right text-[0.85rem] text-ink-dim transition-colors duration-400 hover:text-accent-bright"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <span className="text-right text-[0.85rem] text-ink-dim">{fact.value}</span>
                  )}
                </RevealItem>
              ))}
            </StaggerGroup>

            {/* ---- Traits ---- */}
            <StaggerGroup each={0.07} delay={0.1} as="ul" className="mt-8 flex flex-wrap gap-2">
              {TRAITS.map((trait) => (
                <RevealItem
                  key={trait}
                  as="li"
                  className="group relative overflow-hidden border border-line px-4 py-2.5 transition-colors duration-500 hover:border-accent/45"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-y-full bg-accent/10 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0"
                  />
                  <span className="meta relative text-ink-dim transition-colors duration-500 group-hover:text-ink">
                    {trait}
                  </span>
                </RevealItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button
                  variant="primary"
                  href={PROFILE.resumeUrl}
                  icon={<Download strokeWidth={1.75} />}
                >
                  Download resume
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
