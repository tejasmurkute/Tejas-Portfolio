import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { TextEffect } from '@/components/ui/text-effect';

export function PortfolioIndex({ isRevealed = true }: { isRevealed?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track global scroll to create the 3D move-away effect
  const { scrollY } = useScroll();
  
  // Z-axis motion: The content scales down, moving directly backward away from the screen
  const scrollScale = useTransform(scrollY, [0, 800], [1, 0.85]);
  // Y-axis motion: The content moves straight upward
  const scrollYOffset = useTransform(scrollY, [0, 800], [0, -450]);
  // Fade out
  const scrollOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section ref={containerRef} id="projects" className="sticky top-0 h-screen overflow-hidden flex flex-col -z-10">
      
      {/* Scroll Parallax Wrapper: handles the Z-axis & Y-axis movement as you scroll */}
      <motion.div style={{ scale: scrollScale, y: scrollYOffset, opacity: scrollOpacity, transformOrigin: "center center" }} className="flex flex-col h-full w-full relative bg-black text-[#ececf3]">
        {/* Top Header Row */}
        <header className="flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 w-full z-20">
        
        {/* Top Left: Spacer for the fixed GlobalHeader */}
        <div className="flex items-start h-[12vw] sm:h-[15rem]">
          {/* TEJAS logo has been extracted to GlobalHeader.tsx so it can persist and shrink on scroll */}
        </div>

        {/* Navbar elements have been moved to GlobalHeader.tsx */}
      </header>

      {/* Middle Content */}
      <div className="flex-1 flex items-center w-full px-6 sm:px-10 z-20 relative">
        
        {/* Center Portrait Image - Fades in from the back after transition */}
        <motion.div
           className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
           initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
           animate={{ 
             scale: isRevealed ? 1 : 0.8, 
             opacity: isRevealed ? 1 : 0, 
             filter: isRevealed ? 'blur(0px)' : 'blur(20px)' 
           }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
           <img 
             src="/portrait-home.jpg" 
             alt="Tejas" 
             className="h-[85vh] md:h-[100vh] max-w-full object-contain translate-x-[10vw] lg:translate-x-[15vw] relative z-10" 
           />
        </motion.div>

        {/* Right side typography */}
        <div className="absolute right-2 sm:right-4 top-[10%] -translate-y-1/2 text-right">
          <h2 className="font-sans text-[clamp(1.5rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-tight">
            <TextEffect per="line" preset="blur" trigger={isRevealed} delay={0.2} className="text-[#888888]">
              {`Beyond\nVisuals.`}
            </TextEffect>
            <TextEffect per="line" preset="blur" trigger={isRevealed} delay={0.4} className="text-white">
              {`Built with\nVision.`}
            </TextEffect>
          </h2>
        </div>

      </div>

      {/* Bottom Footer Row */}
      <footer className="flex items-end justify-between px-6 pb-6 sm:px-10 sm:pb-8 w-full z-20">
        
        {/* Bottom Left: Mission Statement */}
        <div className="max-w-xl">
          <div className="font-sans text-[clamp(1.2rem,2.5vw,2rem)] leading-[1.2] font-medium tracking-tight">
            <TextEffect per="word" preset="blur" trigger={isRevealed} delay={0.5} className="text-white inline">
              We build software, products, and digital experiences 
            </TextEffect>
            <TextEffect per="word" preset="blur" trigger={isRevealed} delay={0.8} className="text-[#888888] inline">
              with intention, clarity and care.
            </TextEffect>
          </div>
        </div>

        {/* Bottom Right: Start Project Button */}
        <motion.div 
          className="hidden sm:block absolute bottom-2 right-2 sm:bottom-2 sm:right-2"
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: isRevealed ? 1 : 0, filter: isRevealed ? 'blur(0px)' : 'blur(12px)' }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          <HoverBorderGradient 
            as="button"
            className="px-10 py-4 text-xl font-bold uppercase tracking-widest text-[#9d4ccc] hover:text-white transition-colors flex items-center justify-center"
          >
            Start a project
          </HoverBorderGradient>
        </motion.div>

      </footer>

      </motion.div>
    </section>
  );
}
