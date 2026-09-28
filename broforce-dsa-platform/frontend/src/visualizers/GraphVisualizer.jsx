import { useState } from "react";

const NODES = [
  { id: "A", x: 60, y: 40 }, { id: "B", x: 220, y: 40 },
  { id: "C", x: 60, y: 160 }, { id: "D", x: 220, y: 160 },
  { id: "E", x: 140, y: 100 },
];
const EDGES = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"], ["A", "E"], ["E", "D"]];

function buildAdjacency() {
  const adj = Object.fromEntries(NODES.map((n) => [n.id, []]));
  for (const [a, b] of EDGES) { adj[a].push(b); adj[b].push(a); }
  return adj;
}

export default function GraphVisualizer() {
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState("");
  const [running, setRunning] = useState(false);

  async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  async function runBFS() {
    setRunning(true);
    setVisited([]); setOrder([]); setCurrent(null);
    const adj = buildAdjacency();
    const seen = new Set(["A"]);
    const queue = ["A"];
    const visitOrder = [];

    while (queue.length > 0) {
      const node = queue.shift();
      setCurrent(node);
      visitOrder.push(node);
      setOrder([...visitOrder]);
      await sleep(600);
      setVisited((v) => [...v, node]);
      for (const neighbor of adj[node]) {
        if (!seen.has(neighbor)) { seen.add(neighbor); queue.push(neighbor); }
      }
    }
    setCurrent(null);
    setMessage(`BFS order from A: ${visitOrder.join(" → ")}`);
    setRunning(false);
  }

  async function runDFS() {
    setRunning(true);
    setVisited([]); setOrder([]); setCurrent(null);
    const adj = buildAdjacency();
    const seen = new Set();
    const visitOrder = [];

    async function dfs(node) {
      seen.add(node);
      setCurrent(node);
      visitOrder.push(node);
      setOrder([...visitOrder]);
      await sleep(600);
      setVisited((v) => [...v, node]);
      for (const neighbor of adj[node]) {
        if (!seen.has(neighbor)) await dfs(neighbor);
      }
    }
    await dfs("A");
    setCurrent(null);
    setMessage(`DFS order from A: ${visitOrder.join(" → ")}`);
    setRunning(false);
  }

  function reset() {
    setVisited([]); setOrder([]); setCurrent(null); setMessage("");
  }

  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Graph — BFS &amp; DFS</p>

      <svg viewBox="0 0 280 200" className="mt-4 h-48 w-full">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={nodeById[a].x} y1={nodeById[a].y} x2={nodeById[b].x} y2={nodeById[b].y} stroke="#DFE3EA" strokeWidth="2" />
        ))}
        {NODES.map((n) => {
          const isVisited = visited.includes(n.id);
          const isCurrent = current === n.id;
          return (
            <g key={n.id}>
              <circle
                cx={n.x} cy={n.y} r="18"
                fill={isCurrent ? "#DE5E14" : isVisited ? "#CEF4F8" : "#FFFFFF"}
                stroke={isCurrent ? "#DE5E14" : isVisited ? "#1FA8BD" : "#C4CAD6"}
                strokeWidth="2"
              />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="600" fill={isCurrent ? "#FFFFFF" : "#252B3B"}>{n.id}</text>
            </g>
          );
        })}
      </svg>

      {order.length > 0 && (
        <p className="mt-2 text-center font-mono text-xs text-forge-600">Visit order: {order.join(" → ")}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button onClick={runBFS} disabled={running} className="btn-primary !px-3 !py-2 text-xs">RUN BFS</button>
        <button onClick={runDFS} disabled={running} className="btn-secondary !px-3 !py-2 text-xs">RUN DFS</button>
        <button onClick={reset} disabled={running} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {message && <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">{message}</p>}
    </div>
  );
}
