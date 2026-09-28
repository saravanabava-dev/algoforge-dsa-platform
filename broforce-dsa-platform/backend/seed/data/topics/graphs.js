export default {
  slug: "graphs",
  title: "Graphs",
  module: "MODULE 12 — GRAPHS",
  order: 11,
  visualizerType: "GraphVisualizer",
  prerequisites: [],

  whatIsIt:
    "A Graph is a collection of VERTICES (nodes) connected by EDGES. Unlike a tree, a graph has no " +
    "single root and can contain cycles — any node can connect to any other. Edges can be UNDIRECTED " +
    "(the connection works both ways, like a friendship) or DIRECTED (one-way, like a follower " +
    "relationship), and WEIGHTED (the edge carries a cost, like distance) or unweighted.",

  whyNeeded:
    "Graphs model almost any network: road maps, social networks, the internet's link structure, " +
    "dependency chains between tasks. Two traversal algorithms — BFS and DFS — underpin most graph " +
    "problems: BFS finds the shortest path in an unweighted graph and explores level by level; DFS " +
    "explores as deep as possible before backtracking, and is the basis for cycle detection, " +
    "topological sorting, and finding connected components.",

  howItWorks:
    "A graph is usually represented as an ADJACENCY LIST (a map from each node to its list of " +
    "neighbors — space-efficient for sparse graphs) or an ADJACENCY MATRIX (an n x n grid where " +
    "matrix[i][j] indicates an edge — simple but O(n^2) space). BFS (Breadth-First Search) uses a " +
    "QUEUE: start at a node, mark it visited, enqueue it; repeatedly dequeue a node, visit each " +
    "unvisited neighbor, mark and enqueue them. This guarantees nodes are visited in order of " +
    "distance from the start. DFS (Depth-First Search) uses a STACK (or recursion, which uses the " +
    "call stack implicitly): visit a node, mark it, then recurse into an unvisited neighbor before " +
    "backtracking to try the next one.",

  example:
    "Graph: A-B, A-C, A-E, B-D, C-D, E-D (undirected).\n" +
    "BFS from A: visit A, enqueue neighbors B, C, E. Visit B (enqueue D), visit C (D already " +
    "queued), visit E (D already queued). Visit D. Order: A, B, C, E, D.\n" +
    "DFS from A: visit A, go deep into B, then D (B's unvisited neighbor), then D's neighbors C and " +
    "E are visited from there. Order: A, B, D, C, E (exact order depends on neighbor list order).",

  codeExamples: [
    {
      language: "java",
      explanation: "Graph as an adjacency list, with BFS using a queue.",
      code: `import java.util.*;

public class GraphBFS {
    static List<Integer> bfs(Map<Integer, List<Integer>> adj, int start) {
        List<Integer> order = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();

        visited.add(start);
        queue.add(start);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            for (int neighbor : adj.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return order;
    }
}`,
    },
    {
      language: "java",
      explanation: "DFS using recursion — visits as deep as possible before backtracking.",
      code: `import java.util.*;

public class GraphDFS {
    static void dfs(Map<Integer, List<Integer>> adj, int node, Set<Integer> visited, List<Integer> order) {
        visited.add(node);
        order.add(node);
        for (int neighbor : adj.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfs(adj, neighbor, visited, order);
            }
        }
    }
}`,
    },
  ],

  complexity: {
    time: "BFS and DFS: O(V + E) — every vertex and edge is examined once, where V = vertices, E = edges",
    space: "O(V) for the visited set and queue/recursion stack, plus O(V + E) to store the adjacency list",
    best: "O(V + E)",
    average: "O(V + E)",
    worst: "O(V + E)",
  },

  quiz: [
    {
      question: "What data structure does BFS use to decide which node to visit next?",
      options: ["A stack", "A queue", "A heap", "A hash map"],
      correctIndex: 1,
      explanation: "BFS processes nodes in the order they were discovered — exactly what a queue provides.",
    },
    {
      question: "What guarantee does BFS give in an unweighted graph?",
      options: [
        "It visits nodes in alphabetical order",
        "It finds the shortest path (fewest edges) from the start node",
        "It always visits every node exactly twice",
        "It only works on trees",
      ],
      correctIndex: 1,
      explanation: "Because BFS expands level by level, the first time it reaches a node is via a shortest path.",
    },
    {
      question: "What is the time complexity of BFS/DFS on a graph with V vertices and E edges?",
      options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
      correctIndex: 2,
      explanation: "Every vertex is visited once and every edge is examined once — O(V + E).",
    },
    {
      question: "Which representation uses O(V^2) space regardless of how many edges exist?",
      options: ["Adjacency list", "Adjacency matrix", "Edge list", "Priority queue"],
      correctIndex: 1,
      explanation: "An adjacency matrix allocates a full V x V grid up front, regardless of actual edge count.",
    },
    {
      question: "DFS naturally uses which mechanism to 'backtrack' after exploring as deep as possible?",
      options: ["A queue", "The call stack (via recursion) or an explicit stack", "A hash set only", "It doesn't backtrack"],
      correctIndex: 1,
      explanation: "DFS returns to the previous node once a branch is exhausted, which recursion's call stack handles naturally.",
    },
  ],
};
