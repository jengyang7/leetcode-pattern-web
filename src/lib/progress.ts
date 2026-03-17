import { Problem, ProgressState } from '@/types';

export function getTopicProgress(
  topicSlug: string,
  problems: Problem[],
  progress: ProgressState
): { completed: number; total: number; percentage: number } {
  const topicProblems = problems.filter(p => p.topicSlug === topicSlug);
  const completed = topicProblems.filter(p => progress.completedProblems[p.id]).length;
  const total = topicProblems.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percentage };
}
