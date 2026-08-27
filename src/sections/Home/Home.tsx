import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { MEDIA, PROFILE, STATS } from '@/data/site';
import { inView } from '@/utils/motion';
import { scrollToSection } from '@/utils/cn';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealItem, StaggerGroup } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { Portrait } from '@/components/Portrait/Portrait';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Home() {
  return (
    <Section id="home" label="Introduction" divider={false} className="pt-28 sm:pt-32 lg:pt-36">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Copy ---------- */}
          <div className="lg:col-span-7 xl:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="meta text-accent">Welcome</span>
                <span aria-hidden className="h-px w-12 bg-linear-to-r from-accent/60 to-transparent" />
              </div>
            </Reveal>

            <h2 className="display mt-6 text-[clamp(2.5rem,7.5vw,5.25rem)] leading-[0.95]">
              <span className="block text-ink">
                <SplitText text="Turning Ideas" each={0.06} />
              </span>
              <span className="block">
                <SplitText text="Into" each={0.06} delay={0.12} />{' '}
                <span className="accent-text">
                  <SplitText text="Reality." each={0.06} delay={0.2} />
                </span>
              </span>
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-[0.95rem] leading-[1.75] text-ink-dim">
                I&rsquo;m a Computer Science Engineer who loves to design, develop and ship products
                that solve real-world problems. I enjoy working with modern technologies and turning
                complex problems into simple, beautiful and effective solutions.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button variant="primary" arrow="right" onClick={() => scrollToSection('projects')}>
                  Explore my work
                </Button>
                <Button
                  variant="outline"
                  href={PROFILE.resumeUrl}
                  icon={<Download strokeWidth={1.75} />}
                >
                  Download resume
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------- Portrait ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
            className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-none xl:col-span-6 xl:pl-10"
          >
            <Portrait
              src={MEDIA.portrait || undefined}
              alt={`${PROFILE.fullName}, ${PROFILE.role}`}
              variant="floating"
              className="lg:max-w-[24rem] lg:ml-auto"
            >
              {/* Metadata card clipped to the frame's lower edge */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
                className="panel absolute -bottom-6 -left-4 flex flex-col gap-2 px-4 py-3 backdrop-blur-md sm:-left-6 sm:px-5 sm:py-4"
              >
                <div className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-accent" />
                  <span className="meta text-ink-dim">CSE Student</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-azure" />
                  <span className="meta text-ink-dim">Problem Solver</span>
                </div>
              </motion.div>

              {/* Vertical spine label */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 1, delay: 0.8 }}
                className="meta absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap text-ink-faint xl:block"
              >
                {PROFILE.location}
              </motion.span>
            </Portrait>
          </motion.div>
        </div>

        {/* ---------- Stats ---------- */}
        <StaggerGroup
          each={0.08}
          delay={0.1}
          className="panel mt-20 grid grid-cols-2 divide-x divide-y divide-line sm:mt-24 lg:mt-28 lg:grid-cols-4 lg:divide-y-0"
        >
          {STATS.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group relative overflow-hidden px-5 py-7 text-center sm:px-6 sm:py-9"
            >
              {/* Hover wash */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-linear-to-t from-accent/8 to-transparent transition-[height] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:h-full"
              />
              <div className="relative font-display text-[clamp(1.9rem,4.4vw,2.9rem)] leading-none font-medium tracking-tight text-ink transition-colors duration-500 group-hover:text-accent-bright">
                {stat.value}
              </div>
              <div className="meta relative mt-3">{stat.label}</div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
