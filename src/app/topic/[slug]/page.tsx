'use client';

import { use } from 'react';
import Link from 'next/link';
import { topics, getTopicBySlug } from '@/data/topics';
import { getProblemsByTopic } from '@/data/problems';
import { useProgress } from '@/context/ProgressContext';
import { getTopicProgress } from '@/lib/progress';
import ProblemList from '@/components/topic/ProblemList';
import TopicExplanation from '@/components/topic/TopicExplanation';
import SortingComparison from '@/components/topic/SortingComparison';
import ComparisonTable from '@/components/topic/ComparisonTable';
import ProgressBar from '@/components/ui/ProgressBar';

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const topic = getTopicBySlug(slug);
  const problems = getProblemsByTopic(slug);
  const { progress } = useProgress();
  const { completed, total } = getTopicProgress(slug, problems, progress);

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-400 text-lg">Topic not found</p>
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
          Back to roadmap
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-400 transition-colors mb-6 lg:hidden"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to roadmap
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">{topic.name}</h1>
        <p className="text-gray-400 mb-4">{topic.description}</p>
        <ProgressBar completed={completed} total={total} />
      </div>

      <div className="space-y-8">
        <TopicExplanation topicSlug={slug} />
        {slug === 'sorting' && <SortingComparison />}
        <ComparisonTable topicSlug={slug} />
        <ProblemList problems={problems} />
      </div>
    </main>
  );
}
