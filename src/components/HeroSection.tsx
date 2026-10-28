import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HERO_DATA } from '../data/projectData';
import { ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth, fluid scroll transformation:
  // Starts full-screen, then gently condenses into a clean framed card with text above it
  const imageWidth = useTransform(scrollYProgress, [0, 0.6], ['100vw', 'min(92vw, 960px)']);
  const imageHeight = useTransform(scrollYProgress, [0, 0.6], ['100vh', 'min(50vh, 440px)']);
  const imageRadius = useTransform(scrollYProgress, [0, 0.6], ['0px', '28px']);
  const imageY = useTransform(scrollYProgress, [0, 0.6], ['0px', '40px']);

  // Text moves up smoothly to sit above the image
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0px', '-110px']);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1.08, 0.98]);

  // Bottom scroll indicator fades out immediately upon scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[140vh] bg-neutral-950">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Subtle ambient lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
        </div>

        {/* The Animated Image Container */}
        <motion.div
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageRadius,
            y: imageY,
          }}
          className="relative overflow-hidden shadow-2xl shadow-black border border-neutral-800 z-10"
        >
          <img
            src={HERO_DATA.image}
            alt="Explore the Earth"
            className="w-full h-full object-cover object-center"
          />
          {/* Gentle overlay to guarantee perfect contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />
        </motion.div>

        {/* Text Layer: Initially centered, then smoothly shifts above the image */}
        <motion.div
          style={{
            y: textY,
            scale: textScale,
          }}
          className="absolute z-20 text-center max-w-4xl px-6 pointer-events-none"
        >
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] mb-4">
            <span className="bg-gradient-to-r from-amber-100 via-white to-amber-200 bg-clip-text text-transparent">
              {HERO_DATA.title}
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-neutral-200 font-light max-w-2xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
            {HERO_DATA.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-300">
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-sm">
              🗿 3 Iconic World Landmarks
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-sm">
              🌟 3 Historic World Figures
            </span>
          </div>
        </motion.div>

        {/* Scroll Instruction */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 z-20 flex flex-col items-center gap-2 text-neutral-400 pointer-events-none"
        >
          <span className="text-xs tracking-widest uppercase text-amber-400 font-medium">
            Scroll down to explore
          </span>
          <div className="w-8 h-8 rounded-full border border-neutral-700/80 flex items-center justify-center text-amber-400 animate-bounce bg-neutral-950/60 backdrop-blur-sm">
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
