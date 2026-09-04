import { useState, useRef } from 'react';
import { skillsList } from './skillsData';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSkill = skillsList[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);

  // Track the scroll progress through this 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Update active index based on scroll progress with a much smaller 3% delay at the start
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let progress = 0;
    if (latest > 0.03) {
       progress = (latest - 0.03) / 0.97;
    }
    const maxIndex = skillsList.length - 1;
    let index = Math.floor(progress * skillsList.length);
    if (index > maxIndex) index = maxIndex;
    setActiveIndex(index);
  });



  return (
    <section ref={sectionRef} className="relative w-full h-[700vh] bg-[#050505] text-white font-sans pt-[10vh]">
      
      {/* Sticky Container - locks to the viewport while the section scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-8">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 w-full flex-1 flex flex-col">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-4 gap-8 shrink-0 relative z-40 pb-6 bg-[#050505]/0">
            <div className="relative">
              <span className="absolute top-[-2rem] left-0 text-[#A78BFA] font-mono text-xs tracking-widest uppercase">(Skills)</span>
              <h2 
                className="text-[clamp(3rem,8vw,6.5rem)] uppercase leading-[0.85] tracking-tight m-0 text-white"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
              >
                I BUILD WITH<br/>
                CODE, <span className="text-[#A78BFA]">AI</span> & CURIOSITY.
              </h2>
            </div>
            <div className="lg:max-w-[280px] text-[#888888] text-sm md:text-base leading-relaxed font-light mb-2">
              A curated stack of technologies, tools, and frameworks I use to build digital products that make an impact.
            </div>
          </div>

          {/* Main Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 relative z-10 flex-1 overflow-hidden min-h-0 pb-[10vh]">
            
            {/* Left Column: List */}
            <div className="lg:col-span-8 relative h-full">
              {/* Fade masks for the top and bottom of the scrolling list */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none"></div>

              <motion.div 
                className="flex flex-col pb-32"
                animate={{ y: `calc(25vh - ${activeIndex * 4}rem)` }}
                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
              >
                {skillsList.map((skill, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button 
                      key={skill.id}
                      onClick={() => setActiveIndex(index)}
                      className={`group flex items-center w-full text-left cursor-none relative z-10 transition-all duration-300 ${isActive ? 'h-[6rem] lg:h-[8rem]' : 'h-[4rem]'}`}
                    >
                      <span className={`font-mono text-sm mr-4 transition-colors duration-300 ${isActive ? 'text-[#e5e5e5]' : 'text-[#555555]'}`}>
                        {skill.id}
                      </span>
                      {/* Active Indicator Line */}
                      <span className={`w-8 lg:w-12 h-[1px] mr-4 lg:mr-6 transition-colors duration-300 ${isActive ? 'bg-[#e5e5e5]' : 'bg-[#333333]'}`}></span>
                      
                      <span 
                        className={`uppercase tracking-tight leading-none transition-all duration-300 flex-1 ${
                          isActive 
                            ? 'text-[clamp(2.5rem,5.5vw,6rem)] text-[#A78BFA] opacity-100' 
                            : 'text-[clamp(1.5rem,2vw,2.5rem)] text-[#333333] opacity-60 group-hover:text-[#555555]'
                        }`}
                        style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                      >
                        {skill.name}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column: Detail Panel */}
            <div className="lg:col-span-4 relative h-full flex flex-col justify-start pt-0">
              <div className="flex flex-col gap-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeSkill.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-8"
                  >
                    {/* Skill Header */}
                    <div>
                      <span className="text-[#A78BFA] font-mono text-[10px] tracking-widest mb-6 block">
                        {activeSkill.id} / {skillsList.length}
                      </span>
                      <h3 
                        className="text-[2rem] uppercase tracking-wide mb-4 text-[#e5e5e5]"
                        style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                      >
                        {activeSkill.name}
                      </h3>
                      <p className="text-[#888888] text-sm leading-relaxed font-light">
                        {activeSkill.description}
                      </p>
                    </div>
                    
                    <div className="w-full h-[1px] bg-[#1a1a1a]"></div>

                    {/* Uses */}
                    <div>
                      <span className="text-[#A78BFA] font-mono text-[10px] tracking-widest uppercase mb-4 block">
                        I USE IT FOR
                      </span>
                      <ul className="flex flex-col gap-3">
                        {activeSkill.uses.map((use, i) => (
                          <li key={i} className="flex items-center gap-3 text-[13px] text-[#cccccc] font-light">
                            <span className="text-[#A78BFA]">+</span> {use}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
