import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, testConnection } from '../firebase';
import { SiteCredits } from '../types';

const CREDITS_DOC_ID = 'credits';
const LOCAL_STORAGE_KEY = 'project_site_credits_cache';

const DEFAULT_CREDITS: SiteCredits = {
  creatorName: 'Khemamssa Hatem',
  infoSources: ['------', '------', '------'],
  updatedAt: new Date().toISOString(),
};

export function useCredits() {
  const [credits, setCredits] = useState<SiteCredits>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          creatorName: parsed.creatorName || DEFAULT_CREDITS.creatorName,
          infoSources: Array.isArray(parsed.infoSources) && parsed.infoSources.length > 0
            ? parsed.infoSources
            : DEFAULT_CREDITS.infoSources,
          updatedAt: parsed.updatedAt || DEFAULT_CREDITS.updatedAt,
        };
      }
    } catch {
      // Fallback to defaults
    }
    return DEFAULT_CREDITS;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'offline' | 'syncing'>('syncing');

  useEffect(() => {
    // Test connection once
    testConnection();

    const docRef = doc(db, 'site_meta', CREDITS_DOC_ID);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setIsLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<SiteCredits>;
          const updated: SiteCredits = {
            creatorName: data.creatorName || DEFAULT_CREDITS.creatorName,
            infoSources: Array.isArray(data.infoSources) && data.infoSources.length > 0
              ? data.infoSources
              : DEFAULT_CREDITS.infoSources,
            updatedAt: data.updatedAt || new Date().toISOString(),
          };
          setCredits(updated);
          setSyncStatus('connected');
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
          } catch {
            // ignore localStorage quota errors
          }
        } else {
          // Initialize document if not exists yet
          setDoc(docRef, DEFAULT_CREDITS)
            .then(() => {
              setSyncStatus('connected');
            })
            .catch((err) => {
              console.warn('Initial doc write error:', err);
              setSyncStatus('offline');
            });
        }
      },
      (error) => {
        setIsLoading(false);
        setSyncStatus('offline');
        console.warn('Firestore onSnapshot error, operating with local state:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveCredits = useCallback(
    async (newCredits: { creatorName?: string; infoSources?: string[] }) => {
      setIsSaving(true);
      const updated: SiteCredits = {
        creatorName: (newCredits.creatorName !== undefined ? newCredits.creatorName : credits.creatorName).trim() || DEFAULT_CREDITS.creatorName,
        infoSources: (newCredits.infoSources !== undefined ? newCredits.infoSources : credits.infoSources).map((s) => s.trim() || '------'),
        updatedAt: new Date().toISOString(),
      };

      // Optimistic update
      setCredits(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }

      const docPath = `site_meta/${CREDITS_DOC_ID}`;
      try {
        const docRef = doc(db, 'site_meta', CREDITS_DOC_ID);
        await setDoc(docRef, updated, { merge: true });
        setSyncStatus('connected');
        return { success: true };
      } catch (err) {
        console.error('Failed to sync to Firestore:', err);
        setSyncStatus('offline');
        try {
          handleFirestoreError(err, OperationType.WRITE, docPath);
        } catch {
          // Keep optimistic value in local state
        }
        return { success: false, error: err };
      } finally {
        setIsSaving(false);
      }
    },
    [credits]
  );

  return {
    credits,
    isLoading,
    isSaving,
    syncStatus,
    saveCredits,
  };
}
