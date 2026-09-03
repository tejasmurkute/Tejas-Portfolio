import { motion } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';

export type PageTransitionStatus = 'hidden' | 'wipe-in' | 'wipe-out';

interface PageTransitionProps {
  status: PageTransitionStatus;
  title?: string;
}

export function PageTransition({ status, title = 'Tejas' }: PageTransitionProps) {
  // If we aren't wiping, we shouldn't block pointer events
  const isBlocking = status === 'wipe-in' || status === 'wipe-out';

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ 
        y: status === 'wipe-in' ? '0%' : status === 'wipe-out' ? '-100%' : '100%'
      }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
      style={{ pointerEvents: isBlocking ? 'auto' : 'none' }}
      className="fixed inset-0 z-[10000] bg-[#4A148C] flex flex-col items-center justify-center"
    >
      {/* Mask container for the text - pb-4 and px-4 prevent clipping of glyphs like 'S' */}
      <div className="overflow-hidden pb-4 px-4">
        <TextEffect
          per='word'
          as='span'
          preset='slide'
          trigger={status === 'wipe-in'}
          delay={1.0}
          className="block font-display text-[clamp(3rem,10vw,8rem)] text-white font-bold tracking-tighter uppercase"
        >
          {title}
        </TextEffect>
      </div>
    </motion.div>
  );
}
