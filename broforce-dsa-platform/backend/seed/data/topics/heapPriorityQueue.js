export default {
  slug: "heap-priority-queue",
  title: "Heap / Priority Queue",
  module: "MODULE 11 — HEAP",
  order: 10,
  visualizerType: "HeapVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Heap is a complete binary tree stored in an array, obeying the HEAP PROPERTY: in a MAX-HEAP, " +
    "every parent is greater than or equal to its children (so the maximum is always at the root); " +
    "a MIN-HEAP is the mirror image. A Priority Queue is the abstract data type a heap is almost " +
    "always used to implement: elements come out in priority order, not arrival order.",

  whyNeeded:
    "Many problems need fast access to 'the current best/worst item' while the collection keeps " +
    "changing — task schedulers picking the highest-priority job, Dijkstra's algorithm always " +
    "expanding the closest unvisited node, or finding the 'k largest elements' in a stream. A sorted " +
    "array gives O(1) access to the max but O(n) insertion. A heap gives O(log n) for both insert and " +
    "extract-max — the best practical trade-off for this exact use case.",

  howItWorks:
    "Because a heap is a COMPLETE binary tree, it can be stored compactly in an array with no " +
    "pointers: for a node at index i, its children are at 2i+1 and 2i+2, and its parent is at " +
    "(i-1)/2. INSERT appends the new value at the end of the array, then 'sifts up' — repeatedly " +
    "swapping with its parent while it's larger (max-heap) than the parent, until the heap property " +
    "is restored. EXTRACT-MAX removes the root (the max), moves the LAST element into the root's " +
    "position, then 'sifts down' — repeatedly swapping with its larger child until the heap property " +
    "is restored again. Both operations touch at most the height of the tree, which is O(log n) for " +
    "n elements.",

  example:
    "Max-heap [50, 30, 40, 10, 20]. INSERT 60: append -> [50,30,40,10,20,60], sift up: 60 > parent " +
    "40 (index 2) -> swap -> [50,30,60,10,20,40], 60 > parent 50 (root) -> swap -> " +
    "[60,30,50,10,20,40]. Now 60 is correctly at the root.\n" +
    "EXTRACT-MAX from [60,30,50,10,20,40]: remove 60, move last (40) to root -> " +
    "[40,30,50,10,20], sift down: 40 < larger child 50 (index 2) -> swap -> [50,30,40,10,20]. " +
    "Heap property restored.",

  codeExamples: [
    {
      language: "java",
      explanation: "Java's built-in PriorityQueue is a min-heap by default; a Comparator flips it to a max-heap.",
      code: `import java.util.*;

public class HeapDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

        maxHeap.offer(50);
        maxHeap.offer(30);
        maxHeap.offer(40);
        maxHeap.offer(10);
        maxHeap.offer(20);

        System.out.println("Max: " + maxHeap.peek()); // 50
        System.out.println("Extracted: " + maxHeap.poll()); // removes and returns 50
        System.out.println("New max: " + maxHeap.peek()); // 40
    }
}`,
    },
    {
      language: "java",
      explanation: "A max-heap implemented from scratch on an array, showing sift-up and sift-down explicitly.",
      code: `import java.util.*;

public class MaxHeap {
    private List<Integer> heap = new ArrayList<>();

    public void insert(int value) {
        heap.add(value);
        siftUp(heap.size() - 1);
    }

    private void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (heap.get(parent) >= heap.get(i)) break;
            Collections.swap(heap, parent, i);
            i = parent;
        }
    }

    public int extractMax() {
        int max = heap.get(0);
        int last = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, last);
            siftDown(0);
        }
        return max;
    }

    private void siftDown(int i) {
        int n = heap.size();
        while (true) {
            int largest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && heap.get(left) > heap.get(largest)) largest = left;
            if (right < n && heap.get(right) > heap.get(largest)) largest = right;
            if (largest == i) break;
            Collections.swap(heap, i, largest);
            i = largest;
        }
    }
}`,
    },
  ],

  complexity: {
    time: "Insert: O(log n). Extract-max/min: O(log n). Peek: O(1). Build heap from n elements: O(n)",
    space: "O(n) to store n elements",
    best: "O(1) — peek",
    average: "O(log n) — insert or extract",
    worst: "O(log n) — insert or extract (height of a complete binary tree)",
  },

  quiz: [
    {
      question: "In an array-based max-heap, where are the children of the node at index i?",
      options: ["i-1 and i+1", "2i+1 and 2i+2", "i/2 and i*2", "i+1 and i+2"],
      correctIndex: 1,
      explanation: "Complete binary tree indexing: left child = 2i+1, right child = 2i+2.",
    },
    {
      question: "What is the time complexity of inserting into a heap of n elements?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 1,
      explanation: "Sift-up touches at most the height of the tree, which is O(log n) for n elements.",
    },
    {
      question: "After extracting the max from a max-heap, what happens to restore the heap property?",
      options: [
        "The whole array is re-sorted",
        "The last element is moved to the root and sifted down",
        "Nothing — heaps don't need to be restored",
        "The heap is rebuilt from scratch",
      ],
      correctIndex: 1,
      explanation: "Moving the last element to the root and sifting it down is O(log n), far cheaper than a full re-sort.",
    },
    {
      question: "Which algorithm classically uses a min-heap (priority queue) to always expand the closest unvisited node?",
      options: ["Binary Search", "Dijkstra's Algorithm", "Bubble Sort", "Depth-First Search"],
      correctIndex: 1,
      explanation: "Dijkstra's algorithm repeatedly extracts the minimum-distance node from a priority queue.",
    },
    {
      question: "Why is a heap preferred over a sorted array for a priority queue?",
      options: [
        "Heaps use less memory",
        "Insertion into a heap is O(log n), versus O(n) to keep an array fully sorted",
        "Heaps are always faster to search",
        "There's no real advantage",
      ],
      correctIndex: 1,
      explanation: "A heap only needs to maintain a weaker partial order, so insertion is much cheaper than full sorting.",
    },
  ],
};
