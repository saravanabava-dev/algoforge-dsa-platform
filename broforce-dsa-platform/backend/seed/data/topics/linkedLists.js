export default {
  slug: "linked-lists",
  title: "Linked Lists",
  module: "MODULE 4 — LINKED LIST",
  order: 4,
  visualizerType: "LinkedListVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Linked List is a linear data structure made of nodes, where each node stores a value and a " +
    "reference ('next') to the following node. Unlike an array, the elements are not stored in " +
    "contiguous memory — they can live anywhere, connected only by these pointers. The list starts " +
    "at a 'head' node and ends when a node's 'next' points to NULL.",

  whyNeeded:
    "Arrays are fast to read by index but expensive to grow or shrink, because inserting or " +
    "deleting in the middle means shifting every following element. A Linked List flips that " +
    "trade-off: once you have a reference to a node, inserting or deleting right there is O(1) — " +
    "no shifting, just re-pointing a couple of links. This makes linked lists a natural fit for " +
    "situations with frequent insertions/deletions, like implementing a Stack, a Queue, or an " +
    "LRU cache's internal structure. The cost is that you lose O(1) random access — to reach the " +
    "5th node you must walk the list one link at a time from the head.",

  howItWorks:
    "TRAVERSE starts at head and follows 'next' pointers until reaching NULL — O(n). SEARCH is a " +
    "traversal that stops early when the target value is found — O(n) worst case. INSERT at the " +
    "head is O(1): create a new node whose 'next' is the old head, then update head to point to the " +
    "new node. INSERT at the end (without a tail pointer) requires traversing to the last node " +
    "first — O(n). DELETE works the same way: deleting the head is O(1) (just move head to " +
    "head.next), but deleting a node elsewhere requires a reference to the PREVIOUS node, so you " +
    "can re-point its 'next' to skip over the deleted node. REVERSE walks the list once, and at each " +
    "node flips its 'next' pointer to point backward instead of forward, tracking the previous node " +
    "as it goes — O(n) time, O(1) space.",

  example:
    "Building a list by inserting 10, 20, 30 at the head, one at a time:\n" +
    "Insert 10 -> [10] -> NULL\n" +
    "Insert 20 at head -> [20] -> [10] -> NULL\n" +
    "Insert 30 at head -> [30] -> [20] -> [10] -> NULL\n" +
    "Now REVERSE the list: walking from head, flip each 'next' pointer backward:\n" +
    "Result -> [10] -> [20] -> [30] -> NULL, and head now points to the node holding 10.",

  codeExamples: [
    {
      language: "java",
      explanation: "Singly linked list node definition, plus insert-at-head and traversal.",
      code: `public class LinkedList {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    Node head;

    void insertAtHead(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode; // O(1)
    }

    void insertAtEnd(int value) {
        Node newNode = new Node(value);
        if (head == null) { head = newNode; return; }
        Node current = head;
        while (current.next != null) current = current.next; // O(n) walk
        current.next = newNode;
    }

    void printList() {
        Node current = head;
        while (current != null) {
            System.out.print(current.value + " -> ");
            current = current.next;
        }
        System.out.println("NULL");
    }
}`,
    },
    {
      language: "java",
      explanation: "Reversing a singly linked list in place, O(n) time and O(1) extra space.",
      code: `public class ReverseList {
    static LinkedList.Node reverse(LinkedList.Node head) {
        LinkedList.Node prev = null;
        LinkedList.Node current = head;

        while (current != null) {
            LinkedList.Node nextNode = current.next; // save the rest of the list
            current.next = prev;                      // flip this node's pointer backward
            prev = current;                            // advance prev
            current = nextNode;                        // advance current
        }
        return prev; // prev is now the new head
    }
}`,
    },
    {
      language: "java",
      explanation: "Finding the middle node using the fast/slow (tortoise and hare) two-pointer technique.",
      code: `public class MiddleNode {
    static LinkedList.Node findMiddle(LinkedList.Node head) {
        LinkedList.Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;       // moves one step
            fast = fast.next.next;  // moves two steps
        }
        return slow; // when fast reaches the end, slow is at the middle
    }
}`,
    },
  ],

  complexity: {
    time: "Access by position: O(n). Search: O(n). Insert/Delete at head: O(1). Insert/Delete at end or middle: O(n) without a reference to the node/previous node",
    space: "O(n) to store n nodes, plus O(1) extra per operation",
    best: "O(1) — insert or delete at the head",
    average: "O(n) — search, or insert/delete at an arbitrary position",
    worst: "O(n) — traversal-dependent operations, or insert/delete at the tail without a tail pointer",
  },

  quiz: [
    {
      question: "What does each node in a singly linked list store?",
      options: [
        "Only a value",
        "A value and a reference to the next node",
        "A value and references to both the next and previous nodes",
        "Only a reference to the next node",
      ],
      correctIndex: 1,
      explanation: "A singly linked list node holds its value plus a single 'next' pointer.",
    },
    {
      question: "Why is inserting at the head of a linked list O(1), unlike an array?",
      options: [
        "Because linked lists are always short",
        "Because it only requires creating a node and updating one pointer — no shifting of other elements",
        "Because linked lists are sorted",
        "It isn't O(1) — it's actually O(n)",
      ],
      correctIndex: 1,
      explanation: "No contiguous memory means no shifting is needed; only pointers are updated.",
    },
    {
      question: "What is the time complexity of accessing the 5th element of a linked list?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctIndex: 2,
      explanation: "There's no random access — you must traverse from the head, one link at a time.",
    },
    {
      question: "The 'fast and slow pointer' technique is commonly used to:",
      options: [
        "Sort a linked list",
        "Find the middle node or detect a cycle",
        "Reverse a linked list",
        "Delete the head node",
      ],
      correctIndex: 1,
      explanation: "When the fast pointer (moving 2 steps) reaches the end, the slow pointer (moving 1 step) is at the middle — the same technique also detects cycles.",
    },
    {
      question: "What extra space does the standard iterative linked list reversal use?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctIndex: 2,
      explanation: "Reversal only needs a constant number of pointers (prev, current, next) regardless of list size.",
    },
  ],
};
