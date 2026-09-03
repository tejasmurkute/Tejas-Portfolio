"use client";

import { motion, useMotionValue, useTransform, useMotionTemplate, animate } from "framer-motion";
import { useId } from "react";
import { cn } from "@/utils/cn";

interface LiquidHoverButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  baseTextColor?: string;
  textSize?: number;
}

export function LiquidHoverButton({ 
  text = "Playful hover!", 
  onClick, 
  className,
  baseTextColor = "#0a1128",
  textSize = 18
}: LiquidHoverButtonProps) {
  const clipId = `liquid-clip-${useId().replace(/:/g, "")}`;
  const textPathId = `text-path-${useId().replace(/:/g, "")}`;
  
  const progress = useMotionValue(0);

  // 1. Violet Edge mapped values (Starts immediately at 0)
  const vBaseY = useTransform(progress, [0, 1], [96, -24]);
  const vCtrlY = useTransform(progress, [0, 1], [51, -69]);

  // 2. Purple Liquid mapped values (Delayed to 0.15)
  const pBaseY = useTransform(progress, [0.15, 1], [100, -20]);
  const pCtrlY = useTransform(progress, [0.15, 1], [55, -65]);
  
  // 3. Third Transparent Layer (Delayed to 0.30)
  const trBaseY = useTransform(progress, [0.30, 1], [104, -16]);
  const trCtrlY = useTransform(progress, [0.30, 1], [59, -61]);

  // 4. Fourth Black Layer (Delayed to 0.45)
  const bBaseY = useTransform(progress, [0.45, 1], [108, -12]);
  const bCtrlY = useTransform(progress, [0.45, 1], [63, -57]);

  // Text Path mapped values (Bows UPWARDS at 50% progress to match the arch)
  const tCtrlY = useTransform(progress, [0, 0.5, 1], [36, 12, 36]); // Baseline at 36, arches up to 12

  // Create the dynamic d-strings anchored to the bottom corners (0,60 and 200,60)
  const violetPath = useMotionTemplate`M 0 60 L 200 60 L 200 ${vBaseY} Q 100 ${vCtrlY} 0 ${vBaseY} Z`;
  const purplePath = useMotionTemplate`M 0 60 L 200 60 L 200 ${pBaseY} Q 100 ${pCtrlY} 0 ${pBaseY} Z`;
  const transPath = useMotionTemplate`M 0 60 L 200 60 L 200 ${trBaseY} Q 100 ${trCtrlY} 0 ${trBaseY} Z`;
  const blackPath = useMotionTemplate`M 0 60 L 200 60 L 200 ${bBaseY} Q 100 ${bCtrlY} 0 ${bBaseY} Z`;
  const textPath = useMotionTemplate`M 15 36 Q 100 ${tCtrlY} 185 36`;

  const handleMouseEnter = () => {
    animate(progress, 1, { duration: 1.4, ease: [0.32, 0.72, 0, 1] });
  };

  const handleMouseLeave = () => {
    animate(progress, 0, { duration: 1.4, ease: [0.32, 0.72, 0, 1] });
  };

  return (
    <button 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-[140px] h-[42px] rounded-full overflow-hidden bg-[#e8e8f2] shadow-sm transition-all duration-500 hover:scale-[1.02] ring-0 hover:ring-[4px] ring-transparent hover:ring-[#8b5cf6]/40",
        className
      )}
    >
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <defs>
          <motion.path id={textPathId} d={textPath} />
          <clipPath id={clipId}>
            <motion.path d={purplePath} />
          </clipPath>
        </defs>

        {/* Base Text */}
        <text 
          fill={baseTextColor} 
          fontSize={textSize} 
          fontWeight="bold" 
          fontFamily="sans-serif" 
          letterSpacing="0.05em"
        >
          <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>

        {/* 1. Electric Violet Wave Edge */}
        <motion.path fill="#8b5cf6" d={violetPath} />

        {/* 2. Dark Purple Liquid */}
        <motion.path fill="#3b0764" d={purplePath} />
        
        {/* 3. Transparent Liquid Trail */}
        <motion.path fill="rgba(255,255,255,0.15)" d={transPath} />

        {/* 4. Black Liquid Background (#050505) */}
        <motion.path fill="#050505" d={blackPath} />

        {/* Hover Text (White) - Clipped perfectly to the purple liquid */}
        <g clipPath={`url(#${clipId})`}>
          <text 
            fill="#ffffff" 
            fontSize={textSize} 
            fontWeight="bold" 
            fontFamily="sans-serif" 
            letterSpacing="0.05em"
          >
            <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </button>
  );
}
