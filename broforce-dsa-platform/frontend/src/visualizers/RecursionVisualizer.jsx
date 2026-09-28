import { useState } from "react";

function buildFactorialFrames(n) {
  const frames = [];
  // Calling phase — stack grows
  for (let i = n; i >= 1; i--) {
    frames.push({ phase: "call", stack: Array.from({ length: n - i + 1 }, (_, k) => n - k) });
  }
  frames.push({ phase: "base", stack: Array.from({ length: n }, (_, k) => n - k), note: "factorial(0) = 1 — base case reached" });
  // Returning phase — stack unwinds, accumulating the product
  let acc = 1;
  const stackNow = Array.from({ length: n }, (_, k) => n - k);
  for (let i = 1; i <= n; i++) {
    acc *= i;
    stackNow.pop();
    frames.push({ phase: "return", stack: [...stackNow], note: `factorial(${i}) returns ${acc}` });
  }
  return frames;
}

export default function RecursionVisualizer() {
  const [n, setN] = useState(5);
  const [frames, setFrames] = useState(null);
  const [index, setIndex] = useState(0);

  function build() {
    const clamped = Math.max(1, Math.min(8, Number(n) || 1));
    setN(clamped);
    setFrames(buildFactorialFrames(clamped));
    setIndex(0);
  }

  function reset() {
    setFrames(null);
    setIndex(0);
  }

  const frame = frames?.[index];

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Recursion — factorial(n) Call Stack</p>

      <div className="mt-6 flex min-h-[180px] flex-col-reverse items-center justify-start gap-1.5 rounded-lg border border-forge-300 bg-forge-100/40 p-4">
        {!frame && <p className="font-mono text-xs text-forge-400">Build the call stack to begin.</p>}
        {frame?.stack.map((val, i) => (
          <div
            key={i}
            className={`w-40 rounded-md border px-3 py-1.5 text-center font-mono text-xs transition-colors duration-300 ${
              i === frame.stack.length - 1
                ? frame.phase === "return"
                  ? "border-success-500 bg-success-100 text-success-600"
                  : "border-ember-400 bg-ember-500/20 text-ember-600"
                : "border-forge-400 bg-forge-200 text-forge-700"
            }`}
          >
            factorial({val})
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <input
          type="number"
          min={1}
          max={8}
          value={n}
          onChange={(e) => setN(e.target.value)}
          className="w-20 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={build} className="btn-primary !px-3 !py-2 text-xs">BUILD STACK</button>
        <button onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={!frames} className="btn-secondary !px-3 !py-2 text-xs">← STEP</button>
        <button onClick={() => setIndex((i) => Math.min((frames?.length || 1) - 1, i + 1))} disabled={!frames} className="btn-secondary !px-3 !py-2 text-xs">STEP →</button>
        <button onClick={reset} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {frame && (
        <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
          {frame.note || `Calling factorial(${frame.stack[frame.stack.length - 1]})...`}
          {frames && ` · Step ${index + 1}/${frames.length}`}
        </p>
      )}
    </div>
  );
}
