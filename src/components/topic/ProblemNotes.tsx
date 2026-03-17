'use client';

import { useState, useEffect, useRef } from 'react';
import { useProgress } from '@/context/ProgressContext';

export default function ProblemNotes({ problemId }: { problemId: string }) {
  const { getNote, setNote } = useProgress();
  const [value, setValue] = useState(getNote(problemId));
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setValue(getNote(problemId));
  }, [problemId, getNote]);

  const handleChange = (text: string) => {
    setValue(text);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNote(problemId, text), 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-gray-500 hover:text-indigo-400 transition-colors"
      >
        {value ? 'Edit notes' : '+ Add notes'}
      </button>
    );
  }

  return (
    <div className="mt-2">
      <textarea
        value={value}
        onChange={e => handleChange(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-sm text-gray-300 placeholder-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y min-h-[80px]"
        rows={3}
        autoFocus
      />
      <button
        onClick={() => setIsOpen(false)}
        className="mt-1 text-xs text-gray-500 hover:text-gray-300"
      >
        Collapse
      </button>
    </div>
  );
}
