import { useState, useEffect, useCallback } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentId(null);
    }
  }, []);

  const speak = useCallback(
    (id: string, text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      if (isSpeaking && currentId === id) {
        stop();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95; // Clear natural educational pace
      utterance.pitch = 1.0;

      // Try selecting an English natural voice
      const voices = window.speechSynthesis.getVoices();
      const enVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentId(id);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentId(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentId(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSpeaking, currentId, stop]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speak, stop, isSpeaking, currentId };
}
