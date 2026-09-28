export default {
  slug: "queue",
  title: "Queue",
  module: "MODULE 6 — QUEUE",
  order: 6,
  visualizerType: "QueueVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Queue is a linear data structure that stores elements in sequence, but restricts how they " +
    "can be added or removed: new elements join at the REAR, and elements leave from the FRONT. " +
    "This gives it the FIFO rule: First In, First Out. Think of a line of people waiting to buy " +
    "tickets — whoever joined first gets served first, and new arrivals join the back of the line.",

  whyNeeded:
    "Many real systems process things in the order they arrive. A printer processes print jobs in " +
    "the order they were submitted. A customer support system serves tickets in the order they came " +
    "in. Operating systems use queues to schedule which process gets the CPU next. Breadth-First " +
    "Search on a tree or graph uses a queue to visit nodes level by level, in the order they were " +
    "discovered — this is exactly why BFS finds the shortest unweighted path.",

  howItWorks:
    "A queue supports three core operations: ENQUEUE adds a new element at the rear, DEQUEUE removes " +
    "and returns the element at the front, and PEEK (or FRONT) looks at the front element without " +
    "removing it. All three run in O(1) with the right implementation. An array-based queue can use " +
    "two pointers — front and rear — to avoid shifting elements on every dequeue; a circular queue " +
    "wraps those pointers around the array to reuse freed space. A linked-list-based queue simply " +
    "inserts at the tail and removes from the head, both O(1) with a tracked tail pointer.",

  example:
    "Start with an empty queue. ENQUEUE 10 -> queue is [10], front = 10, rear = 10. ENQUEUE 20 -> " +
    "queue is [10, 20], front = 10, rear = 20. ENQUEUE 30 -> queue is [10, 20, 30], front = 10, " +
    "rear = 30. Now DEQUEUE -> removes and returns 10 (the front), queue is [20, 30], front = 20. " +
    "PEEK -> returns 20 without removing it, queue is still [20, 30].",

  codeExamples: [
    {
      language: "java",
      explanation:
        "Array-based circular queue with a fixed capacity. Wrapping front/rear with modulo lets the " +
        "queue reuse space freed by dequeues instead of shifting every remaining element.",
      code: `public class CircularQueue {
    private int[] data;
    private int front, rear, size, capacity;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.data = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public void enqueue(int value) {
        if (size == capacity) {
            throw new RuntimeException("Queue is full");
        }
        rear = (rear + 1) % capacity;
        data[rear] = value;
        size++;
    }

    public int dequeue() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        int value = data[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }

    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        return data[front];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public static void main(String[] args) {
        CircularQueue q = new CircularQueue(5);
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        System.out.println("Front: " + q.peek());    // 10
        System.out.println("Dequeued: " + q.dequeue()); // 10
        System.out.println("Front now: " + q.peek());   // 20
    }
}`,
    },
    {
      language: "java",
      explanation:
        "Linked-list based queue. ENQUEUE inserts at the tail, DEQUEUE removes the head — both O(1) " +
        "with no fixed capacity limit.",
      code: `public class LinkedQueue {
    private static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    private Node head, tail;

    public void enqueue(int value) {
        Node node = new Node(value);
        if (tail == null) {
            head = tail = node;
        } else {
            tail.next = node;
            tail = node;
        }
    }

    public int dequeue() {
        if (head == null) throw new RuntimeException("Queue is empty");
        int value = head.value;
        head = head.next;
        if (head == null) tail = null;
        return value;
    }

    public boolean isEmpty() {
        return head == null;
    }
}`,
    },
  ],

  complexity: {
    time: "O(1) for enqueue, dequeue and peek (array-based circular queue or linked list)",
    space: "O(n) for n elements stored",
    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",
  },

  quiz: [
    {
      question: "What ordering rule does a Queue follow?",
      options: ["LIFO — Last In, First Out", "FIFO — First In, First Out", "Random order", "Sorted order"],
      correctIndex: 1,
      explanation: "A queue always removes the element that has been waiting the longest — FIFO.",
    },
    {
      question: "Where does ENQUEUE add a new element?",
      options: ["At the front", "At the rear", "In the middle", "Wherever there's space"],
      correctIndex: 1,
      explanation: "New elements always join at the rear; DEQUEUE removes from the front.",
    },
    {
      question: "Why does an array-based queue commonly use a circular (wraparound) design?",
      options: [
        "To make the queue sort itself automatically",
        "To reuse array space freed by dequeues, instead of shifting every remaining element",
        "To allow duplicate values",
        "It's required by the FIFO rule",
      ],
      correctIndex: 1,
      explanation: "Wrapping front/rear indices with modulo avoids the O(n) cost of shifting elements left after every dequeue.",
    },
    {
      question: "Which traversal algorithm naturally uses a Queue?",
      options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Binary Search", "Quick Sort"],
      correctIndex: 1,
      explanation: "BFS visits nodes level by level in the order they were discovered — exactly what a queue provides.",
    },
    {
      question: "What is the time complexity of DEQUEUE on a well-implemented queue?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctIndex: 0,
      explanation: "With a tracked front pointer (array-based) or head pointer (linked-list-based), dequeue never needs to shift or search.",
    },
  ],
};
