export default [
  {
    topicSlug: "sorting",
    slug: "sort-an-array",
    title: "Sort an Array (Ascending)",
    difficulty: "Easy",
    statement:
      "Given n integers, print them sorted in ascending order, space-separated.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n5 2 4 1 3", output: "1 2 3 4 5", explanation: "Standard ascending sort." }],
    constraints: ["1 <= n <= 10^4"],
    hints: ["Implement any sort you like — Bubble, Selection, or Insertion Sort."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void sortArray(int[] arr) {
        // TODO: implement a sorting algorithm (Bubble/Selection/Insertion) in place
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        sortArray(arr);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `def sort_array(arr):
    # TODO: implement a sorting algorithm (Bubble/Selection/Insertion) in place
    pass

n = int(input().strip())
arr = list(map(int, input().split()))
sort_array(arr)
print(" ".join(map(str, arr)))
`,
      c: `#include <stdio.h>

void sortArray(int *arr, int n) {
    // TODO: implement a sorting algorithm (Bubble/Selection/Insertion) in place
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    sortArray(arr, n);

    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void sortArray(vector<int> &arr) {
    // TODO: implement a sorting algorithm (Bubble/Selection/Insertion) in place
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    sortArray(arr);

    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      javascript: `function sortArray(arr) {
  // TODO: implement a sorting algorithm (Bubble/Selection/Insertion) in place
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
sortArray(arr);
console.log(arr.join(" "));
`,
    },
    testCases: [
      { input: "5\n5 2 4 1 3", expectedOutput: "1 2 3 4 5", hidden: false },
      { input: "1\n7", expectedOutput: "7", hidden: false },
      { input: "6\n9 8 7 6 5 4", expectedOutput: "4 5 6 7 8 9", hidden: true },
    ],
  },
  {
    topicSlug: "sorting",
    slug: "count-inversions",
    title: "Count Inversions",
    difficulty: "Medium",
    statement:
      "An inversion is a pair (i, j) with i < j and arr[i] > arr[j]. Given n integers, count the " +
      "total number of inversions.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [
      { input: "5\n2 4 1 3 5", output: "3", explanation: "Inversions: (2,1), (4,1), (4,3)." },
    ],
    constraints: ["1 <= n <= 10^4"],
    hints: [
      "A brute force O(n²) double loop works but is slow for large n.",
      "A modified Merge Sort counts inversions in O(n log n) — count cross-inversions during the merge step.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static long countInversions(int[] arr) {
        // TODO: implement (brute force O(n^2) or merge-sort based O(n log n))
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        System.out.println(countInversions(arr));
    }
}`,
      python: `def count_inversions(arr):
    # TODO: implement (brute force O(n^2) or merge-sort based O(n log n))
    return 0

n = int(input().strip())
arr = list(map(int, input().split()))
print(count_inversions(arr))
`,
      c: `#include <stdio.h>

long countInversions(int *arr, int n) {
    // TODO: implement (brute force O(n^2) or merge-sort based O(n log n))
    return 0;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%ld\\n", countInversions(arr, n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long countInversions(vector<int> &arr) {
    // TODO: implement (brute force O(n^2) or merge-sort based O(n log n))
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << countInversions(arr) << endl;
    return 0;
}
`,
      javascript: `function countInversions(arr) {
  // TODO: implement (brute force O(n^2) or merge-sort based O(n log n))
  return 0;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
console.log(countInversions(arr));
`,
    },
    testCases: [
      { input: "5\n2 4 1 3 5", expectedOutput: "3", hidden: false },
      { input: "3\n1 2 3", expectedOutput: "0", hidden: false },
      { input: "4\n4 3 2 1", expectedOutput: "6", hidden: true },
    ],
  },
  {
    topicSlug: "sorting",
    slug: "kth-smallest-element",
    title: "Kth Smallest Element",
    difficulty: "Medium",
    statement:
      "Given n integers and an integer k, find the kth smallest element (1-indexed) in the array.\n\n" +
      "Input format: first line is n and k space-separated, second line has n space-separated integers.",
    examples: [{ input: "6 3\n7 10 4 3 20 15", output: "7", explanation: "Sorted: 3 4 7 10 15 20 — the 3rd smallest is 7." }],
    constraints: ["1 <= k <= n <= 10^5"],
    hints: ["Sorting the array and indexing arr[k-1] is the simplest correct approach."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int kthSmallest(int[] arr, int k) {
        // TODO: implement (sort then index, or a selection algorithm)
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int k = Integer.parseInt(first.nextToken());

        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        System.out.println(kthSmallest(arr, k));
    }
}`,
      python: `def kth_smallest(arr, k):
    # TODO: implement (sort then index, or a selection algorithm)
    return -1

first_line = input().split()
n, k = int(first_line[0]), int(first_line[1])
arr = list(map(int, input().split()))
print(kth_smallest(arr, k))
`,
      c: `#include <stdio.h>

int kthSmallest(int *arr, int n, int k) {
    // TODO: implement (sort then index, or a selection algorithm)
    return -1;
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\\n", kthSmallest(arr, n, k));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int kthSmallest(vector<int> &arr, int k) {
    // TODO: implement (sort then index, or a selection algorithm)
    return -1;
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << kthSmallest(arr, k) << endl;
    return 0;
}
`,
      javascript: `function kthSmallest(arr, k) {
  // TODO: implement (sort then index, or a selection algorithm)
  return -1;
}

const [n, k] = readLine().trim().split(/\\s+/).map(Number);
const arr = readLine().trim().split(/\\s+/).map(Number);
console.log(kthSmallest(arr, k));
`,
    },
    testCases: [
      { input: "6 3\n7 10 4 3 20 15", expectedOutput: "7", hidden: false },
      { input: "1 1\n42", expectedOutput: "42", hidden: false },
      { input: "5 5\n5 4 3 2 1", expectedOutput: "5", hidden: true },
    ],
  },
  {
    topicSlug: "sorting",
    slug: "merge-sort-implementation",
    title: "Implement Merge Sort",
    difficulty: "Hard",
    statement:
      "Implement Merge Sort from scratch (no built-in sort functions) to sort n integers in " +
      "ascending order.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "6\n38 27 43 3 9 82", output: "3 9 27 38 43 82" }],
    constraints: ["1 <= n <= 10^5", "You may not call any built-in sort function"],
    hints: [
      "Recursively split the array into two halves until each half has 1 element.",
      "Merge two sorted halves by comparing their front elements one at a time.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void mergeSort(int[] arr, int left, int right) {
        // TODO: implement recursive merge sort (no built-in sort functions)
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        mergeSort(arr, 0, n - 1);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `def merge_sort(arr, left, right):
    # TODO: implement recursive merge sort (no built-in sort functions)
    pass

n = int(input().strip())
arr = list(map(int, input().split()))
merge_sort(arr, 0, n - 1)
print(" ".join(map(str, arr)))
`,
      c: `#include <stdio.h>

void mergeSort(int *arr, int left, int right) {
    // TODO: implement recursive merge sort (no built-in sort functions)
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    mergeSort(arr, 0, n - 1);

    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void mergeSort(vector<int> &arr, int left, int right) {
    // TODO: implement recursive merge sort (no built-in sort functions)
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    mergeSort(arr, 0, n - 1);

    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      javascript: `function mergeSort(arr, left, right) {
  // TODO: implement recursive merge sort (no built-in sort functions)
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
mergeSort(arr, 0, n - 1);
console.log(arr.join(" "));
`,
    },
    testCases: [
      { input: "6\n38 27 43 3 9 82", expectedOutput: "3 9 27 38 43 82", hidden: false },
      { input: "1\n1", expectedOutput: "1", hidden: false },
      { input: "8\n5 5 5 1 1 9 0 3", expectedOutput: "0 1 1 3 5 5 5 9", hidden: true },
    ],
  },
];
