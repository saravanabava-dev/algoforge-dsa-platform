export default {
  slug: "greedy",
  title: "Greedy Algorithms",
  module: "MODULE 11 — GREEDY",
  order: 15,
  visualizerType: "GreedyVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Greedy algorithm builds a solution step by step, always making the choice that looks best " +
    "RIGHT NOW — the local optimum — without reconsidering earlier choices. It never backtracks. " +
    "The classic example is making change with the fewest coins: at each step, use the largest coin " +
    "that doesn't overshoot the remaining amount.",

  whyNeeded:
    "Greedy algorithms are simple and fast — typically O(n log n) or better, since there's no need " +
    "to explore multiple possibilities. When a problem has the right structure, greedy gives the " +
    "provably optimal answer with far less work than exhaustive search or dynamic programming. The " +
    "hard part is knowing WHEN greedy actually works — it doesn't always, and the classic exercise " +
    "in learning greedy is recognizing which problems have the right structure for it.",

  howItWorks:
    "A greedy algorithm needs two properties to guarantee a correct (optimal) answer: GREEDY CHOICE " +
    "PROPERTY (a locally optimal choice at each step leads to a globally optimal solution) and " +
    "OPTIMAL SUBSTRUCTURE (an optimal solution to the whole problem contains optimal solutions to " +
    "its subproblems). Coin change with 'nice' denominations (like 1, 2, 5, 10, 20, 50) has both " +
    "properties. But greedy can FAIL: with coins {1, 3, 4}, making 6 greedily picks 4, then 1, then " +
    "1, then 1 (four coins: 4+1+1... wait, 4+1+1=6, three coins), while the truly optimal answer is " +
    "3+3 (two coins) — greedy's 'obviously best' first pick wasn't actually optimal overall. This is " +
    "exactly why greedy needs to be proven correct for a given problem, not just assumed.",

  example:
    "Activity Selection: given activities with start/end times, pick the maximum number that don't " +
    "overlap. Activities: (1,4), (3,5), (0,6), (5,7), (8,9), (5,9).\n" +
    "Greedy strategy: sort by END time, then always pick the next activity whose start is >= the " +
    "last picked activity's end.\n" +
    "Sorted by end: (1,4), (3,5), (0,6), (5,7), (8,9), (5,9).\n" +
    "Pick (1,4) [end=4]. Next candidate must start >= 4: skip (3,5) [starts at 3], pick (0,6)? No — " +
    "(0,6) starts at 0 < 4, skip. Pick (5,7) [starts at 5 >= 4]. Next must start >= 7: pick (8,9).\n" +
    "Result: (1,4), (5,7), (8,9) — 3 non-overlapping activities, the maximum possible.",

  codeExamples: [
    {
      language: "java",
      explanation: "Coin Change (greedy) — fewest coins to make an amount, assuming denominations where greedy is optimal.",
      code: `import java.util.*;

public class CoinChangeGreedy {
    static List<Integer> makeChange(int amount, int[] coins) {
        // coins assumed sorted descending, e.g. {50, 20, 10, 5, 2, 1}
        List<Integer> used = new ArrayList<>();
        for (int coin : coins) {
            while (amount >= coin) {
                amount -= coin;
                used.add(coin);
            }
        }
        return used; // amount is now 0 if the denominations allow it
    }
}`,
    },
    {
      language: "java",
      explanation: "Activity Selection — maximum number of non-overlapping activities, sorted by end time.",
      code: `import java.util.*;

public class ActivitySelection {
    static int maxActivities(int[][] activities) {
        // each row is {start, end}
        Arrays.sort(activities, (a, b) -> a[1] - b[1]); // sort by end time

        int count = 1;
        int lastEnd = activities[0][1];

        for (int i = 1; i < activities.length; i++) {
            if (activities[i][0] >= lastEnd) {
                count++;
                lastEnd = activities[i][1];
            }
        }
        return count;
    }
}`,
    },
  ],

  complexity: {
    time: "Typically O(n log n) — dominated by sorting; the greedy pass itself is usually O(n)",
    space: "O(1) to O(n) depending on whether the result set needs to be stored",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },

  quiz: [
    {
      question: "What does a greedy algorithm do at each step?",
      options: [
        "Explores all possible choices before deciding",
        "Makes the locally optimal choice without reconsidering it later",
        "Always picks the smallest available option",
        "Randomly selects among valid choices",
      ],
      correctIndex: 1,
      explanation: "Greedy commits to the best-looking choice right now and never backtracks.",
    },
    {
      question: "What two properties does a problem need for greedy to guarantee the optimal answer?",
      options: [
        "Symmetry and monotonicity",
        "Greedy choice property and optimal substructure",
        "Sortedness and uniqueness",
        "Convexity and continuity",
      ],
      correctIndex: 1,
      explanation: "Without both properties, a greedy approach may find a solution, but not necessarily the optimal one.",
    },
    {
      question: "With coin denominations {1, 3, 4}, does greedy always give the fewest coins to make 6?",
      options: [
        "Yes, greedy always works for coin change",
        "No — greedy picks 4+1+1 (3 coins) but 3+3 (2 coins) is better",
        "No — greedy can't make 6 with these coins",
        "Yes, because 6 is even",
      ],
      correctIndex: 1,
      explanation: "This is the classic counterexample showing greedy coin change isn't always optimal — it depends on the denominations.",
    },
    {
      question: "In Activity Selection, why sort by END time rather than start time or duration?",
      options: [
        "It doesn't matter which you sort by",
        "Sorting by end time leaves the most room remaining for future activities",
        "Start time sorting is actually correct, not end time",
        "Sorting by duration is always correct",
      ],
      correctIndex: 1,
      explanation: "Picking the activity that finishes earliest maximizes the remaining time available for subsequent choices.",
    },
    {
      question: "What is the time complexity of a typical greedy algorithm that requires sorting first?",
      options: ["O(1)", "O(log n)", "O(n log n)", "O(2^n)"],
      correctIndex: 2,
      explanation: "The sort dominates the cost; the greedy selection pass afterward is usually a single O(n) scan.",
    },
  ],
};
