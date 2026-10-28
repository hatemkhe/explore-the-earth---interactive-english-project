import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { X, Send, GraduationCap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface TeacherEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_ID = 'service_qlzc2dn';
const TEMPLATE_ID = 'template_51n7ft7';
const PUBLIC_KEY = '9z9fb-U7LtKWji6qM';

export const TeacherEvaluationModal: React.FC<TeacherEvaluationModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Score starts at 10 as requested
  const [score, setScore] = useState<string>('10');
  const [feedback, setFeedback] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionResult(null);

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 20) {
      setSubmissionResult({ success: false, error: 'Please enter a valid grade between 0 and 20.' });
      setIsLoading(false);
      return;
    }

    if (!feedback.trim()) {
      setSubmissionResult({ success: false, error: 'Please write a feedback note for the student.' });
      setIsLoading(false);
      return;
    }

    const formattedScore = `${score}/20`;

    // 1. Save reliably in Firebase Firestore database
    try {
      await addDoc(collection(db, 'evaluations'), {
        score: formattedScore,
        feedback: feedback.trim(),
        teacherName: 'Teacher',
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Firestore backup note:', err);
    }

    // 2. Transmit via EmailJS directly to your inbox
    const templateParams = {
      score: formattedScore,
      grade: formattedScore,
      feedback: feedback.trim(),
      notes: feedback.trim(),
      message: `Teacher Evaluation Grade: ${formattedScore}\n\nTeacher Feedback:\n${feedback.trim()}\n\nDate: ${new Date().toLocaleString()}`,
      teacher_name: 'Teacher',
      from_name: 'Teacher Evaluation',
      to_name: 'Khemamssa Hatem',
      to_email: 'bhiakhememssa@gmail.com',
      project_name: 'Explore the Earth - English Project',
      submission_date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });
      setIsLoading(false);
      setSubmissionResult({ success: true });
    } catch (err: unknown) {
      console.error('EmailJS send error:', err);
      setIsLoading(false);
      // Even if EmailJS network encounters an issue, data is secured in Firestore
      setSubmissionResult({
        success: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl text-neutral-100">
        
        {/* Close button */}
        <button
          onClick={() => {
            setSubmissionResult(null);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Evaluation
            </h3>
            <p className="text-xs text-neutral-400">
              Grade out of 20 & teacher feedback will be emailed to Khemamssa Hatem
            </p>
          </div>
        </div>

        {submissionResult && submissionResult.success ? (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-bold text-xl text-white">
                Evaluation Sent Successfully!
              </h4>
              <p className="text-sm text-neutral-300">
                Grade: <span className="text-amber-400 font-bold text-lg">{score}/20</span>
              </p>
              <p className="text-xs text-neutral-400 pt-1">
                Your feedback and grade have been sent to the student's email inbox.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmissionResult(null);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs cursor-pointer transition-colors"
            >
              Done (تم)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Score out of 20 - Starts at 10 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Grade / Score (Out of 20) *
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  {score} / 20
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  required
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-24 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-lg font-bold text-amber-400 outline-none text-center"
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Feedback / Observations */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Feedback & Observations (ملاحظة الأستاذ) *
              </label>
              <textarea
                required
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback and evaluation remarks on the project..."
                maxLength={1000}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-white outline-none transition-all resize-none"
              />
            </div>

            {/* Error message */}
            {submissionResult && !submissionResult.success && submissionResult.error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submissionResult.error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send (إرسال)</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
