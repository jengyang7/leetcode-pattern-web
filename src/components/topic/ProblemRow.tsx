'use client';

import { Problem } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import Badge from '@/components/ui/Badge';
import ProblemNotes from './ProblemNotes';

export default function ProblemRow({ problem }: { problem: Problem }) {
  const { isProblemCompleted, toggleProblem } = useProgress();
  const completed = isProblemCompleted(problem.id);

  return (
    <div className={`rounded-lg border p-4 transition-all ${
      completed
        ? 'border-emerald-500/20 bg-emerald-500/5'
        : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
    }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleProblem(problem.id)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
            completed
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-gray-600 hover:border-indigo-400'
          }`}
        >
          {completed && (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
              completed ? 'text-gray-400 line-through' : 'text-gray-200'
            }`}
          >
            {problem.name}
          </a>
        </div>
        <Badge difficulty={problem.difficulty} />
      </div>
      <div className="mt-2 pl-9">
        <ProblemNotes problemId={problem.id} />
      </div>
    </div>
  );
}
