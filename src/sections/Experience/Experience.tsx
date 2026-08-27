import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { EXPERIENCES } from '@/data/experience';
import { PROFILE } from '@/data/site';
import { inView } from '@/utils/motion';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ExperienceItem } from '@/components/ExperienceItem/ExperienceItem';

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);

  // The rail fills as the section passes the reading line — the timeline
  // literally draws itself while you read it.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 72%', 'end 62%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const glowY = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <Section id="experience" label="Experience">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="Trajectory"
          title="Experience"
          subtitle="My journey so far"
        />

        <div ref={railRef} className="relative mt-14 sm:mt-16">
          {/* Static rail */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-[13px] w-px bg-linear-to-b from-transparent via-line-strong to-transparent sm:left-[19px] lg:left-[27px]"
          />
          {/* Scroll-linked fill */}
          <motion.div
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute inset-y-0 left-[13px] w-px origin-top bg-linear-to-b from-accent via-accent to-accent/20 sm:left-[19px] lg:left-[27px]"
          />
          {/* Travelling glow at the fill head */}
          <motion.div
            aria-hidden
            style={{ top: glowY }}
            className="absolute left-[13px] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-lg sm:left-[19px] lg:left-[27px]"
          />

          <ul className="flex flex-col gap-6 sm:gap-8">
            {EXPERIENCES.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-5 sm:mt-14"
        >
          <div aria-hidden className="rule-fade w-full max-w-md" />
          <Button variant="outline" arrow="right" href={PROFILE.resumeUrl}>
            View full resume
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
