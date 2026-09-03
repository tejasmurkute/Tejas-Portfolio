"use client";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import StrokeText from "@/components/ui/StrokeText";
import { LiquidHoverButton } from "@/components/ui/LiquidHoverButton";

export function GlobalHeader({ isRevealed = true }: { isRevealed?: boolean }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Trigger the shrink effect directly upon a slight scroll (20px)
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <motion.header className="fixed top-0 left-0 w-full h-32 z-50 pointer-events-none">
      
      {/* Blackout Gradient Mask - only visible when scrolled so it doesn't darken the home screen */}
      <motion.div 
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-0"
      />

      <div className="relative z-10 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 w-full">
        
        {/* Left: Shrinking StrokeText Logo */}
        <motion.h1 
          animate={{
            scale: isScrolled ? 0.25 : 1
          }}
          style={{ 
            originX: 0,
            originY: 0
          }}
          transition={{ 
            scale: { type: "tween", ease: [0.85, 0, 0.15, 1], duration: 0.85 }
          }}
          className="pointer-events-auto m-0 flex items-start"
        >
          <div className="relative flex items-start flex-shrink-0" style={{ width: 'clamp(16rem, 45vw, 38rem)' }}>
            {isRevealed && (
              <StrokeText
                text="TEJAS"
                strokeColor="#A78BFA"
                fillColor="#c5c5c5"
                strokeWidth={1.5}
                drawDuration={1.8}
                fillDelay={0.4}
                delay={0.2}
                stagger={0.15}
                ease="power2.out"
                trigger="mount"
                fillMode="fade"
                fontSize={180}
                fontWeight={900}
                fontFamily="Impact, 'Arial Narrow', 'Helvetica Condensed', sans-serif"
                letterSpacing={2}
              />
            )}
          </div>
          <span 
            className="text-xl align-top mt-[4%] text-[#c5c5c5] font-black"
            style={{ fontFamily: "Impact, 'Arial Narrow', 'Helvetica Condensed', sans-serif", fontStretch: "condensed" }}
          >
            <TextEffect per="char" preset="blur" trigger={isRevealed} delay={0.3}>
              ®
            </TextEffect>
          </span>
        </motion.h1>

        {/* Right: Global Navbar Elements */}
        <div className="hidden lg:flex items-start gap-12 pointer-events-auto">
          
          {/* Availability */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: isRevealed ? 1 : 0, filter: isRevealed ? 'blur(0px)' : 'blur(12px)' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="w-2 h-2 rounded-full bg-green-500 animate-pulse" 
              />
              <span className="font-sans text-sm font-medium text-white">
                <TextEffect per="word" preset="blur" trigger={isRevealed} delay={0.2}>
                  Available for project
                </TextEffect>
              </span>
            </div>
            <span className="font-sans text-xs text-[#888888] pl-4 uppercase">
              <TextEffect per="word" preset="blur" trigger={isRevealed} delay={0.3}>
                EARLY FEB 2026
              </TextEffect>
            </span>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-1">
            <span className="font-sans text-sm font-medium text-white">
              <TextEffect per="char" preset="blur" trigger={isRevealed} delay={0.4}>
                4:34 PM
              </TextEffect>
            </span>
            <span className="font-sans text-xs text-[#888888] uppercase">
              <TextEffect per="word" preset="blur" trigger={isRevealed} delay={0.5}>
                (GMT+5:30)
              </TextEffect>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: isRevealed ? 1 : 0, filter: isRevealed ? 'blur(0px)' : 'blur(12px)' }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <LiquidHoverButton text="Let's Talk" />
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: isRevealed ? 1 : 0, filter: isRevealed ? 'blur(0px)' : 'blur(12px)' }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 transition-colors flex flex-col items-center justify-center gap-1.5 bg-transparent"
            >
              <span className="w-4 h-[1.5px] bg-white" />
              <span className="w-4 h-[1.5px] bg-white" />
            </motion.button>
          </div>

        </div>

      </div>
    </motion.header>
  );
}
