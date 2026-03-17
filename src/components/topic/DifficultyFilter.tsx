'use client';

import { Difficulty } from '@/types';

const options: { value: Difficulty | 'All'; label: string; color: string }[] = [
  { value: 'All', label: 'All', color: 'bg-gray-700 text-gray-300 hover:bg-gray-600' },
  { value: 'Easy', label: 'Easy', color: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' },
  { value: 'Medium', label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' },
  { value: 'Hard', label: 'Hard', color: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
];

interface Props {
  selected: Difficulty | 'All';
  onChange: (value: Difficulty | 'All') => void;
}

export default function DifficultyFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            selected === opt.value
              ? `${opt.color} ring-1 ring-white/20`
              : 'bg-gray-800/50 text-gray-500 hover:text-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
