'use client';

import { useState } from 'react';
import { Problem, Difficulty } from '@/types';
import DifficultyFilter from './DifficultyFilter';
import ProblemRow from './ProblemRow';

export default function ProblemList({ problems }: { problems: Problem[] }) {
  const [filter, setFilter] = useState<Difficulty | 'All'>('All');

  const filtered = filter === 'All' ? problems : problems.filter(p => p.difficulty === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Problems</h2>
        <DifficultyFilter selected={filter} onChange={setFilter} />
      </div>
      <div className="space-y-2">
        {filtered.map(problem => (
          <ProblemRow key={problem.id} problem={problem} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">No problems match the selected filter.</p>
        )}
      </div>
    </div>
  );
}
