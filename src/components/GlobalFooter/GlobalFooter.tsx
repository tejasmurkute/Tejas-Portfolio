import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiquidHoverButton } from '@/components/ui/LiquidHoverButton';

export function GlobalFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // The text starts pushed UP (-180%) relative to its container.
  // Because the orange container has overflow-hidden, the top of the text is clipped.
  // As the user scrolls, the text moves DOWN to 20% (slightly lower than center), revealing itself and scrolling slower than the strip.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-180%", "20%"]);

  return (
    <footer ref={footerRef} className="w-full flex flex-col bg-[#050505] text-white selection:bg-[#A78BFA] selection:text-white z-20 relative overflow-hidden">
      {/* Top Black Section - Added massive top padding so it clears the fixed GlobalHeader */}
      <div className="w-full px-6 pt-[20vh] pb-8 sm:px-10 lg:pt-[25vh] lg:pb-12 max-w-[1800px] mx-auto z-10 relative flex flex-col justify-between min-h-[70vh]">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6">
          
          {/* Column 1: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <div className="flex items-baseline gap-4 sm:gap-8">
              <span className="text-[#888888] text-[10px] sm:text-xs font-mono uppercase tracking-widest w-14 sm:w-16 flex-shrink-0">(EMAIL)</span>
              <a href="mailto:tejasmurkute2004@gmail.com" className="text-[#A78BFA] text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight hover:opacity-80 transition-opacity">
                tejasmurkute2004@gmail.com
              </a>
            </div>
            <div className="flex items-baseline gap-4 sm:gap-8">
              <span className="text-[#888888] text-[10px] sm:text-xs font-mono uppercase tracking-widest w-14 sm:w-16 flex-shrink-0">(PHONE)</span>
              <a href="tel:+91937021516" className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight hover:opacity-80 transition-opacity">
                +91 937021516
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="lg:col-span-2 flex flex-col lg:pl-16">
            <span className="text-[#888888] text-[10px] sm:text-xs font-mono uppercase tracking-widest block mb-6">(LINKS)</span>
            <ul className="flex flex-col gap-3 text-[1.1rem] sm:text-[1.25rem] font-medium text-[#e5e5e5]">
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">Works</a></li>
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">404</a></li>
              <li><a href="#" className="hover:text-[#A78BFA] transition-colors">Waitlist</a></li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="text-[#888888] text-[10px] sm:text-xs font-mono uppercase tracking-widest block mb-6">(SOCIALS)</span>
            <ul className="flex flex-col gap-3 text-[1.1rem] sm:text-[1.25rem] font-medium text-[#e5e5e5]">
              <li><a href="#" className="group flex items-center hover:text-[#A78BFA] transition-colors">X/Twitter <span className="ml-2 text-sm font-light text-[#888888] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></a></li>
              <li><a href="#" className="group flex items-center hover:text-[#A78BFA] transition-colors">Instagram <span className="ml-2 text-sm font-light text-[#888888] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></a></li>
              <li><a href="#" className="group flex items-center hover:text-[#A78BFA] transition-colors">LinkedIn <span className="ml-2 text-sm font-light text-[#888888] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></a></li>
              <li><a href="#" className="group flex items-center hover:text-[#A78BFA] transition-colors">GitHub <span className="ml-2 text-sm font-light text-[#888888] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <p className="text-white text-[1.05rem] font-medium leading-snug">
              Sign up for our newsletter to<br />get latest insights and updates
            </p>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="w-full bg-transparent border-b border-[#333333] text-[#e5e5e5] text-lg pb-3 focus:outline-none focus:border-[#A78BFA] transition-colors placeholder:text-[#555555]"
              />
              <LiquidHoverButton 
                text="SUBSCRIBE"
                baseTextColor="#0a1128"
                textSize={16}
                className="w-full !h-[50px] bg-white mt-4"
              />
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full mt-24 flex flex-col md:flex-row justify-between items-end md:items-center text-[#888888] text-[10px] sm:text-xs font-medium uppercase tracking-wider gap-6">
          <div className="flex flex-col gap-2">
            <p>@2026 TEJAS. ALL RIGHTS RESERVED</p>
          </div>
          <div className="flex items-center gap-2">
            <p>MADE BY <span className="text-white font-bold tracking-widest ml-1">TEJAS</span></p>
          </div>
        </div>
      </div>

      {/* Giant Orange Marquee Section - Now has overflow-hidden so the text gets clipped correctly */}
      <div className="w-full bg-[#A78BFA] text-[#050505] flex items-center justify-center pt-[8vh] sm:pt-[12vh] pb-[8vh] sm:pb-[12vh] relative z-0 overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="w-full relative flex items-center">
          {/* Left aligned logo */}
          <div className="flex items-center justify-start ml-6 sm:ml-10 lg:ml-16 translate-y-[8%]">
            <h1 
              className="font-bold text-[clamp(5rem,16vw,25rem)] leading-[0.8] tracking-wide whitespace-nowrap select-none"
              style={{ fontFamily: "Impact, 'Arial Narrow', 'Helvetica Condensed', sans-serif", fontStretch: "condensed" }}
            >
              TEJAS
            </h1>
            <span 
              className="text-[clamp(0.6rem,1.5vw,1.5rem)] font-sans font-medium mb-[10vw]"
              style={{ fontFamily: "Impact, 'Arial Narrow', 'Helvetica Condensed', sans-serif" }}
            >&reg;</span>
          </div>
          
          {/* Right aligned floating typography */}
          <div className="absolute right-6 sm:right-10 lg:right-16 top-[55%] -translate-y-1/2 text-right hidden md:block pointer-events-none">
            <h2 className="font-sans text-[clamp(1.8rem,3.5vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-[#050505]">
              <div className="opacity-70">
                Beyond<br />Visuals.
              </div>
              <div>
                Built with<br />Vision.
              </div>
            </h2>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
