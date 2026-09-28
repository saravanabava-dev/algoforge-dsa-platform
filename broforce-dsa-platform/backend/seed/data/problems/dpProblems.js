export default [
  {
    topicSlug: "dynamic-programming",
    slug: "fibonacci-dp",
    title: "Fibonacci Number (DP)",
    difficulty: "Easy",
    statement:
      "Given n, compute the nth Fibonacci number (F(0)=0, F(1)=1) using Dynamic Programming — not " +
      "naive recursion. Print F(n).\n\n" +
      "Input format: a single line containing n.",
    examples: [{ input: "10", output: "55" }],
    constraints: ["0 <= n <= 40"],
    hints: ["Build a table from F(0) and F(1) upward, or keep just the last two values for O(1) space."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static long fib(int n) {
        if (n <= 1) return n;
        long prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            long current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        System.out.println(fib(n));
    }
}`,
      python: `def fib(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1

n = int(input().strip())
print(fib(n))
`,
      c: `#include <stdio.h>

long fib(int n) {
    if (n <= 1) return n;
    long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%ld\\n", fib(n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long fib(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long long current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}
`,
      javascript: `function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

const n = Number(readLine().trim());
console.log(fib(n));
`,
    },
    testCases: [
      { input: "10", expectedOutput: "55", hidden: false },
      { input: "0", expectedOutput: "0", hidden: false },
      { input: "1", expectedOutput: "1", hidden: true },
    ],
  },
  {
    topicSlug: "dynamic-programming",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Medium",
    statement:
      "You are climbing a staircase with n steps. Each time you can climb either 1 or 2 steps. In " +
      "how many distinct ways can you reach the top?\n\n" +
      "Input format: a single line containing n.",
    examples: [{ input: "4", output: "5", explanation: "1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2" }],
    constraints: ["1 <= n <= 45"],
    hints: ["The number of ways to reach step n is ways(n-1) + ways(n-2) — this is exactly the Fibonacci recurrence in disguise."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static long climbStairs(int n) {
        if (n <= 2) return n;
        long prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            long current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        System.out.println(climbStairs(n));
    }
}`,
      python: `def climb_stairs(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1

n = int(input().strip())
print(climb_stairs(n))
`,
      c: `#include <stdio.h>

long climbStairs(int n) {
    if (n <= 2) return n;
    long prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        long current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%ld\\n", climbStairs(n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long climbStairs(int n) {
    if (n <= 2) return n;
    long long prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        long long current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

int main() {
    int n;
    cin >> n;
    cout << climbStairs(n) << endl;
    return 0;
}
`,
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

const n = Number(readLine().trim());
console.log(climbStairs(n));
`,
    },
    testCases: [
      { input: "4", expectedOutput: "5", hidden: false },
      { input: "1", expectedOutput: "1", hidden: false },
      { input: "5", expectedOutput: "8", hidden: true },
    ],
  },
  {
    topicSlug: "dynamic-programming",
    slug: "01-knapsack",
    title: "0/1 Knapsack",
    difficulty: "Hard",
    statement:
      "Given n items, each with a weight and a value, and a knapsack of capacity W, find the " +
      "maximum total value achievable without exceeding the capacity. Each item may be taken at " +
      "most once (0/1 — take it or don't).\n\n" +
      "Input format: first line has n and W space-separated, second line has n space-separated " +
      "weights, third line has n space-separated values.",
    examples: [{ input: "3 4\n1 3 4\n1500 2000 3000", output: "3500" }],
    constraints: ["1 <= n <= 100", "1 <= W <= 1000"],
    hints: [
      "Build a 2D table dp[i][w] = best value using the first i items with capacity w.",
      "For each item, the answer is the better of skipping it (dp[i-1][w]) or taking it if it fits (dp[i-1][w-weight] + value).",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w];
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        return dp[n][capacity];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int capacity = Integer.parseInt(first.nextToken());

        int[] weights = new int[n];
        StringTokenizer wt = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) weights[i] = Integer.parseInt(wt.nextToken());

        int[] values = new int[n];
        StringTokenizer vt = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) values[i] = Integer.parseInt(vt.nextToken());

        System.out.println(knapsack(weights, values, capacity));
    }
}`,
      python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i - 1][w]
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
    return dp[n][capacity]

first_line = input().split()
n, capacity = int(first_line[0]), int(first_line[1])
weights = list(map(int, input().split()))
values = list(map(int, input().split()))
print(knapsack(weights, values, capacity))
`,
      c: `#include <stdio.h>

int main() {
    int n, capacity;
    scanf("%d %d", &n, &capacity);
    int weights[n], values[n];
    for (int i = 0; i < n; i++) scanf("%d", &weights[i]);
    for (int i = 0; i < n; i++) scanf("%d", &values[i]);

    int dp[n + 1][capacity + 1];
    for (int w = 0; w <= capacity; w++) dp[0][w] = 0;

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            if (weights[i - 1] <= w) {
                int taken = dp[i - 1][w - weights[i - 1]] + values[i - 1];
                if (taken > dp[i][w]) dp[i][w] = taken;
            }
        }
    }
    printf("%d\\n", dp[n][capacity]);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, capacity;
    cin >> n >> capacity;
    vector<int> weights(n), values(n);
    for (int i = 0; i < n; i++) cin >> weights[i];
    for (int i = 0; i < n; i++) cin >> values[i];

    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    cout << dp[n][capacity] << endl;
    return 0;
}
`,
      javascript: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w];
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}

const [n, capacity] = readLine().trim().split(/\\s+/).map(Number);
const weights = readLine().trim().split(/\\s+/).map(Number);
const values = readLine().trim().split(/\\s+/).map(Number);
console.log(knapsack(weights, values, capacity));
`,
    },
    testCases: [
      { input: "3 4\n1 3 4\n1500 2000 3000", expectedOutput: "3500", hidden: false },
      { input: "1 10\n5\n100", expectedOutput: "100", hidden: false },
      { input: "3 0\n1 2 3\n10 20 30", expectedOutput: "0", hidden: true },
    ],
  },
];
