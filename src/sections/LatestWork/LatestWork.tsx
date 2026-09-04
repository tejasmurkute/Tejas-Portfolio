import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, MotionValue, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { workList, type Project } from './workData';
const MotionImage = ({ work, index, scrollYProgress, totalSections, setIsHoveringImage }: { work: Project; index: number; scrollYProgress: MotionValue<number>; totalSections: number; setIsHoveringImage: (isHovering: boolean) => void }) => {
  // currentScroll maps global scroll (0 to 1) to (-1 to totalSections - 1)
  // 0.0: Section enters screen (-50vh offset) -> -1 (Image 0 at bottom)
  // 0.4: Section pins at 10vh -> 0 (Image 0 perfectly centered)
  // 1.0: Section finishes -> 2 (Image 2 perfectly centered)
  const currentScroll = useTransform(scrollYProgress, [0, 0.4, 1], [-1, 0, totalSections - 1]);

  // s represents the normalized distance of this item from the current center point
  // It goes from 1 (waiting at bottom right) -> 0 (active/center) -> -1 (exiting to top right)
  const s = useTransform(currentScroll, v => index - v);

  // Apply a spring smoothing for the overlay (feels like ~0.4s transition)
  const smoothS = useSpring(s, { stiffness: 100, damping: 25, restDelta: 0.001 });

  // Wrapper (the overlay mask) moves vertically
  const wrapperY = useTransform(s, val => `${val * 75}vh`);

  // Wrapper acts as the masking overlay (shrinks when off-center, expands at center)
  // We use smoothS here to give the overlay that 0.4s smooth trailing feel
  const clipPath = useTransform(smoothS, val => {
    const abs = Math.abs(val);
    if (abs >= 1) return `inset(40% 10% 40% 10% round 24px)`;
    return `inset(${abs * 40}% ${abs * 10}% ${abs * 40}% ${abs * 10}% round 24px)`;
  });

  // Inner image moves slightly in reverse to create the parallax depth (30% ahead)
  const imageY = useTransform(s, val => `${val * -25}vh`);

  // Inner image scale: Starts zoomed in (1.5) at edges, zooms out to 1.15 at center
  const imageScale = useTransform(s, val => {
    const abs = Math.abs(val);
    return 1.15 + (abs * 0.35); // 1.15 base + 0.35 = 1.5 maximum zoom
  });

  const opacity = useTransform(s, val => {
    if (val >= 1 || val <= -1) return 0;
    return 1;
  });

  return (
    <motion.div
      onMouseEnter={() => setIsHoveringImage(true)}
      onMouseLeave={() => setIsHoveringImage(false)}
      className="cursor-none"
      style={{
        y: wrapperY,
        clipPath,
        opacity,
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <motion.img
        src={work.image || ''}
        alt={work.name}
        style={{
          y: imageY,
          scale: imageScale,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </motion.div>
  );
};

export function LatestWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Custom Cursor State
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for the cursor position
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 30, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Track the scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["-50vh end", "end end"] // Starts animation 50vh before the section even enters the screen
  });

  // Update active index based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Replicate the piecewise mapping:
    let currentScroll = 0;
    if (latest <= 0.4) {
      currentScroll = -1 + (latest / 0.4);
    } else {
      currentScroll = ((latest - 0.4) / 0.6) * (workList.length - 1);
    }
    
    // Switch active index only when the incoming image is very close to the center
    // (threshold 0.8 out of 1.0)
    let index = 0;
    if (currentScroll < 0.8) {
      index = 0;
    } else if (currentScroll < 1.8) {
      index = 1;
    } else {
      index = 2;
    }

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const handleNavClick = (index: number) => {
    if (!sectionRef.current) return;
    
    // Calculate the exact pixel position where this index is centered
    const rect = sectionRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    
    // The section pins when its top hits 10vh
    const pinPoint = absoluteTop - (window.innerHeight * 0.1);
    
    // Total scrolling distance while pinned (from section_top=10vh to section_top=-200vh) is 210vh
    const totalPinnedScrollDistance = window.innerHeight * 2.1;
    
    const targetProgress = index / (workList.length - 1);
    const targetScrollY = pinPoint + (targetProgress * totalPinnedScrollDistance);
    
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#050505] text-white font-sans pt-[20vh]">
      
      {/* Massive Header - Scrolls normally and has a huge gap below it */}
      <div className="w-full flex justify-center mb-[50vh] px-6">
        <h2 
          className="text-[clamp(3rem,8vw,9rem)] uppercase leading-none tracking-normal m-0 text-[#c5c5c5] flex items-start"
          style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.1)' }}
        >
          LATEST WORK
        </h2>
      </div>

      {/* The Scroll-Linked Interactive Area */}
      <div ref={sectionRef} className="relative w-full h-[300vh]">
        {/* Sticky Container */}
        <div className="sticky top-[10vh] h-[85vh] w-full flex flex-col">
          
          {/* Main Content Layout */}
          <div className="max-w-[1800px] mx-auto px-6 sm:px-10 w-full flex-1 flex flex-col lg:flex-row pb-[5vh] gap-12 relative z-10 min-h-0">
          
          {/* Left Column: Navigation & Info */}
          <div className="lg:w-[35%] xl:w-[30%] relative flex flex-col justify-between h-full">
            
            {/* Background Number Viewport */}
            <div className="absolute top-10 left-8 md:left-12 pointer-events-none opacity-80 h-[clamp(6rem,10vw,12rem)] overflow-hidden">
              <motion.div
                className="flex flex-col"
                animate={{ y: `-${(activeIndex / workList.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1 }}
              >
                {workList.map((work) => (
                  <div key={work.id} className="h-[clamp(6rem,10vw,12rem)] flex items-baseline flex-shrink-0">
                    <span 
                      className="text-[clamp(6rem,10vw,12rem)] leading-none tracking-normal text-[#333333]" 
                      style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                    >
                      {work.id.replace('.', '')}
                    </span>
                    <span 
                      className="text-[clamp(6rem,10vw,12rem)] leading-none text-[0.7em] text-[#333333]" 
                      style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                    >
                      .
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative z-10 flex flex-col gap-1.5 mt-[clamp(11rem,16vw,18rem)]">
              {workList.map((work, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={work.id}
                    onClick={() => handleNavClick(index)}
                    className="group flex items-center text-left cursor-none"
                  >
                    <span className={`w-4 h-[1px] mr-4 transition-colors duration-300 ${isActive ? 'bg-[#e5e5e5]' : 'bg-[#333333]'}`}></span>
                    <motion.span 
                      animate={{ 
                        scale: isActive ? 1.25 : 1,
                        color: isActive ? '#ffffff' : '#555555'
                      }}
                      whileHover={{ color: isActive ? '#ffffff' : '#888888' }}
                      transition={{ type: "spring", stiffness: 60, damping: 12, mass: 1 }}
                      className="text-[10px] md:text-xs font-medium tracking-wide origin-left cursor-pointer"
                    >
                      {work.name}
                    </motion.span>
                  </button>
                );
              })}
            </div>

            {/* Active Project Details (Split Viewports) */}
            <div className="relative z-10 mt-auto -mb-12 ml-8 md:ml-12 flex flex-col gap-4">
              
              {/* Title Viewport */}
              <div className="h-[4rem] md:h-[5rem] overflow-hidden">
                <motion.div
                  className="flex flex-col"
                  animate={{ y: `-${(activeIndex / workList.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1 }}
                >
                  {workList.map((work) => (
                    <div key={`title-${work.id}`} className="h-[4rem] md:h-[5rem] flex items-end flex-shrink-0">
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-[#e5e5e5] pb-2">
                        {work.name}
                      </h3>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Description Viewport */}
              <div className="h-[6rem] md:h-[8rem] overflow-hidden">
                <motion.div
                  className="flex flex-col"
                  animate={{ y: `-${(activeIndex / workList.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1 }}
                >
                  {workList.map((work) => (
                    <div key={`desc-${work.id}`} className="h-[6rem] md:h-[8rem] flex items-start flex-shrink-0">
                      <p className="text-[#888888] text-lg md:text-xl max-w-[340px] leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
            
          </div>

          {/* Right Column: Image Presentation */}
          <div className="lg:w-[65%] xl:w-[70%] h-full relative">
            {workList.map((work, index) => (
              <MotionImage 
                key={work.id}
                work={work} 
                index={index} 
                scrollYProgress={scrollYProgress} 
                totalSections={workList.length} 
                setIsHoveringImage={setIsHoveringImage}
              />
            ))}
          </div>

        </div>
        </div>
      </div>

      {/* Custom Cursor Overlay */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
        style={{
          x: cursorX,
          y: cursorY,
          // Shift by -50% to center the cursor exactly on the pointer
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHoveringImage ? 140 : 0,
          height: isHoveringImage ? 40 : 0,
          opacity: isHoveringImage ? 1 : 0
        }}
        initial={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {isHoveringImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="inline-flex w-full items-center justify-center text-white"
            >
              <span className="text-xs font-semibold tracking-wide uppercase mr-1">View Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
