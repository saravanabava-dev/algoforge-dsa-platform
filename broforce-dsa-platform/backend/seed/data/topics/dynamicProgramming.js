export default {
  slug: "dynamic-programming",
  title: "Dynamic Programming",
  module: "MODULE 12 — DYNAMIC PROGRAMMING",
  order: 16,
  visualizerType: "DPVisualizer",
  prerequisites: [],

  whatIsIt:
    "Dynamic Programming (DP) solves a problem by breaking it into smaller OVERLAPPING subproblems, " +
    "solving each one once, and reusing that answer every time it's needed again — instead of " +
    "recomputing it from scratch. It applies when a problem has OPTIMAL SUBSTRUCTURE (the best " +
    "answer to the whole problem is built from the best answers to its subproblems) and " +
    "OVERLAPPING SUBPROBLEMS (the same smaller subproblem shows up again and again during a naive " +
    "recursive solution).",

  whyNeeded:
    "Plain recursion re-solves the same subproblem exponentially many times. Naive recursive " +
    "Fibonacci, for example, is O(2^n) because F(5) calls F(4) and F(3), and F(4) ALSO calls F(3) " +
    "independently, recomputing it entirely. DP notices this waste and fixes it, often turning an " +
    "exponential algorithm into a polynomial one — Fibonacci with DP is O(n). This single idea " +
    "unlocks efficient solutions to problems that would otherwise be computationally infeasible: " +
    "shortest paths, edit distance between strings, optimal resource allocation (Knapsack), and " +
    "many more.",

  howItWorks:
    "There are two equivalent ways to apply DP. MEMOIZATION (top-down) keeps the natural recursive " +
    "structure, but caches each subproblem's answer the first time it's computed, so repeat calls " +
    "return instantly instead of recomputing. TABULATION (bottom-up) instead builds a table " +
    "iteratively from the smallest subproblems upward — compute F(0) and F(1) first, then use them " +
    "to compute F(2), then F(3), and so on, never using recursion at all. Both approaches compute " +
    "each subproblem exactly once; tabulation is often preferred in practice because it avoids " +
    "recursive call-stack overhead entirely.",

  example:
    "Naive recursive Fibonacci F(5) makes 15 calls total, with F(3) computed twice, F(2) computed " +
    "three times, and F(1) computed five times — all wasted, repeated work.\n" +
    "DP tabulation instead builds a table left to right, computing each value exactly once:\n" +
    "F(0)=0, F(1)=1, F(2)=F(1)+F(0)=1, F(3)=F(2)+F(1)=2, F(4)=F(3)+F(2)=3, F(5)=F(4)+F(3)=5.\n" +
    "5 additions total instead of 15 recursive calls — and the gap only widens as n grows.",

  codeExamples: [
    {
      language: "java",
      explanation: "Fibonacci — naive exponential recursion vs. O(n) DP tabulation, side by side.",
      code: `public class Fibonacci {
    // O(2^n) — recomputes the same values over and over
    static int fibNaive(int n) {
        if (n <= 1) return n;
        return fibNaive(n - 1) + fibNaive(n - 2);
    }

    // O(n) time, O(n) space — each value computed exactly once
    static int fibDP(int n) {
        if (n <= 1) return n;
        int[] table = new int[n + 1];
        table[0] = 0;
        table[1] = 1;
        for (int i = 2; i <= n; i++) {
            table[i] = table[i - 1] + table[i - 2];
        }
        return table[n];
    }

    // O(n) time, O(1) space — only the last two values are ever needed
    static int fibDPOptimized(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
}`,
    },
    {
      language: "java",
      explanation: "0/1 Knapsack — classic 2D DP table: for each item, either skip it or take it, whichever gives more value.",
      code: `public class Knapsack {
    static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w]; // option 1: skip item i
                if (weights[i - 1] <= w) {
                    // option 2: take item i, if it fits
                    dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        return dp[n][capacity];
    }
}`,
    },
  ],

  complexity: {
    time: "Varies by problem: O(n) for 1D DP like Fibonacci, O(n*m) for 2D DP like Knapsack or LCS",
    space: "O(n) to O(n*m) for the DP table, often reducible to O(1) or O(n) with rolling-array optimization",
    best: "O(n) — simple 1D DP",
    average: "O(n*m) — 2D DP over two dimensions (e.g. items x capacity, or two string lengths)",
    worst: "Depends on the state space — DP trades time for space, so the 'worst case' is really about how large the table needs to be",
  },

  quiz: [
    {
      question: "What are the two properties a problem needs for Dynamic Programming to apply?",
      options: [
        "Sortedness and symmetry",
        "Optimal substructure and overlapping subproblems",
        "Convexity and monotonicity",
        "Uniqueness and continuity",
      ],
      correctIndex: 1,
      explanation: "DP works when the best answer is built from best sub-answers (optimal substructure), and those sub-answers repeat (overlapping subproblems).",
    },
    {
      question: "What's the key difference between memoization and tabulation?",
      options: [
        "They solve different problems entirely",
        "Memoization is top-down with recursion + caching; tabulation is bottom-up, building a table iteratively",
        "Tabulation is always slower",
        "Memoization doesn't use extra memory",
      ],
      correctIndex: 1,
      explanation: "Both avoid recomputation, but memoization keeps the recursive call structure while tabulation replaces it with a loop.",
    },
    {
      question: "Why is naive recursive Fibonacci O(2^n)?",
      options: [
        "Because addition is slow",
        "Because it recomputes the same F(k) values repeatedly across different call branches",
        "Because it uses too much memory",
        "It isn't — it's actually O(n)",
      ],
      correctIndex: 1,
      explanation: "Without caching, F(n-1) and F(n-2) each independently recompute many of the same smaller values.",
    },
    {
      question: "In the space-optimized Fibonacci (O(1) space), why only two variables instead of a full array?",
      options: [
        "Because Fibonacci numbers are always small",
        "Because computing F(i) only ever needs F(i-1) and F(i-2), not the entire history",
        "It's a mistake — you actually need the full array",
        "Because Java doesn't support arrays",
      ],
      correctIndex: 1,
      explanation: "Once F(i) is computed, F(i-2) is never needed again, so only the two most recent values need to be kept.",
    },
    {
      question: "In the 0/1 Knapsack DP table, what does dp[i][w] represent?",
      options: [
        "The weight of item i",
        "The maximum value achievable using the first i items with capacity w",
        "Whether item i was selected",
        "The total number of items",
      ],
      correctIndex: 1,
      explanation: "Each cell holds the best value obtainable considering only the first i items within a w-capacity knapsack.",
    },
  ],
};
