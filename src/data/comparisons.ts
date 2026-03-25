export interface ComparisonEntry {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  bestFor: string;
  limitations: string;
}

export interface ComparisonTable {
  title: string;
  entries: ComparisonEntry[];
}

export const comparisons: Record<string, ComparisonTable> = {
  graphs: {
    title: 'Graph Traversal Comparison',
    entries: [
      {
        name: 'BFS',
        timeComplexity: 'O(V+E)',
        spaceComplexity: 'O(V)',
        bestFor: 'Shortest path (unweighted), level-order',
        limitations: 'Uses more memory (queue)',
      },
      {
        name: 'DFS',
        timeComplexity: 'O(V+E)',
        spaceComplexity: 'O(V)',
        bestFor: 'Connected components, cycle detection, paths',
        limitations: 'Can stackoverflow on deep graphs',
      },
      {
        name: "Topological Sort (Kahn's)",
        timeComplexity: 'O(V+E)',
        spaceComplexity: 'O(V+E)',
        bestFor: 'Task ordering, dependency resolution',
        limitations: 'Only works on DAGs',
      },
      {
        name: 'Topological Sort (DFS)',
        timeComplexity: 'O(V+E)',
        spaceComplexity: 'O(V+E)',
        bestFor: 'Task ordering with cycle detection',
        limitations: 'Only works on DAGs',
      },
    ],
  },
  'advanced-graphs': {
    title: 'Shortest Path & MST Comparison',
    entries: [
      {
        name: 'Dijkstra',
        timeComplexity: 'O((V+E) log V)',
        spaceComplexity: 'O(V+E)',
        bestFor: 'Shortest path, non-negative weights',
        limitations: 'Fails with negative edges',
      },
      {
        name: 'Bellman-Ford',
        timeComplexity: 'O(V\u00D7E)',
        spaceComplexity: 'O(V)',
        bestFor: 'Negative weights, limited hops',
        limitations: 'Slower than Dijkstra',
      },
      {
        name: 'Floyd-Warshall',
        timeComplexity: 'O(V\u00B3)',
        spaceComplexity: 'O(V\u00B2)',
        bestFor: 'All-pairs shortest path',
        limitations: 'Too slow for large graphs',
      },
      {
        name: "Kruskal's",
        timeComplexity: 'O(E log E)',
        spaceComplexity: 'O(V+E)',
        bestFor: 'Sparse graph MST',
        limitations: 'Needs Union-Find',
      },
      {
        name: "Prim's",
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(V+E)',
        bestFor: 'Dense graph MST',
        limitations: 'Needs priority queue',
      },
    ],
  },
  trees: {
    title: 'Tree Traversal Comparison',
    entries: [
      {
        name: 'Preorder (DFS)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        bestFor: 'Serialize tree, copy tree',
        limitations: 'Not sorted for BST',
      },
      {
        name: 'Inorder (DFS)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        bestFor: 'BST sorted order, validation',
        limitations: 'Only meaningful for BST',
      },
      {
        name: 'Postorder (DFS)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        bestFor: 'Delete tree, evaluate expression tree',
        limitations: 'Process children before parent',
      },
      {
        name: 'Level-order (BFS)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(w)',
        bestFor: 'Level grouping, zigzag, right side view',
        limitations: 'Uses more memory for wide trees',
      },
    ],
  },
  heap: {
    title: 'Selection Strategy Comparison',
    entries: [
      {
        name: 'Sort + index',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)\u2013O(n)',
        bestFor: 'Simple kth element',
        limitations: 'Sorts entire array',
      },
      {
        name: 'Min-heap of size K',
        timeComplexity: 'O(n log k)',
        spaceComplexity: 'O(k)',
        bestFor: 'Top-K largest, streaming data',
        limitations: 'Only gives K elements',
      },
      {
        name: 'Max-heap (full)',
        timeComplexity: 'O(n + k log n)',
        spaceComplexity: 'O(n)',
        bestFor: 'Multiple extractions needed',
        limitations: 'Builds full heap',
      },
      {
        name: 'Quickselect',
        timeComplexity: 'O(n) avg',
        spaceComplexity: 'O(1)',
        bestFor: 'Single kth element query',
        limitations: 'O(n\u00B2) worst case',
      },
    ],
  },
  'dp-2d': {
    title: 'DP Approach Comparison',
    entries: [
      {
        name: 'Top-down (memoization)',
        timeComplexity: 'O(states)',
        spaceComplexity: 'O(states)',
        bestFor: 'Intuitive recursion, sparse state space',
        limitations: 'Stack overflow risk, function call overhead',
      },
      {
        name: 'Bottom-up (tabulation)',
        timeComplexity: 'O(states)',
        spaceComplexity: 'O(states)',
        bestFor: 'No recursion overhead, easy to optimize space',
        limitations: 'Must figure out fill order',
      },
      {
        name: 'Space-optimized',
        timeComplexity: 'O(states)',
        spaceComplexity: 'O(1) or O(n)',
        bestFor: 'Memory-constrained problems',
        limitations: "Can't reconstruct solution path",
      },
    ],
  },
};
