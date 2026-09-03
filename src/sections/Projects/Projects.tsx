import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The container needs to be tall enough to allow for scrolling.
  // 6 projects * roughly 100vw = ~600vw scroll distance, so ~400vh is a good balance.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll progress to horizontal translation
  // To stop exactly at the last card, we need to translate by -100% of the scrolling track's width
  // plus 1 viewport width (so the last card sits on screen instead of scrolling off).
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-85%']); // Roughly stopping at the last card

  return (
    <section ref={containerRef} id="projects" className="relative h-[400vh] bg-void">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Background Typography Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 -z-10 select-none">
          <span className="font-display text-[20vw] font-bold text-accent-bright whitespace-nowrap">
            SELECTED WORK
          </span>
        </div>

        <div className="shell relative z-20 mb-8 sm:mb-16">
          <SectionHeader
            index="02"
            eyebrow="Portfolio"
            title="I Build Things"
            subtitle="Scroll horizontally to explore"
            align="left"
          />
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div 
          className="flex gap-8 px-6 md:px-12 lg:px-24 w-max"
          style={{ x }}
        >
          {PROJECTS.map((project) => (
            <div key={project.id} className="w-[85vw] max-w-[32rem] sm:max-w-[40rem] h-[60vh] max-h-[40rem] shrink-0 relative">
              {/* Number overlay */}
              <div className="absolute top-6 left-6 z-20 overflow-hidden pointer-events-none">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-mono text-xs text-accent uppercase tracking-widest drop-shadow-md"
                >
                  {project.index} &mdash; {project.year}
                </motion.span>
              </div>

              {/* Card Component inside */}
              <div className="w-full h-full">
                 <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
