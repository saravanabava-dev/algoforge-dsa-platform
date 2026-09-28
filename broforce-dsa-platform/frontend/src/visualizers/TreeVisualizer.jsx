import { useEffect, useMemo, useRef, useState } from "react";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

// Assigns x (via inorder position) and y (via depth) to every node for layout.
function layoutTree(root) {
  const positions = new Map();
  let counter = 0;

  function walk(node, depth) {
    if (!node) return;
    walk(node.left, depth + 1);
    positions.set(node, { x: counter, y: depth });
    counter++;
    walk(node.right, depth + 1);
  }
  walk(root, 0);
  return positions;
}

function getTraversalOrder(root, type) {
  const order = [];
  function inorder(n) { if (!n) return; inorder(n.left); order.push(n.value); inorder(n.right); }
  function preorder(n) { if (!n) return; order.push(n.value); preorder(n.left); preorder(n.right); }
  function postorder(n) { if (!n) return; postorder(n.left); postorder(n.right); order.push(n.value); }
  function levelOrder(n) {
    if (!n) return;
    const queue = [n];
    while (queue.length) {
      const cur = queue.shift();
      order.push(cur.value);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }
  if (type === "inorder") inorder(root);
  else if (type === "preorder") preorder(root);
  else if (type === "postorder") postorder(root);
  else levelOrder(root);
  return order;
}

const DEFAULT_VALUES = [50, 30, 70, 20, 40, 60, 80];

export default function TreeVisualizer() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [input, setInput] = useState("");
  const [traversalType, setTraversalType] = useState("inorder");
  const [visitedCount, setVisitedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const root = useMemo(() => values.reduce((r, v) => insert(r, v), null), [values]);
  const positions = useMemo(() => layoutTree(root), [root]);
  const traversalOrder = useMemo(() => getTraversalOrder(root, traversalType), [root, traversalType]);

  const nodeList = [...positions.entries()];
  const maxX = Math.max(1, ...nodeList.map(([, p]) => p.x));
  const maxY = Math.max(1, ...nodeList.map(([, p]) => p.y));
  const width = Math.max(500, (maxX + 1) * 70);
  const height = (maxY + 1) * 80 + 40;

  function coordsOf(node) {
    const p = positions.get(node);
    return { cx: p.x * 70 + 45, cy: p.y * 80 + 40 };
  }

  function edges() {
    const list = [];
    function walk(n) {
      if (!n) return;
      if (n.left) { list.push([n, n.left]); walk(n.left); }
      if (n.right) { list.push([n, n.right]); walk(n.right); }
    }
    walk(root);
    return list;
  }

  function addValue() {
    const v = Number(input);
    if (input.trim() === "" || Number.isNaN(v)) return;
    if (values.includes(v)) { setInput(""); return; }
    setValues((vs) => [...vs, v]);
    setInput("");
    setVisitedCount(0);
  }

  function reset() {
    setValues(DEFAULT_VALUES);
    setVisitedCount(0);
    setIsPlaying(false);
  }

  useEffect(() => {
    if (!isPlaying) return;
    if (visitedCount >= traversalOrder.length) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setVisitedCount((c) => c + 1), 600);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, visitedCount, traversalOrder]);

  const visitedValues = new Set(traversalOrder.slice(0, visitedCount));
  const currentValue = traversalOrder[visitedCount - 1];

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Binary Search Tree Visualizer</p>

      <div className="mt-4 overflow-x-auto rounded-lg border border-forge-200 bg-forge-50/50 p-4">
        <svg width={width} height={height} className="mx-auto">
          {edges().map(([from, to], i) => {
            const a = coordsOf(from);
            const b = coordsOf(to);
            return (
              <line key={i} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke="#DFE3EA" strokeWidth="2" />
            );
          })}
          {nodeList.map(([node]) => {
            const { cx, cy } = coordsOf(node);
            const isVisited = visitedValues.has(node.value);
            const isCurrent = node.value === currentValue;
            return (
              <g key={node.value}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="20"
                  fill={isCurrent ? "#DE5E14" : isVisited ? "#CEF4F8" : "#FFFFFF"}
                  stroke={isCurrent ? "#DE5E14" : isVisited ? "#1FA8BD" : "#C4CAD6"}
                  strokeWidth="2"
                />
                <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fontFamily="monospace" fill={isCurrent ? "#FFFFFF" : isVisited ? "#0D677C" : "#5C6478"}>
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <select
          value={traversalType}
          onChange={(e) => { setTraversalType(e.target.value); setVisitedCount(0); setIsPlaying(false); }}
          className="rounded-lg border border-forge-300 bg-forge-100 px-3 py-1.5 text-sm outline-none focus:border-circuit-500"
        >
          <option value="inorder">Inorder</option>
          <option value="preorder">Preorder</option>
          <option value="postorder">Postorder</option>
          <option value="levelorder">Level Order</option>
        </select>
        <button onClick={() => setIsPlaying((p) => !p)} className="btn-primary !px-4 !py-1.5 text-xs">
          {isPlaying ? "⏸ Pause" : "▶ Animate Traversal"}
        </button>
        <button onClick={() => { setVisitedCount(0); setIsPlaying(false); }} className="btn-secondary !px-3 !py-1.5 text-xs">
          Reset Traversal
        </button>
        <button onClick={reset} className="btn-secondary !px-3 !py-1.5 text-xs">Reset Tree</button>
      </div>

      <p className="mt-3 font-mono text-xs text-forge-600">
        Order: {traversalOrder.join(" → ")}
      </p>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addValue()}
          placeholder="Insert value"
          className="flex-1 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={addValue} className="btn-secondary !px-4 text-sm">Insert</button>
      </div>
    </div>
  );
}
