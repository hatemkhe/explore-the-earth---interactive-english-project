import React, { useState } from 'react';
import { SiteCredits } from '../types';
import { EditCreditsModal } from './EditCreditsModal';
import { TeacherEvaluationModal } from './TeacherEvaluationModal';
import { AdminEvaluationsModal } from './AdminEvaluationsModal';
import { Lock, X, KeyRound, AlertCircle, GraduationCap, Edit3, ClipboardList } from 'lucide-react';

interface CreditsSectionProps {
  credits: SiteCredits;
  onSaveCredits: (newCredits: { creatorName: string; infoSources: string[] }) => Promise<{ success: boolean }>;
  isSaving: boolean;
  syncStatus: 'connected' | 'offline' | 'syncing';
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({
  credits,
  onSaveCredits,
  isSaving,
}) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdminEvalsOpen, setIsAdminEvalsOpen] = useState(false);
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleOpenAuth = () => {
    setPasswordInput('');
    setPasswordError(false);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'admin') {
      setPasswordError(false);
      setIsPasswordModalOpen(false);
      setIsChoiceModalOpen(true);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <footer id="credits" className="relative bg-neutral-950 pt-20 pb-28 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Card Container with Bubble Shapes */}
        <div
          onClick={handleOpenAuth}
          className="p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl space-y-7 cursor-pointer select-none"
        >
          {/* 1. The site created by : [Name] in bubble shape */}
          <div className="space-y-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-base sm:text-xl font-bold text-neutral-200">
                  The site created by :{' '}
                </span>
                <span className="text-lg sm:text-2xl font-extrabold text-amber-400 underline decoration-amber-500/60 decoration-2 underline-offset-4">
                  {credits.creatorName || 'Khemamssa Hatem'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. The informations geted by : [Sources in separate bubble shapes] */}
          <div className="space-y-3">
            <div className="text-base sm:text-lg font-bold text-neutral-200 px-1">
              The informations geted by :
            </div>

            <div className="space-y-2.5 font-mono text-sm sm:text-base">
              {credits.infoSources && credits.infoSources.length > 0 ? (
                credits.infoSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-amber-300/90 font-medium tracking-wide"
                  >
                    <span className="w-5 text-neutral-500 text-xs font-mono">{index + 1}.</span>
                    <span className="tracking-wider">{source}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-amber-300/90 font-medium">
                    <span className="w-5 text-neutral-500 text-xs font-mono">1.</span>
                    <span className="tracking-wider">------</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-amber-300/90 font-medium">
                    <span className="w-5 text-neutral-500 text-xs font-mono">2.</span>
                    <span className="tracking-wider">------</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-amber-300/90 font-medium">
                    <span className="w-5 text-neutral-500 text-xs font-mono">3.</span>
                    <span className="tracking-wider">------</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Evaluation Button Under the Names */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={() => setIsEvalModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <GraduationCap className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            <span>Evaluation</span>
          </button>
        </div>

      </div>

      {/* Password Authentication Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl text-neutral-100">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-base text-white">
                Admin Authentication
              </h3>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Please enter the administrator password.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-white outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                </div>
                {passwordError && (
                  <p className="flex items-center gap-1 text-xs text-red-400 mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect password. Access denied.</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Choice Modal after entering password 'admin' */}
      {isChoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-3xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl text-neutral-100 space-y-4">
            <button
              onClick={() => setIsChoiceModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-lg text-white">
              Admin Dashboard
            </h3>
            <p className="text-xs text-neutral-400">
              Choose an action to perform:
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  setIsChoiceModalOpen(false);
                  setIsEditModalOpen(true);
                }}
                className="w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 flex items-center gap-3 text-left transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-white block">
                    Edit Creator & Sources
                  </span>
                  <span className="text-xs text-neutral-400">
                    Modify site author name and research links
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsChoiceModalOpen(false);
                  setIsAdminEvalsOpen(true);
                }}
                className="w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 flex items-center gap-3 text-left transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-white block">
                    View Teacher Evaluations
                  </span>
                  <span className="text-xs text-neutral-400">
                    See grades & notes saved in Firestore database
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Credits Modal */}
      <EditCreditsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        credits={credits}
        onSave={onSaveCredits}
        isSaving={isSaving}
      />

      {/* Admin Evaluations Viewer */}
      <AdminEvaluationsModal
        isOpen={isAdminEvalsOpen}
        onClose={() => setIsAdminEvalsOpen(false)}
      />

      {/* Teacher Evaluation Modal */}
      <TeacherEvaluationModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
      />
    </footer>
  );
};
