export default {
  slug: "stack",
  title: "Stack",
  module: "MODULE 5 — STACK",
  order: 5,
  visualizerType: "StackVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Stack is a linear data structure that stores elements in a single sequence, but restricts " +
    "how they can be added or removed. You can only interact with one end of the stack, called the " +
    "TOP. This gives it the LIFO rule: Last In, First Out. Think of a stack of plates — you always " +
    "place a new plate on top, and you always take the top plate off first.",

  whyNeeded:
    "Many real problems have a 'most recent thing first' structure. Your browser's Back button " +
    "undoes the most recently visited page. An IDE's Undo command reverses the most recent edit. " +
    "A compiler checks that brackets like (), {} and [] are balanced by pushing an opening bracket " +
    "and popping it when the matching closing bracket appears. Function calls themselves are tracked " +
    "using a call stack — which is exactly why deep recursion can cause a 'stack overflow'.",

  howItWorks:
    "A stack supports three core operations, all done at the top: PUSH adds a new element on top, " +
    "POP removes and returns the top element, and PEEK (or TOP) looks at the top element without " +
    "removing it. All three run in O(1) time because nothing needs to shift — you're only ever " +
    "touching the top of the structure. A stack can be implemented using a fixed-size array with a " +
    "'top' index, or using a linked list where PUSH inserts at the head and POP removes the head.",

  example:
    "Start with an empty stack. PUSH 10 -> stack is [10], top = 10. PUSH 20 -> stack is [10, 20], " +
    "top = 20. PUSH 30 -> stack is [10, 20, 30], top = 30. Now POP -> removes and returns 30, stack " +
    "is [10, 20], top = 20. PEEK -> returns 20 without removing it, stack is still [10, 20].",

  codeExamples: [
    {
      language: "java",
      explanation:
        "Array-based stack implementation with a fixed capacity. `top` starts at -1 (empty) and is " +
        "incremented before every push, decremented after every pop.",
      code: `public class ArrayStack {
    private int[] data;
    private int top;
    private int capacity;

    public ArrayStack(int capacity) {
        this.capacity = capacity;
        this.data = new int[capacity];
        this.top = -1;
    }

    public void push(int value) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack Overflow");
        }
        data[++top] = value;
    }

    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }
        return data[top--];
    }

    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return data[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Top: " + stack.peek());   // 30
        System.out.println("Popped: " + stack.pop());  // 30
        System.out.println("Top now: " + stack.peek()); // 20
    }
}`,
    },
    {
      language: "java",
      explanation:
        "Linked-list based stack. PUSH inserts a new node at the head, POP removes the head — both " +
        "O(1) with no fixed capacity limit (bounded only by available memory).",
      code: `public class LinkedStack {
    private static class Node {
        int value;
        Node next;
        Node(int value, Node next) { this.value = value; this.next = next; }
    }

    private Node top;

    public void push(int value) {
        top = new Node(value, top);
    }

    public int pop() {
        if (isEmpty()) throw new RuntimeException("Stack Underflow");
        int value = top.value;
        top = top.next;
        return value;
    }

    public boolean isEmpty() {
        return top == null;
    }
}`,
    },
  ],

  complexity: {
    time: "O(1) for push, pop and peek",
    space: "O(n) for n elements stored",
    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",
  },

  quiz: [
    {
      question: "What ordering rule does a Stack follow?",
      options: ["FIFO — First In, First Out", "LIFO — Last In, First Out", "Random order", "Sorted order"],
      correctIndex: 1,
      explanation: "A stack always removes the most recently added element first — LIFO.",
    },
    {
      question: "What is the time complexity of PUSH on an array-based stack?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctIndex: 0,
      explanation: "Push only touches the top index — no shifting of other elements is needed.",
    },
    {
      question: "What happens when you POP from an empty stack?",
      options: ["Returns 0", "Returns null silently", "Stack Underflow error", "Stack Overflow error"],
      correctIndex: 2,
      explanation: "Removing from an empty stack is called Underflow, and should be handled as an error.",
    },
    {
      question: "Which real-world feature is a classic application of a Stack?",
      options: ["A print queue", "A browser's Back button history", "A priority hospital queue", "A round-robin CPU scheduler"],
      correctIndex: 1,
      explanation: "Back button history undoes the most recently visited page first — a LIFO pattern.",
    },
    {
      question: "Converting infix expression 'A + B' to postfix gives:",
      options: ["+ A B", "A B +", "A + B", "B A +"],
      correctIndex: 1,
      explanation: "Postfix places the operator after its operands: A B +.",
    },
  ],
};
