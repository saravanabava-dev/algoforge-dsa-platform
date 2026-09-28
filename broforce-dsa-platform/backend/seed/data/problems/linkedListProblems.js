export default [
  {
    topicSlug: "linked-lists",
    slug: "build-and-print-list",
    title: "Build a Linked List and Print It",
    difficulty: "Easy",
    statement:
      "Build a singly linked list by inserting n integers at the end, in the order given, then print " +
      "it in the form 'v1 -> v2 -> ... -> NULL'.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "3\n10 20 30", output: "10 -> 20 -> 30 -> NULL" }],
    constraints: ["0 <= n <= 1000"],
    hints: ["Keep a pointer to the last inserted node so appending stays O(1) per insert instead of re-walking the list each time."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    static Node insertAtEnd(Node head, Node tail, int value) {
        // TODO: append a new node with 'value' to the end of the list, return the new tail
        return tail;
    }

    static String printList(Node head) {
        // TODO: build and return the string "v1 -> v2 -> ... -> NULL"
        return "NULL";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        Node head = null, tail = null;
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            for (int i = 0; i < n; i++) {
                int v = Integer.parseInt(st.nextToken());
                if (head == null) { head = new Node(v); tail = head; }
                else { tail = insertAtEnd(head, tail, v); }
            }
        }
        System.out.println(printList(head));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

def print_list(head):
    # TODO: return the string "v1 -> v2 -> ... -> NULL"
    return "NULL"

n = int(input().strip())
head = tail = None
if n > 0:
    values = list(map(int, input().split()))
    for v in values:
        node = Node(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            tail = node
print(print_list(head))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

// TODO: print the list as "v1 -> v2 -> ... -> NULL" (use printf, no trailing newline issues)
void printList(Node *head) {
    printf("NULL\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = malloc(sizeof(Node));
        node->value = v;
        node->next = NULL;
        if (head == NULL) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    printList(head);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

// TODO: print the list as "v1 -> v2 -> ... -> NULL"
void printList(Node* head) {
    cout << "NULL" << endl;
}

int main() {
    int n;
    cin >> n;
    Node *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v;
        cin >> v;
        Node* node = new Node(v);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    printList(head);
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}

function printList(head) {
  // TODO: return the string "v1 -> v2 -> ... -> NULL"
  return "NULL";
}

const n = Number(readLine().trim());
let head = null, tail = null;
if (n > 0) {
  const values = readLine().trim().split(/\\s+/).map(Number);
  for (const v of values) {
    const node = new Node(v);
    if (!head) { head = node; tail = node; }
    else { tail.next = node; tail = node; }
  }
}
console.log(printList(head));
`,
    },
    testCases: [
      { input: "3\n10 20 30", expectedOutput: "10 -> 20 -> 30 -> NULL", hidden: false },
      { input: "1\n5", expectedOutput: "5 -> NULL", hidden: false },
      { input: "0\n", expectedOutput: "NULL", hidden: true },
    ],
  },
  {
    topicSlug: "linked-lists",
    slug: "insert-at-position",
    title: "Insert at a Given Position",
    difficulty: "Easy",
    statement:
      "Build a linked list from n integers (inserted at the end, in order), then insert a new value " +
      "at a given 0-indexed position. Print the resulting list as 'v1 -> v2 -> ... -> NULL'.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line has " +
      "the position and the value to insert, space-separated.",
    examples: [
      { input: "3\n10 20 30\n1 99", output: "10 -> 99 -> 20 -> 30 -> NULL", explanation: "99 inserted at index 1." },
    ],
    constraints: ["0 <= position <= n"],
    hints: [
      "Position 0 means insert at the head.",
      "Otherwise, walk to the node just before the target position and re-point its 'next'.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    static Node insertAtPosition(Node head, int position, int value) {
        // TODO: insert a new node with 'value' at 0-indexed 'position', return the (possibly new) head
        return head;
    }

    static String printList(Node head) {
        StringBuilder sb = new StringBuilder();
        while (head != null) { sb.append(head.value).append(" -> "); head = head.next; }
        sb.append("NULL");
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        Node head = null, tail = null;
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            for (int i = 0; i < n; i++) {
                int v = Integer.parseInt(st.nextToken());
                Node node = new Node(v);
                if (head == null) { head = node; tail = node; }
                else { tail.next = node; tail = node; }
            }
        }
        StringTokenizer pv = new StringTokenizer(sc.nextLine());
        int position = Integer.parseInt(pv.nextToken());
        int value = Integer.parseInt(pv.nextToken());

        head = insertAtPosition(head, position, value);
        System.out.println(printList(head));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

def insert_at_position(head, position, value):
    # TODO: insert a new node with 'value' at 0-indexed 'position', return the (possibly new) head
    return head

def print_list(head):
    parts = []
    while head:
        parts.append(str(head.value))
        head = head.next
    parts.append("NULL")
    return " -> ".join(parts)

n = int(input().strip())
head = tail = None
if n > 0:
    for v in map(int, input().split()):
        node = Node(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            tail = node
position, value = map(int, input().split())
head = insert_at_position(head, position, value)
print(print_list(head))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

// TODO: insert a new node with 'value' at 0-indexed 'position', return the (possibly new) head
Node* insertAtPosition(Node *head, int position, int value) {
    return head;
}

void printList(Node *head) {
    while (head) { printf("%d -> ", head->value); head = head->next; }
    printf("NULL\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = malloc(sizeof(Node));
        node->value = v; node->next = NULL;
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    int position, value;
    scanf("%d %d", &position, &value);
    head = insertAtPosition(head, position, value);
    printList(head);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

// TODO: insert a new node with 'value' at 0-indexed 'position', return the (possibly new) head
Node* insertAtPosition(Node* head, int position, int value) {
    return head;
}

void printList(Node* head) {
    while (head) { cout << head->value << " -> "; head = head->next; }
    cout << "NULL" << endl;
}

int main() {
    int n;
    cin >> n;
    Node *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        Node* node = new Node(v);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    int position, value;
    cin >> position >> value;
    head = insertAtPosition(head, position, value);
    printList(head);
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}

function insertAtPosition(head, position, value) {
  // TODO: insert a new node with \`value\` at 0-indexed \`position\`, return the (possibly new) head
  return head;
}

function printList(head) {
  const parts = [];
  while (head) { parts.push(head.value); head = head.next; }
  parts.push("NULL");
  return parts.join(" -> ");
}

const n = Number(readLine().trim());
let head = null, tail = null;
if (n > 0) {
  const values = readLine().trim().split(/\\s+/).map(Number);
  for (const v of values) {
    const node = new Node(v);
    if (!head) { head = node; tail = node; }
    else { tail.next = node; tail = node; }
  }
}
const [position, value] = readLine().trim().split(/\\s+/).map(Number);
head = insertAtPosition(head, position, value);
console.log(printList(head));
`,
    },
    testCases: [
      { input: "3\n10 20 30\n1 99", expectedOutput: "10 -> 99 -> 20 -> 30 -> NULL", hidden: false },
      { input: "2\n1 2\n0 0", expectedOutput: "0 -> 1 -> 2 -> NULL", hidden: false },
      { input: "2\n1 2\n2 3", expectedOutput: "1 -> 2 -> 3 -> NULL", hidden: true },
    ],
  },
  {
    topicSlug: "linked-lists",
    slug: "delete-by-value",
    title: "Delete the First Node with a Given Value",
    difficulty: "Medium",
    statement:
      "Build a linked list from n integers, then delete the first node whose value equals a given " +
      "target. If the value doesn't appear, the list is unchanged. Print the resulting list.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is the target.",
    examples: [{ input: "4\n10 20 30 20\n20", output: "10 -> 30 -> 20 -> NULL", explanation: "Only the first 20 is removed." }],
    constraints: ["0 <= n <= 1000"],
    hints: [
      "Special case: if the head itself holds the target, move head to head.next.",
      "Otherwise, track the previous node while searching, then re-point previous.next to skip the found node.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    static Node deleteByValue(Node head, int target) {
        // TODO: delete the first node with value == target, return the (possibly new) head
        return head;
    }

    static String printList(Node head) {
        StringBuilder sb = new StringBuilder();
        while (head != null) { sb.append(head.value).append(" -> "); head = head.next; }
        sb.append("NULL");
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        Node head = null, tail = null;
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            for (int i = 0; i < n; i++) {
                Node node = new Node(Integer.parseInt(st.nextToken()));
                if (head == null) { head = node; tail = node; }
                else { tail.next = node; tail = node; }
            }
        }
        int target = Integer.parseInt(sc.nextLine().trim());
        head = deleteByValue(head, target);
        System.out.println(printList(head));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

def delete_by_value(head, target):
    # TODO: delete the first node with value == target, return the (possibly new) head
    return head

def print_list(head):
    parts = []
    while head:
        parts.append(str(head.value))
        head = head.next
    parts.append("NULL")
    return " -> ".join(parts)

n = int(input().strip())
head = tail = None
if n > 0:
    for v in map(int, input().split()):
        node = Node(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            tail = node
target = int(input().strip())
head = delete_by_value(head, target)
print(print_list(head))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

// TODO: delete the first node with value == target, return the (possibly new) head
Node* deleteByValue(Node *head, int target) {
    return head;
}

void printList(Node *head) {
    while (head) { printf("%d -> ", head->value); head = head->next; }
    printf("NULL\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = malloc(sizeof(Node));
        node->value = v; node->next = NULL;
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    int target;
    scanf("%d", &target);
    head = deleteByValue(head, target);
    printList(head);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

// TODO: delete the first node with value == target, return the (possibly new) head
Node* deleteByValue(Node* head, int target) {
    return head;
}

void printList(Node* head) {
    while (head) { cout << head->value << " -> "; head = head->next; }
    cout << "NULL" << endl;
}

int main() {
    int n;
    cin >> n;
    Node *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        Node* node = new Node(v);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    int target;
    cin >> target;
    head = deleteByValue(head, target);
    printList(head);
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}

function deleteByValue(head, target) {
  // TODO: delete the first node with value === target, return the (possibly new) head
  return head;
}

function printList(head) {
  const parts = [];
  while (head) { parts.push(head.value); head = head.next; }
  parts.push("NULL");
  return parts.join(" -> ");
}

const n = Number(readLine().trim());
let head = null, tail = null;
if (n > 0) {
  const values = readLine().trim().split(/\\s+/).map(Number);
  for (const v of values) {
    const node = new Node(v);
    if (!head) { head = node; tail = node; }
    else { tail.next = node; tail = node; }
  }
}
const target = Number(readLine().trim());
head = deleteByValue(head, target);
console.log(printList(head));
`,
    },
    testCases: [
      { input: "4\n10 20 30 20\n20", expectedOutput: "10 -> 30 -> 20 -> NULL", hidden: false },
      { input: "3\n1 2 3\n1", expectedOutput: "2 -> 3 -> NULL", hidden: false },
      { input: "2\n1 2\n5", expectedOutput: "1 -> 2 -> NULL", hidden: true },
    ],
  },
  {
    topicSlug: "linked-lists",
    slug: "reverse-linked-list",
    title: "Reverse a Linked List",
    difficulty: "Medium",
    statement:
      "Build a linked list from n integers, reverse it in place, and print the result.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "4\n1 2 3 4", output: "4 -> 3 -> 2 -> 1 -> NULL" }],
    constraints: ["0 <= n <= 10^5", "O(1) extra space expected"],
    hints: [
      "Track three pointers as you walk the list: previous, current, and next.",
      "At each node, flip current.next to point at previous, then advance all three pointers forward.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    static Node reverse(Node head) {
        // TODO: reverse the list in place, return the new head
        return head;
    }

    static String printList(Node head) {
        StringBuilder sb = new StringBuilder();
        while (head != null) { sb.append(head.value).append(" -> "); head = head.next; }
        sb.append("NULL");
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        Node head = null, tail = null;
        if (n > 0) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            for (int i = 0; i < n; i++) {
                Node node = new Node(Integer.parseInt(st.nextToken()));
                if (head == null) { head = node; tail = node; }
                else { tail.next = node; tail = node; }
            }
        }
        head = reverse(head);
        System.out.println(printList(head));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

def reverse(head):
    # TODO: reverse the list in place, return the new head
    return head

def print_list(head):
    parts = []
    while head:
        parts.append(str(head.value))
        head = head.next
    parts.append("NULL")
    return " -> ".join(parts)

n = int(input().strip())
head = tail = None
if n > 0:
    for v in map(int, input().split()):
        node = Node(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            tail = node
head = reverse(head)
print(print_list(head))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

// TODO: reverse the list in place, return the new head
Node* reverse(Node *head) {
    return head;
}

void printList(Node *head) {
    while (head) { printf("%d -> ", head->value); head = head->next; }
    printf("NULL\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = malloc(sizeof(Node));
        node->value = v; node->next = NULL;
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    head = reverse(head);
    printList(head);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

// TODO: reverse the list in place, return the new head
Node* reverse(Node* head) {
    return head;
}

void printList(Node* head) {
    while (head) { cout << head->value << " -> "; head = head->next; }
    cout << "NULL" << endl;
}

int main() {
    int n;
    cin >> n;
    Node *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        Node* node = new Node(v);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    head = reverse(head);
    printList(head);
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}

function reverse(head) {
  // TODO: reverse the list in place, return the new head
  return head;
}

function printList(head) {
  const parts = [];
  while (head) { parts.push(head.value); head = head.next; }
  parts.push("NULL");
  return parts.join(" -> ");
}

const n = Number(readLine().trim());
let head = null, tail = null;
if (n > 0) {
  const values = readLine().trim().split(/\\s+/).map(Number);
  for (const v of values) {
    const node = new Node(v);
    if (!head) { head = node; tail = node; }
    else { tail.next = node; tail = node; }
  }
}
head = reverse(head);
console.log(printList(head));
`,
    },
    testCases: [
      { input: "4\n1 2 3 4", expectedOutput: "4 -> 3 -> 2 -> 1 -> NULL", hidden: false },
      { input: "1\n7", expectedOutput: "7 -> NULL", hidden: false },
      { input: "2\n1 2", expectedOutput: "2 -> 1 -> NULL", hidden: true },
    ],
  },
  {
    topicSlug: "linked-lists",
    slug: "find-middle-node",
    title: "Find the Middle Node",
    difficulty: "Hard",
    statement:
      "Build a linked list from n integers, then find and print the value of the middle node using " +
      "the fast/slow pointer technique — do not use its length or index into it as an array. If " +
      "there are two middle nodes (even length), print the second of the two.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n1 2 3 4 5", output: "3" }, { input: "4\n1 2 3 4", output: "3", explanation: "Second of the two middle nodes (2 and 3)." }],
    constraints: ["1 <= n <= 10^5", "Must use the fast/slow two-pointer technique, not a length count"],
    hints: [
      "Move a 'slow' pointer one step at a time and a 'fast' pointer two steps at a time.",
      "When fast reaches the end (or one before the end), slow is at the middle.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    static int findMiddle(Node head) {
        // TODO: use fast/slow pointers to find and return the middle node's value
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        Node head = null, tail = null;
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) {
            Node node = new Node(Integer.parseInt(st.nextToken()));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        System.out.println(findMiddle(head));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

def find_middle(head):
    # TODO: use fast/slow pointers to find and return the middle node's value
    return -1

n = int(input().strip())
head = tail = None
for v in map(int, input().split()):
    node = Node(v)
    if head is None:
        head = tail = node
    else:
        tail.next = node
        tail = node
print(find_middle(head))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

// TODO: use fast/slow pointers to find and return the middle node's value
int findMiddle(Node *head) {
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = malloc(sizeof(Node));
        node->value = v; node->next = NULL;
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    printf("%d\\n", findMiddle(head));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

// TODO: use fast/slow pointers to find and return the middle node's value
int findMiddle(Node* head) {
    return -1;
}

int main() {
    int n;
    cin >> n;
    Node *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        Node* node = new Node(v);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    cout << findMiddle(head) << endl;
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}

function findMiddle(head) {
  // TODO: use fast/slow pointers to find and return the middle node's value
  return -1;
}

const n = Number(readLine().trim());
let head = null, tail = null;
const values = readLine().trim().split(/\\s+/).map(Number);
for (const v of values) {
  const node = new Node(v);
  if (!head) { head = node; tail = node; }
  else { tail.next = node; tail = node; }
}
console.log(findMiddle(head));
`,
    },
    testCases: [
      { input: "5\n1 2 3 4 5", expectedOutput: "3", hidden: false },
      { input: "4\n1 2 3 4", expectedOutput: "3", hidden: false },
      { input: "1\n42", expectedOutput: "42", hidden: true },
    ],
  },
];
