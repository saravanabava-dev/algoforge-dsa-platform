export default [
  {
    topicSlug: "arrays",
    slug: "find-maximum-element",
    title: "Find the Maximum Element",
    difficulty: "Easy",
    statement:
      "Given n integers, print the maximum value among them.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n3 7 2 9 4", output: "9" }],
    constraints: ["1 <= n <= 10^5"],
    hints: ["Track the largest value seen so far as you scan through the array once."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int findMax(int[] arr) {
        // TODO: return the maximum value in arr
        return Integer.MIN_VALUE;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        System.out.println(findMax(arr));
    }
}`,
      python: `def find_max(arr):
    # TODO: return the maximum value in arr
    return None

n = int(input().strip())
arr = list(map(int, input().split()))
print(find_max(arr))
`,
      c: `#include <stdio.h>
#include <limits.h>

int findMax(int *arr, int n) {
    // TODO: return the maximum value in arr
    return INT_MIN;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\\n", findMax(arr, n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int findMax(vector<int> &arr) {
    // TODO: return the maximum value in arr
    return INT_MIN;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << findMax(arr) << endl;
    return 0;
}
`,
      javascript: `function findMax(arr) {
  // TODO: return the maximum value in arr
  return -Infinity;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
console.log(findMax(arr));
`,
    },
    testCases: [
      { input: "5\n3 7 2 9 4", expectedOutput: "9", hidden: false },
      { input: "1\n42", expectedOutput: "42", hidden: false },
      { input: "4\n-5 -1 -9 -3", expectedOutput: "-1", hidden: true },
    ],
  },
  {
    topicSlug: "arrays",
    slug: "reverse-array-in-place",
    title: "Reverse an Array In Place",
    difficulty: "Easy",
    statement:
      "Given n integers, reverse the array and print the result, space-separated. Use the " +
      "two-pointer technique — do not use a library reverse function.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n1 2 3 4 5", output: "5 4 3 2 1" }],
    constraints: ["1 <= n <= 10^5", "Do not call a built-in reverse function"],
    hints: [
      "Use two pointers: one at the start, one at the end.",
      "Swap the elements they point to, then move both pointers toward the middle.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void reverse(int[] arr) {
        // TODO: reverse arr in place using two pointers, no library reverse
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        reverse(arr);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `def reverse(arr):
    # TODO: reverse arr in place using two pointers, no built-in reverse/slicing trick
    pass

n = int(input().strip())
arr = list(map(int, input().split()))
reverse(arr)
print(" ".join(map(str, arr)))
`,
      c: `#include <stdio.h>

void reverse(int *arr, int n) {
    // TODO: reverse arr in place using two pointers
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    reverse(arr, n);

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

void reverseArr(vector<int> &arr) {
    // TODO: reverse arr in place using two pointers, no std::reverse
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    reverseArr(arr);

    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      javascript: `function reverse(arr) {
  // TODO: reverse arr in place using two pointers, no .reverse()
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
reverse(arr);
console.log(arr.join(" "));
`,
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", hidden: false },
      { input: "1\n9", expectedOutput: "9", hidden: false },
      { input: "4\n10 20 30 40", expectedOutput: "40 30 20 10", hidden: true },
    ],
  },
  {
    topicSlug: "arrays",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Medium",
    statement:
      "Given n integers and a target value, find the indices of the two numbers that add up to the " +
      "target. Print the two indices (0-indexed) in ascending order, space-separated. Assume exactly " +
      "one valid answer exists, and you may not use the same element twice.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is the target.",
    examples: [{ input: "4\n2 7 11 15\n9", output: "0 1", explanation: "arr[0] + arr[1] = 2 + 7 = 9." }],
    constraints: ["2 <= n <= 10^5", "Exactly one valid answer exists"],
    hints: [
      "A brute-force double loop works in O(n²) but is slow for large n.",
      "A hash map from value to index lets you check 'have I seen target - arr[i] before?' in O(1) per element, giving O(n) overall.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int[] twoSum(int[] arr, int target) {
        // TODO: return the two indices whose values sum to target, ascending order
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());

        int[] result = twoSum(arr, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
      python: `def two_sum(arr, target):
    # TODO: return a tuple (i, j), i < j, whose values sum to target
    return (-1, -1)

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
i, j = two_sum(arr, target)
print(i, j)
`,
      c: `#include <stdio.h>

// TODO: implement Two Sum. Write the two indices into *outI and *outJ.
void twoSum(int *arr, int n, int target, int *outI, int *outJ) {
    *outI = -1;
    *outJ = -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);

    int i, j;
    twoSum(arr, n, target, &i, &j);
    printf("%d %d\\n", i, j);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

pair<int,int> twoSum(vector<int> &arr, int target) {
    // TODO: return the two indices (i, j), i < j, whose values sum to target
    return {-1, -1};
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;

    auto [i, j] = twoSum(arr, target);
    cout << i << " " << j << endl;
    return 0;
}
`,
      javascript: `function twoSum(arr, target) {
  // TODO: return [i, j], i < j, whose values sum to target
  return [-1, -1];
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
const [i, j] = twoSum(arr, target);
console.log(i + " " + j);
`,
    },
    testCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "0 1", hidden: false },
      { input: "3\n3 2 4\n6", expectedOutput: "1 2", hidden: false },
      { input: "5\n1 5 3 8 2\n10", expectedOutput: "3 4", hidden: true },
    ],
  },
  {
    topicSlug: "arrays",
    slug: "move-zeroes",
    title: "Move Zeroes",
    difficulty: "Medium",
    statement:
      "Given n integers, move all zeroes to the end while keeping the relative order of the " +
      "non-zero elements the same. Do this in place, then print the resulting array space-separated.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "6\n0 1 0 3 12 0", output: "1 3 12 0 0 0" }],
    constraints: ["1 <= n <= 10^5"],
    hints: [
      "Keep a 'write pointer' for the next position to place a non-zero value.",
      "Scan left to right; whenever you see a non-zero value, place it at the write pointer and advance it.",
      "After the scan, fill everything from the write pointer to the end with zeroes.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void moveZeroes(int[] arr) {
        // TODO: move all zeroes to the end in place, preserving relative order
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        moveZeroes(arr);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `def move_zeroes(arr):
    # TODO: move all zeroes to the end in place, preserving relative order
    pass

n = int(input().strip())
arr = list(map(int, input().split()))
move_zeroes(arr)
print(" ".join(map(str, arr)))
`,
      c: `#include <stdio.h>

void moveZeroes(int *arr, int n) {
    // TODO: move all zeroes to the end in place, preserving relative order
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    moveZeroes(arr, n);

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

void moveZeroes(vector<int> &arr) {
    // TODO: move all zeroes to the end in place, preserving relative order
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    moveZeroes(arr);

    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      javascript: `function moveZeroes(arr) {
  // TODO: move all zeroes to the end in place, preserving relative order
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
moveZeroes(arr);
console.log(arr.join(" "));
`,
    },
    testCases: [
      { input: "6\n0 1 0 3 12 0", expectedOutput: "1 3 12 0 0 0", hidden: false },
      { input: "3\n0 0 1", expectedOutput: "1 0 0", hidden: false },
      { input: "4\n1 2 3 4", expectedOutput: "1 2 3 4", hidden: true },
    ],
  },
  {
    topicSlug: "arrays",
    slug: "rotate-array",
    title: "Rotate Array",
    difficulty: "Hard",
    statement:
      "Given n integers and an integer k, rotate the array to the right by k steps, then print the " +
      "result space-separated.\n\n" +
      "Input format: first line has n and k space-separated, second line has n space-separated integers.",
    examples: [{ input: "7 3\n1 2 3 4 5 6 7", output: "5 6 7 1 2 3 4" }],
    constraints: ["1 <= n <= 10^5", "0 <= k <= 10^5 (k may be larger than n)"],
    hints: [
      "First reduce k to k % n, since rotating by n steps returns the array to its original order.",
      "One O(n) extra-space approach: build the result directly by placing arr[i] at position (i + k) % n.",
      "A trickier O(1) extra-space approach: reverse the whole array, then reverse each of the two parts separately.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void rotate(int[] arr, int k) {
        // TODO: rotate arr right by k steps in place (remember k % arr.length)
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int k = Integer.parseInt(first.nextToken());

        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        rotate(arr, k);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `def rotate(arr, k):
    # TODO: rotate arr right by k steps in place (remember k % len(arr))
    pass

first_line = input().split()
n, k = int(first_line[0]), int(first_line[1])
arr = list(map(int, input().split()))
rotate(arr, k)
print(" ".join(map(str, arr)))
`,
      c: `#include <stdio.h>

void rotate(int *arr, int n, int k) {
    // TODO: rotate arr right by k steps in place (remember k % n)
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    rotate(arr, n, k);

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

void rotate(vector<int> &arr, int k) {
    // TODO: rotate arr right by k steps in place (remember k % arr.size())
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    rotate(arr, k);

    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      javascript: `function rotate(arr, k) {
  // TODO: rotate arr right by k steps in place (remember k % arr.length)
}

const [n, k] = readLine().trim().split(/\\s+/).map(Number);
const arr = readLine().trim().split(/\\s+/).map(Number);
rotate(arr, k);
console.log(arr.join(" "));
`,
    },
    testCases: [
      { input: "7 3\n1 2 3 4 5 6 7", expectedOutput: "5 6 7 1 2 3 4", hidden: false },
      { input: "4 0\n1 2 3 4", expectedOutput: "1 2 3 4", hidden: false },
      { input: "3 4\n1 2 3", expectedOutput: "3 1 2", hidden: true },
    ],
  },
];
