import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { X, GraduationCap, Clock, Award, MessageSquareQuote } from 'lucide-react';

interface EvaluationRecord {
  id: string;
  score: string;
  feedback: string;
  createdAt: string;
  teacherName?: string;
}

interface AdminEvaluationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminEvaluationsModal: React.FC<AdminEvaluationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const q = query(collection(db, 'evaluations'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const records: EvaluationRecord[] = [];
        snapshot.forEach((doc) => {
          records.push({ id: doc.id, ...(doc.data() as Omit<EvaluationRecord, 'id'>) });
        });
        setEvaluations(records);
        setIsLoading(false);
      },
      (error) => {
        console.warn('Firestore evaluations snapshot notice:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[85vh] rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl flex flex-col text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">
              Received Teacher Evaluations
            </h3>
            <p className="text-xs text-neutral-400">
              Directly stored in real-time in your Firebase Firestore database
            </p>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {isLoading ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              Loading evaluations...
            </div>
          ) : evaluations.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm space-y-2 border border-dashed border-neutral-800 rounded-2xl">
              <Award className="w-8 h-8 text-neutral-600 mx-auto" />
              <p>No evaluations received yet.</p>
              <p className="text-xs text-neutral-500">
                When your teacher submits a score via the Evaluation button, it appears here instantly!
              </p>
            </div>
          ) : (
            evaluations.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                      Grade:
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-base">
                      {item.score}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                    <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
                    <span>Teacher Feedback:</span>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed pl-5 whitespace-pre-wrap">
                    {item.feedback}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
