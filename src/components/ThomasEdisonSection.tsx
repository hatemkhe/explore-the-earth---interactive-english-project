import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TOPICS } from '../data/projectData';
import { Volume2, VolumeX, Lightbulb, MapPin, Zap } from 'lucide-react';

interface ThomasEdisonSectionProps {
  onSpeak: (id: string, text: string) => void;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
}

export const ThomasEdisonSection: React.FC<ThomasEdisonSectionProps> = ({
  onSpeak,
  isSpeaking,
  currentSpeakingId,
}) => {
  const topic = TOPICS.find((t) => t.id === 'thomas-edison')!;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth, natural scroll progression:
  // Starts centered with gentle depth, scales up, then docks gracefully on the right
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.04, 1.0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0.3, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, 0]);

  const isCurrentPlaying = isSpeaking && currentSpeakingId === topic.id;

  return (
    <section
      ref={sectionRef}
      id={topic.id}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 overflow-hidden"
    >
      {/* Warm ambient bulb glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* 1. Text Card on the LEFT */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="lg:col-span-7 space-y-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Chapter 02 • Historic Figure</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              {topic.title}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-amber-300 text-base font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-xl">{topic.flag}</span>
              <span className="font-semibold text-white">{topic.country}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-sm">Pioneer of Modern Industry & Menlo Park</span>
            </div>
          </div>

          {/* Creative Text Card with Underlined Highlights */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5">
            <p className="text-base sm:text-lg lg:text-xl text-neutral-100 leading-relaxed sm:leading-loose font-normal">
              {topic.creativeSegments.map((seg, idx) =>
                seg.highlight ? (
                  <span
                    key={idx}
                    className="font-semibold text-amber-300 underline decoration-amber-500 decoration-2 underline-offset-4 bg-amber-500/10 px-1 py-0.5 rounded mx-0.5 inline-block"
                  >
                    {seg.text}
                  </span>
                ) : (
                  <span key={idx}>{seg.text}</span>
                )
              )}
            </p>

            {/* Patent and Invention Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800 text-xs text-neutral-300">
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-amber-400 font-bold block text-sm sm:text-base">1,093</span>
                US Patents registered
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-amber-400 font-bold block text-sm sm:text-base">Inventions</span>
                Electric Bulb, Phonograph, Film
              </div>
            </div>

            {/* Listen button */}
            <div className="pt-2">
              <button
                onClick={() => onSpeak(topic.id, topic.rawText)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isCurrentPlaying
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/30'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                }`}
              >
                {isCurrentPlaying ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Narration</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Listen to English Pronunciation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. Image: Docks on the RIGHT beside the text */}
        <motion.div
          style={{
            scale: imageScale,
            opacity: imageOpacity,
          }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-[380px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Badge on photo */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Master of Invention</span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-neutral-700 text-white text-xs font-medium">
              <span className="text-base">{topic.flag}</span>
              <span>{topic.country}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
