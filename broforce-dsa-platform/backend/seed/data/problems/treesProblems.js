export default [
  {
    topicSlug: "trees",
    slug: "bst-inorder-traversal",
    title: "Build a BST and Print Inorder Traversal",
    difficulty: "Easy",
    statement:
      "Insert n integers into a Binary Search Tree in the order given, then print its Inorder " +
      "traversal (which will be the values in ascending sorted order), space-separated.\n\n" +
      "Input format: first line is n, second line has n space-separated integers (insertion order).",
    examples: [
      { input: "5\n50 30 70 20 40", output: "20 30 40 50 70", explanation: "Inorder of a BST visits values in ascending order." },
    ],
    constraints: ["1 <= n <= 1000", "All values are distinct"],
    hints: ["Insert each value using standard BST insertion.", "Inorder = left, node, right."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        // TODO: implement standard BST insertion
        return root;
    }

    static void inorder(Node node, StringBuilder out) {
        // TODO: implement inorder traversal, appending "value " for each node
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());

        Node root = null;
        for (int i = 0; i < n; i++) {
            root = insert(root, Integer.parseInt(st.nextToken()));
        }

        StringBuilder out = new StringBuilder();
        inorder(root, out);
        System.out.println(out.toString().trim());
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    # TODO: implement standard BST insertion, return the (possibly new) root
    return root

def inorder(node, out):
    # TODO: implement inorder traversal, appending str(value) to out (a list)
    pass

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
out = []
inorder(root, out)
print(" ".join(out))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* newNode(int value) {
    Node *n = malloc(sizeof(Node));
    n->value = value; n->left = NULL; n->right = NULL;
    return n;
}

Node* insert(Node *root, int value) {
    // TODO: implement standard BST insertion, return the (possibly new) root
    return root;
}

void inorder(Node *node) {
    // TODO: implement inorder traversal, printing "value " for each node
}

int main() {
    int n;
    scanf("%d", &n);
    Node *root = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        root = insert(root, v);
    }
    inorder(root);
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    // TODO: implement standard BST insertion, return the (possibly new) root
    return root;
}

void inorder(Node* node, vector<int> &out) {
    // TODO: implement inorder traversal, appending each value to out
}

int main() {
    int n;
    cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        root = insert(root, v);
    }
    vector<int> out;
    inorder(root, out);
    for (size_t i = 0; i < out.size(); i++) cout << out[i] << (i + 1 < out.size() ? " " : "\\n");
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}

function insert(root, value) {
  // TODO: implement standard BST insertion, return the (possibly new) root
  return root;
}

function inorder(node, out) {
  // TODO: implement inorder traversal, pushing each value into out
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
const out = [];
inorder(root, out);
console.log(out.join(" "));
`,
    },
    testCases: [
      { input: "5\n50 30 70 20 40", expectedOutput: "20 30 40 50 70", hidden: false },
      { input: "1\n10", expectedOutput: "10", hidden: false },
      { input: "4\n4 2 1 3", expectedOutput: "1 2 3 4", hidden: true },
    ],
  },
  {
    topicSlug: "trees",
    slug: "height-of-binary-tree",
    title: "Height of a Binary Tree",
    difficulty: "Easy",
    statement:
      "Insert n integers into a BST in the order given, then print the height of the tree (the " +
      "number of edges on the longest path from root to a leaf; a single-node tree has height 0).\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n50 30 70 20 40", output: "2", explanation: "Longest path 50 -> 30 -> 20 has 2 edges." }],
    constraints: ["1 <= n <= 1000"],
    hints: ["height(node) = 1 + max(height(left), height(right)); an empty subtree has height -1."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.value) root.left = insert(root.left, value);
        else if (value > root.value) root.right = insert(root.right, value);
        return root;
    }

    static int height(Node node) {
        // TODO: implement recursive height calculation (empty tree = -1)
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());

        Node root = null;
        for (int i = 0; i < n; i++) {
            root = insert(root, Integer.parseInt(st.nextToken()));
        }

        System.out.println(height(root));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def height(node):
    # TODO: implement recursive height calculation (empty tree = -1)
    return -1

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
print(height(root))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* insert(Node *root, int value) {
    if (root == NULL) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

int height(Node *node) {
    // TODO: implement recursive height calculation (empty tree = -1)
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    Node *root = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        root = insert(root, v);
    }
    printf("%d\\n", height(root));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    if (!root) return new Node(value);
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

int height(Node* node) {
    // TODO: implement recursive height calculation (empty tree = -1)
    return -1;
}

int main() {
    int n;
    cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        root = insert(root, v);
    }
    cout << height(root) << endl;
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}

function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function height(node) {
  // TODO: implement recursive height calculation (empty tree = -1)
  return -1;
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
console.log(height(root));
`,
    },
    testCases: [
      { input: "5\n50 30 70 20 40", expectedOutput: "2", hidden: false },
      { input: "1\n10", expectedOutput: "0", hidden: false },
      { input: "4\n1 2 3 4", expectedOutput: "3", hidden: true },
    ],
  },
  {
    topicSlug: "trees",
    slug: "level-order-traversal",
    title: "Level Order Traversal",
    difficulty: "Medium",
    statement:
      "Insert n integers into a BST in the order given, then print the Level Order (breadth-first) " +
      "traversal, space-separated.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n50 30 70 20 40", output: "50 30 70 20 40" }],
    constraints: ["1 <= n <= 1000"],
    hints: ["Use a Queue: enqueue the root, then repeatedly dequeue a node, print it, and enqueue its children."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.value) root.left = insert(root.left, value);
        else if (value > root.value) root.right = insert(root.right, value);
        return root;
    }

    static String levelOrder(Node root) {
        // TODO: implement using a Queue<Node>, return a space-separated string of values
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());

        Node root = null;
        for (int i = 0; i < n; i++) {
            root = insert(root, Integer.parseInt(st.nextToken()));
        }

        System.out.println(levelOrder(root).trim());
    }
}`,
      python: `from collections import deque

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def level_order(root):
    # TODO: implement using a queue (collections.deque), return a list of values
    return []

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
print(" ".join(map(str, level_order(root))))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* insert(Node *root, int value) {
    if (root == NULL) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

void levelOrder(Node *root) {
    // TODO: implement using an array-based queue, print "value " for each node
}

int main() {
    int n;
    scanf("%d", &n);
    Node *root = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        root = insert(root, v);
    }
    levelOrder(root);
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    if (!root) return new Node(value);
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

vector<int> levelOrder(Node* root) {
    // TODO: implement using a queue<Node*>, return the values in level order
    return {};
}

int main() {
    int n;
    cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        root = insert(root, v);
    }
    auto out = levelOrder(root);
    for (size_t i = 0; i < out.size(); i++) cout << out[i] << (i + 1 < out.size() ? " " : "\\n");
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}

function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function levelOrder(root) {
  // TODO: implement using an array as a queue, return an array of values
  return [];
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
console.log(levelOrder(root).join(" "));
`,
    },
    testCases: [
      { input: "5\n50 30 70 20 40", expectedOutput: "50 30 70 20 40", hidden: false },
      { input: "1\n10", expectedOutput: "10", hidden: false },
      { input: "7\n50 30 70 20 40 60 80", expectedOutput: "50 30 70 20 40 60 80", hidden: true },
    ],
  },
  {
    topicSlug: "trees",
    slug: "search-in-bst",
    title: "Search in a BST",
    difficulty: "Medium",
    statement:
      "Insert n integers into a BST in the order given, then determine whether a target value exists " +
      "in the tree. Print 'true' or 'false'.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is the target.",
    examples: [{ input: "5\n50 30 70 20 40\n40", output: "true" }],
    constraints: ["1 <= n <= 1000"],
    hints: ["At each node, go left if target is smaller, right if larger, and stop if you hit null or find a match."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.value) root.left = insert(root.left, value);
        else if (value > root.value) root.right = insert(root.right, value);
        return root;
    }

    static boolean search(Node root, int target) {
        // TODO: implement iterative or recursive BST search
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());

        Node root = null;
        for (int i = 0; i < n; i++) {
            root = insert(root, Integer.parseInt(st.nextToken()));
        }
        int target = Integer.parseInt(sc.nextLine().trim());

        System.out.println(search(root, target));
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def search(root, target):
    # TODO: implement iterative or recursive BST search
    return False

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
target = int(input().strip())
print(str(search(root, target)).lower())
`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* insert(Node *root, int value) {
    if (root == NULL) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

bool search(Node *root, int target) {
    // TODO: implement iterative or recursive BST search
    return false;
}

int main() {
    int n;
    scanf("%d", &n);
    Node *root = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        root = insert(root, v);
    }
    int target;
    scanf("%d", &target);
    printf(search(root, target) ? "true\\n" : "false\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    if (!root) return new Node(value);
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

bool search(Node* root, int target) {
    // TODO: implement iterative or recursive BST search
    return false;
}

int main() {
    int n;
    cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        root = insert(root, v);
    }
    int target;
    cin >> target;
    cout << (search(root, target) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}

function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function search(root, target) {
  // TODO: implement iterative or recursive BST search
  return false;
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
const target = Number(readLine().trim());
console.log(search(root, target) ? "true" : "false");
`,
    },
    testCases: [
      { input: "5\n50 30 70 20 40\n40", expectedOutput: "true", hidden: false },
      { input: "5\n50 30 70 20 40\n99", expectedOutput: "false", hidden: false },
      { input: "1\n10\n10", expectedOutput: "true", hidden: true },
    ],
  },
  {
    topicSlug: "trees",
    slug: "lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor in a BST",
    difficulty: "Hard",
    statement:
      "Insert n integers into a BST, then find the Lowest Common Ancestor (LCA) of two given values p " +
      "and q. The LCA is the deepest node that has both p and q as descendants (a node can be a " +
      "descendant of itself). Print the LCA's value.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line has p and q.",
    examples: [{ input: "7\n50 30 70 20 40 60 80\n20 40", output: "30", explanation: "20 and 40 both descend from 30." }],
    constraints: ["1 <= n <= 1000", "p and q both exist in the tree"],
    hints: [
      "Starting at the root: if both p and q are smaller, recurse left. If both are larger, recurse right.",
      "Otherwise (they split, or one equals the current node) — the current node is the LCA.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.value) root.left = insert(root.left, value);
        else if (value > root.value) root.right = insert(root.right, value);
        return root;
    }

    static Node lca(Node root, int p, int q) {
        // TODO: implement BST LCA using the ordering property
        return null;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());

        Node root = null;
        for (int i = 0; i < n; i++) {
            root = insert(root, Integer.parseInt(st.nextToken()));
        }
        StringTokenizer pq = new StringTokenizer(sc.nextLine());
        int p = Integer.parseInt(pq.nextToken());
        int q = Integer.parseInt(pq.nextToken());

        System.out.println(lca(root, p, q).value);
    }
}`,
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def lca(root, p, q):
    # TODO: implement BST LCA using the ordering property, return the node
    return None

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
p, q = map(int, input().split())
print(lca(root, p, q).value)
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* insert(Node *root, int value) {
    if (root == NULL) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

Node* lca(Node *root, int p, int q) {
    // TODO: implement BST LCA using the ordering property
    return NULL;
}

int main() {
    int n;
    scanf("%d", &n);
    Node *root = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        root = insert(root, v);
    }
    int p, q;
    scanf("%d %d", &p, &q);
    printf("%d\\n", lca(root, p, q)->value);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    if (!root) return new Node(value);
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

Node* lca(Node* root, int p, int q) {
    // TODO: implement BST LCA using the ordering property
    return nullptr;
}

int main() {
    int n;
    cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        root = insert(root, v);
    }
    int p, q;
    cin >> p >> q;
    cout << lca(root, p, q)->value << endl;
    return 0;
}
`,
      javascript: `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}

function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function lca(root, p, q) {
  // TODO: implement BST LCA using the ordering property
  return null;
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
const [p, q] = readLine().trim().split(/\\s+/).map(Number);
console.log(lca(root, p, q).value);
`,
    },
    testCases: [
      { input: "7\n50 30 70 20 40 60 80\n20 40", expectedOutput: "30", hidden: false },
      { input: "7\n50 30 70 20 40 60 80\n20 80", expectedOutput: "50", hidden: false },
      { input: "5\n50 30 70 20 40\n30 40", expectedOutput: "30", hidden: true },
    ],
  },
];
