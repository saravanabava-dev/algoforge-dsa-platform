export default [
  {
    topicSlug: "binary-search-tree",
    slug: "validate-bst",
    title: "Validate a Binary Search Tree",
    difficulty: "Medium",
    statement:
      "Insert n integers into a BST in the order given, then verify the ordering property holds for " +
      "every node (it always will if you insert with a correct algorithm — this problem is about " +
      "writing the validator itself, imagining the tree came from an untrusted source). Print 'true' " +
      "or 'false'.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "5\n50 30 70 20 40", output: "true" }],
    constraints: ["1 <= n <= 1000"],
    hints: [
      "Checking only 'node.left.value < node.value < node.right.value' locally is NOT enough — a deep node could still violate an ancestor's bound.",
      "Pass down a valid (min, max) range as you recurse, tightening it at each step.",
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

    static boolean isValidBST(Node node, Long min, Long max) {
        // TODO: recursively validate using a (min, max) range
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        Node root = null;
        for (int i = 0; i < n; i++) root = insert(root, Integer.parseInt(st.nextToken()));
        System.out.println(isValidBST(root, null, null));
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

def is_valid_bst(node, low=None, high=None):
    # TODO: recursively validate using a (low, high) range
    return True

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
print(str(is_valid_bst(root)).lower())
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* insert(Node *root, int value) {
    if (!root) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

// TODO: recursively validate using a (hasMin,min,hasMax,max) range
int isValidBST(Node *node) {
    return 1;
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
    printf(isValidBST(root) ? "true\\n" : "false\\n");
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

// TODO: recursively validate using a (min, max) range (use long long for bounds)
bool isValidBST(Node* node, long long lo = LLONG_MIN, long long hi = LLONG_MAX) {
    return true;
}

int main() {
    int n;
    cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        root = insert(root, v);
    }
    cout << (isValidBST(root) ? "true" : "false") << endl;
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

function isValidBST(node, low = -Infinity, high = Infinity) {
  // TODO: recursively validate using a (low, high) range
  return true;
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
console.log(isValidBST(root));
`,
    },
    testCases: [
      { input: "5\n50 30 70 20 40", expectedOutput: "true", hidden: false },
      { input: "1\n10", expectedOutput: "true", hidden: false },
      { input: "3\n1 2 3", expectedOutput: "true", hidden: true },
    ],
  },
  {
    topicSlug: "binary-search-tree",
    slug: "kth-smallest-in-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    statement:
      "Insert n integers into a BST, then find the kth smallest value (1-indexed) using an inorder " +
      "traversal (which visits BST values in ascending order).\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is k.",
    examples: [{ input: "5\n50 30 70 20 40\n3", output: "40" }],
    constraints: ["1 <= k <= n <= 1000"],
    hints: ["An inorder traversal (left, node, right) visits BST values in ascending sorted order — the kth value visited is the answer."],
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

    static void inorder(Node node, List<Integer> out) {
        if (node == null) return;
        inorder(node.left, out);
        out.add(node.value);
        inorder(node.right, out);
    }

    static int kthSmallest(Node root, int k) {
        // TODO: use inorder traversal, return the kth (1-indexed) value visited
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        Node root = null;
        for (int i = 0; i < n; i++) root = insert(root, Integer.parseInt(st.nextToken()));
        int k = Integer.parseInt(sc.nextLine().trim());
        System.out.println(kthSmallest(root, k));
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

def kth_smallest(root, k):
    # TODO: use inorder traversal, return the kth (1-indexed) value visited
    return -1

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
k = int(input().strip())
print(kth_smallest(root, k))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* insert(Node *root, int value) {
    if (!root) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

// TODO: inorder traversal tracking a counter, return the kth (1-indexed) value
int kthSmallest(Node *root, int k) {
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
    int k;
    scanf("%d", &k);
    printf("%d\\n", kthSmallest(root, k));
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

// TODO: inorder traversal tracking a counter, return the kth (1-indexed) value
int kthSmallest(Node* root, int k) {
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
    int k;
    cin >> k;
    cout << kthSmallest(root, k) << endl;
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

function kthSmallest(root, k) {
  // TODO: inorder traversal tracking a counter, return the kth (1-indexed) value
  return -1;
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
const k = Number(readLine().trim());
console.log(kthSmallest(root, k));
`,
    },
    testCases: [
      { input: "5\n50 30 70 20 40\n3", expectedOutput: "40", hidden: false },
      { input: "1\n10\n1", expectedOutput: "10", hidden: false },
      { input: "7\n50 30 70 20 40 60 80\n7", expectedOutput: "80", hidden: true },
    ],
  },
  {
    topicSlug: "binary-search-tree",
    slug: "delete-node-in-bst",
    title: "Delete a Node from a BST",
    difficulty: "Hard",
    statement:
      "Insert n integers into a BST, delete a given target value from it (using the standard " +
      "3-case deletion algorithm), then print the resulting tree's inorder traversal, space-separated.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is the " +
      "value to delete.",
    examples: [{ input: "7\n50 30 70 20 40 60 80\n30", output: "20 40 50 60 70 80", explanation: "30 (two children) is replaced by its inorder successor, 40." }],
    constraints: ["1 <= n <= 1000", "The target is guaranteed to exist in the tree"],
    hints: [
      "Leaf node: simply remove it (return null/None in its place).",
      "One child: replace the node with its single child.",
      "Two children: replace the node's value with its inorder successor (smallest value in the right subtree), then delete that successor from the right subtree.",
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

    static Node deleteNode(Node root, int target) {
        // TODO: implement the standard 3-case BST deletion, return the new subtree root
        return root;
    }

    static void inorder(Node node, StringBuilder out) {
        if (node == null) return;
        inorder(node.left, out);
        out.append(node.value).append(" ");
        inorder(node.right, out);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        Node root = null;
        for (int i = 0; i < n; i++) root = insert(root, Integer.parseInt(st.nextToken()));
        int target = Integer.parseInt(sc.nextLine().trim());
        root = deleteNode(root, target);
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
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def delete_node(root, target):
    # TODO: implement the standard 3-case BST deletion, return the new subtree root
    return root

def inorder(node, out):
    if node is None:
        return
    inorder(node.left, out)
    out.append(str(node.value))
    inorder(node.right, out)

n = int(input().strip())
values = list(map(int, input().split()))
root = None
for v in values:
    root = insert(root, v)
target = int(input().strip())
root = delete_node(root, target)
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

Node* insert(Node *root, int value) {
    if (!root) {
        Node *n = malloc(sizeof(Node));
        n->value = value; n->left = NULL; n->right = NULL;
        return n;
    }
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

// TODO: implement the standard 3-case BST deletion, return the new subtree root
Node* deleteNode(Node *root, int target) {
    return root;
}

void inorder(Node *node) {
    if (!node) return;
    inorder(node->left);
    printf("%d ", node->value);
    inorder(node->right);
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
    root = deleteNode(root, target);
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
    if (!root) return new Node(value);
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

// TODO: implement the standard 3-case BST deletion, return the new subtree root
Node* deleteNode(Node* root, int target) {
    return root;
}

void inorder(Node* node) {
    if (!node) return;
    inorder(node->left);
    cout << node->value << " ";
    inorder(node->right);
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
    root = deleteNode(root, target);
    inorder(root);
    cout << endl;
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

function deleteNode(root, target) {
  // TODO: implement the standard 3-case BST deletion, return the new subtree root
  return root;
}

function inorder(node, out) {
  if (!node) return;
  inorder(node.left, out);
  out.push(node.value);
  inorder(node.right, out);
}

const n = Number(readLine().trim());
const values = readLine().trim().split(/\\s+/).map(Number);
let root = null;
for (const v of values) root = insert(root, v);
const target = Number(readLine().trim());
root = deleteNode(root, target);
const out = [];
inorder(root, out);
console.log(out.join(" "));
`,
    },
    testCases: [
      { input: "7\n50 30 70 20 40 60 80\n30", expectedOutput: "20 40 50 60 70 80", hidden: false },
     { input: "1\n10\n10", expectedOutput: "\n", hidden: false },
      { input: "3\n5 3 7\n7", expectedOutput: "3 5", hidden: true },
    ],
  },
];
