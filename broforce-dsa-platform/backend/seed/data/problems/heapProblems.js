export default [
  {
    topicSlug: "heap-priority-queue",
    slug: "heap-operations-simulation",
    title: "Heap Operations Simulation",
    difficulty: "Easy",
    statement:
      "Simulate a max-heap. Process q operations: 'insert x' adds x to the heap; 'extractMax' " +
      "removes and prints the maximum (or 'Empty' if the heap is empty); 'peek' prints the maximum " +
      "without removing it (or 'Empty').\n\n" +
      "Input format: first line is q, followed by q operation lines.",
    examples: [{ input: "5\ninsert 30\ninsert 50\npeek\nextractMax\npeek", output: "50\n50\n30" }],
    constraints: ["1 <= q <= 10^4"],
    hints: ["A binary heap keeps insert and extract at O(log n) by sifting up/down instead of re-sorting."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = Integer.parseInt(sc.nextLine().trim());
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        StringBuilder out = new StringBuilder();

        for (int i = 0; i < q; i++) {
            String line = sc.nextLine().trim();
            if (line.startsWith("insert")) {
                heap.offer(Integer.parseInt(line.split(" ")[1]));
            } else if (line.equals("extractMax")) {
                out.append(heap.isEmpty() ? "Empty" : heap.poll()).append("\\n");
            } else if (line.equals("peek")) {
                out.append(heap.isEmpty() ? "Empty" : heap.peek()).append("\\n");
            }
        }
        System.out.print(out);
    }
}`,
      python: `import heapq
import sys

def main():
    data = sys.stdin.read().split("\\n")
    q = int(data[0].strip())
    heap = []  # store negatives to simulate a max-heap with heapq's min-heap
    out = []
    for i in range(1, q + 1):
        line = data[i].strip()
        if line.startswith("insert"):
            x = int(line.split()[1])
            heapq.heappush(heap, -x)
        elif line == "extractMax":
            out.append(str(-heapq.heappop(heap)) if heap else "Empty")
        elif line == "peek":
            out.append(str(-heap[0]) if heap else "Empty")
    print("\\n".join(out))

main()
`,
      c: `#include <stdio.h>

// Simple array-based max-heap.
int heap[10005], size = 0;

void siftUp(int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[parent] >= heap[i]) break;
        int t = heap[parent]; heap[parent] = heap[i]; heap[i] = t;
        i = parent;
    }
}

void siftDown(int i) {
    while (1) {
        int largest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < size && heap[left] > heap[largest]) largest = left;
        if (right < size && heap[right] > heap[largest]) largest = right;
        if (largest == i) break;
        int t = heap[i]; heap[i] = heap[largest]; heap[largest] = t;
        i = largest;
    }
}

void insert(int x) {
    heap[size] = x;
    siftUp(size);
    size++;
}

int extractMax() {
    int max = heap[0];
    heap[0] = heap[size - 1];
    size--;
    siftDown(0);
    return max;
}

int main() {
    int q;
    scanf("%d", &q);
    getchar();
    char line[64];
    for (int i = 0; i < q; i++) {
        fgets(line, sizeof(line), stdin);
        if (line[0] == 'i') {
            int x;
            sscanf(line + 7, "%d", &x);
            insert(x);
        } else if (line[0] == 'e') {
            if (size == 0) printf("Empty\\n");
            else printf("%d\\n", extractMax());
        } else if (line[0] == 'p') {
            if (size == 0) printf("Empty\\n");
            else printf("%d\\n", heap[0]);
        }
    }
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    cin >> q;
    cin.ignore();
    priority_queue<int> heap;

    for (int i = 0; i < q; i++) {
        string line;
        getline(cin, line);
        if (line.substr(0, 6) == "insert") {
            int x = stoi(line.substr(7));
            heap.push(x);
        } else if (line == "extractMax") {
            if (heap.empty()) cout << "Empty" << endl;
            else { cout << heap.top() << endl; heap.pop(); }
        } else if (line == "peek") {
            cout << (heap.empty() ? "Empty" : to_string(heap.top())) << endl;
        }
    }
    return 0;
}
`,
      javascript: `class MaxHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  peek() { return this.data[0]; }

  insert(x) {
    this.data.push(x);
    let i = this.data.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent] >= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  extractMax() {
    const max = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      const n = this.data.length;
      while (true) {
        let largest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < n && this.data[left] > this.data[largest]) largest = left;
        if (right < n && this.data[right] > this.data[largest]) largest = right;
        if (largest === i) break;
        [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
        i = largest;
      }
    }
    return max;
  }
}

const q = Number(readLine().trim());
const heap = new MaxHeap();
const out = [];
for (let i = 0; i < q; i++) {
  const line = readLine().trim();
  if (line.startsWith("insert")) {
    heap.insert(Number(line.split(" ")[1]));
  } else if (line === "extractMax") {
    out.push(heap.size() === 0 ? "Empty" : String(heap.extractMax()));
  } else if (line === "peek") {
    out.push(heap.size() === 0 ? "Empty" : String(heap.peek()));
  }
}
console.log(out.join("\\n"));
`,
    },
    testCases: [
      { input: "5\ninsert 30\ninsert 50\npeek\nextractMax\npeek", expectedOutput: "50\n50\n30", hidden: false },
      { input: "2\nextractMax\npeek", expectedOutput: "Empty\nEmpty", hidden: false },
      { input: "6\ninsert 5\ninsert 15\ninsert 10\nextractMax\nextractMax\nextractMax", expectedOutput: "15\n10\n5", hidden: true },
    ],
  },
  {
    topicSlug: "heap-priority-queue",
    slug: "kth-largest-element",
    title: "Kth Largest Element",
    difficulty: "Medium",
    statement:
      "Given n integers and an integer k, find the kth largest element using a heap-based approach " +
      "(not a full sort).\n\n" +
      "Input format: first line is n and k space-separated, second line has n space-separated integers.",
    examples: [{ input: "6 2\n3 2 1 5 6 4", output: "5" }],
    constraints: ["1 <= k <= n <= 10^5"],
    hints: ["Maintain a min-heap of size k as you scan the array; the heap's root ends up being the kth largest."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int findKthLargest(int[] arr, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int x : arr) {
            minHeap.offer(x);
            if (minHeap.size() > k) minHeap.poll();
        }
        return minHeap.peek();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int k = Integer.parseInt(first.nextToken());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        System.out.println(findKthLargest(arr, k));
    }
}`,
      python: `import heapq

def find_kth_largest(arr, k):
    min_heap = []
    for x in arr:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]

first = input().split()
n, k = int(first[0]), int(first[1])
arr = list(map(int, input().split()))
print(find_kth_largest(arr, k))
`,
      c: `#include <stdio.h>

// Simple min-heap of fixed capacity k.
int heap[100005], size = 0;

void siftUp(int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[parent] <= heap[i]) break;
        int t = heap[parent]; heap[parent] = heap[i]; heap[i] = t;
        i = parent;
    }
}

void siftDown(int i) {
    while (1) {
        int smallest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < size && heap[left] < heap[smallest]) smallest = left;
        if (right < size && heap[right] < heap[smallest]) smallest = right;
        if (smallest == i) break;
        int t = heap[i]; heap[i] = heap[smallest]; heap[smallest] = t;
        i = smallest;
    }
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        heap[size] = x;
        siftUp(size);
        size++;
        if (size > k) {
            heap[0] = heap[size - 1];
            size--;
            siftDown(0);
        }
    }
    printf("%d\\n", heap[0]);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int findKthLargest(vector<int> &arr, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : arr) {
        minHeap.push(x);
        if ((int)minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << findKthLargest(arr, k) << endl;
    return 0;
}
`,
      javascript: `// Small binary min-heap for this problem.
class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  peek() { return this.data[0]; }

  push(x) {
    this.data.push(x);
    let i = this.data.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent] <= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0, n = this.data.length;
      while (true) {
        let smallest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < n && this.data[left] < this.data[smallest]) smallest = left;
        if (right < n && this.data[right] < this.data[smallest]) smallest = right;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      }
    }
    return top;
  }
}

function findKthLargest(arr, k) {
  const heap = new MinHeap();
  for (const x of arr) {
    heap.push(x);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

const [n, k] = readLine().trim().split(/\\s+/).map(Number);
const arr = readLine().trim().split(/\\s+/).map(Number);
console.log(findKthLargest(arr, k));
`,
    },
    testCases: [
      { input: "6 2\n3 2 1 5 6 4", expectedOutput: "5", hidden: false },
      { input: "5 1\n7 7 7 7 7", expectedOutput: "7", hidden: false },
      { input: "4 4\n8 1 3 5", expectedOutput: "1", hidden: true },
    ],
  },
  {
    topicSlug: "heap-priority-queue",
    slug: "sort-nearly-sorted-array",
    title: "Sort a Nearly Sorted (K-Sorted) Array",
    difficulty: "Hard",
    statement:
      "Given n integers where each element is at most k positions away from its correct sorted " +
      "position, sort the array efficiently — better than a general O(n log n) sort would need to " +
      "assume. Print the sorted array space-separated.\n\n" +
      "Input format: first line has n and k space-separated, second line has n space-separated integers.",
    examples: [{ input: "6 3\n6 5 3 2 8 10", output: "2 3 5 6 8 10" }],
    constraints: ["0 <= k < n <= 10^5"],
    hints: [
      "Keep a min-heap of size k+1. Push the first k+1 elements.",
      "Then, for each remaining element: pop the heap's minimum (it's guaranteed correct for that output position), and push the new element.",
      "Finally, drain whatever remains in the heap in order.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int[] sortKSorted(int[] arr, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        int n = arr.length;
        int[] result = new int[n];
        int idx = 0;

        for (int i = 0; i < Math.min(k + 1, n); i++) minHeap.offer(arr[i]);

        for (int i = k + 1; i < n; i++) {
            result[idx++] = minHeap.poll();
            minHeap.offer(arr[i]);
        }
        while (!minHeap.isEmpty()) result[idx++] = minHeap.poll();

        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int k = Integer.parseInt(first.nextToken());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        int[] result = sortKSorted(arr, k);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { sb.append(result[i]); if (i < n - 1) sb.append(" "); }
        System.out.println(sb);
    }
}`,
      python: `import heapq

def sort_k_sorted(arr, k):
    n = len(arr)
    min_heap = arr[:k + 1]
    heapq.heapify(min_heap)
    result = []

    for i in range(k + 1, n):
        result.append(heapq.heappushpop(min_heap, arr[i]))
    while min_heap:
        result.append(heapq.heappop(min_heap))
    return result

first = input().split()
n, k = int(first[0]), int(first[1])
arr = list(map(int, input().split()))
print(" ".join(map(str, sort_k_sorted(arr, k))))
`,
      c: `#include <stdio.h>

int heap[100005], hsize = 0;

void siftUp(int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[parent] <= heap[i]) break;
        int t = heap[parent]; heap[parent] = heap[i]; heap[i] = t;
        i = parent;
    }
}
void siftDown(int i) {
    while (1) {
        int smallest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < hsize && heap[left] < heap[smallest]) smallest = left;
        if (right < hsize && heap[right] < heap[smallest]) smallest = right;
        if (smallest == i) break;
        int t = heap[i]; heap[i] = heap[smallest]; heap[smallest] = t;
        i = smallest;
    }
}
void push(int x) { heap[hsize] = x; siftUp(hsize); hsize++; }
int pop() { int top = heap[0]; heap[0] = heap[hsize - 1]; hsize--; siftDown(0); return top; }

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int limit = (k + 1 < n) ? k + 1 : n;
    for (int i = 0; i < limit; i++) push(arr[i]);

    int result[n], idx = 0;
    for (int i = k + 1; i < n; i++) {
        result[idx++] = pop();
        push(arr[i]);
    }
    while (hsize > 0) result[idx++] = pop();

    for (int i = 0; i < n; i++) printf("%d%s", result[i], i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> sortKSorted(vector<int> &arr, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int n = arr.size();
    vector<int> result;

    for (int i = 0; i < min(k + 1, n); i++) minHeap.push(arr[i]);
    for (int i = k + 1; i < n; i++) {
        result.push_back(minHeap.top()); minHeap.pop();
        minHeap.push(arr[i]);
    }
    while (!minHeap.empty()) { result.push_back(minHeap.top()); minHeap.pop(); }
    return result;
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    auto result = sortKSorted(arr, k);
    for (int i = 0; i < n; i++) cout << result[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      javascript: `class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  push(x) {
    this.data.push(x);
    let i = this.data.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent] <= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }
  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0, n = this.data.length;
      while (true) {
        let smallest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < n && this.data[left] < this.data[smallest]) smallest = left;
        if (right < n && this.data[right] < this.data[smallest]) smallest = right;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      }
    }
    return top;
  }
}

function sortKSorted(arr, k) {
  const heap = new MinHeap();
  const n = arr.length;
  const result = [];
  for (let i = 0; i < Math.min(k + 1, n); i++) heap.push(arr[i]);
  for (let i = k + 1; i < n; i++) {
    result.push(heap.pop());
    heap.push(arr[i]);
  }
  while (heap.size() > 0) result.push(heap.pop());
  return result;
}

const [n, k] = readLine().trim().split(/\\s+/).map(Number);
const arr = readLine().trim().split(/\\s+/).map(Number);
console.log(sortKSorted(arr, k).join(" "));
`,
    },
    testCases: [
      { input: "6 3\n6 5 3 2 8 10", expectedOutput: "2 3 5 6 8 10", hidden: false },
      { input: "1 0\n5", expectedOutput: "5", hidden: false },
      { input: "5 1\n2 1 4 3 5", expectedOutput: "1 2 3 4 5", hidden: true },
    ],
  },
];
