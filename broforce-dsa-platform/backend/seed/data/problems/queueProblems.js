export default [
  {
    topicSlug: "queue",
    slug: "queue-operations-simulation",
    title: "Queue Operations Simulation",
    difficulty: "Easy",
    statement:
      "Simulate a queue that supports enqueue, dequeue and front operations.\n\n" +
      "Input format: first line is q (number of operations). Each of the next q lines is one of:\n" +
      "'enqueue x', 'dequeue', or 'front'.\n" +
      "For 'dequeue' and 'front', print the resulting value, or 'Empty' if the queue has no elements.",
    examples: [
      {
        input: "5\nenqueue 10\nenqueue 20\nfront\ndequeue\nfront",
        output: "10\n10\n20",
        explanation: "After enqueuing 10 and 20, front is 10. Dequeue removes 10. New front is 20.",
      },
    ],
    constraints: ["1 <= q <= 10^5"],
    hints: [
      "Use an array with front/rear indices, or a built-in queue/deque structure.",
      "Dequeue removes from the front; enqueue adds at the rear.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = Integer.parseInt(sc.nextLine().trim());
        Deque<Integer> queue = new ArrayDeque<>();
        StringBuilder out = new StringBuilder();

        for (int i = 0; i < q; i++) {
            String line = sc.nextLine();
            // TODO: parse "enqueue x" / "dequeue" / "front" and update the queue.
            // For dequeue/front, append the result (or "Empty") followed by a newline.
        }

        System.out.print(out);
    }
}`,
      python: `import sys
from collections import deque

def main():
    data = sys.stdin.read().split("\\n")
    q = int(data[0].strip())
    queue = deque()
    out = []

    for i in range(1, q + 1):
        line = data[i]
        # TODO: parse "enqueue x" / "dequeue" / "front" and update queue.
        # For dequeue/front, append the result (or "Empty") to out.
        pass

    print("\\n".join(out))

main()
`,
      c: `#include <stdio.h>
#include <string.h>

int queue[100005];
int front = 0, rear = -1;

int main() {
    int q;
    scanf("%d", &q);
    getchar();

    for (int i = 0; i < q; i++) {
        char line[64];
        fgets(line, sizeof(line), stdin);
        // TODO: parse "enqueue x" / "dequeue" / "front" and update the array-based queue.
        // For dequeue/front, print the result (or "Empty") followed by a newline.
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
    deque<int> queue;

    for (int i = 0; i < q; i++) {
        string line;
        getline(cin, line);
        // TODO: parse "enqueue x" / "dequeue" / "front" and update the queue.
        // For dequeue/front, print the result (or "Empty") followed by a newline.
    }
    return 0;
}
`,
      javascript: `const lines = readAll().split('\\n');
const q = parseInt(lines[0].trim());
const queue = [];
const out = [];

for (let i = 1; i <= q; i++) {
  const line = lines[i];
  // TODO: parse "enqueue x" / "dequeue" / "front" and update the queue.
  // For dequeue/front, push the result (or "Empty") into out.
}

console.log(out.join('\\n'));
`,
    },
    testCases: [
      { input: "5\nenqueue 10\nenqueue 20\nfront\ndequeue\nfront", expectedOutput: "10\n10\n20", hidden: false },
      { input: "2\ndequeue\nfront", expectedOutput: "Empty\nEmpty", hidden: false },
      { input: "4\nenqueue 5\ndequeue\ndequeue\nfront", expectedOutput: "5\nEmpty\nEmpty", hidden: true },
    ],
  },
  {
    topicSlug: "queue",
    slug: "generate-binary-numbers",
    title: "Generate Binary Numbers 1 to N",
    difficulty: "Easy",
    statement:
      "Using a queue, generate the binary representations of the numbers from 1 to n, in order, " +
      "one per line. Start the queue with \"1\", and for each number dequeued, enqueue two new " +
      "strings by appending \"0\" and \"1\" to it.\n\n" +
      "Input format: a single integer n.",
    examples: [{ input: "5", output: "1\n10\n11\n100\n101" }],
    constraints: ["1 <= n <= 1000"],
    hints: [
      "Enqueue the string \"1\" first.",
      "Repeat n times: dequeue the front string, print it, then enqueue (front + \"0\") and (front + \"1\").",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static List<String> generate(int n) {
        // TODO: implement using a Queue<String>
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        for (String s : generate(n)) System.out.println(s);
    }
}`,
      python: `from collections import deque

def generate(n):
    # TODO: implement using a deque as a queue
    return []

n = int(input().strip())
for s in generate(n):
    print(s)
`,
      c: `#include <stdio.h>
#include <string.h>

char queue[2005][20];
int front = 0, rear = -1;

int main() {
    int n;
    scanf("%d", &n);
    // TODO: implement using the array-based queue above.
    // Enqueue "1", then for each of n iterations: dequeue front, print it,
    // enqueue (front + "0") and (front + "1").
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<string> generate(int n) {
    // TODO: implement using a queue<string>
    return {};
}

int main() {
    int n;
    cin >> n;
    for (auto &s : generate(n)) cout << s << "\\n";
    return 0;
}
`,
      javascript: `function generate(n) {
  // TODO: implement using an array as a queue (push = enqueue, shift = dequeue)
  return [];
}

const n = parseInt(readLine().trim());
console.log(generate(n).join('\\n'));
`,
    },
    testCases: [
      { input: "5", expectedOutput: "1\n10\n11\n100\n101", hidden: false },
      { input: "1", expectedOutput: "1", hidden: false },
      { input: "3", expectedOutput: "1\n10\n11", hidden: true },
    ],
  },
  {
    topicSlug: "queue",
    slug: "circular-queue-implementation",
    title: "Implement a Circular Queue",
    difficulty: "Medium",
    statement:
      "Implement a fixed-capacity circular queue. Input format: first line has capacity c and number " +
      "of operations q, space-separated. Each of the next q lines is one of:\n" +
      "'enqueue x' — print 'true' if it succeeded, 'false' if the queue was full.\n" +
      "'dequeue' — print the dequeued value, or 'Empty' if the queue was empty.\n" +
      "'front' — print the front value, or 'Empty' if the queue was empty.",
    examples: [
      {
        input: "3 6\nenqueue 1\nenqueue 2\nenqueue 3\nenqueue 4\ndequeue\nenqueue 4",
        output: "true\ntrue\ntrue\nfalse\n1\ntrue",
        explanation: "Capacity 3 fills after 3 enqueues; the 4th fails. Dequeue frees a slot for the next enqueue.",
      },
    ],
    constraints: ["1 <= c, q <= 10^4"],
    hints: [
      "Track front and rear as indices that wrap around using modulo capacity.",
      "Track a size counter to distinguish a full queue from an empty one (both can have front == rear + 1 mod c).",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int capacity = Integer.parseInt(first.nextToken());
        int q = Integer.parseInt(first.nextToken());

        int[] data = new int[capacity];
        int front = 0, rear = -1, size = 0;
        StringBuilder out = new StringBuilder();

        for (int i = 0; i < q; i++) {
            String line = sc.nextLine();
            // TODO: parse "enqueue x" / "dequeue" / "front" and implement circular queue
            // behavior using data/front/rear/size/capacity, appending results to the output.
        }

        System.out.print(out);
    }
}`,
      python: `import sys

def main():
    data_lines = sys.stdin.read().split("\\n")
    capacity, q = map(int, data_lines[0].split())
    data = [0] * capacity
    front, rear, size = 0, -1, 0
    out = []

    for i in range(1, q + 1):
        line = data_lines[i]
        # TODO: parse "enqueue x" / "dequeue" / "front" and implement circular
        # queue behavior, appending results to out.
        pass

    print("\\n".join(out))

main()
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int capacity, q;
    scanf("%d %d", &capacity, &q);
    getchar();

    int data[10005];
    int front = 0, rear = -1, size = 0;

    for (int i = 0; i < q; i++) {
        char line[64];
        fgets(line, sizeof(line), stdin);
        // TODO: parse "enqueue x" / "dequeue" / "front" and implement circular
        // queue behavior using data/front/rear/size/capacity.
    }
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int capacity, q;
    cin >> capacity >> q;
    cin.ignore();

    vector<int> data(capacity);
    int front = 0, rear = -1, size = 0;

    for (int i = 0; i < q; i++) {
        string line;
        getline(cin, line);
        // TODO: parse "enqueue x" / "dequeue" / "front" and implement circular
        // queue behavior using data/front/rear/size/capacity.
    }
    return 0;
}
`,
      javascript: `const lines = readAll().split('\\n');
const [capacity, q] = lines[0].split(' ').map(Number);
const data = new Array(capacity).fill(0);
let front = 0, rear = -1, size = 0;
const out = [];

for (let i = 1; i <= q; i++) {
  const line = lines[i];
  // TODO: parse "enqueue x" / "dequeue" / "front" and implement circular
  // queue behavior using data/front/rear/size/capacity, pushing results into out.
}

console.log(out.join('\\n'));
`,
    },
    testCases: [
      {
        input: "3 6\nenqueue 1\nenqueue 2\nenqueue 3\nenqueue 4\ndequeue\nenqueue 4",
        expectedOutput: "true\ntrue\ntrue\nfalse\n1\ntrue",
        hidden: false,
      },
      { input: "2 3\nenqueue 1\ndequeue\nfront", expectedOutput: "true\n1\nEmpty", hidden: false },
      { input: "1 4\nenqueue 5\nenqueue 6\ndequeue\nfront", expectedOutput: "true\nfalse\n5\nEmpty", hidden: true },
    ],
  },
  {
    topicSlug: "queue",
    slug: "first-non-repeating-in-stream",
    title: "First Non-Repeating Character in a Stream",
    difficulty: "Medium",
    statement:
      "Characters are read one at a time from a stream. After each character is read, output the " +
      "first character seen so far in the stream that has not repeated yet, or '-1' if every " +
      "character so far has repeated.\n\n" +
      "Input format: a single line containing the character stream (no spaces).",
    examples: [
      {
        input: "aabc",
        output: "a\n-1\nb\nb",
        explanation: "After 'a': a. After 'aa': both repeated, -1. After 'aab': b. After 'aabc': still b (c hasn't repeated but b came first).",
      },
    ],
    constraints: ["1 <= stream.length <= 10^5"],
    hints: [
      "Keep a queue of candidate characters and a frequency count for each character seen.",
      "After adding a character, pop from the front of the queue any characters whose frequency is now greater than 1 — the new front is your answer.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static String[] firstNonRepeating(String stream) {
        // TODO: implement using a Queue<Character> + frequency map
        return new String[stream.length()];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String stream = sc.nextLine();
        StringBuilder out = new StringBuilder();
        for (String s : firstNonRepeating(stream)) out.append(s).append("\\n");
        System.out.print(out.toString().trim());
    }
}`,
      python: `from collections import deque

def first_non_repeating(stream):
    # TODO: implement using a deque + frequency dict
    return []

stream = input().strip()
print("\\n".join(first_non_repeating(stream)))
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char stream[100005];
    scanf("%s", stream);
    int n = strlen(stream);
    int freq[256] = {0};
    char queue[100005];
    int front = 0, rear = -1;

    // TODO: for each character, update freq, enqueue it, then pop repeated
    // characters from the front. Print the front char (or -1) after each step.
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<string> firstNonRepeating(const string &stream) {
    // TODO: implement using a queue<char> + frequency array
    return {};
}

int main() {
    string stream;
    cin >> stream;
    for (auto &s : firstNonRepeating(stream)) cout << s << "\\n";
    return 0;
}
`,
      javascript: `function firstNonRepeating(stream) {
  // TODO: implement using an array as a queue + a frequency object
  return [];
}

const stream = readLine().trim();
console.log(firstNonRepeating(stream).join('\\n'));
`,
    },
    testCases: [
      { input: "aabc", expectedOutput: "a\n-1\nb\nb", hidden: false },
      { input: "z", expectedOutput: "z", hidden: false },
      { input: "aabbcc", expectedOutput: "a\n-1\nb\n-1\nc\n-1", hidden: true },
    ],
  },
  {
    topicSlug: "queue",
    slug: "queue-using-two-stacks",
    title: "Queue Using Two Stacks",
    difficulty: "Hard",
    statement:
      "Implement a queue using only two stacks (no array/list/deque used as a queue directly). " +
      "Input format: first line is q. Each of the next q lines is 'enqueue x' or 'dequeue'. " +
      "For 'dequeue', print the dequeued value, or 'Empty' if the queue was empty.",
    examples: [
      { input: "5\nenqueue 1\nenqueue 2\ndequeue\nenqueue 3\ndequeue", output: "1\n2" },
    ],
    constraints: ["1 <= q <= 10^4"],
    hints: [
      "Use an 'in' stack for enqueues and an 'out' stack for dequeues.",
      "When 'out' is empty and a dequeue is requested, pour everything from 'in' into 'out' — this reverses the order back to FIFO.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static Deque<Integer> inStack = new ArrayDeque<>();
    static Deque<Integer> outStack = new ArrayDeque<>();

    static void enqueue(int x) {
        inStack.push(x);
    }

    static Integer dequeue() {
        // TODO: implement using inStack/outStack — pour inStack into outStack
        // when outStack is empty, then pop from outStack. Return null if both are empty.
        return null;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = Integer.parseInt(sc.nextLine().trim());
        StringBuilder out = new StringBuilder();

        for (int i = 0; i < q; i++) {
            String line = sc.nextLine();
            if (line.startsWith("enqueue")) {
                enqueue(Integer.parseInt(line.split(" ")[1]));
            } else {
                Integer v = dequeue();
                out.append(v == null ? "Empty" : v.toString()).append("\\n");
            }
        }
        System.out.print(out);
    }
}`,
      python: `import sys

in_stack = []
out_stack = []

def enqueue(x):
    in_stack.append(x)

def dequeue():
    # TODO: implement using in_stack/out_stack — pour in_stack into out_stack
    # when out_stack is empty, then pop from out_stack. Return None if both empty.
    return None

def main():
    data = sys.stdin.read().split("\\n")
    q = int(data[0].strip())
    out = []
    for i in range(1, q + 1):
        line = data[i]
        if line.startswith("enqueue"):
            enqueue(int(line.split(" ")[1]))
        else:
            v = dequeue()
            out.append("Empty" if v is None else str(v))
    print("\\n".join(out))

main()
`,
      c: `#include <stdio.h>
#include <string.h>

int inStack[10005], inTop = -1;
int outStack[10005], outTop = -1;

void enqueue(int x) {
    inStack[++inTop] = x;
}

int dequeue(int *found) {
    // TODO: implement using inStack/outStack — pour inStack into outStack
    // when outStack is empty, then pop from outStack. Set *found = 0 if both empty.
    *found = 0;
    return -1;
}

int main() {
    int q;
    scanf("%d", &q);
    getchar();
    for (int i = 0; i < q; i++) {
        char line[64];
        fgets(line, sizeof(line), stdin);
        if (strncmp(line, "enqueue", 7) == 0) {
            int x;
            sscanf(line + 8, "%d", &x);
            enqueue(x);
        } else {
            int found;
            int v = dequeue(&found);
            if (found) printf("%d\\n", v); else printf("Empty\\n");
        }
    }
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

stack<int> inStack, outStack;

void enqueue(int x) {
    inStack.push(x);
}

bool dequeue(int &result) {
    // TODO: implement using inStack/outStack — pour inStack into outStack
    // when outStack is empty, then pop from outStack. Return false if both empty.
    return false;
}

int main() {
    int q;
    cin >> q;
    cin.ignore();
    for (int i = 0; i < q; i++) {
        string line;
        getline(cin, line);
        if (line.rfind("enqueue", 0) == 0) {
            enqueue(stoi(line.substr(8)));
        } else {
            int v;
            if (dequeue(v)) cout << v << "\\n"; else cout << "Empty\\n";
        }
    }
    return 0;
}
`,
      javascript: `let inStack = [];
let outStack = [];

function enqueue(x) {
  inStack.push(x);
}

function dequeue() {
  // TODO: implement using inStack/outStack — pour inStack into outStack
  // when outStack is empty, then pop from outStack. Return null if both empty.
  return null;
}

const lines = readAll().split('\\n');
const q = parseInt(lines[0].trim());
const out = [];

for (let i = 1; i <= q; i++) {
  const line = lines[i];
  if (line.startsWith('enqueue')) {
    enqueue(parseInt(line.split(' ')[1]));
  } else {
    const v = dequeue();
    out.push(v === null ? 'Empty' : String(v));
  }
}

console.log(out.join('\\n'));
`,
    },
    testCases: [
      { input: "5\nenqueue 1\nenqueue 2\ndequeue\nenqueue 3\ndequeue", expectedOutput: "1\n2", hidden: false },
      { input: "1\ndequeue", expectedOutput: "Empty", hidden: false },
      { input: "6\nenqueue 5\nenqueue 6\nenqueue 7\ndequeue\ndequeue\ndequeue", expectedOutput: "5\n6\n7", hidden: true },
    ],
  },
];
