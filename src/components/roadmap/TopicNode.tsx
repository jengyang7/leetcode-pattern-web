'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { problems } from '@/data/problems';
import { getTopicProgress } from '@/lib/progress';

function TopicNodeComponent({ data }: NodeProps) {
  const router = useRouter();
  const { progress } = useProgress();
  const slug = data.slug as string;
  const label = data.label as string;
  const { completed, total, percentage } = getTopicProgress(slug, problems, progress);

  return (
    <div
      className="group cursor-pointer rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 to-purple-950/80 px-5 py-3 shadow-lg shadow-indigo-500/10 transition-all hover:border-indigo-400/60 hover:shadow-indigo-500/20 hover:scale-105"
      onClick={() => router.push(`/topic/${slug}`)}
      style={{ minWidth: 180 }}
    >
      <Handle type="target" position={Position.Top} className="!bg-indigo-500 !border-none !w-2 !h-2 !pointer-events-none" />
      <div className="text-sm font-semibold text-gray-100 text-center whitespace-nowrap">{label}</div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-gray-700/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-400 tabular-nums">{completed}/{total}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-indigo-500 !border-none !w-2 !h-2 !pointer-events-none" />
    </div>
  );
}

export const TopicNode = memo(TopicNodeComponent);
