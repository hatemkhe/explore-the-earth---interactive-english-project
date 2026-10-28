import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Loader2 } from 'lucide-react';
import { SiteCredits } from '../types';

interface EditCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  credits: SiteCredits;
  onSave: (newCredits: { creatorName: string; infoSources: string[] }) => Promise<{ success: boolean }>;
  isSaving: boolean;
}

export const EditCreditsModal: React.FC<EditCreditsModalProps> = ({
  isOpen,
  onClose,
  credits,
  onSave,
  isSaving,
}) => {
  const [creatorName, setCreatorName] = useState(credits.creatorName);
  const [sources, setSources] = useState<string[]>([...credits.infoSources]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCreatorName(credits.creatorName);
      setSources([...credits.infoSources]);
      setStatusMessage(null);
    }
  }, [isOpen, credits]);

  if (!isOpen) return null;

  const handleSourceChange = (index: number, value: string) => {
    const updated = [...sources];
    updated[index] = value;
    setSources(updated);
  };

  const handleResetToDefaults = () => {
    setCreatorName('Khemamssa Hatem');
    setSources(['------', '------', '------']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Syncing to Firebase Firestore...');
    const result = await onSave({
      creatorName: creatorName.trim() || 'Khemamssa Hatem',
      infoSources: sources.map((s) => s.trim() || '------'),
    });

    if (result.success) {
      setStatusMessage('Saved successfully! Updating live for all viewers.');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setStatusMessage('Saved locally (Offline/Network restricted).');
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-950/40 text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">
              Edit Project Credits
            </h3>
            <p className="text-xs text-neutral-400">
              Changes sync in real-time via Firebase Firestore for all visitors
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Creator Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
              The site created by :
            </label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="e.g. Khemamssa Hatem"
              maxLength={100}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm outline-none transition-all"
            />
          </div>

          {/* Sources Fields */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                The informations geted by :
              </label>
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="text-[11px] text-neutral-400 hover:text-amber-300 underline"
              >
                Reset to default
              </button>
            </div>

            <div className="space-y-2.5">
              {sources.map((src, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 font-mono w-4">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={src}
                    onChange={(e) => handleSourceChange(index, e.target.value)}
                    placeholder="------"
                    maxLength={100}
                    className="flex-1 px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white text-sm outline-none transition-all font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Status Alert if any */}
          {statusMessage && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-center flex items-center justify-center gap-2">
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Broadcasting...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save & Broadcast Live</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
