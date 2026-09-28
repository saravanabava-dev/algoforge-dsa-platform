export default [
  {
    topicSlug: "backtracking",
    slug: "generate-subsets",
    title: "Generate All Subsets",
    difficulty: "Easy",
    statement:
      "Given n distinct integers, print all possible subsets (the power set), one per line, each " +
      "printed as space-separated values in the order they appear in the input (empty subset prints " +
      "as an empty line). Print subsets in the order produced by: at each element, first the choice " +
      "of excluding it, then including it (standard backtracking order).\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "2\n1 2", output: "\n2\n1\n1 2" }],
    constraints: ["0 <= n <= 12"],
    hints: ["At each element, backtrack on two choices: exclude it, or include it — recurse on the remaining elements either way."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void generateSubsets(int[] arr, int index, List<Integer> current, List<List<Integer>> result) {
        // TODO: base case index == arr.length -> add a copy of current to result
        // recursive case: exclude arr[index], recurse; then include arr[index], recurse; backtrack
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        }

        List<List<Integer>> result = new ArrayList<>();
        generateSubsets(arr, 0, new ArrayList<>(), result);

        StringBuilder out = new StringBuilder();
        for (List<Integer> subset : result) {
            List<String> parts = new ArrayList<>();
            for (int v : subset) parts.add(String.valueOf(v));
            out.append(String.join(" ", parts)).append("\\n");
        }
        System.out.print(out.toString().replaceAll("\\\\n$", ""));
    }
}`,
      python: `def generate_subsets(arr, index, current, result):
    # TODO: base case index == len(arr) -> append a copy of current to result
    # recursive case: exclude arr[index], recurse; then include arr[index], recurse; backtrack
    pass

n = int(input().strip())
arr = list(map(int, input().split())) if n > 0 else []

result = []
generate_subsets(arr, 0, [], result)
print("\\n".join(" ".join(map(str, s)) for s in result))
`,
      c: `#include <stdio.h>

int arr[15], current[15];
void generateSubsets(int n, int index, int currentLen) {
    // TODO: base case index == n -> print 'current' (first currentLen items), space-separated
    // recursive case: exclude arr[index], recurse; then include arr[index], recurse; backtrack
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    generateSubsets(n, 0, 0);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void generateSubsets(vector<int> &arr, int index, vector<int> &current, vector<vector<int>> &result) {
    // TODO: base case index == arr.size() -> push a copy of current to result
    // recursive case: exclude arr[index], recurse; then include arr[index], recurse; backtrack
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    vector<vector<int>> result;
    vector<int> current;
    generateSubsets(arr, 0, current, result);

    for (auto &s : result) {
        for (int i = 0; i < (int)s.size(); i++) cout << s[i] << (i + 1 < (int)s.size() ? " " : "");
        cout << "\\n";
    }
    return 0;
}
`,
      javascript: `function generateSubsets(arr, index, current, result) {
  // TODO: base case index === arr.length -> push a copy of current to result
  // recursive case: exclude arr[index], recurse; then include arr[index], recurse; backtrack
}

const n = Number(readLine().trim());
const arr = n > 0 ? readLine().trim().split(/\\s+/).map(Number) : [];

const result = [];
generateSubsets(arr, 0, [], result);
console.log(result.map(s => s.join(" ")).join("\\n"));
`,
    },
    testCases: [
      { input: "2\n1 2", expectedOutput: "\n2\n1\n1 2", hidden: false },
      { input: "1\n5", expectedOutput: "\n5", hidden: false },
{ input: "0\n", expectedOutput: "\n", hidden: true },    ],
  },
  {
    topicSlug: "backtracking",
    slug: "generate-permutations",
    title: "Generate All Permutations",
    difficulty: "Medium",
    statement:
      "Given n distinct integers, print every permutation, one per line, space-separated, generated " +
      "in standard backtracking order (swap-based): at each position, try each remaining unused " +
      "value in its original relative order.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "3\n1 2 3", output: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 2 1\n3 1 2" }],
    constraints: ["1 <= n <= 7"],
    hints: ["At each position, try swapping in each not-yet-used value, recurse on the rest, then swap back (backtrack)."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static void permute(int[] arr, int start, StringBuilder out) {
        // TODO: base case start == arr.length -> append the permutation as a line
        // recursive case: for i from start to end, swap(start,i), recurse(start+1), swap back
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        StringBuilder out = new StringBuilder();
        permute(arr, 0, out);
        System.out.print(out.toString().replaceAll("\\\\n$", ""));
    }
}`,
      python: `def permute(arr, start, result):
    # TODO: base case start == len(arr) -> append a copy of arr (as list) to result
    # recursive case: for i from start to end, swap(start,i), recurse(start+1), swap back
    pass

n = int(input().strip())
arr = list(map(int, input().split()))

result = []
permute(arr, 0, result)
print("\\n".join(" ".join(map(str, p)) for p in result))
`,
      c: `#include <stdio.h>

int arr[10];
void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void permute(int n, int start) {
    // TODO: base case start == n -> print arr[0..n-1] space-separated
    // recursive case: for i from start to n-1, swap(start,i), recurse(start+1), swap back
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    permute(n, 0);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void permute(vector<int> &arr, int start, vector<vector<int>> &result) {
    // TODO: base case start == arr.size() -> push a copy of arr to result
    // recursive case: for i from start to end, swap(start,i), recurse(start+1), swap back
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    vector<vector<int>> result;
    permute(arr, 0, result);
    for (auto &p : result) {
        for (int i = 0; i < (int)p.size(); i++) cout << p[i] << (i + 1 < (int)p.size() ? " " : "");
        cout << "\\n";
    }
    return 0;
}
`,
      javascript: `function permute(arr, start, result) {
  // TODO: base case start === arr.length -> push a copy of arr to result
  // recursive case: for i from start to end, swap(start,i), recurse(start+1), swap back
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);

const result = [];
permute(arr, 0, result);
console.log(result.map(p => p.join(" ")).join("\\n"));
`,
    },
    testCases: [
      { input: "3\n1 2 3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 2 1\n3 1 2", hidden: false },
      { input: "1\n5", expectedOutput: "5", hidden: false },
      { input: "2\n1 2", expectedOutput: "1 2\n2 1", hidden: true },
    ],
  },
  {
    topicSlug: "backtracking",
    slug: "n-queens-count",
    title: "N-Queens — Count Solutions",
    difficulty: "Hard",
    statement:
      "Given an integer n, count the number of distinct ways to place n queens on an n x n " +
      "chessboard so that no two queens attack each other (same row, column, or diagonal). Print the " +
      "count.\n\n" +
      "Input format: a single integer n.",
    examples: [{ input: "4", output: "2" }, { input: "1", output: "1" }],
    constraints: ["1 <= n <= 9"],
    hints: [
      "Place one queen per row; track which columns are used so far in an array.",
      "Before placing at (row, col), check every previously placed queen for same column or same diagonal (|row difference| == |col difference|).",
      "When row reaches n, a full valid placement has been found — increment the count and backtrack to look for more.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int count = 0;

    static boolean isSafe(int[] cols, int row, int col) {
        // TODO: return false if any previous row shares this column or a diagonal
        return true;
    }

    static void solve(int[] cols, int row, int n) {
        // TODO: base case row == n -> count++; otherwise try each column, place if safe, recurse, backtrack
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        solve(new int[n], 0, n);
        System.out.println(count);
    }
}`,
      python: `count = 0

def is_safe(cols, row, col):
    # TODO: return False if any previous row shares this column or a diagonal
    return True

def solve(cols, row, n):
    global count
    # TODO: base case row == n -> count += 1; otherwise try each column, place if safe, recurse, backtrack
    pass

n = int(input().strip())
solve([0] * n, 0, n)
print(count)
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int count = 0;

int isSafe(int *cols, int row, int col) {
    // TODO: return 0 if any previous row shares this column or a diagonal
    return 1;
}

void solve(int *cols, int row, int n) {
    // TODO: base case row == n -> count++; otherwise try each column, place if safe, recurse, backtrack
}

int main() {
    int n;
    scanf("%d", &n);
    int *cols = malloc(n * sizeof(int));
    solve(cols, 0, n);
    printf("%d\\n", count);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int count_ = 0;

bool isSafe(vector<int> &cols, int row, int col) {
    // TODO: return false if any previous row shares this column or a diagonal
    return true;
}

void solve(vector<int> &cols, int row, int n) {
    // TODO: base case row == n -> count_++; otherwise try each column, place if safe, recurse, backtrack
}

int main() {
    int n;
    cin >> n;
    vector<int> cols(n);
    solve(cols, 0, n);
    cout << count_ << endl;
    return 0;
}
`,
      javascript: `let count = 0;

function isSafe(cols, row, col) {
  // TODO: return false if any previous row shares this column or a diagonal
  return true;
}

function solve(cols, row, n) {
  // TODO: base case row === n -> count++; otherwise try each column, place if safe, recurse, backtrack
}

const n = Number(readLine().trim());
solve(new Array(n), 0, n);
console.log(count);
`,
    },
    testCases: [
      { input: "4", expectedOutput: "2", hidden: false },
      { input: "1", expectedOutput: "1", hidden: false },
      { input: "8", expectedOutput: "92", hidden: true },
    ],
  },
];
