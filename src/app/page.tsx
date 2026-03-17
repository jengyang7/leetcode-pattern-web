'use client';

import Link from 'next/link';
import { topics } from '@/data/topics';
import { problems } from '@/data/problems';
import { categories } from '@/data/categories';
import { useProgress } from '@/context/ProgressContext';
import { getTopicProgress } from '@/lib/progress';

function CircleProgress({ percentage, size = 100 }: { percentage: number; size?: number }) {
  const strokeWidth = size === 100 ? 8 : 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#1e293b" strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#6366f1" strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  );
}

export default function Home() {
  const { progress } = useProgress();

  const totalProblems = problems.length;
  const completedProblems = problems.filter(p => progress.completedProblems[p.id]).length;
  const overallPercentage = totalProblems === 0 ? 0 : Math.round((completedProblems / totalProblems) * 100);

  // Find the first topic that isn't 100% complete
  const nextTopic = topics.find(t => {
    const { percentage } = getTopicProgress(t.slug, problems, progress);
    return percentage < 100;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
        <div className="relative shrink-0">
          <CircleProgress percentage={overallPercentage} size={120} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-100">{overallPercentage}%</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Complete</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">LeetCode Patterns</h1>
          <p className="text-gray-400 mb-4 max-w-lg">
            Master coding interviews through 18 essential patterns with interactive explanations, step-by-step visualizations, code templates, and 150+ curated problems.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{completedProblems}/{totalProblems} problems completed</span>
            {nextTopic && (
              <Link
                href={`/topic/${nextTopic.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
              >
                Continue Learning
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Topic Categories */}
      <div className="space-y-10">
        {categories.map(category => (
          <section key={category.name}>
            <h2 className="text-lg font-semibold text-gray-100 mb-4">{category.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.slugs.map((slug, idx) => {
                const topic = topics.find(t => t.slug === slug);
                if (!topic) return null;
                const { completed, total, percentage } = getTopicProgress(slug, problems, progress);
                const globalIndex = topics.findIndex(t => t.slug === slug);

                return (
                  <Link
                    key={slug}
                    href={`/topic/${slug}`}
                    className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 transition-all hover:border-indigo-500/40 hover:bg-gray-900/80"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono text-gray-600">
                        {String(globalIndex).padStart(2, '0')}
                      </span>
                      <div className="relative">
                        <CircleProgress percentage={percentage} size={28} />
                        {percentage === 100 && (
                          <svg className="absolute inset-0 m-auto w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-100 mb-1 group-hover:text-indigo-400 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{topic.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-600">{completed}/{total} problems</span>
                      {percentage > 0 && percentage < 100 && (
                        <span className="inline-flex items-center rounded bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-medium text-yellow-500">
                          In Progress
                        </span>
                      )}
                      {percentage === 100 && (
                        <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                          Complete
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
