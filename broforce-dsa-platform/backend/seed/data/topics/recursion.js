export default {
  slug: "recursion",
  title: "Recursion",
  module: "MODULE 13 — RECURSION",
  order: 13,
  visualizerType: "RecursionVisualizer",
  prerequisites: [],

  whatIsIt:
    "Recursion is when a function solves a problem by calling itself on a smaller version of the " +
    "same problem. Every recursive function needs two parts: a BASE CASE — a simple version of the " +
    "problem the function can answer directly, without recursing further — and a RECURSIVE CASE, " +
    "where the function calls itself with input that is closer to the base case. Without a base " +
    "case (or a bug that never reaches it), a recursive function calls itself forever, eventually " +
    "crashing with a stack overflow.",

  whyNeeded:
    "Some problems are naturally defined in terms of smaller versions of themselves — factorial, " +
    "Fibonacci, tree traversal, and many divide-and-conquer algorithms (Merge Sort, Quick Sort, " +
    "Binary Search). Recursion often expresses these solutions far more simply and readably than an " +
    "equivalent loop-based version would, especially for tree and graph structures where the 'size' " +
    "of the remaining problem isn't a simple countdown. Understanding recursion is also a " +
    "prerequisite for Backtracking and Dynamic Programming, both of which are built directly on top " +
    "of recursive thinking.",

  howItWorks:
    "Each call to a recursive function gets its own entry on the CALL STACK, holding that call's " +
    "local variables and the point it should resume at once its recursive call returns. Calling " +
    "factorial(4) pushes a frame for factorial(4), which calls factorial(3), pushing another frame, " +
    "and so on down to factorial(0) — the base case, which returns immediately without recursing " +
    "further. Then the stack unwinds: factorial(0) returns 1 to factorial(1), which computes " +
    "1 * 1 = 1 and returns to factorial(2), which computes 2 * 1 = 2, and so on back up to " +
    "factorial(4) returning 24. The maximum depth of this stack is why very deep recursion (tens of " +
    "thousands of calls) can overflow the stack, while an equivalent loop would use constant memory.",

  example:
    "factorial(4):\n" +
    "  factorial(4) calls factorial(3)\n" +
    "    factorial(3) calls factorial(2)\n" +
    "      factorial(2) calls factorial(1)\n" +
    "        factorial(1) calls factorial(0)\n" +
    "          factorial(0) returns 1   <- base case\n" +
    "        factorial(1) returns 1 * 1 = 1\n" +
    "      factorial(2) returns 2 * 1 = 2\n" +
    "    factorial(3) returns 3 * 2 = 6\n" +
    "  factorial(4) returns 4 * 6 = 24",

  codeExamples: [
    {
      language: "java",
      explanation: "Factorial — the classic first recursion example, with a clear base case and recursive case.",
      code: `public class Factorial {
    static long factorial(int n) {
        if (n == 0) return 1;           // base case
        return n * factorial(n - 1);    // recursive case
    }
}`,
    },
    {
      language: "python",
      explanation: "The same factorial function in Python.",
      code: `def factorial(n):
    if n == 0:
        return 1  # base case
    return n * factorial(n - 1)  # recursive case
`,
    },
    {
      language: "cpp",
      explanation: "Factorial in C++.",
      code: `long long factorial(int n) {
    if (n == 0) return 1;           // base case
    return n * factorial(n - 1);    // recursive case
}`,
    },
    {
      language: "c",
      explanation: "Factorial in C.",
      code: `long long factorial(int n) {
    if (n == 0) return 1;           /* base case */
    return n * factorial(n - 1);    /* recursive case */
}`,
    },
    {
      language: "javascript",
      explanation: "Factorial in JavaScript.",
      code: `function factorial(n) {
  if (n === 0) return 1;          // base case
  return n * factorial(n - 1);    // recursive case
}`,
    },
  ],

  complexity: {
    time: "Depends on the recursion: O(n) for factorial/linear recursion, O(2^n) for naive Fibonacci (many repeated calls), O(log n) for divide-and-conquer that halves the problem each call",
    space: "O(depth of recursion) for the call stack — O(n) for factorial, O(log n) for balanced divide-and-conquer",
    best: "O(1) — the base case itself",
    average: "Matches the recursion's branching pattern — see time complexity above",
    worst: "Can hit a stack overflow if the base case is never reached or recursion depth is very large",
  },

  quiz: [
    {
      question: "What are the two essential parts of every recursive function?",
      options: [
        "A loop and a variable",
        "A base case and a recursive case",
        "An array and an index",
        "A class and a method",
      ],
      correctIndex: 1,
      explanation: "The base case stops the recursion; the recursive case moves the problem closer to it.",
    },
    {
      question: "What happens if a recursive function never reaches its base case?",
      options: [
        "It returns 0",
        "It automatically stops after one call",
        "It keeps calling itself until the call stack overflows",
        "Nothing — Java/Python/C++ prevent this automatically",
      ],
      correctIndex: 2,
      explanation: "Without a reachable base case, each call pushes another stack frame indefinitely, eventually crashing with a stack overflow.",
    },
    {
      question: "In factorial(4), which call resolves FIRST (returns a value first)?",
      options: ["factorial(4)", "factorial(0)", "factorial(3)", "They all return at the same time"],
      correctIndex: 1,
      explanation: "The base case factorial(0) is the innermost call and is the first to return — everything else is waiting on it.",
    },
    {
      question: "What does each recursive call add to?",
      options: ["A hash table", "The call stack", "A queue", "A linked list"],
      correctIndex: 1,
      explanation: "Every function call — recursive or not — pushes a new frame onto the program's call stack.",
    },
    {
      question: "Which topics are typically built directly on recursive thinking?",
      options: [
        "Only sorting algorithms",
        "Backtracking and Dynamic Programming",
        "Only hash tables",
        "Only linked lists",
      ],
      correctIndex: 1,
      explanation: "Backtracking is recursion with undo; Dynamic Programming is recursion with cached/reused results.",
    },
  ],
};
