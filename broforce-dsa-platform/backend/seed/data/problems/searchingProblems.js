export default [
  {
    topicSlug: "searching",
    slug: "linear-search",
    title: "Linear Search",
    difficulty: "Easy",
    statement:
      "Given n integers and a target value, find the index of the target using linear search. " +
      "Print the index (0-indexed), or -1 if not found.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is the target.",
    examples: [{ input: "5\n4 2 9 7 1\n7", output: "3" }],
    constraints: ["1 <= n <= 10^5"],
    hints: ["Check each element from left to right; return the first index where it matches."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int linearSearch(int[] arr, int target) {
        // TODO: return the index of target, or -1 if not found
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());
        System.out.println(linearSearch(arr, target));
    }
}`,
      python: `def linear_search(arr, target):
    # TODO: return the index of target, or -1 if not found
    return -1

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
print(linear_search(arr, target))
`,
      c: `#include <stdio.h>

int linearSearch(int *arr, int n, int target) {
    // TODO: return the index of target, or -1 if not found
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\\n", linearSearch(arr, n, target));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int linearSearch(vector<int> &arr, int target) {
    // TODO: return the index of target, or -1 if not found
    return -1;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    cout << linearSearch(arr, target) << endl;
    return 0;
}
`,
      javascript: `function linearSearch(arr, target) {
  // TODO: return the index of target, or -1 if not found
  return -1;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
console.log(linearSearch(arr, target));
`,
    },
    testCases: [
      { input: "5\n4 2 9 7 1\n7", expectedOutput: "3", hidden: false },
      { input: "3\n1 2 3\n5", expectedOutput: "-1", hidden: false },
      { input: "1\n9\n9", expectedOutput: "0", hidden: true },
    ],
  },
  {
    topicSlug: "searching",
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    statement:
      "Given n integers in ascending sorted order and a target value, find the index of the target " +
      "using binary search. Print the index (0-indexed), or -1 if not found.\n\n" +
      "Input format: first line is n, second line has n space-separated sorted integers, third line " +
      "is the target.",
    examples: [{ input: "7\n2 5 8 12 16 23 38\n23", output: "5" }],
    constraints: ["1 <= n <= 10^6", "The array is sorted ascending"],
    hints: [
      "Maintain low and high pointers spanning the search range.",
      "Compare the middle element to the target and eliminate half the range each step.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int binarySearch(int[] arr, int target) {
        // TODO: implement binary search, return the index or -1
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());
        System.out.println(binarySearch(arr, target));
    }
}`,
      python: `def binary_search(arr, target):
    # TODO: implement binary search, return the index or -1
    return -1

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
print(binary_search(arr, target))
`,
      c: `#include <stdio.h>

int binarySearch(int *arr, int n, int target) {
    // TODO: implement binary search, return the index or -1
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\\n", binarySearch(arr, n, target));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int binarySearch(vector<int> &arr, int target) {
    // TODO: implement binary search, return the index or -1
    return -1;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    cout << binarySearch(arr, target) << endl;
    return 0;
}
`,
      javascript: `function binarySearch(arr, target) {
  // TODO: implement binary search, return the index or -1
  return -1;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
console.log(binarySearch(arr, target));
`,
    },
    testCases: [
      { input: "7\n2 5 8 12 16 23 38\n23", expectedOutput: "5", hidden: false },
      { input: "4\n1 3 5 7\n4", expectedOutput: "-1", hidden: false },
      { input: "1\n10\n10", expectedOutput: "0", hidden: true },
    ],
  },
  {
    topicSlug: "searching",
    slug: "first-and-last-occurrence",
    title: "First and Last Occurrence",
    difficulty: "Medium",
    statement:
      "Given n integers in ascending sorted order (which may contain duplicates) and a target value, " +
      "find the first and last index at which the target occurs. Print both indices space-separated " +
      "(first, then last), or '-1 -1' if the target isn't present.\n\n" +
      "Input format: first line is n, second line has n space-separated sorted integers, third line " +
      "is the target.",
    examples: [{ input: "8\n1 2 2 2 3 4 4 5\n2", output: "1 3" }],
    constraints: ["1 <= n <= 10^5", "Expected time complexity: O(log n)"],
    hints: [
      "Run a modified binary search that, upon finding the target, keeps searching left for the first occurrence.",
      "Run a second modified binary search that keeps searching right for the last occurrence.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int[] firstAndLast(int[] arr, int target) {
        // TODO: return {firstIndex, lastIndex}, or {-1, -1} if not found. Aim for O(log n).
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());
        int[] result = firstAndLast(arr, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
      python: `def first_and_last(arr, target):
    # TODO: return (first_index, last_index), or (-1, -1) if not found. Aim for O(log n).
    return (-1, -1)

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
first, last = first_and_last(arr, target)
print(first, last)
`,
      c: `#include <stdio.h>

void firstAndLast(int *arr, int n, int target, int *first, int *last) {
    // TODO: set *first and *last, or both -1 if not found. Aim for O(log n).
    *first = -1;
    *last = -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    int first, last;
    firstAndLast(arr, n, target, &first, &last);
    printf("%d %d\\n", first, last);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

pair<int,int> firstAndLast(vector<int> &arr, int target) {
    // TODO: return {firstIndex, lastIndex}, or {-1, -1} if not found. Aim for O(log n).
    return {-1, -1};
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    auto [first, last] = firstAndLast(arr, target);
    cout << first << " " << last << endl;
    return 0;
}
`,
      javascript: `function firstAndLast(arr, target) {
  // TODO: return [firstIndex, lastIndex], or [-1, -1] if not found. Aim for O(log n).
  return [-1, -1];
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
const [first, last] = firstAndLast(arr, target);
console.log(first + " " + last);
`,
    },
    testCases: [
      { input: "8\n1 2 2 2 3 4 4 5\n2", expectedOutput: "1 3", hidden: false },
      { input: "5\n1 2 3 4 5\n6", expectedOutput: "-1 -1", hidden: false },
      { input: "6\n5 5 5 5 5 5\n5", expectedOutput: "0 5", hidden: true },
    ],
  },
  {
    topicSlug: "searching",
    slug: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "Medium",
    statement:
      "Given n integers in ascending sorted order and a target value, return the index where the " +
      "target is found, or the index where it would be inserted to keep the array sorted if it " +
      "isn't present.\n\n" +
      "Input format: first line is n, second line has n space-separated sorted integers, third line " +
      "is the target.",
    examples: [
      { input: "4\n1 3 5 6\n5", output: "2", explanation: "5 is present at index 2." },
      { input: "4\n1 3 5 6\n2", output: "1", explanation: "2 isn't present; it belongs at index 1 to keep order." },
    ],
    constraints: ["1 <= n <= 10^5", "Expected time complexity: O(log n)"],
    hints: ["This is a binary search where, instead of returning -1 on failure, you return where 'low' ends up — that's exactly the correct insertion point."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int searchInsert(int[] arr, int target) {
        // TODO: binary search; if not found, return the insertion index (where 'low' ends up)
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());
        System.out.println(searchInsert(arr, target));
    }
}`,
      python: `def search_insert(arr, target):
    # TODO: binary search; if not found, return the insertion index (where 'low' ends up)
    return 0

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
print(search_insert(arr, target))
`,
      c: `#include <stdio.h>

int searchInsert(int *arr, int n, int target) {
    // TODO: binary search; if not found, return the insertion index (where 'low' ends up)
    return 0;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\\n", searchInsert(arr, n, target));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int searchInsert(vector<int> &arr, int target) {
    // TODO: binary search; if not found, return the insertion index (where 'low' ends up)
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    cout << searchInsert(arr, target) << endl;
    return 0;
}
`,
      javascript: `function searchInsert(arr, target) {
  // TODO: binary search; if not found, return the insertion index (where 'low' ends up)
  return 0;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
console.log(searchInsert(arr, target));
`,
    },
    testCases: [
      { input: "4\n1 3 5 6\n5", expectedOutput: "2", hidden: false },
      { input: "4\n1 3 5 6\n2", expectedOutput: "1", hidden: false },
      { input: "4\n1 3 5 6\n7", expectedOutput: "4", hidden: true },
    ],
  },
  {
    topicSlug: "searching",
    slug: "search-in-rotated-sorted-array",
    title: "Search in a Rotated Sorted Array",
    difficulty: "Hard",
    statement:
      "An ascending sorted array has been rotated at some unknown pivot (e.g. [4,5,6,7,0,1,2] was " +
      "[0,1,2,4,5,6,7] rotated). Given the rotated array and a target, find its index in O(log n) " +
      "time, or -1 if not present.\n\n" +
      "Input format: first line is n, second line has n space-separated integers (the rotated " +
      "array, all values distinct), third line is the target.",
    examples: [{ input: "7\n4 5 6 7 0 1 2\n0", output: "4" }],
    constraints: ["1 <= n <= 10^5", "All values are distinct", "Expected time complexity: O(log n)"],
    hints: [
      "At every step of binary search, at least one half (low..mid or mid..high) is guaranteed to be normally sorted — figure out which one.",
      "If the target falls within that sorted half's value range, search there; otherwise search the other half.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int search(int[] arr, int target) {
        // TODO: modified binary search for a rotated sorted array, O(log n)
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());
        System.out.println(search(arr, target));
    }
}`,
      python: `def search(arr, target):
    # TODO: modified binary search for a rotated sorted array, O(log n)
    return -1

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
print(search(arr, target))
`,
      c: `#include <stdio.h>

int search(int *arr, int n, int target) {
    // TODO: modified binary search for a rotated sorted array, O(log n)
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\\n", search(arr, n, target));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int search(vector<int> &arr, int target) {
    // TODO: modified binary search for a rotated sorted array, O(log n)
    return -1;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    cout << search(arr, target) << endl;
    return 0;
}
`,
      javascript: `function search(arr, target) {
  // TODO: modified binary search for a rotated sorted array, O(log n)
  return -1;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
console.log(search(arr, target));
`,
    },
    testCases: [
      { input: "7\n4 5 6 7 0 1 2\n0", expectedOutput: "4", hidden: false },
      { input: "7\n4 5 6 7 0 1 2\n3", expectedOutput: "-1", hidden: false },
      { input: "1\n1\n1", expectedOutput: "0", hidden: true },
    ],
  },
];
