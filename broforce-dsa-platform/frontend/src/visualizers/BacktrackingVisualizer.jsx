import { useState } from "react";

const SIZE = 4; // 4-Queens keeps the animation short and easy to follow

function isSafe(cols, row, col) {
  for (let r = 0; r < row; r++) {
    const c = cols[r];
    if (c === col || Math.abs(c - col) === Math.abs(r - row)) return false;
  }
  return true;
}

// Builds a full trace of every decision/explore/backtrack step for the
// visualizer to step through, rather than animating a live recursive call
// (which would be far harder to pause/rewind deterministically in React).
function buildTrace() {
  const trace = [];
  const cols = [];

  function solve(row) {
    if (row === SIZE) {
      trace.push({ cols: [...cols], type: "solution" });
      return true;
    }
    for (let col = 0; col < SIZE; col++) {
      if (isSafe(cols, row, col)) {
        cols[row] = col;
        trace.push({ cols: [...cols], type: "place", row, col });
        if (solve(row + 1)) return true;
        trace.push({ cols: cols.slice(0, row), type: "backtrack", row, col });
      } else {
        trace.push({ cols: [...cols], type: "reject", row, col });
      }
    }
    cols.length = row;
    return false;
  }

  solve(0);
  return trace;
}

export default function BacktrackingVisualizer() {
  const [trace] = useState(buildTrace);
  const [index, setIndex] = useState(0);
  const frame = trace[index];

  const cellState = (row, col) => {
    if (frame.cols[row] === col) {
      if (frame.type === "reject" && frame.row === row && frame.col === col) return "bg-danger-100 border-danger-500";
      if (frame.type === "solution") return "bg-success-100 border-success-500";
      return "bg-ember-500/20 border-ember-400";
    }
    if (frame.type === "reject" && frame.row === row && frame.col === col) return "bg-danger-100 border-danger-500";
    return "bg-forge-100 border-forge-300";
  };

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Backtracking — {SIZE}-Queens</p>

      <div
        className="mx-auto mt-6 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`, maxWidth: 220 }}
      >
        {Array.from({ length: SIZE }).map((_, row) =>
          Array.from({ length: SIZE }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`flex aspect-square items-center justify-center rounded-md border text-lg transition-colors duration-200 ${cellState(row, col)}`}
            >
              {frame.cols[row] === col ? "♛" : ""}
              {frame.type === "reject" && frame.row === row && frame.col === col && frame.cols[row] !== col ? "✕" : ""}
            </div>
          ))
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button onClick={() => setIndex((i) => Math.max(0, i - 1))} className="btn-secondary !px-3 !py-2 text-xs">← STEP</button>
        <button onClick={() => setIndex((i) => Math.min(trace.length - 1, i + 1))} className="btn-secondary !px-3 !py-2 text-xs">STEP →</button>
        <button onClick={() => setIndex(0)} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
        {frame.type === "place" && `Row ${frame.row}: place queen at column ${frame.col} — safe, continue.`}
        {frame.type === "reject" && `Row ${frame.row}: column ${frame.col} is attacked — reject, try next column.`}
        {frame.type === "backtrack" && `Row ${frame.row}: no more columns work below here — backtrack and try the next column at row ${frame.row}.`}
        {frame.type === "solution" && "Solution found! All 4 queens placed with no conflicts."}
        {` · Step ${index + 1}/${trace.length}`}
      </p>
    </div>
  );
}
