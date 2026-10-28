import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TOPICS } from '../data/projectData';
import { Volume2, VolumeX, MapPin, Landmark, Award } from 'lucide-react';

interface TassiliSectionProps {
  onSpeak: (id: string, text: string) => void;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
}

export const TassiliSection: React.FC<TassiliSectionProps> = ({
  onSpeak,
  isSpeaking,
  currentSpeakingId,
}) => {
  const topic = TOPICS.find((t) => t.id === 'tassili')!;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth, natural scroll motion:
  // Image glides in from the right to dock gracefully on the left
  const imageX = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]);

  // Text also glides in from the right and docks right beside the image
  const textX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]);

  const isCurrentPlaying = isSpeaking && currentSpeakingId === topic.id;

  return (
    <section
      ref={sectionRef}
      id={topic.id}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* 1. Image: Glides smoothly in from the right to settle on the far left */}
        <motion.div
          style={{ x: imageX, opacity: imageOpacity }}
          className="lg:col-span-5 relative order-2 lg:order-1"
        >
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
            <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Photo Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Sahara Desert Landmark</span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-neutral-700 text-white text-xs font-medium">
              <span className="text-base">{topic.flag}</span>
              <span>{topic.country}</span>
            </div>
          </div>

          {/* Quick Fact pills */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300">
              <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                Ancient Art
              </span>
              Over 6,000+ years old
            </div>
            <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300">
              <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                Heritage
              </span>
              UNESCO World Heritage
            </div>
          </div>
        </motion.div>

        {/* 2. Text: Glides smoothly in alongside it to settle on the right */}
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="lg:col-span-7 space-y-6 order-1 lg:order-2"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Chapter 01 • World Landmark</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              {topic.title}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-amber-300 text-base font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-xl">{topic.flag}</span>
              <span className="font-semibold text-white">{topic.country}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-sm">Southeastern Sahara Desert</span>
            </div>
          </div>

          {/* Creative Text with Underlines on Important Elements */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl">
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

            {/* Audio narration button */}
            <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-between">
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

              <span className="text-xs text-neutral-400 hidden sm:inline">
                Sandstone Plateau & Ancient Drawings
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
