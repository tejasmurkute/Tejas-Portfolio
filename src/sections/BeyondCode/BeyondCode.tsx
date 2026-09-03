import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { INTERESTS } from '@/data/interests';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { InterestCard } from '@/components/InterestCard/InterestCard';

export function BeyondCode() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={containerRef} id="beyond" className="relative bg-void py-32 overflow-hidden">
      
      {/* Subtle parallax accent element */}
      <motion.div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-[150%] bg-gradient-to-r from-accent/5 to-transparent blur-3xl -z-10"
        style={{ y: backgroundY }}
      />

      <div className="shell relative z-20 mb-20">
        <SectionHeader
          index="05"
          eyebrow="Off the clock"
          title="Beyond Code"
          subtitle="Life outside the screen"
          align="left"
        />
      </div>

      <div className="shell relative z-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {INTERESTS.map((item) => (
            <div key={item.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-line bg-white/[0.015] hover:border-accent/40 hover:bg-white/[0.03] transition-colors duration-700">
              <InterestCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
