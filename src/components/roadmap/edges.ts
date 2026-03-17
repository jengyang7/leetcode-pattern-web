import { Edge, MarkerType } from '@xyflow/react';

const edgeDefaults = {
  type: 'smoothstep' as const,
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 16, height: 16 },
};

export const roadmapEdges: Edge[] = [
  // Row 0 → Row 1
  { id: 'e-ah-tp', source: 'arrays-hashing', target: 'two-pointers', ...edgeDefaults },
  { id: 'e-ah-st', source: 'arrays-hashing', target: 'stack', ...edgeDefaults },

  // Row 1 → Row 2
  { id: 'e-tp-bs', source: 'two-pointers', target: 'binary-search', ...edgeDefaults },
  { id: 'e-tp-sw', source: 'two-pointers', target: 'sliding-window', ...edgeDefaults },
  { id: 'e-tp-ll', source: 'two-pointers', target: 'linked-list', ...edgeDefaults },

  // Row 2 → Row 3
  { id: 'e-bs-tr', source: 'binary-search', target: 'trees', ...edgeDefaults },
  { id: 'e-ll-tr', source: 'linked-list', target: 'trees', ...edgeDefaults },

  // Row 3 → Row 4
  { id: 'e-tr-ti', source: 'trees', target: 'tries', ...edgeDefaults },
  { id: 'e-tr-bt', source: 'trees', target: 'backtracking', ...edgeDefaults },

  // Row 4 → Row 5
  { id: 'e-ti-hp', source: 'tries', target: 'heap', ...edgeDefaults },
  { id: 'e-bt-gr', source: 'backtracking', target: 'graphs', ...edgeDefaults },
  { id: 'e-bt-dp1', source: 'backtracking', target: 'dp-1d', ...edgeDefaults },

  // Row 5 → Row 6
  { id: 'e-hp-iv', source: 'heap', target: 'intervals', ...edgeDefaults },
  { id: 'e-hp-gy', source: 'heap', target: 'greedy', ...edgeDefaults },
  { id: 'e-gr-ag', source: 'graphs', target: 'advanced-graphs', ...edgeDefaults },
  { id: 'e-dp1-dp2', source: 'dp-1d', target: 'dp-2d', ...edgeDefaults },
  { id: 'e-dp1-bm', source: 'dp-1d', target: 'bit-manipulation', ...edgeDefaults },

  // Row 6 → Row 7
  { id: 'e-bm-mg', source: 'bit-manipulation', target: 'math-geometry', ...edgeDefaults },
];
