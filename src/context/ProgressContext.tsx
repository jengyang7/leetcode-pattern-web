'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ProgressState } from '@/types';

const defaultProgress: ProgressState = {
  completedProblems: {},
  notes: {},
};

interface ProgressContextValue {
  progress: ProgressState;
  toggleProblem: (problemId: string) => void;
  setNote: (problemId: string, note: string) => void;
  isProblemCompleted: (problemId: string) => boolean;
  getNote: (problemId: string) => string;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useLocalStorage<ProgressState>(
    'leetcode-pattern-progress',
    defaultProgress
  );

  const toggleProblem = useCallback((problemId: string) => {
    setProgress(prev => ({
      ...prev,
      completedProblems: {
        ...prev.completedProblems,
        [problemId]: !prev.completedProblems[problemId],
      },
    }));
  }, [setProgress]);

  const setNote = useCallback((problemId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [problemId]: note,
      },
    }));
  }, [setProgress]);

  const isProblemCompleted = useCallback((problemId: string) => {
    return !!progress.completedProblems[problemId];
  }, [progress.completedProblems]);

  const getNote = useCallback((problemId: string) => {
    return progress.notes[problemId] || '';
  }, [progress.notes]);

  return (
    <ProgressContext.Provider value={{ progress, toggleProblem, setNote, isProblemCompleted, getNote }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
