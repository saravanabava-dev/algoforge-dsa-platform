export default {
  slug: "sorting",
  title: "Sorting Algorithms",
  module: "MODULE 9 — SEARCHING & SORTING",
  order: 9,
  visualizerType: "SortingVisualizer",
  prerequisites: [],

  whatIsIt:
    "Sorting means rearranging a collection of elements into a defined order — usually ascending or " +
    "descending numeric order, or alphabetical order for text. It is one of the most fundamental " +
    "operations in computing: databases sort rows, search engines sort results by relevance, and " +
    "many other algorithms (like binary search) only work correctly on sorted data.",

  whyNeeded:
    "Different sorting algorithms trade off differently between speed, memory use, and stability " +
    "(whether equal elements keep their original relative order). Bubble, Insertion and Selection " +
    "Sort are simple to understand and good for small or nearly-sorted data. Merge Sort and Quick " +
    "Sort scale to large datasets using the divide-and-conquer strategy. Understanding *why* each " +
    "algorithm has its complexity is one of the most-tested DSA fundamentals in interviews and exams.",

  howItWorks:
    "Comparison-based sorts repeatedly compare pairs of elements and swap or place them until the " +
    "whole collection is ordered. Bubble Sort repeatedly walks the array, swapping adjacent " +
    "out-of-order pairs, so the largest unsorted element 'bubbles' to the end each pass. Selection " +
    "Sort repeatedly selects the minimum of the unsorted portion and swaps it into place. Insertion " +
    "Sort grows a sorted prefix one element at a time, inserting each new element where it belongs. " +
    "Merge Sort recursively splits the array in half, sorts each half, then merges the two sorted " +
    "halves back together. Quick Sort picks a pivot, partitions the array so smaller elements are on " +
    "one side and larger on the other, then recursively sorts each side.",

  example:
    "Sorting [5, 2, 4, 1] with Bubble Sort: Pass 1 compares (5,2)->swap, (5,4)->swap, (5,1)->swap: " +
    "[2, 4, 1, 5]. Pass 2: (2,4) no swap, (4,1)->swap: [2, 1, 4, 5]. Pass 3: (2,1)->swap: " +
    "[1, 2, 4, 5]. Sorted in 3 passes.",

  codeExamples: [
    {
      language: "java",
      explanation: "Bubble Sort — the simplest sorting algorithm to learn: repeatedly swap adjacent out-of-order pairs.",
      code: `public class BubbleSort {
    static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break; // already sorted, stop early
        }
    }
}`,
    },
    {
      language: "python",
      explanation: "Bubble Sort in Python — same algorithm, same early-exit optimization when no swaps occur.",
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # already sorted, stop early
    return arr`,
    },
    {
      language: "c",
      explanation: "Bubble Sort in C, operating directly on the array in place.",
      code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break; // already sorted, stop early
    }
}`,
    },
    {
      language: "cpp",
      explanation: "Bubble Sort in C++, using std::swap for the exchange step.",
      code: `#include <algorithm>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // already sorted, stop early
    }
}`,
    },
    {
      language: "javascript",
      explanation: "Bubble Sort in JavaScript, sorting an array in place.",
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted, stop early
  }
  return arr;
}`,
    },
    {
      language: "java",
      explanation: "Merge Sort — O(n log n) divide-and-conquer sort, stable and predictable.",
      code: `public class MergeSort {
    static void sort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        sort(arr, left, mid);
        sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}`,
    },
    {
      language: "java",
      explanation: "Quick Sort — O(n log n) average case, sorts in place using a pivot and partitioning.",
      code: `public class QuickSort {
    static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            sort(arr, low, pivotIndex - 1);
            sort(arr, pivotIndex + 1, high);
        }
    }

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }
}`,
    },
  ],

  complexity: {
    time: "Varies by algorithm: O(n²) for Bubble/Selection/Insertion, O(n log n) for Merge/Quick Sort",
    space: "O(1) for Bubble/Selection/Insertion/Quick Sort (in-place), O(n) for Merge Sort",
    best: "O(n) for Insertion Sort on nearly-sorted data, O(n log n) for Merge/Quick Sort",
    average: "O(n²) for simple sorts, O(n log n) for Merge/Quick Sort",
    worst: "O(n²) for Bubble/Selection/Insertion Sort and worst-case Quick Sort, O(n log n) for Merge Sort",
  },

  quiz: [
    {
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctIndex: 2,
      explanation: "Bubble Sort compares every pair in the worst case (reverse-sorted input), giving O(n²).",
    },
    {
      question: "Which sorting algorithm guarantees O(n log n) even in the worst case?",
      options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Selection Sort"],
      correctIndex: 2,
      explanation: "Merge Sort always splits in half and merges in linear time, giving O(n log n) worst case. Quick Sort can degrade to O(n²) with a bad pivot choice.",
    },
    {
      question: "Merge Sort uses which algorithmic strategy?",
      options: ["Greedy", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
      correctIndex: 1,
      explanation: "Merge Sort divides the array into halves, conquers (sorts) each recursively, then combines them.",
    },
    {
      question: "What extra space does Merge Sort typically require?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctIndex: 2,
      explanation: "Merge Sort needs a temporary array to merge two sorted halves, giving O(n) auxiliary space.",
    },
    {
      question: "In Quick Sort, what does the 'partition' step do?",
      options: [
        "Splits the array exactly in half regardless of values",
        "Rearranges elements so smaller ones are left of the pivot, larger to the right",
        "Merges two sorted halves",
        "Counts the number of inversions",
      ],
      correctIndex: 1,
      explanation: "Partitioning places the pivot in its correct sorted position with smaller elements to its left and larger to its right.",
    },
  ],
};
