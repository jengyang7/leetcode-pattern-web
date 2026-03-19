export interface SortingAlgorithm {
  name: string;
  slug: string;
  description: string;
  bestTime: string;
  avgTime: string;
  worstTime: string;
  space: string;
  stable: boolean;
  inPlace: boolean;
  pros: string[];
  cons: string[];
  bestFor: string;
  code: string;
  visualization: {
    input: string;
    steps: { label: string; state: string; highlight?: string }[];
  };
}

export const sortingAlgorithms: SortingAlgorithm[] = [
  {
    name: 'Bubble Sort',
    slug: 'bubble',
    description: 'Repeatedly swaps adjacent elements if they are in the wrong order. Each pass "bubbles" the largest unsorted element to its correct position.',
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: true,
    inPlace: true,
    pros: [
      'Very simple to implement and understand',
      'Stable sort — preserves relative order of equal elements',
      'O(1) extra space',
      'Can detect already-sorted input in O(n) with early termination',
    ],
    cons: [
      'Very slow for large datasets — O(n²) average and worst case',
      'Lots of unnecessary swaps even when array is partially sorted',
      'Almost never used in production',
    ],
    bestFor: 'Educational purposes, tiny arrays (<20 elements), or when simplicity matters more than performance.',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Early termination
            break
    return arr`,
    visualization: {
      input: '[5, 3, 8, 1, 2]',
      steps: [
        { label: 'Start', state: '[5, 3, 8, 1, 2]', highlight: 'Compare adjacent pairs, swap if out of order' },
        { label: 'Pass 1: Compare 5,3', state: '[3, 5, 8, 1, 2]', highlight: 'Swapped 5 and 3' },
        { label: 'Pass 1: Compare 5,8', state: '[3, 5, 8, 1, 2]', highlight: 'No swap needed' },
        { label: 'Pass 1: Compare 8,1', state: '[3, 5, 1, 8, 2]', highlight: 'Swapped 8 and 1' },
        { label: 'Pass 1: Compare 8,2', state: '[3, 5, 1, 2, 8]', highlight: 'Swapped 8 and 2 → 8 is in final position' },
        { label: 'Pass 2: Compare 3,5', state: '[3, 5, 1, 2, 8]', highlight: 'No swap needed' },
        { label: 'Pass 2: Compare 5,1', state: '[3, 1, 5, 2, 8]', highlight: 'Swapped 5 and 1' },
        { label: 'Pass 2: Compare 5,2', state: '[3, 1, 2, 5, 8]', highlight: 'Swapped 5 and 2 → 5 is in final position' },
        { label: 'Pass 3 complete', state: '[1, 2, 3, 5, 8]', highlight: 'Sorted!' },
      ],
    },
  },
  {
    name: 'Selection Sort',
    slug: 'selection',
    description: 'Finds the minimum element from the unsorted portion and places it at the beginning. Divides array into sorted (left) and unsorted (right) parts.',
    bestTime: 'O(n²)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: false,
    inPlace: true,
    pros: [
      'Simple to implement',
      'O(1) extra space — truly in-place',
      'Minimizes number of swaps (exactly n-1 swaps)',
      'Good when writing to memory is expensive (e.g., flash memory)',
    ],
    cons: [
      'Always O(n²) — no early termination possible',
      'Not stable — can change relative order of equal elements',
      'Poor performance on large datasets',
      'Does not adapt to partially sorted input',
    ],
    bestFor: 'When memory writes are expensive, small arrays, or when you need minimum number of swaps.',
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    visualization: {
      input: '[5, 3, 8, 1, 2]',
      steps: [
        { label: 'Start', state: '[5, 3, 8, 1, 2]', highlight: 'Find minimum in entire array' },
        { label: 'i=0: Min is 1 at index 3', state: '[1, 3, 8, 5, 2]', highlight: 'Swap arr[0]=5 with arr[3]=1' },
        { label: 'i=1: Min is 2 at index 4', state: '[1, 2, 8, 5, 3]', highlight: 'Swap arr[1]=3 with arr[4]=2' },
        { label: 'i=2: Min is 3 at index 4', state: '[1, 2, 3, 5, 8]', highlight: 'Swap arr[2]=8 with arr[4]=3' },
        { label: 'i=3: Min is 5 at index 3', state: '[1, 2, 3, 5, 8]', highlight: 'No swap needed → Sorted!' },
      ],
    },
  },
  {
    name: 'Insertion Sort',
    slug: 'insertion',
    description: 'Builds the sorted array one element at a time by inserting each element into its correct position among the previously sorted elements.',
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: true,
    inPlace: true,
    pros: [
      'Very efficient for small arrays (often faster than O(n log n) sorts for n < 20)',
      'Excellent for nearly-sorted data — O(n) best case',
      'Stable sort',
      'Online algorithm — can sort data as it arrives',
      'Used internally by Python\'s Timsort for small runs',
    ],
    cons: [
      'O(n²) on reverse-sorted or random data',
      'Many shifts needed for each insertion on large arrays',
      'Not suitable for large random datasets',
    ],
    bestFor: 'Small arrays, nearly-sorted data, online sorting, or as a subroutine in hybrid sorts (Timsort, Introsort).',
    code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # Shift right
            j -= 1
        arr[j + 1] = key  # Insert
    return arr`,
    visualization: {
      input: '[5, 3, 8, 1, 2]',
      steps: [
        { label: 'Start', state: 'Sorted: [5] | Unsorted: [3, 8, 1, 2]', highlight: 'First element is trivially sorted' },
        { label: 'Insert 3', state: 'Sorted: [3, 5] | Unsorted: [8, 1, 2]', highlight: '3 < 5, shift 5 right, insert 3 at pos 0' },
        { label: 'Insert 8', state: 'Sorted: [3, 5, 8] | Unsorted: [1, 2]', highlight: '8 > 5, no shift needed, stays in place' },
        { label: 'Insert 1', state: 'Sorted: [1, 3, 5, 8] | Unsorted: [2]', highlight: '1 < all, shift everything right, insert at pos 0' },
        { label: 'Insert 2', state: 'Sorted: [1, 2, 3, 5, 8] | Unsorted: []', highlight: '2 > 1, shift 3,5,8 right, insert at pos 1 → Sorted!' },
      ],
    },
  },
  {
    name: 'Merge Sort',
    slug: 'merge',
    description: 'Divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges the sorted halves back together.',
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    inPlace: false,
    pros: [
      'Guaranteed O(n log n) — no worst-case degradation',
      'Stable sort',
      'Excellent for linked lists (O(1) extra space for linked lists)',
      'Naturally parallelizable — split work across threads',
      'Predictable performance — good for real-time systems',
    ],
    cons: [
      'O(n) extra space for arrays — not in-place',
      'Slower than quicksort in practice due to memory allocation overhead',
      'Not adaptive — doesn\'t benefit from partially sorted input (without optimization)',
      'Higher constant factor than insertion sort for small arrays',
    ],
    bestFor: 'When stability is required, linked lists, external sorting (sorting data too large for memory), guaranteed O(n log n) needed.',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= for stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    visualization: {
      input: '[5, 3, 8, 1, 2]',
      steps: [
        { label: 'Split', state: '[5, 3, 8, 1, 2]\n → [5, 3, 8]  [1, 2]', highlight: 'Divide array into two halves' },
        { label: 'Split further', state: '[5, 3, 8] → [5, 3] [8]\n[1, 2] → [1] [2]', highlight: 'Keep splitting until single elements' },
        { label: 'Split to base', state: '[5, 3] → [5] [3]\n[8] is base case', highlight: 'Single elements are trivially sorted' },
        { label: 'Merge [5] [3]', state: 'Compare 5 vs 3 → [3, 5]', highlight: '3 < 5, so 3 goes first' },
        { label: 'Merge [3,5] [8]', state: 'Compare 3 vs 8, then 5 vs 8 → [3, 5, 8]', highlight: 'Left half sorted' },
        { label: 'Merge [1] [2]', state: 'Compare 1 vs 2 → [1, 2]', highlight: 'Right half sorted' },
        { label: 'Final merge', state: '[3,5,8] + [1,2]\n→ 1, 2, 3, 5, 8', highlight: 'Merge two sorted halves → [1, 2, 3, 5, 8]' },
      ],
    },
  },
  {
    name: 'Quick Sort',
    slug: 'quick',
    description: 'Divide-and-conquer algorithm that picks a pivot element, partitions the array around it (smaller elements left, larger right), then recursively sorts the partitions.',
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n²)',
    space: 'O(log n)',
    stable: false,
    inPlace: true,
    pros: [
      'Fastest in practice for most inputs — excellent cache performance',
      'In-place sorting with O(log n) stack space',
      'Average O(n log n) with small constant factor',
      'Easy to parallelize',
      'Used as basis for many standard library sorts',
    ],
    cons: [
      'O(n²) worst case with poor pivot choice (already sorted + first element pivot)',
      'Not stable — changes relative order of equal elements',
      'Recursive — can cause stack overflow on very large arrays',
      'Performance depends heavily on pivot selection strategy',
    ],
    bestFor: 'General-purpose sorting, in-memory sorting, when average performance matters more than worst-case guarantees.',
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]  # Middle element as pivot
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# In-place version (Lomuto partition)
def quick_sort_inplace(arr, lo=0, hi=None):
    if hi is None:
        hi = len(arr) - 1
    if lo < hi:
        pivot_idx = partition(arr, lo, hi)
        quick_sort_inplace(arr, lo, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo
    for j in range(lo, hi):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[hi] = arr[hi], arr[i]
    return i`,
    visualization: {
      input: '[5, 3, 8, 1, 2]',
      steps: [
        { label: 'Choose pivot', state: '[5, 3, 8, 1, 2]  pivot = 8', highlight: 'Pick middle element (index 2) as pivot' },
        { label: 'Partition', state: 'left: [5, 3, 1, 2]  pivot: [8]  right: []', highlight: 'Elements < 8 go left, > 8 go right' },
        { label: 'Recurse left, pivot = 1', state: '[5, 3, 1, 2] → left: []  pivot: [1]  right: [5, 3, 2]', highlight: 'Partition [5,3,1,2] around 1' },
        { label: 'Recurse right, pivot = 3', state: '[5, 3, 2] → left: [2]  pivot: [3]  right: [5]', highlight: 'Partition [5,3,2] around 3' },
        { label: 'Combine inner', state: '[2] + [3] + [5] = [2, 3, 5]', highlight: 'Merge partitions back' },
        { label: 'Combine all', state: '[] + [1] + [2, 3, 5] + [8] + [] = [1, 2, 3, 5, 8]', highlight: 'Final sorted array!' },
      ],
    },
  },
  {
    name: 'Heap Sort',
    slug: 'heap-sort',
    description: 'Uses a binary max-heap to repeatedly extract the maximum element. First builds a heap from the array, then repeatedly swaps root with last element and heapifies.',
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n log n)',
    space: 'O(1)',
    stable: false,
    inPlace: true,
    pros: [
      'Guaranteed O(n log n) — no worst-case degradation',
      'In-place with O(1) extra space',
      'Good for finding top-K elements efficiently',
      'No recursion needed (iterative heapify)',
    ],
    cons: [
      'Poor cache performance — accesses memory in non-sequential pattern',
      'Not stable',
      'Slower in practice than quicksort due to cache misses',
      'More complex to implement than simpler sorts',
    ],
    bestFor: 'When guaranteed O(n log n) is needed with O(1) space, partial sorting (top-K), or priority queue operations.',
    code: `def heap_sort(arr):
    n = len(arr)

    # Build max heap (bottom-up)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move max to end
        heapify(arr, i, 0)  # Restore heap property
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    visualization: {
      input: '[5, 3, 8, 1, 2]',
      steps: [
        { label: 'Build max-heap', state: 'Array: [5, 3, 8, 1, 2]\nHeapify from bottom-up', highlight: 'Start at last non-leaf node (index 1)' },
        { label: 'Heapify index 1', state: '[5, 3, 8, 1, 2] → no change\n3 > 1 and 3 > 2', highlight: 'Children of index 1 are smaller' },
        { label: 'Heapify index 0', state: '[5, 3, 8, 1, 2] → [8, 3, 5, 1, 2]', highlight: '8 > 5, swap root with right child' },
        { label: 'Extract max: 8', state: 'Swap 8↔2: [2, 3, 5, 1, | 8]\nHeapify → [5, 3, 2, 1, | 8]', highlight: '8 is now in final position' },
        { label: 'Extract max: 5', state: 'Swap 5↔1: [1, 3, 2, | 5, 8]\nHeapify → [3, 1, 2, | 5, 8]', highlight: '5 is now in final position' },
        { label: 'Extract max: 3', state: 'Swap 3↔2: [2, 1, | 3, 5, 8]\nHeapify → [2, 1, | 3, 5, 8]', highlight: '3 is now in final position' },
        { label: 'Extract max: 2', state: 'Swap 2↔1: [1, 2, 3, 5, 8]', highlight: 'Sorted!' },
      ],
    },
  },
  {
    name: 'Counting Sort',
    slug: 'counting',
    description: 'Non-comparison sort that counts occurrences of each value, then calculates positions. Works when the range of input values (k) is not significantly larger than n.',
    bestTime: 'O(n + k)',
    avgTime: 'O(n + k)',
    worstTime: 'O(n + k)',
    space: 'O(n + k)',
    stable: true,
    inPlace: false,
    pros: [
      'O(n + k) — faster than comparison sorts when k is small',
      'Stable sort',
      'Linear time when range is O(n)',
      'Simple concept — just count and place',
    ],
    cons: [
      'Only works for integers or values that can be mapped to integers',
      'O(n + k) space — impractical when range k is very large',
      'Not a comparison sort — limited to specific data types',
      'Wastes space when data is sparse across a large range',
    ],
    bestFor: 'Sorting integers with a known, small range (e.g., ages, grades, ASCII characters). Used as subroutine in Radix Sort.',
    code: `def counting_sort(arr):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    range_size = max_val - min_val + 1

    count = [0] * range_size
    output = [0] * len(arr)

    # Count occurrences
    for num in arr:
        count[num - min_val] += 1

    # Cumulative count (for stability)
    for i in range(1, range_size):
        count[i] += count[i - 1]

    # Build output (traverse backwards for stability)
    for num in reversed(arr):
        output[count[num - min_val] - 1] = num
        count[num - min_val] -= 1

    return output`,
    visualization: {
      input: '[4, 2, 2, 8, 3, 3, 1]',
      steps: [
        { label: 'Count occurrences', state: 'Value: 1  2  3  4  5  6  7  8\nCount: 1  2  2  1  0  0  0  1', highlight: 'Count how many times each value appears' },
        { label: 'Cumulative count', state: 'Value: 1  2  3  4  5  6  7  8\nCumul: 1  3  5  6  6  6  6  7', highlight: 'Each position = sum of all counts before it + itself' },
        { label: 'Place elements (right to left)', state: 'Process 1: output[0] = 1\nProcess 3: output[4] = 3\nProcess 3: output[3] = 3', highlight: 'Use cumulative count as index, decrement after placing' },
        { label: 'Continue placing', state: 'Process 8: output[6] = 8\nProcess 2: output[2] = 2\nProcess 2: output[1] = 2\nProcess 4: output[5] = 4', highlight: 'Going right-to-left maintains stability' },
        { label: 'Result', state: '[1, 2, 2, 3, 3, 4, 8]', highlight: 'Sorted in O(n + k) time!' },
      ],
    },
  },
  {
    name: 'Radix Sort',
    slug: 'radix',
    description: 'Sorts numbers digit by digit, from least significant to most significant (LSD) or vice versa (MSD). Uses a stable sort (usually counting sort) as a subroutine for each digit.',
    bestTime: 'O(d × (n + k))',
    avgTime: 'O(d × (n + k))',
    worstTime: 'O(d × (n + k))',
    space: 'O(n + k)',
    stable: true,
    inPlace: false,
    pros: [
      'Linear time O(d × n) when d and k are constants',
      'Stable sort',
      'Faster than comparison sorts for large n with small number of digits',
      'Can sort strings of fixed length efficiently',
    ],
    cons: [
      'Only works for integers or fixed-length strings',
      'O(n + k) extra space',
      'Slower when numbers have many digits (large d)',
      'Not effective when range of values is huge relative to n',
    ],
    bestFor: 'Large arrays of integers or fixed-length strings where d (digits) is small. Phone numbers, zip codes, fixed-width IDs.',
    code: `def radix_sort(arr):
    if not arr:
        return arr

    max_val = max(arr)
    exp = 1  # Current digit place

    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # Digits 0-9

    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for num in reversed(arr):
        digit = (num // exp) % 10
        output[count[digit] - 1] = num
        count[digit] -= 1

    arr[:] = output`,
    visualization: {
      input: '[170, 45, 75, 90, 802, 24, 2, 66]',
      steps: [
        { label: 'Sort by ones digit', state: '170→0  90→0  802→2  2→2  24→4  45→5  75→5  66→6', highlight: '[170, 90, 802, 2, 24, 45, 75, 66]' },
        { label: 'Sort by tens digit', state: '802→0  2→0  24→2  45→4  66→6  170→7  75→7  90→9', highlight: '[802, 2, 24, 45, 66, 170, 75, 90]' },
        { label: 'Sort by hundreds digit', state: '2→0  24→0  45→0  66→0  75→0  90→0  170→1  802→8', highlight: '[2, 24, 45, 66, 75, 90, 170, 802]' },
        { label: 'Result', state: '[2, 24, 45, 66, 75, 90, 170, 802]', highlight: 'Sorted! 3 passes (d=3 for max value 802)' },
      ],
    },
  },
];
