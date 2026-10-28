import React, { useState, useEffect } from 'react';
import { Compass, Volume2, VolumeX, Menu, X, Globe, Sparkles } from 'lucide-react';
import { TOPICS } from '../data/projectData';

interface NavbarProps {
  activeSection: string;
  isSpeaking: boolean;
  onStopSpeech: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, isSpeaking, onStopSpeech }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-amber-400 font-semibold">
                English Project
              </span>
              <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-200 transition-colors">
                Explore The Earth
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800 backdrop-blur-md">
            <button
              onClick={() => scrollTo('hero')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'hero'
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              Start
            </button>
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => scrollTo(topic.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeSection === topic.id
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <span>{topic.flag}</span>
                <span className="truncate max-w-[110px]">{topic.title.replace('The ', '')}</span>
              </button>
            ))}
            <button
              onClick={() => scrollTo('credits')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'credits'
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-md'
                  : 'text-amber-300 hover:text-amber-200 hover:bg-amber-500/10'
              }`}
            >
              Credits
            </button>
          </nav>

          {/* Right Action: Voice Indicator + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isSpeaking && (
              <button
                onClick={onStopSpeech}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-medium animate-pulse hover:bg-amber-500/30 transition-all"
                title="Stop audio narration"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Playing Voice</span>
                <VolumeX className="w-3.5 h-3.5 ml-1" />
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-4">
              Explore Chapters
            </p>
            <button
              onClick={() => scrollTo('hero')}
              className="w-full text-left px-4 py-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-medium flex items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400" />
                1. Web Site Start
              </span>
              <span className="text-xs text-neutral-400">Intro</span>
            </button>

            {TOPICS.map((topic, idx) => (
              <button
                key={topic.id}
                onClick={() => scrollTo(topic.id)}
                className="w-full text-left px-4 py-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 text-white font-medium flex items-center justify-between hover:bg-neutral-800/40 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-lg">{topic.flag}</span>
                  <span>
                    {idx + 2}. {topic.title}
                  </span>
                </span>
                <span className="text-xs text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {topic.category}
                </span>
              </button>
            ))}

            <button
              onClick={() => scrollTo('credits')}
              className="w-full text-left px-4 py-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-semibold flex items-center justify-between mt-4"
            >
              <span>8. Project Credits & Sources</span>
            </button>
          </div>

          <div className="pt-6 border-t border-neutral-800 text-center text-xs text-neutral-400">
            English Project • Landmarks & Figures
          </div>
        </div>
      )}
    </>
  );
};
