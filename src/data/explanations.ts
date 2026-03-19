export interface TopicExplanation {
  summary: string;
  approach: string;
  keyInsight: string;
  timeComplexity: { operation: string; complexity: string; note: string }[];
  whenToUse: string[];
  commonMistakes: string[];
  visualization: {
    type: 'steps' | 'comparison' | 'tree' | 'grid';
    title: string;
    input: string;
    steps: { label: string; state: string; highlight?: string }[];
  };
  codeTemplate: string;
  usefulSnippets: { name: string; code: string; note: string }[];
}

export const explanations: Record<string, TopicExplanation> = {
  'sorting': {
    summary: 'Sorting is the foundation of many algorithms. Understanding different sorting algorithms — their time/space complexity, stability, and tradeoffs — is essential for choosing the right tool for each problem.',
    approach: 'For most problems, Python\'s built-in sorted() (Timsort, O(n log n)) is the right choice. But understanding how sorts work helps you solve problems like Sort Colors (Dutch flag), find Kth element (quickselect), or handle custom ordering.',
    keyInsight: 'No single sorting algorithm is best for all cases. Quick Sort is fastest on average, Merge Sort guarantees O(n log n) with stability, Insertion Sort wins on small/nearly-sorted data, and Counting/Radix Sort beat O(n log n) for integers with bounded range.',
    timeComplexity: [
      { operation: 'Bubble Sort', complexity: 'O(n²)', note: 'Simple but slow; O(n) best case if already sorted' },
      { operation: 'Selection Sort', complexity: 'O(n²)', note: 'Always O(n²); minimizes swaps' },
      { operation: 'Insertion Sort', complexity: 'O(n²)', note: 'O(n) best case; great for small/nearly-sorted arrays' },
      { operation: 'Merge Sort', complexity: 'O(n log n)', note: 'Guaranteed; stable; O(n) extra space' },
      { operation: 'Quick Sort', complexity: 'O(n log n) avg', note: 'O(n²) worst case; fastest in practice' },
      { operation: 'Heap Sort', complexity: 'O(n log n)', note: 'Guaranteed; in-place O(1); poor cache locality' },
      { operation: 'Counting Sort', complexity: 'O(n + k)', note: 'Linear when range k is O(n)' },
      { operation: 'Radix Sort', complexity: 'O(d × n)', note: 'Linear when d (digits) is constant' },
      { operation: 'Python sorted()', complexity: 'O(n log n)', note: 'Timsort — hybrid merge+insertion, stable' },
    ],
    whenToUse: [
      'Need to organize data before applying other algorithms (binary search, two pointers)',
      'Finding the Kth smallest/largest element — use quickselect O(n) avg',
      'Custom ordering problems — use sorted() with key= parameter',
      'Need stability (preserve relative order) — use merge sort or Timsort',
      'Integer arrays with small range — counting sort for O(n) time',
      'Linked list sorting — merge sort is ideal (O(1) space for linked lists)',
    ],
    commonMistakes: [
      'Using O(n²) sorts on large data when O(n log n) alternatives exist',
      'Forgetting that quicksort degrades to O(n²) on already-sorted data with naive pivot',
      'Not considering stability — some problems require preserving relative order',
      'Implementing sort from scratch when sorted() with key= would suffice',
      'Confusing in-place vs stable — heap sort is in-place but not stable',
    ],
    visualization: {
      type: 'comparison',
      title: 'Quick Sort partitioning: partition array around pivot',
      input: 'arr = [5, 3, 8, 1, 2], pivot = arr[2] = 8',
      steps: [
        { label: 'Choose pivot', state: '[5, 3, 8, 1, 2]  pivot = 8 (middle element)', highlight: 'Elements < pivot go left, > pivot go right' },
        { label: 'Partition', state: 'left = [5, 3, 1, 2]  pivot = [8]  right = []', highlight: 'All elements < 8, so right is empty' },
        { label: 'Recurse left: pivot = 1', state: '[5, 3, 1, 2] → left=[] pivot=[1] right=[5,3,2]', highlight: 'Partition around 1' },
        { label: 'Recurse: pivot = 3', state: '[5, 3, 2] → left=[2] pivot=[3] right=[5]', highlight: 'Partition around 3' },
        { label: 'Combine', state: '[] + [1] + [2] + [3] + [5] + [8] + []', highlight: 'Result: [1, 2, 3, 5, 8]' },
      ],
    },
    codeTemplate: `# Python's built-in sort (Timsort) — use this in most cases
arr.sort()                          # In-place, stable
sorted_arr = sorted(arr)            # Returns new list, stable
sorted(arr, key=lambda x: x[1])    # Custom sort key
sorted(arr, reverse=True)           # Descending order

# Quick Select — find Kth smallest in O(n) average
import random
def quick_select(arr, k):
    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    if k <= len(left):
        return quick_select(left, k)
    elif k <= len(left) + len(mid):
        return pivot
    else:
        return quick_select(right, k - len(left) - len(mid))

# Dutch National Flag (3-way partition) — Sort Colors
def sort_colors(nums):
    lo, mid, hi = 0, 0, len(nums) - 1
    while mid <= hi:
        if nums[mid] == 0:
            nums[lo], nums[mid] = nums[mid], nums[lo]
            lo += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[hi] = nums[hi], nums[mid]
            hi -= 1`,
    usefulSnippets: [
      { name: 'Sort with key', code: "sorted(arr, key=lambda x: (-x[0], x[1]))\n# Sort by first desc, then second asc", note: 'Multi-criteria sorting' },
      { name: 'Custom comparator', code: "from functools import cmp_to_key\ndef compare(a, b):\n    return -1 if a+b > b+a else 1\nsorted(strs, key=cmp_to_key(compare))", note: 'For Largest Number problem' },
      { name: 'Counting sort (simple)', code: "count = [0] * (max(arr) + 1)\nfor x in arr: count[x] += 1\nsorted_arr = []\nfor i, c in enumerate(count):\n    sorted_arr.extend([i] * c)", note: 'O(n+k) for small integer range' },
      { name: 'Bucket sort', code: "buckets = [[] for _ in range(n)]\nfor x in arr:\n    buckets[int(x * n)].append(x)\nfor b in buckets: b.sort()\nresult = [x for b in buckets for x in b]", note: 'O(n) avg for uniform distribution' },
      { name: 'heapq for partial sort', code: "import heapq\nheapq.nsmallest(k, arr)  # k smallest\nheapq.nlargest(k, arr)   # k largest", note: 'O(n log k) — better than full sort for small k' },
      { name: 'Merge two sorted lists', code: "import heapq\nresult = list(heapq.merge(sorted1, sorted2))", note: 'O(n) merge of pre-sorted iterables' },
    ],
  },
  'arrays-hashing': {
    summary: 'Arrays and hash maps are the foundation of most coding problems. Hash maps provide O(1) average lookup, making them ideal for counting frequencies, detecting duplicates, and grouping elements.',
    approach: 'When you see problems involving counting, grouping, or finding pairs/targets — think hash maps first. Sort the array when order matters. Use sets for uniqueness checks.',
    keyInsight: 'Trading space for time with a hash map is almost always worth it. If a brute force is O(n²), a hash map often reduces it to O(n).',
    timeComplexity: [
      { operation: 'Hash Map lookup/insert', complexity: 'O(1) avg', note: 'O(n) worst case with collisions' },
      { operation: 'Array access by index', complexity: 'O(1)', note: 'Direct memory addressing' },
      { operation: 'Array search (unsorted)', complexity: 'O(n)', note: 'Must scan all elements' },
      { operation: 'Sorting', complexity: 'O(n log n)', note: 'Often a useful preprocessing step' },
    ],
    whenToUse: [
      'Need to find pairs/groups that satisfy a condition (e.g., Two Sum)',
      'Counting frequency of elements',
      'Detecting duplicates or finding unique elements',
      'Grouping elements by a property (e.g., Group Anagrams)',
      'Need O(1) lookup by key instead of O(n) linear scan',
    ],
    commonMistakes: [
      'Forgetting that hash map operations are O(1) average, not guaranteed',
      'Not considering the space cost of creating a hash map',
      'Using nested loops when a hash map would eliminate one loop',
    ],
    visualization: {
      type: 'steps',
      title: 'Two Sum with Hash Map: find indices where nums[i]+nums[j]=target',
      input: 'nums = [2, 7, 11, 15], target = 9',
      steps: [
        { label: 'Initialize', state: 'HashMap = {}', highlight: 'For each num, check if (target - num) is in map' },
        { label: 'i=0, nums[0]=2', state: 'Need 9-2=7, not in map', highlight: 'HashMap = {2: 0}' },
        { label: 'i=1, nums[1]=7', state: 'Need 9-7=2, found at index 0!', highlight: 'Return [0, 1]' },
      ],
    },
    codeTemplate: `def two_sum(nums, target):
    seen = {}  # val -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

# Frequency counting pattern
from collections import Counter
count = Counter(nums)  # {val: freq}`,
    usefulSnippets: [
      { name: 'Counter', code: 'from collections import Counter\ncount = Counter(arr)', note: 'Count frequency of each element' },
      { name: 'defaultdict', code: 'from collections import defaultdict\nd = defaultdict(list)\nd[key].append(val)', note: 'Group values by key without KeyError' },
      { name: 'set operations', code: 'set(a) & set(b)  # intersection\nset(a) | set(b)  # union\nset(a) - set(b)  # difference', note: 'Fast membership testing and set math' },
      { name: 'enumerate', code: 'for i, val in enumerate(arr):', note: 'Get index + value in one loop' },
      { name: 'sorted with key', code: "sorted(arr, key=lambda x: x[1])\nsorted(s, key=lambda c: count[c], reverse=True)", note: 'Custom sort criteria' },
      { name: 'zip', code: 'for a, b in zip(arr1, arr2):', note: 'Iterate two arrays in parallel' },
    ],
  },
  'two-pointers': {
    summary: 'Two pointers reduce O(n²) brute-force searches to O(n) by exploiting sorted order or structural properties. One pointer scans from the left, the other from the right (or one fast, one slow).',
    approach: 'Sort the input if not already sorted. Use left/right pointers for pair-sum problems. Use fast/slow for linked-list cycle detection or in-place array modification.',
    keyInsight: 'The key is knowing when to move which pointer. In sorted arrays, if the sum is too small move left forward; if too big move right backward.',
    timeComplexity: [
      { operation: 'Two pointer scan', complexity: 'O(n)', note: 'Each pointer moves at most n steps' },
      { operation: 'Sorting prerequisite', complexity: 'O(n log n)', note: 'Often dominates overall complexity' },
      { operation: 'Fast/slow pointer', complexity: 'O(n)', note: 'Cycle detection in linked lists' },
    ],
    whenToUse: [
      'Finding pairs in a sorted array that sum to a target',
      'Removing duplicates from sorted array in-place',
      'Comparing elements from both ends (palindrome check)',
      'Merging two sorted arrays',
      'Partitioning an array around a pivot',
    ],
    commonMistakes: [
      'Forgetting to sort the array first when order is needed',
      'Off-by-one errors when moving pointers',
      'Not handling duplicate values correctly in 3Sum-type problems',
    ],
    visualization: {
      type: 'steps',
      title: 'Two Sum II on sorted array: find pair summing to 9',
      input: 'nums = [1, 2, 4, 6, 8, 10], target = 9',
      steps: [
        { label: 'Initialize', state: '[1, 2, 4, 6, 8, 10]\n L              R', highlight: 'L=0, R=5 → sum = 1+10 = 11 > 9 → R--' },
        { label: 'Step 1', state: '[1, 2, 4, 6, 8, 10]\n L           R', highlight: 'L=0, R=4 → sum = 1+8 = 9 = target → Found!' },
      ],
    },
    codeTemplate: `def two_pointer_template(nums, target):
    nums.sort()
    l, r = 0, len(nums) - 1
    while l < r:
        curr_sum = nums[l] + nums[r]
        if curr_sum == target:
            return [l, r]
        elif curr_sum < target:
            l += 1
        else:
            r -= 1

# 3Sum pattern (skip duplicates)
def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # skip duplicate
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return res`,
    usefulSnippets: [
      { name: 'Two-end pointers', code: 'l, r = 0, len(nums) - 1\nwhile l < r:', note: 'Classic left/right converging' },
      { name: 'Skip duplicates', code: 'while l < r and nums[l] == nums[l+1]: l += 1', note: 'Avoid duplicate results in 3Sum etc.' },
      { name: 'Palindrome check', code: 'def is_palindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]: return False\n        l += 1; r -= 1\n    return True', note: 'Compare from both ends' },
      { name: 'Partition (remove in-place)', code: 'write = 0\nfor read in range(len(nums)):\n    if nums[read] != val:\n        nums[write] = nums[read]\n        write += 1', note: 'Fast/slow to remove elements' },
    ],
  },
  'stack': {
    summary: 'Stacks excel at problems involving matching (parentheses), nearest greater/smaller elements (monotonic stack), and evaluating expressions. The LIFO property naturally handles nesting.',
    approach: 'Push elements or indices onto the stack. Pop when you find a match or when the current element breaks a monotonic property. The stack maintains "unresolved" items.',
    keyInsight: 'A monotonic stack processes each element at most twice (push + pop), giving O(n) time for "next greater element" style problems.',
    timeComplexity: [
      { operation: 'Push / Pop', complexity: 'O(1)', note: 'Constant time per operation' },
      { operation: 'Monotonic stack (full pass)', complexity: 'O(n)', note: 'Each element pushed and popped at most once' },
      { operation: 'Parentheses matching', complexity: 'O(n)', note: 'Single pass through string' },
    ],
    whenToUse: [
      'Matching brackets, parentheses, or tags',
      'Finding the next greater/smaller element for each position',
      'Evaluating postfix (RPN) or infix expressions',
      'Tracking nested structure (function calls, HTML tags)',
      'Problems where you need to "undo" the most recent action',
    ],
    commonMistakes: [
      'Forgetting to check if the stack is empty before popping',
      'Storing values instead of indices (often need both)',
      'Not recognizing that a monotonic stack applies',
    ],
    visualization: {
      type: 'steps',
      title: 'Monotonic Stack: Next Greater Element',
      input: 'nums = [2, 1, 4, 3]',
      steps: [
        { label: 'Process 2', state: 'Stack: [2]     Result: [_, _, _, _]', highlight: 'Push 2. No greater element found yet.' },
        { label: 'Process 1', state: 'Stack: [2, 1]  Result: [_, _, _, _]', highlight: '1 < 2 (top), push 1.' },
        { label: 'Process 4', state: 'Stack: [4]     Result: [4, 4, _, _]', highlight: '4>1 → pop 1(ans=4), 4>2 → pop 2(ans=4), push 4' },
        { label: 'Process 3', state: 'Stack: [4, 3]  Result: [4, 4, -1, -1]', highlight: '3 < 4, push. Done — remaining in stack get -1' },
      ],
    },
    codeTemplate: `# Monotonic decreasing stack (next greater element)
def next_greater(nums):
    n = len(nums)
    res = [-1] * n
    stack = []  # indices
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            res[stack.pop()] = nums[i]
        stack.append(i)
    return res

# Valid parentheses
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in pairs:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
        else:
            stack.append(c)
    return not stack`,
    usefulSnippets: [
      { name: 'Stack basics', code: 'stack = []\nstack.append(x)   # push\nstack.pop()        # pop\nstack[-1]          # peek', note: 'Python list as stack' },
      { name: 'Monotonic decreasing', code: 'while stack and nums[i] > nums[stack[-1]]:\n    res[stack.pop()] = nums[i]\nstack.append(i)', note: 'Next greater element pattern' },
      { name: 'Monotonic increasing', code: 'while stack and nums[i] < nums[stack[-1]]:\n    res[stack.pop()] = nums[i]\nstack.append(i)', note: 'Next smaller element pattern' },
      { name: 'Bracket matching map', code: "pairs = {')': '(', ']': '[', '}': '{'}", note: 'Close→open bracket lookup' },
    ],
  },
  'binary-search': {
    summary: 'Binary search halves the search space each step, achieving O(log n). It works on sorted arrays and any monotonic condition (if f(x) is true, f(x+1) is true).',
    approach: 'Identify the sorted/monotonic property. Define clear left/right boundaries and a condition to check. Be careful with off-by-one errors in boundary updates.',
    keyInsight: 'Binary search isn\'t just for sorted arrays — you can binary search on the answer space. If you can verify a candidate answer in O(n), binary search on it.',
    timeComplexity: [
      { operation: 'Binary search', complexity: 'O(log n)', note: 'Halves search space each iteration' },
      { operation: 'Binary search on answer', complexity: 'O(n log M)', note: 'M = range of answer space, n = verification cost' },
      { operation: 'Lower/upper bound', complexity: 'O(log n)', note: 'Finding first/last occurrence' },
    ],
    whenToUse: [
      'Searching in a sorted array or matrix',
      'Finding a boundary (first true, last false) in a monotonic predicate',
      'Minimizing/maximizing an answer where you can verify feasibility',
      'Problems that say "minimum maximum" or "maximum minimum"',
      'Searching in a rotated sorted array',
    ],
    commonMistakes: [
      'Off-by-one: using lo < hi vs lo <= hi inconsistently',
      'Infinite loop from not narrowing the search space (mid = lo instead of lo = mid + 1)',
      'Not recognizing that "binary search on answer" applies',
    ],
    visualization: {
      type: 'steps',
      title: 'Binary Search for target in sorted array',
      input: 'nums = [1, 3, 5, 7, 9, 11, 13], target = 7',
      steps: [
        { label: 'Step 1', state: '[1, 3, 5, (7), 9, 11, 13]\n lo          mid           hi', highlight: 'lo=0, hi=6, mid=3 → arr[3]=7 = target' },
        { label: 'Found!', state: 'Return index 3', highlight: 'Only 1 comparison needed (best case)' },
      ],
    },
    codeTemplate: `# Standard binary search
def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Binary search on answer space
def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(piles, mid, h):
            hi = mid       # mid works, try smaller
        else:
            lo = mid + 1   # mid too slow
    return lo

def can_finish(piles, speed, h):
    return sum((p + speed - 1) // speed for p in piles) <= h`,
    usefulSnippets: [
      { name: 'bisect module', code: 'import bisect\nbisect.bisect_left(arr, x)   # first index >= x\nbisect.bisect_right(arr, x)  # first index > x\nbisect.insort(arr, x)        # insert maintaining order', note: 'Built-in binary search' },
      { name: 'Ceiling division', code: '(a + b - 1) // b  # or\nimport math; math.ceil(a / b)', note: 'Round up integer division' },
      { name: 'Search on answer', code: 'lo, hi = min_possible, max_possible\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if feasible(mid):\n        hi = mid\n    else:\n        lo = mid + 1', note: 'Find minimum feasible answer' },
      { name: 'Rotated array pivot', code: 'if nums[mid] > nums[hi]:\n    lo = mid + 1  # min is in right half\nelse:\n    hi = mid      # min is in left half (or mid)', note: 'Find min in rotated sorted array' },
    ],
  },
  'sliding-window': {
    summary: 'Sliding window maintains a contiguous subarray/substring that expands and contracts. It turns O(n²) substring enumeration into O(n) by reusing computation.',
    approach: 'Expand the right pointer to include elements. When a constraint is violated, shrink from the left. Track the window state with a hash map or counter.',
    keyInsight: 'The window is valid when all constraints are met. The answer is usually the max/min window size seen while valid.',
    timeComplexity: [
      { operation: 'Fixed-size window', complexity: 'O(n)', note: 'Slide window of size k across n elements' },
      { operation: 'Variable-size window', complexity: 'O(n)', note: 'Each pointer moves at most n steps total' },
      { operation: 'Window with hash map', complexity: 'O(n)', note: 'Hash map ops are O(1) amortized' },
    ],
    whenToUse: [
      'Finding longest/shortest substring with some constraint',
      'Maximum sum subarray of fixed size k',
      'Counting subarrays/substrings that satisfy a condition',
      'Problems involving contiguous sequences',
      'String problems with character frequency constraints',
    ],
    commonMistakes: [
      'Not shrinking the window correctly when constraint is violated',
      'Updating the answer at the wrong time (before vs after shrinking)',
      'Forgetting to update window state when removing left element',
    ],
    visualization: {
      type: 'steps',
      title: 'Longest substring without repeating characters',
      input: 's = "abcabcbb"',
      steps: [
        { label: 'Expand right', state: '[a b c] a b c b b\n L   R', highlight: 'Set={a,b,c}, len=3, max=3' },
        { label: 'Duplicate "a"!', state: '[a b c a] b c b b\n L     R', highlight: '"a" already in set → shrink from left' },
        { label: 'Shrink left', state: ' a [b c a] b c b b\n    L   R', highlight: 'Remove "a" from set, move L. Set={b,c,a}, len=3' },
        { label: 'Continue...', state: ' a b [c a b] c b b\n      L   R', highlight: 'Set={c,a,b}, len=3. Max stays 3' },
      ],
    },
    codeTemplate: `# Variable-size sliding window template
def longest_substring(s):
    seen = set()
    l = 0
    max_len = 0
    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l])
            l += 1
        seen.add(s[r])
        max_len = max(max_len, r - l + 1)
    return max_len

# Fixed-size window template
def max_sum_subarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
    usefulSnippets: [
      { name: 'Variable window', code: 'l = 0\nfor r in range(len(s)):\n    # expand: add s[r] to window\n    while invalid:\n        # shrink: remove s[l]\n        l += 1\n    ans = max(ans, r - l + 1)', note: 'Core sliding window pattern' },
      { name: 'Counter window', code: 'from collections import Counter\nwindow = Counter()\nwindow[s[r]] += 1\nif window[s[l]] == 1: del window[s[l]]\nelse: window[s[l]] -= 1', note: 'Track char frequencies in window' },
      { name: 'Window length', code: 'r - l + 1  # current window size', note: 'Inclusive both endpoints' },
      { name: 'min() / max()', code: 'max_len = max(max_len, r - l + 1)\nmin_len = min(min_len, r - l + 1)', note: 'Track best window seen' },
    ],
  },
  'linked-list': {
    summary: 'Linked list problems test pointer manipulation skills. Common patterns include reversal, fast/slow pointers for cycle detection and midpoint finding, and dummy nodes for edge cases.',
    approach: 'Use a dummy head node to simplify insertions/deletions at the head. Draw the pointer changes before coding. Fast/slow pointers find the middle in one pass.',
    keyInsight: 'Most linked list problems become straightforward if you draw out the pointer changes step by step. Don\'t try to do it all in your head.',
    timeComplexity: [
      { operation: 'Access by index', complexity: 'O(n)', note: 'Must traverse from head' },
      { operation: 'Insert/delete at known position', complexity: 'O(1)', note: 'Just pointer manipulation' },
      { operation: 'Reversal', complexity: 'O(n)', note: 'Single pass through the list' },
      { operation: 'Find middle (fast/slow)', complexity: 'O(n)', note: 'Fast pointer moves 2x speed' },
    ],
    whenToUse: [
      'Need O(1) insertion/deletion at arbitrary positions (with pointer)',
      'Reversing a sequence in-place',
      'Detecting cycles in a sequence',
      'Merging sorted sequences efficiently',
      'Finding the middle or kth-from-end element',
    ],
    commonMistakes: [
      'Losing reference to the head after modification',
      'Not using a dummy node and mishandling head edge cases',
      'Creating cycles accidentally by not nullifying next pointers',
    ],
    visualization: {
      type: 'steps',
      title: 'Reverse a Linked List iteratively',
      input: '1 → 2 → 3 → None',
      steps: [
        { label: 'Start', state: 'prev=None, curr=1→2→3→None', highlight: 'Save next, point curr.next to prev' },
        { label: 'Step 1', state: 'None ← 1    2 → 3 → None\nprev=1, curr=2', highlight: 'Reversed first link' },
        { label: 'Step 2', state: 'None ← 1 ← 2    3 → None\nprev=2, curr=3', highlight: 'Reversed second link' },
        { label: 'Step 3', state: 'None ← 1 ← 2 ← 3\nprev=3, curr=None', highlight: 'Done! Return prev (new head = 3)' },
      ],
    },
    codeTemplate: `# Reverse a linked list
def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

# Find middle node (fast/slow)
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# Detect cycle
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    usefulSnippets: [
      { name: 'Dummy node', code: 'dummy = ListNode(0)\ndummy.next = head\n# ... manipulate ...\nreturn dummy.next', note: 'Simplifies edge cases at head' },
      { name: 'Fast/slow pointers', code: 'slow = fast = head\nwhile fast and fast.next:\n    slow = slow.next\n    fast = fast.next.next', note: 'Find middle or detect cycle' },
      { name: 'Reverse in-place', code: 'prev, curr = None, head\nwhile curr:\n    nxt = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nxt', note: 'O(1) space reversal' },
      { name: 'Merge two sorted', code: 'dummy = ListNode(0)\ntail = dummy\nwhile l1 and l2:\n    if l1.val <= l2.val:\n        tail.next = l1; l1 = l1.next\n    else:\n        tail.next = l2; l2 = l2.next\n    tail = tail.next\ntail.next = l1 or l2', note: 'Merge sort merge step' },
    ],
  },
  'trees': {
    summary: 'Tree problems are fundamentally about recursion. DFS (preorder, inorder, postorder) and BFS (level order) are the two main traversal strategies.',
    approach: 'For most problems, define what information a node needs from its children (bottom-up) or what it passes down (top-down). Use BFS for level-order problems.',
    keyInsight: 'Think about what each recursive call returns and what the base case is. Many tree problems reduce to "process left, process right, combine results."',
    timeComplexity: [
      { operation: 'DFS traversal', complexity: 'O(n)', note: 'Visit every node exactly once' },
      { operation: 'BFS traversal', complexity: 'O(n)', note: 'Visit every node, O(w) space for queue' },
      { operation: 'BST search/insert', complexity: 'O(h)', note: 'h = height, O(log n) if balanced' },
      { operation: 'BST worst case', complexity: 'O(n)', note: 'Degenerate tree (linked list shape)' },
    ],
    whenToUse: [
      'Problems involving hierarchical structures',
      'Need to process all paths from root to leaves',
      'Comparing two trees (same tree, subtree check)',
      'Level-by-level processing (BFS)',
      'Finding LCA, diameter, or max path sum',
    ],
    commonMistakes: [
      'Forgetting the null base case in recursion',
      'Confusing preorder/inorder/postorder traversal order',
      'Not recognizing when BFS is simpler than DFS (level-order problems)',
    ],
    visualization: {
      type: 'tree',
      title: 'DFS Traversal Orders on a BST',
      input: '       4\n      / \\\n     2   6\n    / \\ / \\\n   1  3 5  7',
      steps: [
        { label: 'Preorder (root,L,R)', state: '4 → 2 → 1 → 3 → 6 → 5 → 7', highlight: 'Process node BEFORE children' },
        { label: 'Inorder (L,root,R)', state: '1 → 2 → 3 → 4 → 5 → 6 → 7', highlight: 'Gives sorted order for BST!' },
        { label: 'Postorder (L,R,root)', state: '1 → 3 → 2 → 5 → 7 → 6 → 4', highlight: 'Process node AFTER children' },
        { label: 'BFS (level order)', state: '[4] → [2, 6] → [1, 3, 5, 7]', highlight: 'Use a queue, process level by level' },
      ],
    },
    codeTemplate: `# DFS template (max depth example)
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# BFS template (level order)
from collections import deque
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
    usefulSnippets: [
      { name: 'DFS recursive', code: 'def dfs(node):\n    if not node: return\n    # preorder: process here\n    dfs(node.left)\n    # inorder: process here\n    dfs(node.right)\n    # postorder: process here', note: 'Three traversal orders in one template' },
      { name: 'BFS with deque', code: 'from collections import deque\nqueue = deque([root])\nwhile queue:\n    node = queue.popleft()\n    if node.left: queue.append(node.left)\n    if node.right: queue.append(node.right)', note: 'Level-order traversal' },
      { name: 'max() / min()', code: 'max(left_height, right_height) + 1\nmin(left_val, right_val)', note: 'Combine children results' },
      { name: 'Pass value down', code: 'def dfs(node, path_sum):\n    if not node: return\n    path_sum += node.val\n    dfs(node.left, path_sum)\n    dfs(node.right, path_sum)', note: 'Top-down DFS with accumulator' },
    ],
  },
  'tries': {
    summary: 'A trie (prefix tree) stores strings character by character in a tree structure, enabling O(L) lookup where L is the string length. Essential for prefix matching and autocomplete.',
    approach: 'Build the trie by inserting words character by character. For search, traverse the trie. Use a boolean flag to mark word endings vs. mere prefixes.',
    keyInsight: 'Tries share prefixes among words, saving space and enabling efficient prefix queries that hash maps cannot do.',
    timeComplexity: [
      { operation: 'Insert a word', complexity: 'O(L)', note: 'L = length of the word' },
      { operation: 'Search a word', complexity: 'O(L)', note: 'Traverse L characters' },
      { operation: 'Prefix search', complexity: 'O(P)', note: 'P = prefix length, then DFS for all matches' },
      { operation: 'Space', complexity: 'O(N × L)', note: 'N words of average length L' },
    ],
    whenToUse: [
      'Autocomplete or prefix-based search',
      'Spell checking and word validation',
      'Word search in a grid (combined with backtracking)',
      'Counting words with a common prefix',
      'When you need prefix queries faster than hash map iteration',
    ],
    commonMistakes: [
      'Not marking end-of-word nodes (confusing prefix with complete word)',
      'Creating excessive nodes when a hash map of words would suffice',
      'Forgetting to handle the empty string edge case',
    ],
    visualization: {
      type: 'tree',
      title: 'Trie storing words with prefix sharing',
      input: 'Words: "app", "apple", "api", "bat"',
      steps: [
        { label: 'Structure', state: '     root\n     / \\\n    a   b\n    |   |\n    p   a\n   / \\   |\n  p*  i* t*\n  |\n  l\n  |\n  e*', highlight: '* = end of word. "app" and "apple" share "app" prefix' },
        { label: 'Search "app"', state: 'root → a → p → p*', highlight: 'p* is marked end-of-word → "app" found!' },
        { label: 'Search "ap"', state: 'root → a → p', highlight: 'p is NOT end-of-word → "ap" is only a prefix, not a word' },
      ],
    },
    codeTemplate: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find(prefix) is not None

    def _find(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return None
            node = node.children[c]
        return node`,
    usefulSnippets: [
      { name: 'TrieNode', code: 'class TrieNode:\n    def __init__(self):\n        self.children = {}  # char -> TrieNode\n        self.is_end = False', note: 'Basic trie node with dict children' },
      { name: 'Insert word', code: 'node = self.root\nfor c in word:\n    if c not in node.children:\n        node.children[c] = TrieNode()\n    node = node.children[c]\nnode.is_end = True', note: 'Create path char by char' },
      { name: 'Wildcard search', code: 'def search(node, word, i):\n    if i == len(word): return node.is_end\n    if word[i] == ".":\n        return any(search(c, word, i+1)\n                   for c in node.children.values())\n    if word[i] not in node.children: return False\n    return search(node.children[word[i]], word, i+1)', note: 'For "." wildcard matching' },
    ],
  },
  'backtracking': {
    summary: 'Backtracking explores all possible solutions by building candidates incrementally and abandoning ("backtracking") when a constraint is violated.',
    approach: 'Use recursion with a "choices" list. At each step, make a choice, recurse, then undo the choice (backtrack). Sort input first to handle duplicates easily.',
    keyInsight: 'The key to efficiency is pruning — skip branches early when you know they can\'t lead to a valid solution. Sorting often enables duplicate skipping.',
    timeComplexity: [
      { operation: 'Subsets', complexity: 'O(2^n)', note: 'Each element included or excluded' },
      { operation: 'Permutations', complexity: 'O(n!)', note: 'n choices for first, n-1 for second, etc.' },
      { operation: 'Combination Sum', complexity: 'O(2^t)', note: 't = target/min_candidate' },
      { operation: 'N-Queens', complexity: 'O(n!)', note: 'With pruning, much faster in practice' },
    ],
    whenToUse: [
      'Generate all subsets, permutations, or combinations',
      'Constraint satisfaction (Sudoku, N-Queens)',
      'Path finding where you need ALL paths',
      'Problems asking "all possible ways" or "all valid configurations"',
      'When greedy doesn\'t work and you need exhaustive search',
    ],
    commonMistakes: [
      'Forgetting to undo the choice after recursing (not actually backtracking)',
      'Including duplicate results — sort first, then skip same elements at same depth',
      'Not pruning early enough, leading to TLE',
    ],
    visualization: {
      type: 'steps',
      title: 'Generate all subsets via backtracking decision tree',
      input: 'nums = [1, 2, 3]',
      steps: [
        { label: 'Decision tree', state: 'At each element: include or skip\n           []\n          / \\\n       [1]   []\n       / \\   / \\\n   [1,2] [1] [2] []\n    ...  ...  ...  ...', highlight: 'Binary decision at each level → 2^n leaves' },
        { label: 'Include 1 branch', state: 'path=[1] → include 2? → include 3?', highlight: 'Generates: [1,2,3], [1,2], [1,3], [1]' },
        { label: 'Skip 1 branch', state: 'path=[] → include 2? → include 3?', highlight: 'Generates: [2,3], [2], [3], []' },
        { label: 'Result', state: '[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]', highlight: '2^3 = 8 subsets total' },
      ],
    },
    codeTemplate: `# Subsets
def subsets(nums):
    res = []
    def backtrack(start, path):
        res.append(path[:])  # add a copy
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # undo choice!
    backtrack(0, [])
    return res

# Permutations
def permute(nums):
    res = []
    def backtrack(path, remaining):
        if not remaining:
            res.append(path[:])
            return
        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(path, remaining[:i] + remaining[i+1:])
            path.pop()
    backtrack([], nums)
    return res

# Combination Sum (reuse allowed)
def combination_sum(candidates, target):
    res = []
    def backtrack(start, path, remain):
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                break  # prune!
            path.append(candidates[i])
            backtrack(i, path, remain - candidates[i])
            path.pop()
    candidates.sort()
    backtrack(0, [], target)
    return res`,
    usefulSnippets: [
      { name: 'Backtrack template', code: 'def backtrack(start, path):\n    res.append(path[:])\n    for i in range(start, len(nums)):\n        path.append(nums[i])\n        backtrack(i + 1, path)\n        path.pop()', note: 'Core backtracking pattern' },
      { name: 'Skip duplicates', code: 'nums.sort()\nfor i in range(start, len(nums)):\n    if i > start and nums[i] == nums[i-1]:\n        continue  # skip duplicate at same depth', note: 'Avoid duplicate subsets/combos' },
      { name: 'path[:] copy', code: 'res.append(path[:])\n# or: res.append(list(path))', note: 'Always copy the path before appending to result' },
      { name: 'Early pruning', code: 'if candidates[i] > remain:\n    break  # remaining are even larger', note: 'Cut branches that can\'t lead to solution' },
    ],
  },
  'heap': {
    summary: 'A heap (priority queue) provides O(log n) insert and O(1) access to the min or max element. Perfect for top-K, merge-K-sorted, and scheduling problems.',
    approach: 'Use a min-heap for "K largest" (keep K elements, pop smallest). Use a max-heap for "K smallest". For medians, use two heaps (max-heap for lower half, min-heap for upper).',
    keyInsight: 'When you need repeated access to the min/max of a dynamic collection, a heap is your go-to data structure.',
    timeComplexity: [
      { operation: 'Insert (push)', complexity: 'O(log n)', note: 'Bubble up to maintain heap property' },
      { operation: 'Extract min/max (pop)', complexity: 'O(log n)', note: 'Bubble down after removing root' },
      { operation: 'Peek min/max', complexity: 'O(1)', note: 'Root element is always min/max' },
      { operation: 'Build heap from array', complexity: 'O(n)', note: 'Heapify is O(n), not O(n log n)' },
    ],
    whenToUse: [
      'Finding top K or bottom K elements',
      'Merging K sorted lists/streams',
      'Running median or running statistics',
      'Task scheduling with priorities',
      'Dijkstra\'s shortest path (min-heap of distances)',
    ],
    commonMistakes: [
      'Using a max-heap when min-heap is needed (or vice versa)',
      'Re-sorting the entire array when a heap would be more efficient',
      'Not recognizing that "K largest" uses a min-heap of size K',
    ],
    visualization: {
      type: 'steps',
      title: 'Find 2nd largest using min-heap of size K=2',
      input: 'stream = [3, 1, 5, 2, 4]',
      steps: [
        { label: 'Process 3', state: 'Heap: [3]', highlight: 'Size < K=2, just push' },
        { label: 'Process 1', state: 'Heap: [1, 3]', highlight: 'Size = K. Min-heap root = 1 (smallest in top-2)' },
        { label: 'Process 5', state: 'Heap: [3, 5]', highlight: '5 > root(1) → pop 1, push 5' },
        { label: 'Process 2', state: 'Heap: [3, 5]', highlight: '2 < root(3) → skip, not in top-2' },
        { label: 'Process 4', state: 'Heap: [4, 5]', highlight: '4 > root(3) → pop 3, push 4. Answer: root = 4' },
      ],
    },
    codeTemplate: `import heapq

# Top K largest elements
def top_k_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # remove smallest
    return heap  # k largest elements

# Merge K sorted lists
def merge_k_lists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    dummy = ListNode(0)
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
    usefulSnippets: [
      { name: 'heapq basics', code: 'import heapq\nheapq.heappush(heap, val)\nheapq.heappop(heap)    # pop smallest\nheap[0]                # peek smallest', note: 'Python heapq is a min-heap' },
      { name: 'Max-heap trick', code: 'heapq.heappush(heap, -val)  # negate to push\nmax_val = -heapq.heappop(heap)  # negate back', note: 'Python has no max-heap, negate values' },
      { name: 'heapify', code: 'heapq.heapify(arr)  # O(n) in-place', note: 'Convert list to heap in linear time' },
      { name: 'nlargest / nsmallest', code: 'heapq.nlargest(k, arr)\nheapq.nsmallest(k, arr)', note: 'Quick top-K without manual heap' },
      { name: 'Tuple priority', code: 'heapq.heappush(heap, (priority, index, item))', note: 'Use tuple for custom ordering. Add index to break ties.' },
    ],
  },
  'graphs': {
    summary: 'Graph problems involve traversing nodes connected by edges. BFS finds shortest paths in unweighted graphs; DFS explores connected components and detects cycles.',
    approach: 'Build an adjacency list. Use BFS for shortest path or level-by-level processing. Use DFS for connected components, cycle detection, and topological sort.',
    keyInsight: 'Most grid problems ARE graph problems — each cell is a node, and adjacent cells are edges. Think of flood fill as DFS/BFS on a grid.',
    timeComplexity: [
      { operation: 'BFS / DFS', complexity: 'O(V + E)', note: 'V = vertices, E = edges' },
      { operation: 'Topological Sort', complexity: 'O(V + E)', note: 'DFS + reverse postorder, or Kahn\'s BFS' },
      { operation: 'Grid traversal', complexity: 'O(m × n)', note: 'Visit each cell once' },
      { operation: 'Build adjacency list', complexity: 'O(E)', note: 'One pass through edge list' },
    ],
    whenToUse: [
      'Finding connected components or islands',
      'Shortest path in unweighted graph (BFS)',
      'Detecting cycles in directed/undirected graphs',
      'Course scheduling / task ordering (topological sort)',
      'Flood fill, rotting oranges, or any grid spread problem',
    ],
    commonMistakes: [
      'Forgetting to mark nodes as visited (infinite loops)',
      'Using DFS when BFS is needed for shortest path',
      'Not handling disconnected components (need to start BFS/DFS from all unvisited nodes)',
    ],
    visualization: {
      type: 'grid',
      title: 'BFS: Number of Islands in a grid',
      input: '1 1 0 0\n1 0 0 1\n0 0 1 1\n0 0 0 0',
      steps: [
        { label: 'Scan for land', state: '1 1 0 0\n1 0 0 1\n0 0 1 1\n0 0 0 0', highlight: 'Found land at (0,0) → start BFS' },
        { label: 'BFS from (0,0)', state: 'X X 0 0\nX 0 0 1\n0 0 1 1\n0 0 0 0', highlight: 'Island 1: visited (0,0),(0,1),(1,0)' },
        { label: 'BFS from (1,3)', state: 'X X 0 0\nX 0 0 X\n0 0 X X\n0 0 0 0', highlight: 'Island 2: visited (1,3),(2,2),(2,3)' },
        { label: 'Result', state: 'All land cells visited', highlight: 'Total islands = 2' },
      ],
    },
    codeTemplate: `from collections import deque, defaultdict

# BFS on graph (adjacency list)
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS on grid (number of islands)
def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"  # mark visited
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(r + dr, c + dc)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                dfs(r, c)
                count += 1
    return count

# Topological sort (Kahn's BFS)
def topo_sort(n, edges):
    graph = defaultdict(list)
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1
    queue = deque([i for i in range(n) if indegree[i] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                queue.append(nei)
    return order if len(order) == n else []  # empty = cycle`,
    usefulSnippets: [
      { name: 'Adjacency list', code: 'graph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)  # undirected', note: 'Build graph from edge list' },
      { name: '4-directional moves', code: 'for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:\n    nr, nc = r + dr, c + dc\n    if 0 <= nr < rows and 0 <= nc < cols:', note: 'Grid neighbor traversal' },
      { name: 'Visited set', code: 'visited = set()\nvisited.add((r, c))  # for grids\nvisited.add(node)     # for graphs', note: 'Prevent revisiting nodes' },
      { name: 'BFS shortest path', code: 'queue = deque([(start, 0)])  # (node, distance)\nwhile queue:\n    node, dist = queue.popleft()\n    if node == target: return dist', note: 'Track distance in BFS' },
    ],
  },
  'dp-1d': {
    summary: '1-D DP problems have optimal substructure along a single dimension. The current answer depends on previous answers, building up from base cases.',
    approach: 'Define dp[i] clearly (what does it represent?). Find the recurrence relation. Identify base cases. Often you only need the previous 1-2 values, so optimize space.',
    keyInsight: 'If you can express the answer for position i in terms of answers at earlier positions, it\'s likely a DP problem. Start with the recursive formula, then convert to iterative.',
    timeComplexity: [
      { operation: 'Climbing Stairs / Fibonacci', complexity: 'O(n)', note: 'dp[i] = dp[i-1] + dp[i-2]' },
      { operation: 'Coin Change', complexity: 'O(n × m)', note: 'n = amount, m = number of coins' },
      { operation: 'LIS (optimized)', complexity: 'O(n log n)', note: 'Patience sorting with binary search' },
      { operation: 'Space optimization', complexity: 'O(1)', note: 'When dp[i] depends only on dp[i-1], dp[i-2]' },
    ],
    whenToUse: [
      '"How many ways" or "minimum/maximum cost" to reach a state',
      'Problem has overlapping subproblems (same subproblem solved multiple times)',
      'Optimal substructure: optimal solution contains optimal sub-solutions',
      'Choices at each step that affect future results (can\'t be greedy)',
      'String/sequence problems with recurrence relations',
    ],
    commonMistakes: [
      'Not defining dp[i] precisely before coding',
      'Wrong base cases (off by one in the initial conditions)',
      'Not recognizing space optimization when only prev values are needed',
    ],
    visualization: {
      type: 'steps',
      title: 'Climbing Stairs: ways to reach step n (1 or 2 steps at a time)',
      input: 'n = 5',
      steps: [
        { label: 'Base cases', state: 'dp[0]=1, dp[1]=1', highlight: '1 way to be at step 0 and step 1' },
        { label: 'dp[2]', state: 'dp[2] = dp[1] + dp[0] = 1 + 1 = 2', highlight: 'Paths: (1+1) or (2)' },
        { label: 'dp[3]', state: 'dp[3] = dp[2] + dp[1] = 2 + 1 = 3', highlight: 'Paths: (1+1+1), (1+2), (2+1)' },
        { label: 'dp[4]', state: 'dp[4] = dp[3] + dp[2] = 3 + 2 = 5', highlight: '5 ways' },
        { label: 'dp[5]', state: 'dp[5] = dp[4] + dp[3] = 5 + 3 = 8', highlight: 'Answer: 8 ways to climb 5 stairs' },
      ],
    },
    codeTemplate: `# Climbing Stairs (Fibonacci-style)
def climb_stairs(n):
    if n <= 1: return 1
    prev2, prev1 = 1, 1
    for i in range(2, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1

# Coin Change (minimum coins)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# House Robber
def rob(nums):
    if not nums: return 0
    prev2, prev1 = 0, 0
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1`,
    usefulSnippets: [
      { name: 'Space-optimized DP', code: "prev2, prev1 = base1, base2\nfor i in range(2, n+1):\n    prev2, prev1 = prev1, recurrence(prev1, prev2)\nreturn prev1", note: 'Only keep last 2 values instead of full array' },
      { name: 'float(\'inf\')', code: "dp = [float('inf')] * (n + 1)\ndp[0] = 0  # base case", note: 'Initialize for min-cost problems' },
      { name: 'min() in recurrence', code: 'dp[i] = min(dp[i], dp[i - coin] + 1)', note: 'Take the minimum cost among choices' },
      { name: 'max() in recurrence', code: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])', note: 'Take or skip pattern (House Robber)' },
      { name: 'LIS with bisect', code: 'import bisect\ntails = []\nfor num in nums:\n    pos = bisect.bisect_left(tails, num)\n    if pos == len(tails): tails.append(num)\n    else: tails[pos] = num\nreturn len(tails)', note: 'O(n log n) Longest Increasing Subsequence' },
    ],
  },
  'intervals': {
    summary: 'Interval problems involve ranges [start, end]. Sorting by start time (or end time) is almost always the first step, then sweep through with a greedy or merge approach.',
    approach: 'Sort intervals by start time. Merge overlapping intervals by comparing current end with next start. For scheduling, sort by end time and greedily pick non-overlapping.',
    keyInsight: 'After sorting, interval problems become linear scans. The key decision is: does the current interval overlap with the previous one?',
    timeComplexity: [
      { operation: 'Merge intervals', complexity: 'O(n log n)', note: 'Sorting dominates; merge is O(n)' },
      { operation: 'Insert interval', complexity: 'O(n)', note: 'If already sorted, single pass' },
      { operation: 'Meeting rooms (min rooms)', complexity: 'O(n log n)', note: 'Sort + sweep or min-heap' },
    ],
    whenToUse: [
      'Merging overlapping intervals',
      'Finding free time / gaps between intervals',
      'Scheduling: minimum rooms / resources needed',
      'Inserting a new interval into a sorted list',
      'Counting overlapping intervals at any point',
    ],
    commonMistakes: [
      'Forgetting to sort intervals first',
      'Off-by-one: [1,3] and [3,5] — does this overlap or not? (problem-specific)',
      'Not handling edge cases: empty list, single interval, fully contained intervals',
    ],
    visualization: {
      type: 'steps',
      title: 'Merge overlapping intervals',
      input: 'intervals = [[1,3], [2,6], [8,10], [15,18]]',
      steps: [
        { label: 'Sorted by start', state: '[1,3]  [2,6]  [8,10]  [15,18]', highlight: 'Compare each interval with the last merged one' },
        { label: 'Merge [1,3]+[2,6]', state: '[1,6]  [8,10]  [15,18]', highlight: '3 >= 2 → overlap! New end = max(3,6) = 6' },
        { label: 'Check [1,6] vs [8,10]', state: '[1,6]  [8,10]  [15,18]', highlight: '6 < 8 → no overlap → start new interval' },
        { label: 'Result', state: '[[1,6], [8,10], [15,18]]', highlight: '4 intervals → 3 merged' },
      ],
    },
    codeTemplate: `# Merge intervals
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# Meeting Rooms II (min rooms needed)
def min_meeting_rooms(intervals):
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = 0
    max_rooms = 0
    s = e = 0
    while s < len(starts):
        if starts[s] < ends[e]:
            rooms += 1
            s += 1
        else:
            rooms -= 1
            e += 1
        max_rooms = max(max_rooms, rooms)
    return max_rooms`,
    usefulSnippets: [
      { name: 'Sort by start', code: 'intervals.sort(key=lambda x: x[0])', note: 'Essential first step for most interval problems' },
      { name: 'Sort by end', code: 'intervals.sort(key=lambda x: x[1])', note: 'For activity selection / scheduling' },
      { name: 'Overlap check', code: 'if a_start <= b_end and b_start <= a_end:\n    # intervals overlap', note: 'Two intervals overlap condition' },
      { name: 'Merge into last', code: 'merged[-1][1] = max(merged[-1][1], end)', note: 'Extend the last merged interval' },
    ],
  },
  'greedy': {
    summary: 'Greedy algorithms make the locally optimal choice at each step, trusting that this leads to a globally optimal solution. They work when the problem has the "greedy choice property."',
    approach: 'Identify what "locally optimal" means. Sort if needed. Process elements in order, making the best immediate choice. Prove (or intuit) that local optimality leads to global optimality.',
    keyInsight: 'If choosing the locally best option never blocks a better future option, greedy works. If it does, you likely need DP instead.',
    timeComplexity: [
      { operation: 'Jump Game', complexity: 'O(n)', note: 'Single pass tracking farthest reach' },
      { operation: 'Activity Selection', complexity: 'O(n log n)', note: 'Sort by end time + greedy pick' },
      { operation: 'Partition Labels', complexity: 'O(n)', note: 'Track last occurrence, then partition' },
    ],
    whenToUse: [
      'Optimization problems where local best = global best',
      'Activity/interval selection (max non-overlapping)',
      'Jump/reach problems (can I reach the end?)',
      'Partitioning problems with local constraints',
      'When DP seems like overkill and a simpler rule exists',
    ],
    commonMistakes: [
      'Assuming greedy works without verifying the greedy choice property',
      'Not sorting when the greedy strategy depends on order',
      'Confusing greedy with DP — if a local choice can block optimal future choices, use DP',
    ],
    visualization: {
      type: 'steps',
      title: 'Jump Game: can you reach the last index?',
      input: 'nums = [2, 3, 1, 1, 4]',
      steps: [
        { label: 'i=0, nums[0]=2', state: '[2, 3, 1, 1, 4]   maxReach = 0', highlight: 'maxReach = max(0, 0+2) = 2' },
        { label: 'i=1, nums[1]=3', state: '[2, 3, 1, 1, 4]   maxReach = 4', highlight: 'maxReach = max(2, 1+3) = 4 >= last index!' },
        { label: 'Result', state: 'maxReach=4 >= len-1=4', highlight: 'Can reach the end → return True' },
      ],
    },
    codeTemplate: `# Jump Game (can reach end?)
def can_jump(nums):
    max_reach = 0
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
    return True

# Jump Game II (min jumps)
def jump(nums):
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps

# Partition Labels
def partition_labels(s):
    last = {c: i for i, c in enumerate(s)}
    start = end = 0
    result = []
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            result.append(end - start + 1)
            start = end + 1
    return result`,
    usefulSnippets: [
      { name: 'Track farthest reach', code: 'max_reach = max(max_reach, i + nums[i])', note: 'Core of jump game pattern' },
      { name: 'Last occurrence map', code: 'last = {c: i for i, c in enumerate(s)}', note: 'Know the rightmost position of each element' },
      { name: 'max() for greedy pick', code: 'best = max(choices, key=lambda x: criteria(x))', note: 'Pick the locally optimal option' },
      { name: 'Greedy interval select', code: 'intervals.sort(key=lambda x: x[1])  # by end\nend = float("-inf")\ncount = 0\nfor s, e in intervals:\n    if s >= end:\n        count += 1; end = e', note: 'Max non-overlapping intervals' },
    ],
  },
  'advanced-graphs': {
    summary: 'Advanced graph algorithms handle weighted edges, minimum spanning trees, and shortest paths. Key algorithms: Dijkstra, Bellman-Ford, Kruskal/Prim, and Union-Find.',
    approach: 'Dijkstra for shortest path with non-negative weights (use a min-heap). Union-Find for connected components and MST. Bellman-Ford when negative weights exist.',
    keyInsight: 'Union-Find with path compression and union by rank gives nearly O(1) amortized operations — powerful for dynamic connectivity queries.',
    timeComplexity: [
      { operation: 'Dijkstra', complexity: 'O((V+E) log V)', note: 'Using min-heap (priority queue)' },
      { operation: 'Bellman-Ford', complexity: 'O(V × E)', note: 'Handles negative weights' },
      { operation: 'Kruskal\'s MST', complexity: 'O(E log E)', note: 'Sort edges + Union-Find' },
      { operation: 'Union-Find (optimized)', complexity: 'O(α(n)) ≈ O(1)', note: 'Path compression + union by rank' },
    ],
    whenToUse: [
      'Shortest path with weighted edges (Dijkstra)',
      'Negative edge weights or detecting negative cycles (Bellman-Ford)',
      'Minimum spanning tree (Kruskal/Prim)',
      'Dynamic connectivity queries (Union-Find)',
      'Problems with K stops or limited hops (modified Bellman-Ford)',
    ],
    commonMistakes: [
      'Using Dijkstra with negative weights (use Bellman-Ford instead)',
      'Not implementing path compression in Union-Find',
      'Processing already-finalized nodes in Dijkstra (skip them)',
    ],
    visualization: {
      type: 'steps',
      title: 'Dijkstra: shortest path from A in weighted graph',
      input: 'A→B(1), A→C(4), B→C(2), B→D(5), C→D(1)',
      steps: [
        { label: 'Initialize', state: 'dist = {A:0, B:∞, C:∞, D:∞}', highlight: 'Push (0, A) to min-heap' },
        { label: 'Process A (d=0)', state: 'dist = {A:0, B:1, C:4, D:∞}', highlight: 'Relax: B=0+1=1, C=0+4=4' },
        { label: 'Process B (d=1)', state: 'dist = {A:0, B:1, C:3, D:6}', highlight: 'Relax: C=min(4,1+2)=3, D=1+5=6' },
        { label: 'Process C (d=3)', state: 'dist = {A:0, B:1, C:3, D:4}', highlight: 'Relax: D=min(6,3+1)=4. Done!' },
      ],
    },
    codeTemplate: `import heapq
from collections import defaultdict

# Dijkstra's shortest path
def dijkstra(n, edges, src):
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))
    dist = [float('inf')] * n
    dist[src] = 0
    heap = [(0, src)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue  # already found shorter
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist

# Union-Find
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True`,
    usefulSnippets: [
      { name: 'Dijkstra skip visited', code: 'if d > dist[u]: continue', note: 'Skip nodes already finalized at shorter distance' },
      { name: 'Path compression', code: 'def find(self, x):\n    if self.parent[x] != x:\n        self.parent[x] = self.find(self.parent[x])\n    return self.parent[x]', note: 'Flatten tree for O(α(n)) amortized' },
      { name: 'Kruskal MST', code: 'edges.sort(key=lambda x: x[2])  # by weight\nuf = UnionFind(n)\nmst_cost = 0\nfor u, v, w in edges:\n    if uf.union(u, v):\n        mst_cost += w', note: 'Sort edges + union-find' },
      { name: 'Bellman-Ford', code: 'dist = [float("inf")] * n\ndist[src] = 0\nfor _ in range(n - 1):\n    for u, v, w in edges:\n        if dist[u] + w < dist[v]:\n            dist[v] = dist[u] + w', note: 'Handles negative weights' },
    ],
  },
  'dp-2d': {
    summary: '2-D DP problems involve two dimensions — often two strings, a grid, or two parameters. The state space is a 2D table where dp[i][j] depends on neighboring cells.',
    approach: 'Define dp[i][j] clearly. Fill the table row by row (or diagonally). For string problems, i and j usually index into the two strings. Draw the table for small inputs.',
    keyInsight: 'LCS, edit distance, and knapsack all follow the same 2D DP template: compare elements, take the best of include/exclude/substitute choices.',
    timeComplexity: [
      { operation: 'LCS / Edit Distance', complexity: 'O(m × n)', note: 'm, n = lengths of two strings' },
      { operation: 'Unique Paths (grid)', complexity: 'O(m × n)', note: 'Grid dimensions' },
      { operation: '0/1 Knapsack', complexity: 'O(n × W)', note: 'n items, W capacity' },
      { operation: 'Space optimization', complexity: 'O(min(m,n))', note: 'Only keep previous row' },
    ],
    whenToUse: [
      'Comparing two strings (LCS, edit distance, interleaving)',
      'Grid path problems (unique paths, min path sum)',
      'Knapsack variants (subset sum, coin change 2)',
      'When 1D DP isn\'t enough — state depends on two parameters',
      'Stock trading with state transitions (hold/sell/cooldown)',
    ],
    commonMistakes: [
      'Wrong table dimensions (usually (m+1) × (n+1) for string problems)',
      'Filling order: make sure dp[i][j] dependencies are already computed',
      'Not initializing the first row/column correctly',
    ],
    visualization: {
      type: 'grid',
      title: 'Longest Common Subsequence — dp table fill',
      input: 'text1 = "ABCB", text2 = "BDCB"',
      steps: [
        { label: 'Setup', state: '    ""  B  D  C  B\n""   0  0  0  0  0\n A   0  _  _  _  _\n B   0  _  _  _  _\n C   0  _  _  _  _\n B   0  _  _  _  _', highlight: 'Match: dp[i][j]=dp[i-1][j-1]+1, else max(left, top)' },
        { label: 'Fill row A', state: '    ""  B  D  C  B\n""   0  0  0  0  0\n A   0  0  0  0  0', highlight: 'A≠B, A≠D, A≠C, A≠B → all max(left,top) = 0' },
        { label: 'Fill row B', state: '    ""  B  D  C  B\n""   0  0  0  0  0\n A   0  0  0  0  0\n B   0  1  1  1  1', highlight: 'B=B → dp[2][1]=dp[1][0]+1=1, propagate right' },
        { label: 'Complete', state: '    ""  B  D  C  B\n""   0  0  0  0  0\n A   0  0  0  0  0\n B   0  1  1  1  1\n C   0  1  1  2  2\n B   0  1  1  2  3', highlight: 'LCS length = dp[4][4] = 3 → "BCB"' },
      ],
    },
    codeTemplate: `# Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# Unique Paths (grid)
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]

# Edit Distance
def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,
    usefulSnippets: [
      { name: '2D array init', code: 'dp = [[0] * (n+1) for _ in range(m+1)]', note: 'Always use list comprehension, never [[0]*n]*m' },
      { name: 'Match diagonal', code: 'if s1[i-1] == s2[j-1]:\n    dp[i][j] = dp[i-1][j-1] + 1', note: 'Characters match → extend from diagonal' },
      { name: 'min of 3 choices', code: 'dp[i][j] = 1 + min(\n    dp[i-1][j],    # delete\n    dp[i][j-1],    # insert\n    dp[i-1][j-1]   # replace\n)', note: 'Edit distance recurrence' },
      { name: 'Space optimize to 1D', code: 'prev = [0] * (n+1)\nfor i in range(1, m+1):\n    curr = [0] * (n+1)\n    for j in range(1, n+1):\n        # fill curr[j]\n    prev = curr', note: 'Only keep previous row' },
    ],
  },
  'bit-manipulation': {
    summary: 'Bit manipulation uses bitwise operators (AND, OR, XOR, shift) for efficient computation. XOR is especially useful: a ^ a = 0, a ^ 0 = a.',
    approach: 'Use XOR to find unique elements (pairs cancel out). Use n & (n-1) to clear the lowest set bit. Use masks to isolate, set, or clear specific bits.',
    keyInsight: 'XOR is your best friend for "find the odd one out" problems. For counting bits, Brian Kernighan\'s trick (n & (n-1)) is optimal.',
    timeComplexity: [
      { operation: 'Single bitwise op', complexity: 'O(1)', note: 'AND, OR, XOR, shift — all constant time' },
      { operation: 'Count set bits', complexity: 'O(k)', note: 'k = number of set bits (Kernighan)' },
      { operation: 'Find single number (XOR)', complexity: 'O(n)', note: 'XOR all elements, pairs cancel' },
      { operation: 'Counting bits 0..n', complexity: 'O(n)', note: 'DP: bits[i] = bits[i>>1] + (i&1)' },
    ],
    whenToUse: [
      'Finding the element that appears once (all others appear twice)',
      'Checking if a number is a power of 2: n & (n-1) == 0',
      'Representing subsets as bitmasks (2^n possible subsets)',
      'Toggling, setting, or clearing specific flags',
      'Adding without + operator (XOR + carry)',
    ],
    commonMistakes: [
      'Confusing arithmetic shift (>>) with logical shift (>>> in some languages)',
      'Forgetting operator precedence (& has lower precedence than ==)',
      'Not handling negative numbers with bitwise operations',
    ],
    visualization: {
      type: 'steps',
      title: 'Single Number via XOR — pairs cancel out',
      input: 'nums = [4, 1, 2, 1, 2]',
      steps: [
        { label: 'Start', state: 'result = 0          (0000)', highlight: '0 XOR anything = anything' },
        { label: 'XOR 4', state: '0 ^ 4 = 4           (0100)', highlight: 'result = 4' },
        { label: 'XOR 1', state: '4 ^ 1 = 5           (0101)', highlight: 'result = 5' },
        { label: 'XOR 2', state: '5 ^ 2 = 7           (0111)', highlight: 'result = 7' },
        { label: 'XOR 1 (again)', state: '7 ^ 1 = 6           (0110)', highlight: 'Second 1 cancels first 1!' },
        { label: 'XOR 2 (again)', state: '6 ^ 2 = 4           (0100)', highlight: 'Second 2 cancels first 2! Answer: 4' },
      ],
    },
    codeTemplate: `# Single Number (XOR all)
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result

# Count set bits (Brian Kernighan)
def count_bits(n):
    count = 0
    while n:
        n &= n - 1  # clear lowest set bit
        count += 1
    return count

# Sum of Two Integers (no + operator)
def get_sum(a, b):
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a if b == 0 else a & mask`,
    usefulSnippets: [
      { name: 'XOR properties', code: 'a ^ a == 0      # cancel\na ^ 0 == a      # identity\na ^ b ^ a == b  # extract', note: 'Foundation of single-number problems' },
      { name: 'Clear lowest bit', code: 'n & (n - 1)  # removes lowest set bit', note: 'Kernighan trick, also checks power of 2' },
      { name: 'Get lowest bit', code: 'n & (-n)  # isolates lowest set bit', note: 'Useful for splitting into groups' },
      { name: 'Set/clear/toggle', code: 'n | (1 << i)   # set bit i\nn & ~(1 << i)  # clear bit i\nn ^ (1 << i)   # toggle bit i', note: 'Bit manipulation primitives' },
      { name: 'Check bit', code: 'if n & (1 << i):  # bit i is set\nbool(n & (1 << i))', note: 'Test if a specific bit is 1' },
      { name: 'bin()', code: 'bin(10)   # "0b1010"\nbin(10).count("1")  # 2 set bits', note: 'Quick bit visualization in Python' },
    ],
  },
  'math-geometry': {
    summary: 'Math and geometry problems require number theory, modular arithmetic, matrix manipulation, or coordinate geometry — less about data structures, more about mathematical insight.',
    approach: 'For matrix problems, think about in-place transformations (rotate = transpose + reverse). For number problems, look for mathematical properties that simplify brute force.',
    keyInsight: 'Many "math" problems have elegant O(1) or O(n) solutions hiding behind what looks like O(n²). Look for patterns in small examples.',
    timeComplexity: [
      { operation: 'Rotate matrix', complexity: 'O(n²)', note: 'Transpose + reverse rows (in-place)' },
      { operation: 'Spiral traversal', complexity: 'O(m × n)', note: 'Visit each element once' },
      { operation: 'GCD (Euclidean)', complexity: 'O(log min(a,b))', note: 'Very efficient' },
      { operation: 'Sieve of Eratosthenes', complexity: 'O(n log log n)', note: 'Find all primes up to n' },
    ],
    whenToUse: [
      'Matrix transformations (rotate, spiral, set zeroes)',
      'Number properties (happy number, power of, palindrome)',
      'Modular arithmetic in competitive programming',
      'Geometric calculations (distance, area, intersections)',
      'Problems with elegant math shortcuts (Gauss sum, etc.)',
    ],
    commonMistakes: [
      'Integer overflow when multiplying large numbers',
      'Not handling negative numbers in modular arithmetic',
      'Brute forcing when a mathematical formula exists',
    ],
    visualization: {
      type: 'grid',
      title: 'Rotate Matrix 90° clockwise (transpose + reverse rows)',
      input: '1 2 3\n4 5 6\n7 8 9',
      steps: [
        { label: 'Step 1: Transpose', state: '1 4 7\n2 5 8\n3 6 9', highlight: 'Swap matrix[i][j] with matrix[j][i]' },
        { label: 'Step 2: Reverse rows', state: '7 4 1\n8 5 2\n9 6 3', highlight: 'Reverse each row → rotated 90° clockwise!' },
      ],
    },
    codeTemplate: `# Rotate matrix 90° clockwise (in-place)
def rotate(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()

# Spiral order traversal
def spiral_order(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for j in range(left, right + 1): res.append(matrix[top][j])
        top += 1
        for i in range(top, bottom + 1): res.append(matrix[i][right])
        right -= 1
        if top <= bottom:
            for j in range(right, left - 1, -1): res.append(matrix[bottom][j])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1): res.append(matrix[i][left])
            left += 1
    return res`,
    usefulSnippets: [
      { name: 'Transpose matrix', code: 'for i in range(n):\n    for j in range(i+1, n):\n        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]', note: 'Swap across diagonal' },
      { name: 'GCD', code: 'import math\nmath.gcd(a, b)\n# or manual:\ndef gcd(a, b):\n    while b: a, b = b, a % b\n    return a', note: 'Greatest common divisor' },
      { name: 'Power (fast)', code: 'pow(base, exp, mod)  # built-in modular exponentiation', note: 'O(log n) exponentiation' },
      { name: 'Happy number cycle', code: 'def digit_sum_sq(n):\n    s = 0\n    while n:\n        n, d = divmod(n, 10)\n        s += d * d\n    return s', note: 'Sum of squared digits' },
      { name: 'divmod', code: 'quotient, remainder = divmod(n, 10)', note: 'Get both quotient and remainder at once' },
      { name: 'abs() / math.sqrt()', code: 'dist = math.sqrt((x2-x1)**2 + (y2-y1)**2)\n# or squared distance to avoid float:\ndist_sq = (x2-x1)**2 + (y2-y1)**2', note: 'Euclidean distance' },
    ],
  },
};
