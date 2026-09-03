import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // --------------
  // Scroll Mappings
  // --------------

  // Text fading sequence
  // "Concepts." appears 0 -> 20%, stays, fades out at 30%
  const opacityConcepts = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const yConcepts = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [40, 0, 0, -40]);

  // "Structure." appears 35 -> 50%, stays, fades out at 65%
  const opacityStructure = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const yStructure = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [40, 0, 0, -40]);

  // "I BUILD THINGS." appears at 70% and stays
  const opacityFinal = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const scaleFinal = useTransform(scrollYProgress, [0.7, 0.85], [0.8, 1]);
  const blurFinal = useTransform(scrollYProgress, [0.7, 0.85], ['blur(10px)', 'blur(0px)']);

  // --------------
  // 3D Artifact Transformations
  // --------------
  // General rotation for the whole assembly group
  const groupRotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const groupRotateY = useTransform(scrollYProgress, [0, 1], [-45, 0]);
  const groupScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // The artifact is made of 4 glass layers.
  // At 0%, they are separated on the Z-axis (exploded).
  // At 100%, they merge together (Z offset = 0) and glow.
  
  const zLayer1 = useTransform(scrollYProgress, [0, 0.7, 1], [300, 50, 0]);
  const zLayer2 = useTransform(scrollYProgress, [0, 0.7, 1], [100, 20, 0]);
  const zLayer3 = useTransform(scrollYProgress, [0, 0.7, 1], [-100, -20, 0]);
  const zLayer4 = useTransform(scrollYProgress, [0, 0.7, 1], [-300, -50, 0]);

  const rotationLayer1 = useTransform(scrollYProgress, [0, 0.7, 1], [90, 10, 0]);
  const rotationLayer2 = useTransform(scrollYProgress, [0, 0.7, 1], [45, 5, 0]);
  const rotationLayer3 = useTransform(scrollYProgress, [0, 0.7, 1], [-45, -5, 0]);
  const rotationLayer4 = useTransform(scrollYProgress, [0, 0.7, 1], [-90, -10, 0]);

  // Opacity & Border glows as they merge
  const artifactOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.8, 1, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section ref={containerRef} id="home" className="relative h-[350vh] bg-void">
      {/* Sticky container that stays fixed while scrolling through the 350vh height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1200px]">
        
        {/* Background ambient glow that increases with scroll */}
        <motion.div
          className="absolute inset-0 bg-accent/20 blur-[150px] -z-10"
          style={{ opacity: glowIntensity, scale: groupScale }}
        />

        <div className="flex h-full w-full items-center justify-center">
          
          {/* Typographic overlays */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <motion.h2
              className="absolute font-display text-[clamp(2.5rem,7.5vw,5.25rem)] text-ink-mute tracking-tight"
              style={{ opacity: opacityConcepts, y: yConcepts }}
            >
              Ideas.
            </motion.h2>

            <motion.h2
              className="absolute font-display text-[clamp(2.5rem,7.5vw,5.25rem)] text-ink-dim tracking-tight"
              style={{ opacity: opacityStructure, y: yStructure }}
            >
              Structure.
            </motion.h2>

            <motion.div
              className="absolute flex flex-col items-center justify-center gap-4"
              style={{ opacity: opacityFinal, scale: scaleFinal, filter: blurFinal }}
            >
              <h2 className="display text-center text-[clamp(3rem,9vw,6rem)] leading-none text-ink drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                I BUILD <br />
                <span className="accent-text">THINGS.</span>
              </h2>
            </motion.div>
          </div>

          {/* 3D Artifact Assembly */}
          <motion.div
            className="relative z-10 size-64 md:size-80 lg:size-96 [transform-style:preserve-3d]"
            style={{
              rotateX: groupRotateX,
              rotateY: groupRotateY,
              scale: groupScale,
              opacity: artifactOpacity,
            }}
          >
            {/* Layer 4: Deepest */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-accent/20 bg-void/50 backdrop-blur-sm"
              style={{ z: zLayer4, rotateZ: rotationLayer4 }}
            />
            
            {/* Layer 3 */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur-md"
              style={{ z: zLayer3, rotateZ: rotationLayer3 }}
            >
              {/* Inner geometric accent */}
              <div className="absolute inset-6 rounded-full border border-accent/20 border-dashed" />
            </motion.div>

            {/* Layer 2 */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-accent/60 bg-accent/10 backdrop-blur-lg flex items-center justify-center"
              style={{ z: zLayer2, rotateZ: rotationLayer2 }}
            >
              <div className="size-32 rounded-lg border border-accent/30 rotate-45" />
            </motion.div>

            {/* Layer 1: Front-most */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-accent/80 bg-linear-to-br from-accent/20 to-transparent backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.3)]"
              style={{ z: zLayer1, rotateZ: rotationLayer1 }}
            >
              <div className="absolute inset-4 rounded-xl border border-accent/50" />
            </motion.div>

            {/* Central Core (Glows at the end) */}
            <motion.div
              className="absolute inset-0 m-auto size-16 rounded-full bg-accent blur-[1px] mix-blend-screen"
              style={{ opacity: glowIntensity }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
