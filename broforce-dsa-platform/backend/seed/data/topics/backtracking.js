export default {
  slug: "backtracking",
  title: "Backtracking",
  module: "MODULE 14 — BACKTRACKING",
  order: 14,
  visualizerType: "BacktrackingVisualizer",
  prerequisites: ["recursion"],

  whatIsIt:
    "Backtracking is recursion with undo. It explores possible choices one at a time, and the moment " +
    "a choice can no longer lead to a valid solution, it UNDOES that choice ('backtracks') and tries " +
    "the next option instead. The core pattern at every step is: CHOOSE a candidate, EXPLORE forward " +
    "recursively, and if that path fails, UN-CHOOSE (backtrack) before trying the next candidate.",

  whyNeeded:
    "Many problems require searching through a huge space of possible arrangements — placing queens " +
    "on a chessboard so none attack each other, finding a path through a maze, generating all " +
    "subsets or permutations of a set, or solving a Sudoku grid. Trying every possibility with plain " +
    "brute force is often technically correct but wasteful; backtracking prunes entire branches of " +
    "the search the instant they're known to be invalid, which is usually the difference between a " +
    "solution that finishes instantly and one that never finishes at all.",

  howItWorks:
    "At each step, backtracking picks the next unassigned position and tries each candidate value " +
    "for it. Before recursing forward, it checks whether the candidate is actually valid given " +
    "everything chosen so far (a 'safety check') — if not, that candidate is REJECTED immediately, " +
    "without ever recursing into it. If valid, the algorithm PLACES the candidate and recurses to " +
    "the next position. If that recursive call eventually fails (every option below it also failed), " +
    "the algorithm UNDOES the placement (backtracks) and tries the next candidate at the current " +
    "position. This is exactly what the N-Queens visualization shows: place a queen, check if it's " +
    "attacked by any queen already placed, and if every column in a row leads to failure, back up to " +
    "the previous row and try its next column.",

  example:
    "Placing 4 queens on a 4x4 board so none share a row, column, or diagonal:\n" +
    "Row 0: place queen at column 0. Safe so far.\n" +
    "Row 1: column 0 attacked (same column), column 1 attacked (diagonal) — try column 2. Safe.\n" +
    "Row 2: every column is attacked given rows 0-1's placement — dead end.\n" +
    "BACKTRACK to row 1: try column 3 instead of column 2.\n" +
    "Row 2: column 1 is now safe.\n" +
    "Row 3: every column is attacked — dead end again. BACKTRACK further, eventually all the way " +
    "back to row 0, which then tries column 1 — from there, a full valid solution is found.",

  codeExamples: [
    {
      language: "java",
      explanation: "N-Queens — the classic backtracking example. isSafe() is the check that lets us reject early.",
      code: `public class NQueens {
    static boolean isSafe(int[] cols, int row, int col) {
        for (int r = 0; r < row; r++) {
            if (cols[r] == col || Math.abs(cols[r] - col) == Math.abs(r - row)) {
                return false; // same column, or same diagonal
            }
        }
        return true;
    }

    static boolean solve(int[] cols, int row, int n) {
        if (row == n) return true; // all queens placed successfully

        for (int col = 0; col < n; col++) {
            if (isSafe(cols, row, col)) {
                cols[row] = col;              // choose
                if (solve(cols, row + 1, n)) return true; // explore
                // implicit unchoose: next loop iteration overwrites cols[row]
            }
        }
        return false; // every column failed — backtrack to caller
    }
}`,
    },
    {
      language: "python",
      explanation: "The same N-Queens logic in Python.",
      code: `def is_safe(cols, row, col):
    for r in range(row):
        if cols[r] == col or abs(cols[r] - col) == abs(r - row):
            return False
    return True

def solve(cols, row, n):
    if row == n:
        return True
    for col in range(n):
        if is_safe(cols, row, col):
            cols[row] = col          # choose
            if solve(cols, row + 1, n):  # explore
                return True
            # implicit unchoose: cols[row] gets overwritten next iteration
    return False
`,
    },
    {
      language: "cpp",
      explanation: "N-Queens in C++.",
      code: `bool isSafe(vector<int> &cols, int row, int col) {
    for (int r = 0; r < row; r++) {
        if (cols[r] == col || abs(cols[r] - col) == abs(r - row)) return false;
    }
    return true;
}

bool solve(vector<int> &cols, int row, int n) {
    if (row == n) return true;
    for (int col = 0; col < n; col++) {
        if (isSafe(cols, row, col)) {
            cols[row] = col;
            if (solve(cols, row + 1, n)) return true;
        }
    }
    return false;
}`,
    },
    {
      language: "c",
      explanation: "N-Queens in C.",
      code: `int isSafe(int *cols, int row, int col) {
    for (int r = 0; r < row; r++) {
        if (cols[r] == col || abs(cols[r] - col) == abs(r - row)) return 0;
    }
    return 1;
}

int solve(int *cols, int row, int n) {
    if (row == n) return 1;
    for (int col = 0; col < n; col++) {
        if (isSafe(cols, row, col)) {
            cols[row] = col;
            if (solve(cols, row + 1, n)) return 1;
        }
    }
    return 0;
}`,
    },
    {
      language: "javascript",
      explanation: "N-Queens in JavaScript.",
      code: `function isSafe(cols, row, col) {
  for (let r = 0; r < row; r++) {
    if (cols[r] === col || Math.abs(cols[r] - col) === Math.abs(r - row)) return false;
  }
  return true;
}

function solve(cols, row, n) {
  if (row === n) return true;
  for (let col = 0; col < n; col++) {
    if (isSafe(cols, row, col)) {
      cols[row] = col;
      if (solve(cols, row + 1, n)) return true;
    }
  }
  return false;
}`,
    },
  ],

  complexity: {
    time: "Worst case O(n!) or worse for N-Queens-style problems (bounded by the size of the search tree), though pruning via the safety check makes real-world performance far better than brute force",
    space: "O(n) for the recursion depth / current partial solution, plus whatever tracks the board state",
    best: "A valid solution found on the very first set of choices — effectively O(n)",
    average: "Depends heavily on how aggressively invalid branches can be pruned early",
    worst: "O(n!) or exponential — every branch must be explored before concluding no solution exists",
  },

  quiz: [
    {
      question: "What is the core three-step pattern in backtracking?",
      options: [
        "Sort, search, return",
        "Choose, explore, un-choose (backtrack)",
        "Hash, insert, lookup",
        "Divide, conquer, combine",
      ],
      correctIndex: 1,
      explanation: "Backtracking tries a choice, recurses forward, and undoes the choice if it doesn't lead to a solution.",
    },
    {
      question: "In N-Queens, what does the 'isSafe' check let the algorithm do?",
      options: [
        "Skip recursion entirely",
        "Reject an invalid placement immediately, without exploring further down that branch",
        "Sort the queens by column",
        "Guarantee a solution exists",
      ],
      correctIndex: 1,
      explanation: "Rejecting early prunes the search tree — the algorithm never wastes time exploring branches that are already known to be invalid.",
    },
    {
      question: "What does it mean when backtracking 'undoes' a choice?",
      options: [
        "It deletes the entire recursion",
        "It removes the current placement so the next candidate can be tried at that same position",
        "It restarts the whole algorithm from scratch",
        "It saves the choice for later",
      ],
      correctIndex: 1,
      explanation: "Undoing clears the current attempt so the loop can move on to trying the next candidate value at the same position.",
    },
    {
      question: "Why is backtracking usually much faster in practice than trying every possible full arrangement?",
      options: [
        "It isn't — it's always the same speed",
        "It abandons a partial arrangement the moment it becomes invalid, instead of completing it first",
        "It only works on sorted data",
        "It uses a hash table internally",
      ],
      correctIndex: 1,
      explanation: "Early rejection prunes whole subtrees of invalid possibilities before they're ever fully built out.",
    },
    {
      question: "Which topic is backtracking most directly built on top of?",
      options: ["Hashing", "Recursion", "Sorting", "Queues"],
      correctIndex: 1,
      explanation: "Backtracking is a recursive technique — the choose/explore/un-choose pattern is implemented via recursive calls.",
    },
  ],
};
