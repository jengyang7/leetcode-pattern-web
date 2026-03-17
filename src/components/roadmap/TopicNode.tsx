'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useProgress } from '@/context/ProgressContext';
import { problems } from '@/data/problems';
import { getTopicProgress } from '@/lib/progress';
import { roadmapEdges } from './edges';

const nodesWithSource = new Set(roadmapEdges.map(e => e.source));
const nodesWithTarget = new Set(roadmapEdges.map(e => e.target));

function TopicNodeComponent({ data, id }: NodeProps) {
  const { progress } = useProgress();
  const slug = data.slug as string;
  const label = data.label as string;
  const { completed, total, percentage } = getTopicProgress(slug, problems, progress);

  const hasIncoming = nodesWithTarget.has(id);
  const hasOutgoing = nodesWithSource.has(id);

  return (
    <div
      className="group rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 to-purple-950/80 px-5 py-3 shadow-lg shadow-indigo-500/10 transition-all hover:border-indigo-400/60 hover:shadow-indigo-500/20 hover:scale-105"
      style={{ minWidth: 180 }}
    >
      {hasIncoming && (
        <Handle type="target" position={Position.Top} className="!opacity-0 !w-1 !h-1 !pointer-events-none" />
      )}
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
      {hasOutgoing && (
        <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-1 !h-1 !pointer-events-none" />
      )}
    </div>
  );
}

export const TopicNode = memo(TopicNodeComponent);
