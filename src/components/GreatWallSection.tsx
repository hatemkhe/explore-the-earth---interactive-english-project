import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TOPICS } from '../data/projectData';
import { Volume2, VolumeX, Shield, MapPin, Award, Mountain } from 'lucide-react';

interface GreatWallSectionProps {
  onSpeak: (id: string, text: string) => void;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
}

export const GreatWallSection: React.FC<GreatWallSectionProps> = ({
  onSpeak,
  isSpeaking,
  currentSpeakingId,
}) => {
  const topic = TOPICS.find((t) => t.id === 'great-wall')!;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Slow, atmospheric reveal as requested:
  // Starts hidden with soft blur, then reveals slowly and crisply
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 1]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.8], ['blur(8px)', 'blur(0px)']);

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.9], [0.3, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.9], [25, 0]);

  const isCurrentPlaying = isSpeaking && currentSpeakingId === topic.id;

  return (
    <section
      ref={sectionRef}
      id={topic.id}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-700/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        
        {/* Section Heading Tag */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Chapter 04 • World Landmark</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            {topic.title}
          </h2>

          <div className="flex items-center justify-center gap-2 mt-2 text-red-300 text-base font-medium">
            <MapPin className="w-4 h-4 text-red-400" />
            <span className="text-xl">{topic.flag}</span>
            <span className="font-semibold text-white">{topic.country}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400 text-sm">Fortification Across Dynasties</span>
          </div>
        </div>

        {/* 1. Image: Emerges slowly with atmospheric blur reveal */}
        <motion.div
          style={{
            opacity: imageOpacity,
            filter: imageBlur,
          }}
          className="w-full rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl relative"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src={topic.image}
              alt={topic.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Badges on photo */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-red-500/30 text-red-300 text-xs font-semibold">
            <Mountain className="w-3.5 h-3.5 text-red-400" />
            <span>Over 21,000 Kilometres</span>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-neutral-700 text-white text-xs font-medium">
            <span className="text-base">{topic.flag}</span>
            <span>{topic.country}</span>
          </div>
        </motion.div>

        {/* 2. Text: Located DIRECTLY UNDER THE IMAGE */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="w-full mt-6 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5"
        >
          <p className="text-base sm:text-lg lg:text-xl text-neutral-100 leading-relaxed sm:leading-loose font-normal">
            {topic.creativeSegments.map((seg, idx) =>
              seg.highlight ? (
                <span
                  key={idx}
                  className="font-semibold text-red-300 underline decoration-red-500 decoration-2 underline-offset-4 bg-red-500/10 px-1 py-0.5 rounded mx-0.5 inline-block"
                >
                  {seg.text}
                </span>
              ) : (
                <span key={idx}>{seg.text}</span>
              )
            )}
          </p>

          {/* Quick facts + Listen button */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => onSpeak(topic.id, topic.rawText)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isCurrentPlaying
                  ? 'bg-red-500 text-neutral-950 shadow-lg shadow-red-500/30'
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
                  <Volume2 className="w-4 h-4 text-red-400" />
                  <span>Listen to English Pronunciation</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-red-400" />
                Silk Road Trade & Defense
              </span>
              <span>•</span>
              <span>Imperial Heritage</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
