'use client';

import { comparisons } from '@/data/comparisons';

function getComplexityColor(complexity: string): string {
  if (complexity.includes('n\u00B2') || complexity.includes('V\u00B3')) return 'bg-red-500/10 text-red-400';
  if (complexity.includes('n log') || complexity.includes('E log') || complexity.includes('V+E) log')) return 'bg-yellow-500/10 text-yellow-400';
  if (complexity.includes('V\u00D7E')) return 'bg-yellow-500/10 text-yellow-400';
  if (complexity === 'O(n)' || complexity === 'O(n) avg') return 'bg-emerald-500/10 text-emerald-400';
  if (complexity === 'O(1)' || complexity === 'O(h)' || complexity === 'O(w)' || complexity === 'O(k)') return 'bg-emerald-500/10 text-emerald-400';
  if (complexity === 'O(V)' || complexity === 'O(V+E)') return 'bg-emerald-500/10 text-emerald-400';
  if (complexity.includes('O(1)') || complexity.includes('O(n)')) return 'bg-emerald-500/10 text-emerald-400';
  if (complexity.includes('states')) return 'bg-indigo-500/10 text-indigo-400';
  return 'bg-indigo-500/10 text-indigo-400';
}

export default function ComparisonTable({ topicSlug }: { topicSlug: string }) {
  const table = comparisons[topicSlug];
  if (!table) return null;

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">{table.title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Algorithm</th>
              <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>
              <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Space</th>
              <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Best For</th>
              <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Limitations</th>
            </tr>
          </thead>
          <tbody>
            {table.entries.map((entry) => (
              <tr key={entry.name} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-2.5 pr-3 font-medium text-gray-200">{entry.name}</td>
                <td className="py-2.5 pr-3">
                  <code className={`rounded px-1.5 py-0.5 text-xs font-mono ${getComplexityColor(entry.timeComplexity)}`}>
                    {entry.timeComplexity}
                  </code>
                </td>
                <td className="py-2.5 pr-3">
                  <code className={`rounded px-1.5 py-0.5 text-xs font-mono ${getComplexityColor(entry.spaceComplexity)}`}>
                    {entry.spaceComplexity}
                  </code>
                </td>
                <td className="py-2.5 pr-3 text-xs text-gray-400">{entry.bestFor}</td>
                <td className="py-2.5 text-xs text-gray-500">{entry.limitations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
