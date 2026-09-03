import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCES } from '@/data/experience';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={containerRef} id="experience" className="relative bg-void py-32 overflow-hidden">
      
      {/* Background Parallax Watermark */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0"
        style={{ y: backgroundY }}
      >
        <span className="font-display text-[30vw] font-bold text-accent whitespace-nowrap leading-none tracking-tighter">
          04
        </span>
      </motion.div>

      <div className="shell relative z-20 mb-20 sm:mb-32">
        <SectionHeader
          index="04"
          eyebrow="My Journey"
          title="Experience"
          subtitle="Where I've been and what I've done"
          align="left"
        />
      </div>

      <div className="shell relative z-20 max-w-5xl mx-auto">
        <div className="flex flex-col border-t border-line">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="group relative border-b border-line flex flex-col lg:flex-row py-10 lg:py-16 transition-colors duration-700 hover:bg-white/[0.015]">
              
              {/* Left Column: Date & Meta */}
              <div className="w-full lg:w-1/3 flex flex-col lg:pr-8 mb-6 lg:mb-0">
                <span className="font-mono text-sm tracking-widest text-accent uppercase mb-2">
                  {exp.period}
                </span>
                <span className="text-ink-mute text-sm">{exp.type} &middot; {exp.location}</span>
              </div>

              {/* Right Column: Content */}
              <div className="w-full lg:w-2/3 flex flex-col">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display text-ink group-hover:text-accent-bright transition-colors duration-500 mb-2">
                  {exp.role}
                </h3>
                <span className="text-xl text-ink-dim mb-6">{exp.company}</span>
                
                <p className="text-ink-mute leading-relaxed mb-8 max-w-xl">
                  {exp.summary}
                </p>

                <ul className="flex flex-wrap gap-2 mb-8">
                  {exp.stack.map((s) => (
                    <span key={s} className="px-3 py-1 text-xs font-mono border border-line rounded-full text-ink-dim bg-white/[0.02]">
                      {s}
                    </span>
                  ))}
                </ul>

                {/* Subtle Hover Reveal Line */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-[800ms] ease-out group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
