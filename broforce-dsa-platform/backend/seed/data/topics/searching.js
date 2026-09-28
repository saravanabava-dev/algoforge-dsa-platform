export default {
  slug: "searching",
  title: "Searching",
  module: "MODULE 9A — SEARCHING",
  order: 8,
  visualizerType: "SearchingVisualizer",
  prerequisites: [],

  whatIsIt:
    "Searching means finding whether a target value exists in a collection, and if so, where. The " +
    "simplest approach, Linear Search, checks every element one by one until it finds a match or " +
    "runs out of elements. Binary Search is a much faster approach that works only on SORTED data: " +
    "it repeatedly checks the middle element and, using the sorted order, eliminates half of the " +
    "remaining search space with every comparison.",

  whyNeeded:
    "Searching is one of the most common operations in computing — looking up a user by ID, " +
    "checking if a word exists in a dictionary, finding a record in a database. Linear Search always " +
    "works, even on unsorted data, but scales poorly: doubling the data doubles the worst-case work. " +
    "Binary Search scales dramatically better — doubling the data only adds ONE extra comparison in " +
    "the worst case — which is why keeping data sorted (or indexed) is so valuable in real systems.",

  howItWorks:
    "LINEAR SEARCH walks the array from index 0, comparing each element to the target, and stops as " +
    "soon as it finds a match (or reaches the end without one). BINARY SEARCH keeps two pointers, " +
    "LOW and HIGH, spanning the current search range, and computes MID = (LOW + HIGH) / 2. If " +
    "arr[MID] equals the target, done. If arr[MID] is less than the target, the target must be to " +
    "the right, so LOW moves to MID + 1 — the entire left half (including MID) is eliminated. If " +
    "arr[MID] is greater than the target, HIGH moves to MID - 1, eliminating the right half. This " +
    "repeats until LOW > HIGH (not found) or a match is found. Each comparison halves the remaining " +
    "range, which is exactly why it runs in O(log n).",

  example:
    "Searching for 45 in [4, 9, 14, 21, 30, 38, 45, 52, 61, 70] (indices 0-9) with Binary Search:\n" +
    "LOW=0, HIGH=9, MID=4 (value 30). 30 < 45, so search the right half: LOW=5.\n" +
    "LOW=5, HIGH=9, MID=7 (value 52). 52 > 45, so search the left half: HIGH=6.\n" +
    "LOW=5, HIGH=6, MID=5 (value 38). 38 < 45, so LOW=6.\n" +
    "LOW=6, HIGH=6, MID=6 (value 45). Match! Found at index 6, in just 4 comparisons instead of " +
    "checking all 10 elements.",

  codeExamples: [
    {
      language: "java",
      explanation: "Linear Search — works on any array, sorted or not, O(n) worst case.",
      code: `public class LinearSearch {
    static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1; // not found
    }
}`,
    },
    {
      language: "java",
      explanation: "Binary Search — iterative version, requires a sorted array, O(log n).",
      code: `public class BinarySearch {
    static int search(int[] arr, int target) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2; // avoids overflow vs (low+high)/2

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;  // target is in the right half
            } else {
                high = mid - 1; // target is in the left half
            }
        }
        return -1; // not found
    }
}`,
    },
    {
      language: "java",
      explanation: "Recursive Binary Search — same logic, expressed as recursion instead of a loop.",
      code: `public class BinarySearchRecursive {
    static int search(int[] arr, int target, int low, int high) {
        if (low > high) return -1; // base case: range exhausted

        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return search(arr, target, mid + 1, high);
        return search(arr, target, low, mid - 1);
    }
}`,
    },
  ],

  complexity: {
    time: "Linear Search: O(n). Binary Search: O(log n), but requires sorted input",
    space: "O(1) for both (O(log n) call stack for recursive Binary Search)",
    best: "O(1) — target is the very first element checked (Linear) or the middle element (Binary)",
    average: "O(n) for Linear Search, O(log n) for Binary Search",
    worst: "O(n) for Linear Search, O(log n) for Binary Search",
  },

  quiz: [
    {
      question: "What is the prerequisite for Binary Search to work correctly?",
      options: ["The array must contain only positive numbers", "The array must be sorted", "The array must have an even length", "The array must contain unique values"],
      correctIndex: 1,
      explanation: "Binary Search relies on sorted order to safely eliminate half the search space each step.",
    },
    {
      question: "What is the time complexity of Linear Search in the worst case?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 2,
      explanation: "In the worst case (target absent or at the end), every element must be checked — O(n).",
    },
    {
      question: "After one comparison in Binary Search, how much of the search space is eliminated?",
      options: ["A quarter", "A third", "Half", "None, it just moves forward by one"],
      correctIndex: 2,
      explanation: "Comparing against the middle element always eliminates one full half of the remaining range.",
    },
    {
      question: "Why is 'mid = low + (high - low) / 2' preferred over 'mid = (low + high) / 2'?",
      options: [
        "It's faster to compute",
        "It avoids potential integer overflow when low and high are both large",
        "It gives a different (more correct) answer",
        "There's no difference, it's just a style preference",
      ],
      correctIndex: 1,
      explanation: "low + high could overflow a 32-bit int if both are large; the alternate form avoids that risk.",
    },
    {
      question: "If Binary Search's search range has LOW > HIGH, what does that mean?",
      options: [
        "The target was found",
        "There's a bug in the implementation",
        "The target does not exist in the array",
        "The array needs to be re-sorted",
      ],
      correctIndex: 2,
      explanation: "LOW crossing past HIGH means the entire range has been eliminated without a match — the target isn't present.",
    },
  ],
};
