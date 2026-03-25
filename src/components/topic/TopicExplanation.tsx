'use client';

import { useState } from 'react';
import Link from 'next/link';
import { explanations, TopicExplanation as TopicExplanationType } from '@/data/explanations';

export default function TopicExplanation({ topicSlug }: { topicSlug: string }) {
  const explanation = explanations[topicSlug];
  if (!explanation) return null;

  return (
    <div className="space-y-6">
      {/* Summary / Approach / Key Insight */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Pattern Overview</h2>
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">Summary</h3>
            <p>{explanation.summary}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">Approach</h3>
            <p>{explanation.approach}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">Key Insight</h3>
            <p className="italic text-indigo-300/80 bg-indigo-500/5 border border-indigo-500/10 rounded-lg px-4 py-3">
              {explanation.keyInsight}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <Visualization visualization={explanation.visualization} />

      {/* Time & Space Complexity */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Time Complexity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Operation</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Complexity</th>
                  <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Note</th>
                </tr>
              </thead>
              <tbody>
                {explanation.timeComplexity.map((tc, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="py-2.5 pr-4 text-gray-300">{tc.operation}</td>
                    <td className="py-2.5 pr-4">
                      <code className="rounded bg-indigo-500/10 px-2 py-0.5 text-xs font-mono text-indigo-400">{tc.complexity}</code>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">{tc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Space Complexity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Operation</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Complexity</th>
                  <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Note</th>
                </tr>
              </thead>
              <tbody>
                {explanation.spaceComplexity.map((sc, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="py-2.5 pr-4 text-gray-300">{sc.operation}</td>
                    <td className="py-2.5 pr-4">
                      <code className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-mono text-emerald-400">{sc.complexity}</code>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">{sc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Code Template */}
      <CodeTemplate code={explanation.codeTemplate} />

      {/* Useful Snippets */}
      <UsefulSnippets snippets={explanation.usefulSnippets} />

      {/* Pattern Recognition */}
      <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-950/20 to-orange-950/10 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          Pattern Recognition
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {explanation.patternRecognition.map((pr, i) => (
            <div key={i} className="rounded-lg border border-gray-800/80 bg-gray-950/50 p-3">
              <div className="text-xs text-yellow-400/80 mb-1.5 font-medium">If you see...</div>
              <p className="text-sm text-gray-300 mb-2">&ldquo;{pr.signal}&rdquo;</p>
              <div className="text-xs text-emerald-400/80 mb-1 font-medium">Think...</div>
              <p className="text-sm text-emerald-300/90">{pr.pattern}</p>
            </div>
          ))}
        </div>
      </div>

      {/* When to Use + Common Mistakes */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-xs">?</span>
            When to Use
          </h2>
          <ul className="space-y-2">
            {explanation.whenToUse.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-400 text-xs">!</span>
            Common Mistakes
          </h2>
          <ul className="space-y-2">
            {explanation.commonMistakes.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Patterns */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.07a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
          </svg>
          Related Patterns
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {explanation.relatedPatterns.map((rp, i) => (
            <Link
              key={i}
              href={`/topic/${rp.slug}`}
              className="group rounded-lg border border-gray-800/80 bg-gray-950/50 p-4 hover:border-indigo-500/30 hover:bg-indigo-950/20 transition-colors"
            >
              <div className="text-sm font-medium text-indigo-400 group-hover:text-indigo-300 mb-1">{rp.name}</div>
              <div className="text-xs text-gray-500">{rp.why}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Visualization({ visualization }: { visualization: TopicExplanationType['visualization'] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = visualization.steps[currentStep];

  return (
    <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-purple-950/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
          </svg>
          Interactive Walkthrough
        </h2>
        <span className="text-xs text-gray-500 tabular-nums">
          Step {currentStep + 1} / {visualization.steps.length}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-4">{visualization.title}</p>

      {/* Persistent input display */}
      <div className="rounded-lg bg-gray-950/60 border border-gray-700 px-4 py-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-yellow-500">Input</span>
        </div>
        <pre className="text-sm text-yellow-200/90 font-mono whitespace-pre-wrap leading-relaxed">{visualization.input}</pre>
      </div>

      <div className="space-y-3 mb-5">
        <div className="rounded-lg bg-gray-900/80 border border-gray-800 p-4">
          <div className="text-xs text-gray-500 mb-1 font-medium">{step.label}</div>
          <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">{step.state}</pre>
        </div>
        {step.highlight && (
          <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-4 py-3">
            <pre className="text-sm text-indigo-300 font-mono whitespace-pre-wrap leading-relaxed">{step.highlight}</pre>
          </div>
        )}
      </div>

      {/* Step controls */}
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
          {visualization.steps.map((_, i) => (
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
          onClick={() => setCurrentStep(s => Math.min(visualization.steps.length - 1, s + 1))}
          disabled={currentStep === visualization.steps.length - 1}
          className="rounded-lg px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function CodeTemplate({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          Code Template
          <span className="text-xs font-normal text-gray-500 bg-gray-800 rounded px-2 py-0.5">Python</span>
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="rounded-lg bg-gray-950/80 border border-gray-800 overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-gray-300 leading-relaxed"><code>{code}</code></pre>
      </div>
    </div>
  );
}

function UsefulSnippets({ snippets }: { snippets: TopicExplanationType['usefulSnippets'] }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        Useful Snippets
        <span className="text-xs font-normal text-gray-500 bg-gray-800 rounded px-2 py-0.5">Python</span>
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {snippets.map((snippet, i) => (
          <div key={i} className="rounded-lg border border-gray-800/80 bg-gray-950/50 p-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-indigo-400">{snippet.name}</span>
              <span className="text-[10px] text-gray-600 shrink-0">{snippet.note}</span>
            </div>
            <pre className="text-xs font-mono text-gray-400 leading-relaxed whitespace-pre-wrap overflow-x-auto"><code>{snippet.code}</code></pre>
          </div>
        ))}
      </div>
    </div>
  );
}
