import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ScrollRevealText } from '@/components/ui/ScrollRevealText';

const ABOUT_TEXT = "I’m Tejas, a developer who turns random ideas into real things. I build, experiment, break, rebuild, and obsess over the details until an idea feels right. Code is just the medium; curiosity is what drives me.";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the container is exactly 50% up the viewport
    // End tracking when the bottom of the container hits the bottom of the viewport.
    offset: ['start 50%', 'end end'],
  });

  return (
    // The outer container is very tall to allow the user to scroll for a while
    <section ref={containerRef} id="about" className="relative bg-[#050505] h-[250vh]">
      
      {/* The inner container is sticky, locking into place while the user scrolls down the 250vh outer container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center">
        
        <div className="shell relative w-full flex justify-center items-center">
          
          {/* Center Column: Large Scrolling Text */}
          <div className="relative w-full lg:w-10/12 xl:w-9/12">
            
            {/* Left Label: Positioned absolutely relative to the text block so it perfectly hugs the left side without breaking the center alignment */}
            <div className="hidden lg:flex absolute -left-20 xl:-left-24 -top-1 flex-col justify-start">
              <span className="font-sans text-sm uppercase text-white font-medium tracking-wide">
                (ABOUT)
              </span>
            </div>

            <ScrollRevealText 
              text={ABOUT_TEXT} 
              progress={scrollYProgress}
              className="font-sans text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.3] font-semibold tracking-tight text-justify"
            />

            {/* View Resume Button */}
            <div className="mt-10 flex justify-start -ml-2 sm:-ml-4">
              <a 
                href="/Tejas_Resume_.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-sans text-xs md:text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 bg-transparent border-none outline-none"
              >
                <span>View Resume</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
