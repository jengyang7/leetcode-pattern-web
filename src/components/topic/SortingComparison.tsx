'use client';

import { useState } from 'react';
import { sortingAlgorithms, type SortingAlgorithm } from '@/data/sorting-algorithms';

export default function SortingComparison() {
  const [selectedAlgo, setSelectedAlgo] = useState<string>('bubble');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Comparison Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Sorting Algorithms Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Algorithm</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Best</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Average</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Worst</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Space</th>
                <th className="text-center py-2 pr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Stable</th>
                <th className="text-center py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">In-Place</th>
              </tr>
            </thead>
            <tbody>
              {sortingAlgorithms.map((algo) => (
                <tr key={algo.slug} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="py-2.5 pr-3 font-medium text-gray-200">{algo.name}</td>
                  <td className="py-2.5 pr-3">
                    <code className={`rounded px-1.5 py-0.5 text-xs font-mono ${getComplexityColor(algo.bestTime)}`}>{algo.bestTime}</code>
                  </td>
                  <td className="py-2.5 pr-3">
                    <code className={`rounded px-1.5 py-0.5 text-xs font-mono ${getComplexityColor(algo.avgTime)}`}>{algo.avgTime}</code>
                  </td>
                  <td className="py-2.5 pr-3">
                    <code className={`rounded px-1.5 py-0.5 text-xs font-mono ${getComplexityColor(algo.worstTime)}`}>{algo.worstTime}</code>
                  </td>
                  <td className="py-2.5 pr-3">
                    <code className="rounded bg-gray-800 px-1.5 py-0.5 text-xs font-mono text-gray-400">{algo.space}</code>
                  </td>
                  <td className="py-2.5 pr-3 text-center">
                    {algo.stable ? (
                      <span className="text-emerald-400 text-xs font-medium">Yes</span>
                    ) : (
                      <span className="text-red-400 text-xs font-medium">No</span>
                    )}
                  </td>
                  <td className="py-2.5 text-center">
                    {algo.inPlace ? (
                      <span className="text-emerald-400 text-xs font-medium">Yes</span>
                    ) : (
                      <span className="text-red-400 text-xs font-medium">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Guide */}
      <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-purple-950/20 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Which Sort to Use?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <DecisionCard
            scenario="Small array (n < 20)"
            answer="Insertion Sort"
            reason="Low overhead, great cache performance, often faster than O(n log n) sorts for tiny inputs"
          />
          <DecisionCard
            scenario="Nearly sorted data"
            answer="Insertion Sort"
            reason="O(n) best case — only needs to shift a few elements"
          />
          <DecisionCard
            scenario="General purpose (in-memory)"
            answer="Quick Sort"
            reason="Fastest average case in practice due to cache locality and small constant factor"
          />
          <DecisionCard
            scenario="Guaranteed O(n log n) needed"
            answer="Merge Sort or Heap Sort"
            reason="No worst-case degradation. Merge sort if stability needed, heap sort if O(1) space needed"
          />
          <DecisionCard
            scenario="Stability required"
            answer="Merge Sort"
            reason="O(n log n) and stable — preserves relative order of equal elements"
          />
          <DecisionCard
            scenario="O(1) extra space required"
            answer="Heap Sort"
            reason="In-place O(n log n) sort, though cache performance is worse than quicksort"
          />
          <DecisionCard
            scenario="Integers with small range"
            answer="Counting Sort"
            reason="O(n + k) time — beats comparison sorts when range k is O(n)"
          />
          <DecisionCard
            scenario="Fixed-length strings/IDs"
            answer="Radix Sort"
            reason="O(d × n) — linear when d (digits) is constant"
          />
        </div>
      </div>

      {/* Algorithm Selector */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Algorithm Details</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {sortingAlgorithms.map((algo) => (
            <button
              key={algo.slug}
              onClick={() => setSelectedAlgo(algo.slug)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedAlgo === algo.slug
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
              }`}
            >
              {algo.name}
            </button>
          ))}
        </div>

        {sortingAlgorithms.filter(a => a.slug === selectedAlgo).map((algo) => (
          <AlgorithmDetail key={algo.slug} algo={algo} onCopy={handleCopy} copiedIdx={copiedIdx} />
        ))}
      </div>

      {/* All Algorithms Code Reference */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          All Implementations
          <span className="text-xs font-normal text-gray-500 bg-gray-800 rounded px-2 py-0.5">Python</span>
        </h2>
        <div className="space-y-4">
          {sortingAlgorithms.map((algo, idx) => (
            <div key={algo.slug} className="rounded-lg border border-gray-800/80 bg-gray-950/50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50">
                <span className="text-sm font-medium text-indigo-400">{algo.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-600">
                    Time: {algo.avgTime} | Space: {algo.space}
                  </span>
                  <button
                    onClick={() => handleCopy(algo.code, idx)}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {copiedIdx === idx ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono text-gray-400 leading-relaxed overflow-x-auto"><code>{algo.code}</code></pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlgorithmDetail({ algo, onCopy, copiedIdx }: { algo: SortingAlgorithm; onCopy: (code: string, idx: number) => void; copiedIdx: number | null }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = algo.visualization.steps[currentStep];
  const algoIndex = sortingAlgorithms.findIndex(a => a.slug === algo.slug) + 100;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-300">{algo.description}</p>

      {/* Visualization */}
      <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-200">Step-by-Step Walkthrough</span>
          <span className="text-xs text-gray-500 tabular-nums">Step {currentStep + 1} / {algo.visualization.steps.length}</span>
        </div>

        <div className="rounded-lg bg-gray-950/60 border border-gray-700 px-4 py-3 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-yellow-500">Input</span>
          <pre className="text-sm text-yellow-200/90 font-mono mt-1">{algo.visualization.input}</pre>
        </div>

        <div className="space-y-2 mb-4">
          <div className="rounded-lg bg-gray-900/80 border border-gray-800 p-3">
            <div className="text-xs text-gray-500 mb-1 font-medium">{step.label}</div>
            <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">{step.state}</pre>
          </div>
          {step.highlight && (
            <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-2">
              <pre className="text-sm text-indigo-300 font-mono whitespace-pre-wrap">{step.highlight}</pre>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(0)}
            disabled={currentStep === 0}
            className="rounded-lg px-3 py-1.5 text-xs font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="rounded-lg px-3 py-1.5 text-xs font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          <div className="flex-1 flex justify-center gap-1.5">
            {algo.visualization.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentStep ? 'w-6 bg-indigo-500' : 'w-2 bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentStep(s => Math.min(algo.visualization.steps.length - 1, s + 1))}
            disabled={currentStep === algo.visualization.steps.length - 1}
            className="rounded-lg px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-800/80 bg-gray-950/50 p-4">
          <h4 className="text-sm font-medium text-emerald-400 mb-2">Pros</h4>
          <ul className="space-y-1.5">
            {algo.pros.map((pro, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-300">
                <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-gray-800/80 bg-gray-950/50 p-4">
          <h4 className="text-sm font-medium text-red-400 mb-2">Cons</h4>
          <ul className="space-y-1.5">
            {algo.cons.map((con, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-300">
                <span className="text-red-500 shrink-0 mt-0.5">-</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Best For */}
      <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Best For: </span>
        <span className="text-sm text-gray-300">{algo.bestFor}</span>
      </div>

      {/* Code */}
      <div className="rounded-lg border border-gray-800/80 bg-gray-950/50">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50">
          <span className="text-sm font-medium text-gray-300">Python Implementation</span>
          <button
            onClick={() => onCopy(algo.code, algoIndex)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {copiedIdx === algoIndex ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-gray-400 leading-relaxed overflow-x-auto"><code>{algo.code}</code></pre>
      </div>
    </div>
  );
}

function DecisionCard({ scenario, answer, reason }: { scenario: string; answer: string; reason: string }) {
  return (
    <div className="rounded-lg border border-gray-800/80 bg-gray-950/50 p-3">
      <div className="text-xs text-gray-500 mb-1">{scenario}</div>
      <div className="text-sm font-medium text-indigo-400 mb-1">{answer}</div>
      <div className="text-xs text-gray-500">{reason}</div>
    </div>
  );
}

function getComplexityColor(complexity: string): string {
  if (complexity.includes('n²')) return 'bg-red-500/10 text-red-400';
  if (complexity.includes('n log n')) return 'bg-yellow-500/10 text-yellow-400';
  if (complexity.includes('n + k') || complexity.includes('d ×')) return 'bg-emerald-500/10 text-emerald-400';
  if (complexity === 'O(n)') return 'bg-emerald-500/10 text-emerald-400';
  if (complexity === 'O(1)') return 'bg-emerald-500/10 text-emerald-400';
  if (complexity.includes('log n')) return 'bg-emerald-500/10 text-emerald-400';
  return 'bg-indigo-500/10 text-indigo-400';
}
