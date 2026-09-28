export default [
  {
    topicSlug: "graphs",
    slug: "bfs-traversal",
    title: "BFS Traversal",
    difficulty: "Easy",
    statement:
      "Given an undirected graph with n nodes (labeled 0 to n-1) and m edges, print the BFS " +
      "traversal order starting from node 0, space-separated. Visit neighbors in ascending order.\n\n" +
      "Input format: first line has n and m, next m lines each have two integers (an edge).",
    examples: [{ input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 2 3 4" }],
    constraints: ["1 <= n <= 10^4", "0 <= m <= 10^5"],
    hints: ["Build an adjacency list, sort each node's neighbor list, then run standard BFS with a queue."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static List<Integer> bfs(List<List<Integer>> adj, int start) {
        List<Integer> order = new ArrayList<>();
        boolean[] visited = new boolean[adj.size()];
        Queue<Integer> queue = new LinkedList<>();
        visited[start] = true;
        queue.add(start);
        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            for (int neighbor : adj.get(node)) {
                if (!visited[neighbor]) { visited[neighbor] = true; queue.add(neighbor); }
            }
        }
        return order;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int m = Integer.parseInt(first.nextToken());

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            int u = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        for (List<Integer> list : adj) Collections.sort(list);

        List<Integer> order = bfs(adj, 0);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.size(); i++) { sb.append(order.get(i)); if (i < order.size() - 1) sb.append(" "); }
        System.out.println(sb);
    }
}`,
      python: `from collections import deque

def bfs(adj, start):
    order = []
    visited = [False] * len(adj)
    visited[start] = True
    queue = deque([start])
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
    return order

first = input().split()
n, m = int(first[0]), int(first[1])
adj = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
for lst in adj:
    lst.sort()

print(" ".join(map(str, bfs(adj, 0))))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    int *adj[n], adjSize[n];
    for (int i = 0; i < n; i++) { adj[i] = malloc(n * sizeof(int)); adjSize[i] = 0; }

    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][adjSize[u]++] = v;
        adj[v][adjSize[v]++] = u;
    }
    for (int i = 0; i < n; i++) qsort(adj[i], adjSize[i], sizeof(int), cmp);

    int visited[n]; for (int i = 0; i < n; i++) visited[i] = 0;
    int queue[n], head = 0, tail = 0;
    int order[n], oi = 0;

    visited[0] = 1;
    queue[tail++] = 0;
    while (head < tail) {
        int node = queue[head++];
        order[oi++] = node;
        for (int j = 0; j < adjSize[node]; j++) {
            int neighbor = adj[node][j];
            if (!visited[neighbor]) { visited[neighbor] = 1; queue[tail++] = neighbor; }
        }
    }
    for (int i = 0; i < oi; i++) printf("%d%s", order[i], i < oi - 1 ? " " : "\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> bfs(vector<vector<int>> &adj, int start) {
    vector<int> order;
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) { visited[neighbor] = true; q.push(neighbor); }
        }
    }
    return order;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (auto &lst : adj) sort(lst.begin(), lst.end());

    auto order = bfs(adj, 0);
    for (size_t i = 0; i < order.size(); i++) cout << order[i] << (i + 1 < order.size() ? " " : "\\n");
    return 0;
}
`,
      javascript: `function bfs(adj, start) {
  const order = [];
  const visited = new Array(adj.length).fill(false);
  const queue = [start];
  visited[start] = true;
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) { visited[neighbor] = true; queue.push(neighbor); }
    }
  }
  return order;
}

const [n, m] = readLine().trim().split(/\\s+/).map(Number);
const adj = Array.from({ length: n }, () => []);
for (let i = 0; i < m; i++) {
  const [u, v] = readLine().trim().split(/\\s+/).map(Number);
  adj[u].push(v);
  adj[v].push(u);
}
for (const lst of adj) lst.sort((a, b) => a - b);

console.log(bfs(adj, 0).join(" "));
`,
    },
    testCases: [
      { input: "5 4\n0 1\n0 2\n1 3\n2 4", expectedOutput: "0 1 2 3 4", hidden: false },
      { input: "1 0", expectedOutput: "0", hidden: false },
      { input: "4 2\n0 3\n1 2", expectedOutput: "0 3", hidden: true },
    ],
  },
  {
    topicSlug: "graphs",
    slug: "connected-components",
    title: "Number of Connected Components",
    difficulty: "Medium",
    statement:
      "Given an undirected graph with n nodes (0 to n-1) and m edges, print the number of connected " +
      "components.\n\n" +
      "Input format: first line has n and m, next m lines each have an edge.",
    examples: [{ input: "5 2\n0 1\n2 3", output: "3", explanation: "Components: {0,1}, {2,3}, and {4} on its own — 3 components total." }],
    constraints: ["1 <= n <= 10^5", "0 <= m <= 10^5"],
    hints: ["Run BFS or DFS from every unvisited node; each run discovers one full component."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int countComponents(List<List<Integer>> adj, int n) {
        boolean[] visited = new boolean[n];
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                count++;
                Queue<Integer> queue = new LinkedList<>();
                queue.add(i);
                visited[i] = true;
                while (!queue.isEmpty()) {
                    int node = queue.poll();
                    for (int neighbor : adj.get(node)) {
                        if (!visited[neighbor]) { visited[neighbor] = true; queue.add(neighbor); }
                    }
                }
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int m = Integer.parseInt(first.nextToken());
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            int u = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        System.out.println(countComponents(adj, n));
    }
}`,
      python: `from collections import deque

def count_components(adj, n):
    visited = [False] * n
    count = 0
    for i in range(n):
        if not visited[i]:
            count += 1
            queue = deque([i])
            visited[i] = True
            while queue:
                node = queue.popleft()
                for neighbor in adj[node]:
                    if not visited[neighbor]:
                        visited[neighbor] = True
                        queue.append(neighbor)
    return count

first = input().split()
n, m = int(first[0]), int(first[1])
adj = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
print(count_components(adj, n))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    int *adj[n], adjSize[n];
    for (int i = 0; i < n; i++) { adj[i] = malloc(n * sizeof(int)); adjSize[i] = 0; }
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][adjSize[u]++] = v;
        adj[v][adjSize[v]++] = u;
    }

    int visited[n]; for (int i = 0; i < n; i++) visited[i] = 0;
    int queue[n];
    int count = 0;

    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            int head = 0, tail = 0;
            queue[tail++] = i;
            visited[i] = 1;
            while (head < tail) {
                int node = queue[head++];
                for (int j = 0; j < adjSize[node]; j++) {
                    int neighbor = adj[node][j];
                    if (!visited[neighbor]) { visited[neighbor] = 1; queue[tail++] = neighbor; }
                }
            }
        }
    }
    printf("%d\\n", count);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            queue<int> q;
            q.push(i);
            visited[i] = true;
            while (!q.empty()) {
                int node = q.front(); q.pop();
                for (int neighbor : adj[node]) {
                    if (!visited[neighbor]) { visited[neighbor] = true; q.push(neighbor); }
                }
            }
        }
    }
    cout << count << endl;
    return 0;
}
`,
      javascript: `function countComponents(adj, n) {
  const visited = new Array(n).fill(false);
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      const queue = [i];
      visited[i] = true;
      while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of adj[node]) {
          if (!visited[neighbor]) { visited[neighbor] = true; queue.push(neighbor); }
        }
      }
    }
  }
  return count;
}

const [n, m] = readLine().trim().split(/\\s+/).map(Number);
const adj = Array.from({ length: n }, () => []);
for (let i = 0; i < m; i++) {
  const [u, v] = readLine().trim().split(/\\s+/).map(Number);
  adj[u].push(v);
  adj[v].push(u);
}
console.log(countComponents(adj, n));
`,
    },
    testCases: [
      { input: "5 2\n0 1\n2 3", expectedOutput: "3", hidden: false },
      { input: "3 3\n0 1\n1 2\n0 2", expectedOutput: "1", hidden: false },
      { input: "4 0", expectedOutput: "4", hidden: true },
    ],
  },
  {
    topicSlug: "graphs",
    slug: "detect-cycle-undirected",
    title: "Detect a Cycle in an Undirected Graph",
    difficulty: "Hard",
    statement:
      "Given an undirected graph with n nodes (0 to n-1) and m edges, print 'true' if it contains a " +
      "cycle, or 'false' otherwise.\n\n" +
      "Input format: first line has n and m, next m lines each have an edge.",
    examples: [{ input: "4 4\n0 1\n1 2\n2 3\n3 0", output: "true" }],
    constraints: ["1 <= n <= 10^5", "0 <= m <= 10^5"],
    hints: [
      "Run DFS while tracking each node's parent in the traversal.",
      "If you reach an already-visited neighbor that is NOT the current node's parent, you've found a cycle.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static boolean hasCycle(List<List<Integer>> adj, int n) {
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (!visited[i] && dfs(adj, i, -1, visited)) return true;
        }
        return false;
    }

    static boolean dfs(List<List<Integer>> adj, int node, int parent, boolean[] visited) {
        visited[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                if (dfs(adj, neighbor, node, visited)) return true;
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer first = new StringTokenizer(sc.nextLine());
        int n = Integer.parseInt(first.nextToken());
        int m = Integer.parseInt(first.nextToken());
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            int u = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        System.out.println(hasCycle(adj, n));
    }
}`,
      python: `import sys
sys.setrecursionlimit(200000)

def dfs(adj, node, parent, visited):
    visited[node] = True
    for neighbor in adj[node]:
        if not visited[neighbor]:
            if dfs(adj, neighbor, node, visited):
                return True
        elif neighbor != parent:
            return True
    return False

def has_cycle(adj, n):
    visited = [False] * n
    for i in range(n):
        if not visited[i] and dfs(adj, i, -1, visited):
            return True
    return False

first = input().split()
n, m = int(first[0]), int(first[1])
adj = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
print(str(has_cycle(adj, n)).lower())
`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int *adj[100005], adjSize[100005];
bool visited[100005];

bool dfs(int node, int parent) {
    visited[node] = true;
    for (int j = 0; j < adjSize[node]; j++) {
        int neighbor = adj[node][j];
        if (!visited[neighbor]) {
            if (dfs(neighbor, node)) return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) { adj[i] = malloc(n * sizeof(int)); adjSize[i] = 0; visited[i] = false; }
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][adjSize[u]++] = v;
        adj[v][adjSize[v]++] = u;
    }

    bool found = false;
    for (int i = 0; i < n && !found; i++) {
        if (!visited[i] && dfs(i, -1)) found = true;
    }
    printf(found ? "true\\n" : "false\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool dfs(vector<vector<int>> &adj, int node, int parent, vector<bool> &visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            if (dfs(adj, neighbor, node, visited)) return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<bool> visited(n, false);
    bool found = false;
    for (int i = 0; i < n && !found; i++) {
        if (!visited[i] && dfs(adj, i, -1, visited)) found = true;
    }
    cout << (found ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `function dfs(adj, node, parent, visited) {
  visited[node] = true;
  for (const neighbor of adj[node]) {
    if (!visited[neighbor]) {
      if (dfs(adj, neighbor, node, visited)) return true;
    } else if (neighbor !== parent) {
      return true;
    }
  }
  return false;
}

function hasCycle(adj, n) {
  const visited = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (!visited[i] && dfs(adj, i, -1, visited)) return true;
  }
  return false;
}

const [n, m] = readLine().trim().split(/\\s+/).map(Number);
const adj = Array.from({ length: n }, () => []);
for (let i = 0; i < m; i++) {
  const [u, v] = readLine().trim().split(/\\s+/).map(Number);
  adj[u].push(v);
  adj[v].push(u);
}
console.log(hasCycle(adj, n) ? "true" : "false");
`,
    },
    testCases: [
      { input: "4 4\n0 1\n1 2\n2 3\n3 0", expectedOutput: "true", hidden: false },
      { input: "4 3\n0 1\n1 2\n2 3", expectedOutput: "false", hidden: false },
      { input: "3 0", expectedOutput: "false", hidden: true },
    ],
  },
];
