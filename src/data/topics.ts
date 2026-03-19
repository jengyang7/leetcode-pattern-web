import { Topic } from '@/types';

export const topics: Topic[] = [
  { id: 'sorting', slug: 'sorting', name: 'Sorting Algorithms', description: 'Comparison and non-comparison sorts — bubble, selection, insertion, merge, quick, heap, counting, and radix sort with tradeoffs.' },
  { id: 'arrays-hashing', slug: 'arrays-hashing', name: 'Arrays & Hashing', description: 'Fundamental data structures for counting, grouping, and fast lookups.' },
  { id: 'two-pointers', slug: 'two-pointers', name: 'Two Pointers', description: 'Scanning from both ends or with a fast/slow pointer to reduce nested loops.' },
  { id: 'stack', slug: 'stack', name: 'Stack', description: 'LIFO structure for matching, parsing, and monotonic-stack patterns.' },
  { id: 'binary-search', slug: 'binary-search', name: 'Binary Search', description: 'Divide and conquer on sorted data or monotonic search spaces.' },
  { id: 'sliding-window', slug: 'sliding-window', name: 'Sliding Window', description: 'Variable or fixed-size window over contiguous subarrays/substrings.' },
  { id: 'linked-list', slug: 'linked-list', name: 'Linked List', description: 'Pointer manipulation, reversal, cycle detection, and merging.' },
  { id: 'trees', slug: 'trees', name: 'Trees', description: 'Recursive and iterative traversals, BST properties, and tree construction.' },
  { id: 'tries', slug: 'tries', name: 'Tries', description: 'Prefix trees for efficient string search and autocomplete.' },
  { id: 'backtracking', slug: 'backtracking', name: 'Backtracking', description: 'Exhaustive search with pruning for combinations, permutations, and constraint satisfaction.' },
  { id: 'heap', slug: 'heap', name: 'Heap / Priority Queue', description: 'Efficient access to min/max elements for top-K, merge-K, and scheduling.' },
  { id: 'graphs', slug: 'graphs', name: 'Graphs', description: 'BFS, DFS, connected components, and topological sort.' },
  { id: 'dp-1d', slug: 'dp-1d', name: '1-D Dynamic Programming', description: 'Optimal substructure on sequences — climbing stairs, house robber, coin change.' },
  { id: 'intervals', slug: 'intervals', name: 'Intervals', description: 'Sorting and sweeping through overlapping or merging intervals.' },
  { id: 'greedy', slug: 'greedy', name: 'Greedy', description: 'Locally optimal choices that lead to globally optimal solutions.' },
  { id: 'advanced-graphs', slug: 'advanced-graphs', name: 'Advanced Graphs', description: 'Dijkstra, Bellman-Ford, Kruskal/Prim, and union-find.' },
  { id: 'dp-2d', slug: 'dp-2d', name: '2-D Dynamic Programming', description: 'Grid and two-sequence DP — LCS, edit distance, unique paths.' },
  { id: 'bit-manipulation', slug: 'bit-manipulation', name: 'Bit Manipulation', description: 'Bitwise operations for counting, toggling, and XOR tricks.' },
  { id: 'math-geometry', slug: 'math-geometry', name: 'Math & Geometry', description: 'Number theory, matrix operations, and geometric computations.' },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find(t => t.slug === slug);
}
