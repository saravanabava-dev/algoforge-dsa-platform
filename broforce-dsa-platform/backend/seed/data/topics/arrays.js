export default {
  slug: "arrays",
  title: "Arrays",
  module: "MODULE 2 — ARRAYS",
  order: 2,
  visualizerType: "ArrayVisualizer",
  prerequisites: [],

  whatIsIt:
    "An Array is the most fundamental data structure: a fixed-size, ordered collection of elements " +
    "stored in contiguous memory, each reachable instantly by its index. Because every element sits " +
    "at a predictable memory offset from the start of the array, the computer can jump straight to " +
    "any position without searching — arr[i] is a single calculation, not a walk through the data.",

  whyNeeded:
    "Arrays are the foundation almost every other data structure and algorithm builds on. Sorting " +
    "algorithms rearrange arrays. Binary Search only works on a sorted array. Hash tables use an " +
    "array internally. Dynamic Programming tables are arrays (often 2D). Even a Stack or Queue can " +
    "be implemented on top of an array. Understanding how array indexing, insertion and deletion " +
    "actually cost time is essential before any of those topics make sense.",

  howItWorks:
    "Because array elements sit in contiguous memory, ACCESS by index is O(1): the computer " +
    "computes 'start address + (index * element size)' and reads directly — no traversal needed. " +
    "UPDATE is the same O(1) lookup, then an in-place write. SEARCH for a value (when you don't " +
    "know its index) has to check elements one by one — O(n) in the worst case, unless the array is " +
    "sorted, in which case Binary Search brings it down to O(log n). INSERT and DELETE are the " +
    "expensive operations: inserting or removing an element in the middle requires shifting every " +
    "element after it by one position to keep the array contiguous, which is O(n). Inserting or " +
    "deleting at the very end, when there's spare capacity, is O(1).",

  example:
    "Array: [10, 20, 30, 40, 50], indices 0 through 4.\n" +
    "ACCESS arr[2] -> 30, instantly, no traversal.\n" +
    "UPDATE arr[1] = 99 -> [10, 99, 30, 40, 50], one write.\n" +
    "INSERT 25 at index 2 -> [10, 99, 25, 30, 40, 50] — everything from index 2 onward shifted right " +
    "by one to make room.\n" +
    "DELETE index 0 -> [99, 25, 30, 40, 50] — everything shifted left by one to close the gap.",

  codeExamples: [
    {
      language: "java",
      explanation: "Core array operations — access, update, linear search, and shifting for insert/delete.",
      code: `public class ArrayOps {
    static int access(int[] arr, int index) {
        return arr[index]; // O(1)
    }

    static void update(int[] arr, int index, int value) {
        arr[index] = value; // O(1)
    }

    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i; // O(n) worst case
        }
        return -1;
    }

    // Insert 'value' at 'index', shifting later elements right.
    // Assumes arr has at least one spare trailing slot (size > count).
    static void insertAt(int[] arr, int count, int index, int value) {
        for (int i = count; i > index; i--) {
            arr[i] = arr[i - 1]; // O(n) shift
        }
        arr[index] = value;
    }

    // Delete the element at 'index', shifting later elements left.
    static void deleteAt(int[] arr, int count, int index) {
        for (int i = index; i < count - 1; i++) {
            arr[i] = arr[i + 1]; // O(n) shift
        }
    }
}`,
    },
    {
      language: "java",
      explanation: "Two classic array patterns: two-pointer and Kadane's algorithm for maximum subarray sum.",
      code: `public class ArrayPatterns {
    // Two-pointer: reverse an array in place, O(n) time, O(1) space.
    static void reverse(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    // Kadane's algorithm: largest sum of any contiguous subarray, O(n).
    static int maxSubarraySum(int[] arr) {
        int best = arr[0], current = arr[0];
        for (int i = 1; i < arr.length; i++) {
            current = Math.max(arr[i], current + arr[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}`,
    },
  ],

  complexity: {
    time: "Access/Update: O(1). Search: O(n) unsorted, O(log n) sorted (Binary Search). Insert/Delete: O(n) worst case, O(1) at the end with spare capacity",
    space: "O(n) to store n elements",
    best: "O(1) — access, update, or insert/delete at the end",
    average: "O(n) — search, or insert/delete at an arbitrary position",
    worst: "O(n) — insert/delete at the front, or a full linear search",
  },

  quiz: [
    {
      question: "Why is array access by index O(1)?",
      options: [
        "Arrays are always small",
        "The computer can calculate the exact memory address from the index directly",
        "Arrays are sorted",
        "It isn't — access is actually O(n)",
      ],
      correctIndex: 1,
      explanation: "Contiguous memory means the address of arr[i] is a direct calculation, not a search.",
    },
    {
      question: "What is the time complexity of inserting an element at the beginning of an array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctIndex: 2,
      explanation: "Every existing element must shift right by one position to make room — O(n).",
    },
    {
      question: "Searching for a value in an unsorted array of n elements takes:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 2,
      explanation: "Without any ordering to exploit, you may have to check every element — O(n) worst case.",
    },
    {
      question: "What does Kadane's algorithm compute?",
      options: [
        "The sorted version of an array",
        "The maximum sum of any contiguous subarray",
        "The number of duplicate elements",
        "The reverse of an array",
      ],
      correctIndex: 1,
      explanation: "Kadane's algorithm finds the largest-sum contiguous subarray in O(n) time.",
    },
    {
      question: "Which operation lets Binary Search achieve O(log n) instead of O(n)?",
      options: [
        "The array must be unsorted",
        "The array must be sorted, so half the remaining elements can be eliminated each step",
        "The array must contain only unique values",
        "The array must be reversed first",
      ],
      correctIndex: 1,
      explanation: "Binary Search relies on sorted order to safely discard half the search space each comparison.",
    },
  ],
};
