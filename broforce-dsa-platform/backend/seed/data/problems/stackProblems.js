export default [
  {
    topicSlug: "stack",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    statement:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if " +
      "the input string is valid. A string is valid if every opening bracket is closed by the same " +
      "type of bracket, and brackets close in the correct order.",
    examples: [
      { input: "()[]{}", output: "true", explanation: "Every bracket type is matched and properly nested." },
      { input: "(]", output: "false", explanation: "'(' is closed by ']', which is the wrong type." },
    ],
    constraints: ["1 <= s.length <= 1000", "s consists only of '()[]{}'"],
    hints: [
      "Push opening brackets onto a stack.",
      "When you see a closing bracket, it must match the bracket on top of the stack.",
      "The string is valid only if the stack is empty at the end.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static boolean isValid(String s) {
        // TODO: implement using a Stack<Character>
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(isValid(s));
    }
}`,
      python: `def is_valid(s):
    # TODO: implement using a list as a stack
    return False

s = input().strip()
print(str(is_valid(s)).lower())
`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isValid(const char *s) {
    // TODO: implement using a simple char stack array
    return false;
}

int main() {
    char s[1005];
    scanf("%s", s);
    printf(isValid(s) ? "true\\n" : "false\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(const string &s) {
    // TODO: implement using a stack<char>
    return false;
}

int main() {
    string s;
    cin >> s;
    cout << (isValid(s) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `function isValid(s) {
  // TODO: implement using an array as a stack
  return false;
}

const s = readLine().trim();
console.log(isValid(s) ? "true" : "false");
`,
    },
    testCases: [
      { input: "()[]{}", expectedOutput: "true", hidden: false },
      { input: "(]", expectedOutput: "false", hidden: false },
      { input: "([{}])", expectedOutput: "true", hidden: false },
      { input: "(((", expectedOutput: "false", hidden: true },
      { input: "]", expectedOutput: "false", hidden: true },
    ],
  },
  {
    topicSlug: "stack",
    slug: "reverse-string-using-stack",
    title: "Reverse a String Using a Stack",
    difficulty: "Easy",
    statement:
      "Given a string, reverse it using stack operations (push every character, then pop them all " +
      "off) instead of using a built-in reverse function.",
    examples: [{ input: "hello", output: "olleh", explanation: "Characters come off the stack in reverse order." }],
    constraints: ["1 <= s.length <= 1000"],
    hints: ["Push every character of the string.", "Pop each character and append it to a result string."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static String reverse(String s) {
        // TODO: implement using a Stack<Character>
        return s;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(reverse(s));
    }
}`,
      python: `def reverse(s):
    # TODO: implement using a list as a stack
    return s

s = input().strip()
print(reverse(s))
`,
      c: `#include <stdio.h>
#include <string.h>

void reverse(char *s, char *result) {
    // TODO: implement using a simple char stack array; write the reversed
    // string into 'result' (don't forget the null terminator)
}

int main() {
    char s[1005], result[1005] = {0};
    scanf("%s", s);
    reverse(s, result);
    printf("%s\\n", result);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

string reverseStr(const string &s) {
    // TODO: implement using a stack<char>
    return s;
}

int main() {
    string s;
    cin >> s;
    cout << reverseStr(s) << endl;
    return 0;
}
`,
      javascript: `function reverse(s) {
  // TODO: implement using an array as a stack
  return s;
}

const s = readLine().trim();
console.log(reverse(s));
`,
    },
    testCases: [
      { input: "hello", expectedOutput: "olleh", hidden: false },
      { input: "stack", expectedOutput: "kcats", hidden: false },
      { input: "a", expectedOutput: "a", hidden: true },
      { input: "algoforge", expectedOutput: "egrofogla", hidden: true },
    ],
  },
  {
    topicSlug: "stack",
    slug: "next-greater-element",
    title: "Next Greater Element",
    difficulty: "Medium",
    statement:
      "Given an array of n integers, for each element find the next element to its right that is " +
      "strictly greater than it. If no such element exists, output -1 for that position.\n\n" +
      "Input format: first line is n, second line is n space-separated integers.\n" +
      "Output format: n space-separated integers, the next greater element for each position.",
    examples: [
      {
        input: "4\n4 5 2 25",
        output: "5 25 25 -1",
        explanation: "For 4 the next greater is 5. For 5 it's 25. For 2 it's 25. 25 has none, so -1.",
      },
    ],
    constraints: ["1 <= n <= 10^5"],
    hints: [
      "Use a stack that holds indices of elements still waiting for their next greater element.",
      "Traverse left to right; while the stack's top element is smaller than the current value, pop it and resolve it.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int[] nextGreater(int[] arr) {
        // TODO: implement using a Stack<Integer> of indices
        return new int[arr.length];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        int[] result = nextGreater(arr);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(result[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `def next_greater(arr):
    # TODO: implement using a stack (list) of indices
    return [-1] * len(arr)

n = int(input())
arr = list(map(int, input().split()))
result = next_greater(arr)
print(' '.join(map(str, result)))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

void nextGreater(int *arr, int n, int *result) {
    // TODO: implement using a stack (array) of indices
    for (int i = 0; i < n; i++) result[i] = -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int *arr = malloc(n * sizeof(int));
    int *result = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    nextGreater(arr, n, result);

    for (int i = 0; i < n; i++) {
        printf("%d", result[i]);
        if (i < n - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> nextGreater(vector<int>& arr) {
    // TODO: implement using a stack<int> of indices
    return vector<int>(arr.size(), -1);
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    vector<int> result = nextGreater(arr);
    for (int i = 0; i < n; i++) {
        cout << result[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    return 0;
}
`,
      javascript: `function nextGreater(arr) {
  // TODO: implement using an array as a stack of indices
  return new Array(arr.length).fill(-1);
}

const n = parseInt(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const result = nextGreater(arr);
console.log(result.join(' '));
`,
    },
    testCases: [
      { input: "4\n4 5 2 25", expectedOutput: "5 25 25 -1", hidden: false },
      { input: "3\n13 7 6", expectedOutput: "-1 -1 -1", hidden: false },
      { input: "5\n1 3 2 4 5", expectedOutput: "3 4 4 5 -1", hidden: true },
    ],
  },
  {
    topicSlug: "stack",
    slug: "evaluate-postfix",
    title: "Evaluate Postfix Expression",
    difficulty: "Medium",
    statement:
      "Evaluate a postfix (Reverse Polish) expression. The expression is given as a single line of " +
      "space-separated tokens: integers and operators (+, -, *, /). Output the integer result.",
    examples: [
      { input: "2 3 1 * + 9 -", output: "-4", explanation: "((2 + (3 * 1)) - 9) = -4" },
    ],
    constraints: ["Division truncates toward zero, like Java's integer division"],
    hints: [
      "Push numbers onto the stack.",
      "When you see an operator, pop two numbers, apply the operator, and push the result back.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int evaluate(String expr) {
        // TODO: implement using a Stack<Integer>
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String expr = sc.nextLine();
        System.out.println(evaluate(expr));
    }
}`,
      python: `def evaluate(expr):
    # TODO: implement using a list as a stack; tokens are space-separated
    return 0

expr = input()
print(evaluate(expr))
`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int evaluate(char *expr) {
    // TODO: implement using an int stack (array); tokens are space-separated
    return 0;
}

int main() {
    char expr[2005];
    fgets(expr, sizeof(expr), stdin);
    printf("%d\\n", evaluate(expr));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int evaluate(const string &expr) {
    // TODO: implement using a stack<int>; tokens are space-separated
    return 0;
}

int main() {
    string expr;
    getline(cin, expr);
    cout << evaluate(expr) << endl;
    return 0;
}
`,
      javascript: `function evaluate(expr) {
  // TODO: implement using an array as a stack; tokens are space-separated
  return 0;
}

const expr = readLine();
console.log(evaluate(expr));
`,
    },
    testCases: [
      { input: "2 3 1 * + 9 -", expectedOutput: "-4", hidden: false },
      { input: "4 13 5 / +", expectedOutput: "6", hidden: false },
      { input: "5 1 2 + 4 * + 3 -", expectedOutput: "14", hidden: true },
    ],
  },
  {
    topicSlug: "stack",
    slug: "min-stack-simulation",
    title: "Min Stack Simulation",
    difficulty: "Hard",
    statement:
      "Design a stack that supports push, pop, and retrieving the minimum element, all in O(1) time.\n\n" +
      "Input format: first line is q (number of operations). Each of the next q lines is one of:\n" +
      "'push x', 'pop', or 'getMin'.\n" +
      "For every 'getMin' operation, print the current minimum on its own line.",
    examples: [
      {
        input: "5\npush 3\npush 5\ngetMin\npush 1\ngetMin",
        output: "3\n1",
        explanation: "After pushing 3 and 5, min is 3. After pushing 1, min becomes 1.",
      },
    ],
    constraints: ["1 <= q <= 10^5", "getMin is never called on an empty stack"],
    hints: [
      "Keep a second stack that tracks the minimum seen so far at each level.",
      "When you push x, also push min(x, currentMin) onto the min-stack.",
      "When you pop, pop from both stacks together.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = Integer.parseInt(sc.nextLine().trim());

        Deque<Integer> stack = new ArrayDeque<>();
        Deque<Integer> minStack = new ArrayDeque<>();
        StringBuilder output = new StringBuilder();

        for (int i = 0; i < q; i++) {
            String line = sc.nextLine();
            // TODO: parse the command and maintain stack + minStack
            // "push x" -> push x onto stack, push min(x, minStack.peek()) onto minStack
            // "pop"    -> pop both stacks
            // "getMin" -> append minStack.peek() to output, followed by a newline
        }

        System.out.print(output);
    }
}`,
      python: `def solve(lines):
    stack = []
    min_stack = []
    output = []
    for line in lines:
        # TODO: parse the command ("push x" / "pop" / "getMin") and maintain
        # stack + min_stack. For "getMin", append str(min_stack[-1]) to output.
        pass
    return output

q = int(input())
lines = [input() for _ in range(q)]
print('\\n'.join(solve(lines)))
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int q;
    scanf("%d", &q);
    getchar(); // consume trailing newline after the integer

    int stack[100005], minStack[100005], top = -1;
    char line[64];

    for (int i = 0; i < q; i++) {
        fgets(line, sizeof(line), stdin);
        // TODO: parse the command ("push x" / "pop" / "getMin") and maintain
        // stack/minStack (top tracks the current size - 1).
        // For "getMin", printf("%d\\n", minStack[top]);
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

    stack<int> st, minSt;

    for (int i = 0; i < q; i++) {
        string line;
        getline(cin, line);
        // TODO: parse the command ("push x" / "pop" / "getMin") and maintain
        // st + minSt. For "getMin", cout << minSt.top() << "\\n";
    }

    return 0;
}
`,
      javascript: `const q = parseInt(readLine().trim());
const stack = [];
const minStack = [];
const output = [];

for (let i = 0; i < q; i++) {
  const line = readLine();
  // TODO: parse the command ("push x" / "pop" / "getMin") and maintain
  // stack + minStack. For "getMin", push String(minStack[minStack.length - 1]) to output.
}

console.log(output.join('\\n'));
`,
    },
    testCases: [
      { input: "5\npush 3\npush 5\ngetMin\npush 1\ngetMin", expectedOutput: "3\n1", hidden: false },
      { input: "6\npush 5\npush 2\npush 4\ngetMin\npop\ngetMin", expectedOutput: "2\n2", hidden: true },
    ],
  },
];
