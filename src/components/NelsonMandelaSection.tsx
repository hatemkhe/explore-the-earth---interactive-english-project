import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TOPICS } from '../data/projectData';
import { Volume2, VolumeX, HeartHandshake, MapPin, Award } from 'lucide-react';

interface NelsonMandelaSectionProps {
  onSpeak: (id: string, text: string) => void;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
}

export const NelsonMandelaSection: React.FC<NelsonMandelaSectionProps> = ({
  onSpeak,
  isSpeaking,
  currentSpeakingId,
}) => {
  const topic = TOPICS.find((t) => t.id === 'nelson-mandela')!;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth scroll progression:
  // Image starts smaller and expands gently to full normal size
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.86, 1.0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 1.0]);

  const isCurrentPlaying = isSpeaking && currentSpeakingId === topic.id;

  return (
    <section
      ref={sectionRef}
      id={topic.id}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* 1. Image: Starts compact, then scales smoothly to normal size */}
        <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1">
          <motion.div
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
            className="relative w-full max-w-[380px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl origin-center"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Badges on photo */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nobel Peace Laureate</span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-neutral-700 text-white text-xs font-medium">
              <span className="text-base">{topic.flag}</span>
              <span>{topic.country}</span>
            </div>
          </motion.div>
        </div>

        {/* 2. Text: Stationary, crisp, and comfortable to read */}
        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Chapter 03 • Historic Figure</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              {topic.title}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-emerald-300 text-base font-medium">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-xl">{topic.flag}</span>
              <span className="font-semibold text-white">{topic.country}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-sm">Universal Symbol of Peace & Equality</span>
            </div>
          </div>

          {/* Creative Text Card with Underlines on Important Elements */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5">
            <p className="text-base sm:text-lg lg:text-xl text-neutral-100 leading-relaxed sm:leading-loose font-normal">
              {topic.creativeSegments.map((seg, idx) =>
                seg.highlight ? (
                  <span
                    key={idx}
                    className="font-semibold text-emerald-300 underline decoration-emerald-500 decoration-2 underline-offset-4 bg-emerald-500/10 px-1 py-0.5 rounded mx-0.5 inline-block"
                  >
                    {seg.text}
                  </span>
                ) : (
                  <span key={idx}>{seg.text}</span>
                )
              )}
            </p>

            {/* Fact chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-800 text-xs">
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300">
                <span className="text-emerald-400 font-bold block text-sm">27 Years</span>
                Imprisonment for freedom
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300">
                <span className="text-emerald-400 font-bold block text-sm">1994</span>
                First Democratic President
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300 col-span-2 sm:col-span-1">
                <span className="text-emerald-400 font-bold block text-sm">1993</span>
                Nobel Peace Prize
              </div>
            </div>

            {/* Audio narration button */}
            <div className="pt-2">
              <button
                onClick={() => onSpeak(topic.id, topic.rawText)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isCurrentPlaying
                    ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/30'
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
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>Listen to English Pronunciation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
