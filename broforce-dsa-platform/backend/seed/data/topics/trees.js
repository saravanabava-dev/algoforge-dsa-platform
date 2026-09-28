export default {
  slug: "trees",
  title: "Trees",
  module: "MODULE 7 — TREES",
  order: 7,
  visualizerType: "TreeVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Tree is a hierarchical data structure made of nodes connected by edges, starting from a single " +
    "root node, where every other node has exactly one parent. A Binary Tree restricts each node to " +
    "at most two children, conventionally called 'left' and 'right'. A Binary Search Tree (BST) adds " +
    "an ordering rule: for every node, everything in its left subtree is smaller, and everything in " +
    "its right subtree is larger.",

  whyNeeded:
    "Trees model naturally hierarchical data — file systems, org charts, HTML/DOM structure, decision " +
    "trees. A BST specifically gives fast O(log n) search, insert, and delete on average, because " +
    "every comparison eliminates half of the remaining tree, similar to Binary Search on a sorted " +
    "array but with efficient insertion too (unlike a sorted array, which needs O(n) shifting).",

  howItWorks:
    "To search a BST for a value, start at the root: if the value matches, you're done; if it's " +
    "smaller, recurse left; if it's larger, recurse right; if you reach an empty spot, the value " +
    "isn't present. Insertion follows the same path and adds a new node at the empty spot found. " +
    "Deletion has three cases: deleting a leaf (just remove it), deleting a node with one child " +
    "(replace it with its child), and deleting a node with two children (replace its value with its " +
    "in-order successor — the smallest value in its right subtree — then delete that successor). " +
    "Traversals visit every node in a defined order: Inorder (left, node, right) visits a BST's " +
    "values in sorted order; Preorder (node, left, right) is useful for copying a tree; Postorder " +
    "(left, right, node) is useful for deleting a tree; Level Order visits node-by-node, level " +
    "by level, using a queue.",

  example:
    "Insert 50, 30, 70, 20, 40 into an empty BST in that order:\n" +
    "50 becomes the root. 30 < 50, goes left of 50. 70 > 50, goes right of 50. " +
    "20 < 50 -> < 30, goes left of 30. 40 < 50 -> > 30, goes right of 30.\n" +
    "Resulting tree:\n" +
    "        50\n" +
    "       /  \\\n" +
    "     30    70\n" +
    "    /  \\\n" +
    "  20    40\n" +
    "Inorder traversal (sorted order): 20, 30, 40, 50, 70.",

  codeExamples: [
    {
      language: "java",
      explanation: "BST node definition plus recursive insert.",
      code: `public class BST {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.value) {
            root.left = insert(root.left, value);
        } else if (value > root.value) {
            root.right = insert(root.right, value);
        }
        // duplicates are ignored
        return root;
    }
}`,
    },
    {
      language: "python",
      explanation: "BST node definition plus recursive insert, in Python.",
      code: `class Node:
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
    # duplicates are ignored
    return root`,
    },
    {
      language: "c",
      explanation: "BST node definition plus recursive insert, in C.",
      code: `#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *left, *right;
} Node;

Node* createNode(int value) {
    Node* node = malloc(sizeof(Node));
    node->value = value;
    node->left = node->right = NULL;
    return node;
}

Node* insert(Node* root, int value) {
    if (root == NULL) return createNode(value);
    if (value < root->value) {
        root->left = insert(root->left, value);
    } else if (value > root->value) {
        root->right = insert(root->right, value);
    }
    // duplicates are ignored
    return root;
}`,
    },
    {
      language: "cpp",
      explanation: "BST node definition plus recursive insert, in C++.",
      code: `struct Node {
    int value;
    Node *left, *right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    if (root == nullptr) return new Node(value);
    if (value < root->value) {
        root->left = insert(root->left, value);
    } else if (value > root->value) {
        root->right = insert(root->right, value);
    }
    // duplicates are ignored
    return root;
}`,
    },
    {
      language: "javascript",
      explanation: "BST node definition plus recursive insert, in JavaScript.",
      code: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (root === null) return new Node(value);
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  // duplicates are ignored
  return root;
}`,
    },
    {
      language: "java",
      explanation: "Recursive inorder, preorder and postorder traversals.",
      code: `public class Traversals {
    static void inorder(BST.Node node, StringBuilder out) {
        if (node == null) return;
        inorder(node.left, out);
        out.append(node.value).append(" ");
        inorder(node.right, out);
    }

    static void preorder(BST.Node node, StringBuilder out) {
        if (node == null) return;
        out.append(node.value).append(" ");
        preorder(node.left, out);
        preorder(node.right, out);
    }

    static void postorder(BST.Node node, StringBuilder out) {
        if (node == null) return;
        postorder(node.left, out);
        postorder(node.right, out);
        out.append(node.value).append(" ");
    }
}`,
    },
    {
      language: "java",
      explanation: "Level order traversal using a queue (breadth-first).",
      code: `import java.util.*;

public class LevelOrder {
    static List<Integer> levelOrder(BST.Node root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Queue<BST.Node> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            BST.Node current = queue.poll();
            result.add(current.value);
            if (current.left != null) queue.add(current.left);
            if (current.right != null) queue.add(current.right);
        }
        return result;
    }
}`,
    },
  ],

  complexity: {
    time: "O(log n) average for search/insert/delete on a balanced BST; O(n) worst case if the tree degenerates into a line",
    space: "O(n) to store n nodes; O(h) recursion stack for traversals, where h is the tree height",
    best: "O(log n) — balanced tree",
    average: "O(log n) — balanced tree",
    worst: "O(n) — degenerate/unbalanced tree (e.g. inserting sorted data in order)",
  },

  quiz: [
    {
      question: "In a Binary Search Tree, where do values smaller than a node go?",
      options: ["Right subtree", "Left subtree", "Either side", "They can't be inserted"],
      correctIndex: 1,
      explanation: "BST ordering: left subtree holds smaller values, right subtree holds larger values.",
    },
    {
      question: "Which traversal visits a BST's nodes in sorted ascending order?",
      options: ["Preorder", "Postorder", "Inorder", "Level order"],
      correctIndex: 2,
      explanation: "Inorder (left, node, right) naturally visits BST values from smallest to largest.",
    },
    {
      question: "What is the average time complexity of searching a balanced BST?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 1,
      explanation: "Each comparison eliminates roughly half the remaining nodes, giving O(log n) on average.",
    },
    {
      question: "What causes a BST to degrade to O(n) search time?",
      options: [
        "Inserting values in random order",
        "Inserting values that are already sorted, creating a line-shaped tree",
        "Using recursion instead of iteration",
        "Having duplicate values",
      ],
      correctIndex: 1,
      explanation: "Inserting already-sorted data makes every node have only one child, turning the tree into a linked list.",
    },
    {
      question: "Which data structure is used to implement Level Order Traversal?",
      options: ["Stack", "Queue", "Heap", "Trie"],
      correctIndex: 1,
      explanation: "Level order (BFS) processes nodes in the order they were discovered, which a Queue naturally provides.",
    },
  ],
};
