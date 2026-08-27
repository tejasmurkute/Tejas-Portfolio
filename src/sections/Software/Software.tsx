import { motion } from 'framer-motion';
import { SKILL_COUNT, SKILL_GROUPS } from '@/data/skills';
import { inView, stagger } from '@/utils/motion';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { SkillItem } from '@/components/SkillItem/SkillItem';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Software() {
  return (
    <Section id="software" label="Software and tools">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow={`${SKILL_COUNT} Modules`}
          title="Software"
          subtitle="Technologies and tools I work with"
        />

        <div className="mt-14 flex flex-col gap-12 sm:mt-16 sm:gap-14">
          {SKILL_GROUPS.map((group) => (
            <motion.section
              key={group.id}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              variants={stagger(0.045)}
              aria-label={group.label}
            >
              {/* Group rail: index — label ————————— count */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                className="mb-4 flex items-center gap-4"
              >
                <span className="meta text-accent/80">{group.index}</span>
                <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-dim">
                  {group.label}
                </h3>
                <span aria-hidden className="rule-fade h-px flex-1" />
                <span className="meta text-ink-faint">
                  {String(group.skills.length).padStart(2, '0')}
                </span>
              </motion.div>

              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} group={group.label} />
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </Section>
  );
}
