/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TassiliSection } from './components/TassiliSection';
import { ThomasEdisonSection } from './components/ThomasEdisonSection';
import { NelsonMandelaSection } from './components/NelsonMandelaSection';
import { GreatWallSection } from './components/GreatWallSection';
import { EmirAbdelkaderSection } from './components/EmirAbdelkaderSection';
import { EiffelTowerSection } from './components/EiffelTowerSection';
import { CreditsSection } from './components/CreditsSection';
import { useCredits } from './hooks/useCredits';
import { useSpeech } from './hooks/useSpeech';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { credits, saveCredits, isSaving, syncStatus } = useCredits();
  const { speak, stop, isSpeaking, currentId } = useSpeech();

  // Smooth scroll progress bar across the entire page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll spy for active navbar section
  useEffect(() => {
    const sectionIds = [
      'hero',
      'tassili',
      'thomas-edison',
      'nelson-mandela',
      'great-wall',
      'emir-abdelkader',
      'eiffel-tower',
      'credits',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sectionIds[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-black">
      {/* Sleek Golden Scroll Progress Bar at the Very Top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 origin-left z-[60] pointer-events-none"
      />

      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        isSpeaking={isSpeaking}
        onStopSpeech={stop}
      />

      <main className="relative">
        {/* 1. Web site start */}
        <HeroSection />

        {/* 2. Tassili n'Ajjer */}
        <TassiliSection
          onSpeak={speak}
          isSpeaking={isSpeaking}
          currentSpeakingId={currentId}
        />

        {/* 3. Thomas Edison */}
        <ThomasEdisonSection
          onSpeak={speak}
          isSpeaking={isSpeaking}
          currentSpeakingId={currentId}
        />

        {/* 4. Nelson Mandela */}
        <NelsonMandelaSection
          onSpeak={speak}
          isSpeaking={isSpeaking}
          currentSpeakingId={currentId}
        />

        {/* 5. The Great Wall of China */}
        <GreatWallSection
          onSpeak={speak}
          isSpeaking={isSpeaking}
          currentSpeakingId={currentId}
        />

        {/* 6. Emir Abdelkader */}
        <EmirAbdelkaderSection
          onSpeak={speak}
          isSpeaking={isSpeaking}
          currentSpeakingId={currentId}
        />

        {/* 7. Eiffel Tower */}
        <EiffelTowerSection
          onSpeak={speak}
          isSpeaking={isSpeaking}
          currentSpeakingId={currentId}
        />

        {/* 8. Credits with Secret Password Protection (admin) & Live Firestore Sync */}
        <CreditsSection
          credits={credits}
          onSaveCredits={saveCredits}
          isSaving={isSaving}
          syncStatus={syncStatus}
        />
      </main>
    </div>
  );
}
