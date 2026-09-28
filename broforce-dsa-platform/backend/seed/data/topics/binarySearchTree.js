export default {
  slug: "binary-search-tree",
  title: "Binary Search Tree",
  module: "MODULE 11 — BINARY SEARCH TREE",
  order: 10,
  visualizerType: "TreeVisualizer",
  prerequisites: ["trees"],

  whatIsIt:
    "A Binary Search Tree (BST) is a Binary Tree with one extra rule: for every node, every value " +
    "in its LEFT subtree is smaller, and every value in its RIGHT subtree is larger. This ordering " +
    "property is what makes a BST searchable — at each node you can decide which subtree to look in " +
    "without ever checking the other one.",

  whyNeeded:
    "A sorted array gives fast O(log n) search but slow O(n) insertion (everything has to shift). A " +
    "linked list gives fast O(1) insertion but slow O(n) search. A balanced BST gives you both: " +
    "O(log n) search, insertion, AND deletion. This is why BSTs (and their self-balancing cousins " +
    "like AVL trees and Red-Black trees) back many real database indexes and language library " +
    "structures like Java's TreeMap/TreeSet and C++'s std::map/std::set.",

  howItWorks:
    "SEARCH starts at the root: if the target matches, done; if smaller, recurse left; if larger, " +
    "recurse right; hitting an empty spot means the value isn't present. INSERT follows the exact " +
    "same path and places a new node at the empty spot found. DELETE has three cases: deleting a " +
    "leaf just removes it; deleting a node with one child replaces it with that child; deleting a " +
    "node with two children replaces its value with its INORDER SUCCESSOR (the smallest value in " +
    "its right subtree), then deletes that successor node instead (which has at most one child, " +
    "reducing to an easier case). The catch: if you insert already-sorted data, every node gets only " +
    "one child and the 'tree' degenerates into a straight line — O(n) operations instead of " +
    "O(log n). Self-balancing trees exist specifically to prevent this.",

  example:
    "Insert 50, 30, 70, 20, 40, 60, 80 into an empty BST, in that order:\n" +
    "50 becomes root. 30 < 50 -> left of 50. 70 > 50 -> right of 50. 20 < 50, < 30 -> left of 30. " +
    "40 < 50, > 30 -> right of 30. 60 > 50, < 70 -> left of 70. 80 > 50, > 70 -> right of 70.\n" +
    "Searching for 40: 40 < 50 -> go left to 30. 40 > 30 -> go right to 40. Match — found in 2 hops " +
    "instead of scanning all 7 values.",

  codeExamples: [
    {
      language: "java",
      explanation: "BST search and insert — both follow the same left/right decision at every node.",
      code: `public class BST {
    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    static Node insert(Node root, int value) {
        if (root == null) return new Node(value);
        if (value < root.value) root.left = insert(root.left, value);
        else if (value > root.value) root.right = insert(root.right, value);
        return root; // duplicates ignored
    }

    static boolean search(Node root, int target) {
        if (root == null) return false;
        if (root.value == target) return true;
        return target < root.value ? search(root.left, target) : search(root.right, target);
    }
}`,
    },
    {
      language: "java",
      explanation: "BST deletion — the two-children case replaces a node's value with its inorder successor.",
      code: `public class BSTDelete {
    static BST.Node delete(BST.Node root, int target) {
        if (root == null) return null;

        if (target < root.value) {
            root.left = delete(root.left, target);
        } else if (target > root.value) {
            root.right = delete(root.right, target);
        } else {
            // Found the node to delete.
            if (root.left == null) return root.right;   // 0 or 1 child (right)
            if (root.right == null) return root.left;    // 1 child (left)

            // Two children: find inorder successor (smallest in right subtree).
            BST.Node successor = root.right;
            while (successor.left != null) successor = successor.left;

            root.value = successor.value;
            root.right = delete(root.right, successor.value);
        }
        return root;
    }
}`,
    },
  ],

  complexity: {
    time: "O(log n) average for search/insert/delete on a balanced BST; O(n) worst case if degenerate",
    space: "O(n) to store n nodes; O(h) recursion stack, where h is tree height",
    best: "O(log n) — balanced tree",
    average: "O(log n) — balanced tree",
    worst: "O(n) — degenerate tree from inserting already-sorted data",
  },

  quiz: [
    {
      question: "What ordering property defines a Binary Search Tree?",
      options: [
        "Every node has exactly two children",
        "Left subtree values are smaller, right subtree values are larger, for every node",
        "The tree must be perfectly balanced",
        "All leaf nodes must be at the same depth",
      ],
      correctIndex: 1,
      explanation: "This ordering rule is what lets search eliminate half the remaining tree at each step.",
    },
    {
      question: "When deleting a BST node with two children, what replaces it?",
      options: [
        "Its left child",
        "Its right child",
        "Its inorder successor (smallest value in the right subtree)",
        "The root of the tree",
      ],
      correctIndex: 2,
      explanation: "Using the inorder successor preserves the BST ordering property after deletion.",
    },
    {
      question: "What causes a BST to degrade to O(n) operations?",
      options: [
        "Inserting values in random order",
        "Inserting already-sorted values, producing a line-shaped tree",
        "Having duplicate values",
        "Using recursion instead of iteration",
      ],
      correctIndex: 1,
      explanation: "Sorted insertion order gives every node only one child, turning the tree into a linked list.",
    },
    {
      question: "Which real data structures are commonly backed by a (self-balancing) BST?",
      options: ["Arrays", "Java's TreeMap / C++'s std::map", "Hash tables", "Stacks"],
      correctIndex: 1,
      explanation: "Ordered map/set implementations in many standard libraries use balanced BSTs internally.",
    },
    {
      question: "What is the time complexity of searching a balanced BST with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 1,
      explanation: "Each comparison eliminates roughly half the remaining nodes, giving O(log n) when balanced.",
    },
  ],
};
