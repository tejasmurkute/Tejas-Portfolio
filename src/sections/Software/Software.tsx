import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SKILL_COUNT, SKILL_GROUPS } from '@/data/skills';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { SkillItem } from '@/components/SkillItem/SkillItem';

export function Software() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Marquee scroll mapping
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const reverseMarqueeX = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  const allSkills = SKILL_GROUPS.flatMap(g => g.skills.map(s => s.name)).join(' • ');

  return (
    <section ref={containerRef} id="software" className="relative bg-void py-32 overflow-hidden">
      
      {/* Background Marquee Text */}
      <div className="absolute inset-0 flex flex-col justify-center gap-12 sm:gap-24 opacity-5 pointer-events-none select-none z-0">
        <motion.div style={{ x: marqueeX }} className="whitespace-nowrap font-display text-[15vw] font-bold text-accent-bright leading-none">
          {allSkills} • {allSkills}
        </motion.div>
        <motion.div style={{ x: reverseMarqueeX }} className="whitespace-nowrap font-display text-[15vw] font-bold text-accent-bright leading-none">
          {allSkills} • {allSkills}
        </motion.div>
      </div>

      <div className="shell relative z-20 mb-20 sm:mb-32">
        <SectionHeader
          index="03"
          eyebrow={`${SKILL_COUNT} Modules`}
          title="Software"
          subtitle="Technologies and tools I work with"
          align="left"
        />
      </div>

      <div className="shell relative z-20">
        <div className="flex flex-col gap-12 sm:gap-16">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="relative group">
              {/* Group rail */}
              <div className="mb-6 flex items-center gap-4">
                <span className="meta text-accent">{group.index}</span>
                <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-dim">
                  {group.label}
                </h3>
                <span aria-hidden className="h-px flex-1 bg-line group-hover:bg-accent/30 transition-colors duration-500" />
              </div>

              {/* Bento Grid layout for skills */}
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="relative group/skill overflow-hidden border border-line bg-white/[0.012] transition-colors duration-500 hover:border-accent/40 rounded-xl p-4">
                    {/* Hover Bloom */}
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/skill:opacity-100 blur-xl transition-opacity duration-500" />
                    
                    <div className="relative z-10 w-full h-full">
                      <SkillItem skill={skill} group={group.label} />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
