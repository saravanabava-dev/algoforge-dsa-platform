import { useState } from "react";

export default function HeapVisualizer() {
  const [heap, setHeap] = useState([50, 30, 40, 10, 20]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [highlight, setHighlight] = useState([]);

  function siftUp(arr, i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (arr[parent] >= arr[i]) break;
      [arr[parent], arr[i]] = [arr[i], arr[parent]];
      i = parent;
    }
  }

  function siftDown(arr, i, size) {
    while (true) {
      let largest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < size && arr[left] > arr[largest]) largest = left;
      if (right < size && arr[right] > arr[largest]) largest = right;
      if (largest === i) break;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      i = largest;
    }
  }

  function insert() {
    const v = Number(input);
    if (input.trim() === "" || Number.isNaN(v)) { setMessage("Enter a number to insert."); return; }
    const arr = [...heap, v];
    siftUp(arr, arr.length - 1);
    setHeap(arr);
    setHighlight([arr.indexOf(v)]);
    setMessage(`Inserted ${v}, sifted up to maintain max-heap order.`);
    setInput("");
    setTimeout(() => setHighlight([]), 800);
  }

  function extractMax() {
    if (heap.length === 0) { setMessage("Heap is empty."); return; }
    const max = heap[0];
    const arr = [...heap];
    arr[0] = arr[arr.length - 1];
    arr.pop();
    if (arr.length > 0) siftDown(arr, 0, arr.length);
    setHeap(arr);
    setMessage(`Extracted max (${max}). Moved last element to root, sifted down.`);
  }

  function reset() {
    setHeap([50, 30, 40, 10, 20]);
    setMessage("Heap reset.");
  }

  // simple tree layout for a binary heap stored as an array
  const positions = heap.map((_, i) => {
    const depth = Math.floor(Math.log2(i + 1));
    const levelStart = 2 ** depth - 1;
    const posInLevel = i - levelStart;
    const levelWidth = 2 ** depth;
    const x = ((posInLevel + 0.5) / levelWidth) * 300;
    const y = depth * 55 + 20;
    return { x, y };
  });

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Max-Heap (Priority Queue)</p>

      <svg viewBox="0 0 300 180" className="mt-4 h-40 w-full">
        {heap.map((_, i) => {
          const parent = Math.floor((i - 1) / 2);
          if (i === 0) return null;
          return (
            <line key={i} x1={positions[parent].x} y1={positions[parent].y} x2={positions[i].x} y2={positions[i].y} stroke="#DFE3EA" strokeWidth="2" />
          );
        })}
        {heap.map((v, i) => (
          <g key={i}>
            <circle
              cx={positions[i].x} cy={positions[i].y} r="16"
              fill={highlight.includes(i) ? "#CEF4F8" : "#FFFFFF"}
              stroke={highlight.includes(i) ? "#1FA8BD" : "#C4CAD6"}
              strokeWidth="2"
            />
            <text x={positions[i].x} y={positions[i].y + 4} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#252B3B">{v}</text>
          </g>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-1">
        <span className="font-mono text-[10px] uppercase text-forge-500">array:</span>
        {heap.map((v, i) => (
          <span key={i} className="rounded bg-forge-200 px-2 py-1 font-mono text-xs text-forge-800">{v}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && insert()}
          placeholder="value"
          className="w-24 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={insert} className="btn-primary !px-3 !py-2 text-xs">INSERT</button>
        <button onClick={extractMax} className="btn-secondary !px-3 !py-2 text-xs">EXTRACT MAX</button>
        <button onClick={reset} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {message && <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">{message}</p>}
    </div>
  );
}
