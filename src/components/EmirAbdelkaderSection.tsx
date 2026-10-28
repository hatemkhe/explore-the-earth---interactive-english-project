import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TOPICS } from '../data/projectData';
import { Volume2, VolumeX, Shield, Award, BookOpen, Star, MapPin } from 'lucide-react';

interface EmirAbdelkaderSectionProps {
  onSpeak: (id: string, text: string) => void;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
}

export const EmirAbdelkaderSection: React.FC<EmirAbdelkaderSectionProps> = ({
  onSpeak,
  isSpeaking,
  currentSpeakingId,
}) => {
  const topic = TOPICS.find((t) => t.id === 'emir-abdelkader')!;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth subtle scroll enhancement (maintains 100% full clarity and brightness)
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.0]);

  const isCurrentPlaying = isSpeaking && currentSpeakingId === topic.id;

  return (
    <section
      ref={sectionRef}
      id={topic.id}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main presentation wrapper */}
      <div className="max-w-7xl w-full mx-auto space-y-8">
        
        {/* Title Header: High Contrast & Large Typography */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Chapter 05 • Historic Figure & Founding Father</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            {topic.title}
          </h2>

          <div className="flex items-center justify-center gap-2 mt-2 text-emerald-300 text-base font-medium">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-xl">{topic.flag}</span>
            <span className="font-semibold text-white">{topic.country}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400 text-sm">Founder of the Modern Algerian State</span>
          </div>
        </div>

        {/* 3-Column Layout:
            Left Text Column  |  Center Pristine Image  |  Right Text Column
            Crystal clear, sharp, perfectly readable just like all the other chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT TEXT COLUMN */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Scholar & Resistance Leader
              </h3>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                An Algerian military commander, scholar, and statesman who led the heroic armed resistance against the French colonial invasion in the 19th century (1832–1847).
              </p>
              <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Supreme Chivalry & Battlefield Ethics</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
              <span className="text-emerald-400 font-bold block text-xs uppercase tracking-wider mb-1">
                Wisdom & Code
              </span>
              Celebrated worldwide for his philosophical intellect, justice, and mercy to prisoners of war.
            </div>
          </div>

          {/* CENTER: Pristine Native Photo of Emir Abdelkader (Sharp, crystal clear, natural colors) */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
            <motion.div
              style={{ scale: imageScale }}
              className="relative w-full max-w-[340px] sm:max-w-[370px]"
            >
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Badge on photo */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>National Hero</span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-neutral-700 text-white text-xs font-medium">
                  <span className="text-base">{topic.flag}</span>
                  <span>{topic.country}</span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="inline-block text-xs font-semibold text-neutral-300 bg-neutral-900 px-3.5 py-1.5 rounded-full border border-neutral-800">
                  Emir Abdelkader al-Jazairi (1808 – 1883)
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT TEXT COLUMN */}
          <div className="lg:col-span-4 order-3 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Founder & Human Rights Pioneer
              </h3>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                Widely celebrated as the founder of the modern Algerian state and an early champion of human rights, establishing strict humanitarian codes for war prisoners decades before the Geneva Conventions.
              </p>
              <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                <Star className="w-4 h-4" />
                <span>Global Humanitarian Legacy</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
              <span className="text-amber-400 font-bold block text-xs uppercase tracking-wider mb-1">
                Damascus 1860 Rescue
              </span>
              Saved thousands of Christian lives in Damascus in 1860, earning tributes from Abraham Lincoln and the Red Cross.
            </div>
          </div>

        </div>

        {/* Main Creative Text Card with Underlines on Important Elements */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5">
          <p className="text-base sm:text-lg lg:text-xl text-neutral-100 leading-relaxed sm:leading-loose font-normal text-center sm:text-left">
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

          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
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

            <span className="text-xs text-neutral-400 hidden sm:inline">
              Founder of the Modern Algerian State • 1808–1883
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
