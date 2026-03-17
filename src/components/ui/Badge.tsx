import { Difficulty } from '@/types';

const colors: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export default function Badge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
}
