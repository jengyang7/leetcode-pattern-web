import { Node } from '@xyflow/react';

const ROW_GAP = 120;
const COL_WIDTH = 220;
const NODE_WIDTH = 200;
const NODE_HEIGHT = 60;

function pos(row: number, col: number, totalInRow: number): { x: number; y: number } {
  const offsetX = ((totalInRow - 1) * COL_WIDTH) / -2 + col * COL_WIDTH - NODE_WIDTH / 2;
  return { x: offsetX + 500, y: row * ROW_GAP + 40 };
}

export const roadmapNodes: Node[] = [
  // Row 0
  { id: 'arrays-hashing', position: pos(0, 0, 1), data: { label: 'Arrays & Hashing', slug: 'arrays-hashing' }, type: 'topicNode' },

  // Row 1
  { id: 'two-pointers', position: pos(1, 0, 2), data: { label: 'Two Pointers', slug: 'two-pointers' }, type: 'topicNode' },
  { id: 'stack', position: pos(1, 1, 2), data: { label: 'Stack', slug: 'stack' }, type: 'topicNode' },

  // Row 2
  { id: 'binary-search', position: pos(2, 0, 3), data: { label: 'Binary Search', slug: 'binary-search' }, type: 'topicNode' },
  { id: 'sliding-window', position: pos(2, 1, 3), data: { label: 'Sliding Window', slug: 'sliding-window' }, type: 'topicNode' },
  { id: 'linked-list', position: pos(2, 2, 3), data: { label: 'Linked List', slug: 'linked-list' }, type: 'topicNode' },

  // Row 3
  { id: 'trees', position: pos(3, 0, 1), data: { label: 'Trees', slug: 'trees' }, type: 'topicNode' },

  // Row 4
  { id: 'tries', position: pos(4, 0, 2), data: { label: 'Tries', slug: 'tries' }, type: 'topicNode' },
  { id: 'backtracking', position: pos(4, 1, 2), data: { label: 'Backtracking', slug: 'backtracking' }, type: 'topicNode' },

  // Row 5
  { id: 'heap', position: pos(5, 0, 3), data: { label: 'Heap / Priority Queue', slug: 'heap' }, type: 'topicNode' },
  { id: 'graphs', position: pos(5, 1, 3), data: { label: 'Graphs', slug: 'graphs' }, type: 'topicNode' },
  { id: 'dp-1d', position: pos(5, 2, 3), data: { label: '1-D DP', slug: 'dp-1d' }, type: 'topicNode' },

  // Row 6
  { id: 'intervals', position: pos(6, 0, 5), data: { label: 'Intervals', slug: 'intervals' }, type: 'topicNode' },
  { id: 'greedy', position: pos(6, 1, 5), data: { label: 'Greedy', slug: 'greedy' }, type: 'topicNode' },
  { id: 'advanced-graphs', position: pos(6, 2, 5), data: { label: 'Advanced Graphs', slug: 'advanced-graphs' }, type: 'topicNode' },
  { id: 'dp-2d', position: pos(6, 3, 5), data: { label: '2-D DP', slug: 'dp-2d' }, type: 'topicNode' },
  { id: 'bit-manipulation', position: pos(6, 4, 5), data: { label: 'Bit Manipulation', slug: 'bit-manipulation' }, type: 'topicNode' },

  // Row 7
  { id: 'math-geometry', position: pos(7, 0, 1), data: { label: 'Math & Geometry', slug: 'math-geometry' }, type: 'topicNode' },
];
