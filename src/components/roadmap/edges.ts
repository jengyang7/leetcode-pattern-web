import { Edge } from '@xyflow/react';

export const roadmapEdges: Edge[] = [
  // Row 0 → Row 1
  { id: 'e-ah-tp', source: 'arrays-hashing', target: 'two-pointers', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-ah-st', source: 'arrays-hashing', target: 'stack', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Row 1 → Row 2
  { id: 'e-tp-bs', source: 'two-pointers', target: 'binary-search', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-tp-sw', source: 'two-pointers', target: 'sliding-window', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-tp-ll', source: 'two-pointers', target: 'linked-list', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Row 2 → Row 3
  { id: 'e-bs-tr', source: 'binary-search', target: 'trees', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-ll-tr', source: 'linked-list', target: 'trees', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Row 3 → Row 4
  { id: 'e-tr-ti', source: 'trees', target: 'tries', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-tr-bt', source: 'trees', target: 'backtracking', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Row 4 → Row 5
  { id: 'e-ti-hp', source: 'tries', target: 'heap', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-bt-gr', source: 'backtracking', target: 'graphs', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-bt-dp1', source: 'backtracking', target: 'dp-1d', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Row 5 → Row 6
  { id: 'e-hp-iv', source: 'heap', target: 'intervals', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-hp-gy', source: 'heap', target: 'greedy', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-gr-ag', source: 'graphs', target: 'advanced-graphs', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-dp1-dp2', source: 'dp-1d', target: 'dp-2d', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e-dp1-bm', source: 'dp-1d', target: 'bit-manipulation', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Row 6 → Row 7
  { id: 'e-bm-mg', source: 'bit-manipulation', target: 'math-geometry', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 2 } },
];
