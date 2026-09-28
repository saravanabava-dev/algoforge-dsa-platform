import { useState } from "react";

export default function DPVisualizer() {
  const [n, setN] = useState(10);
  const [table, setTable] = useState([]);
  const [step, setStep] = useState(-1); // index just filled, -1 = not started

  function buildTable() {
    const size = Math.max(2, Math.min(20, Number(n) || 10));
    const t = new Array(size + 1).fill(null);
    t[0] = 0;
    if (size >= 1) t[1] = 1;
    setTable(t);
    setStep(1);
  }

  function next() {
    if (step < 0 || step >= table.length - 1) return;
    const nextIndex = step + 1;
    setTable((t) => {
      const copy = [...t];
      copy[nextIndex] = copy[nextIndex - 1] + copy[nextIndex - 2];
      return copy;
    });
    setStep(nextIndex);
  }

  function reset() {
    setTable([]);
    setStep(-1);
  }

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Dynamic Programming — Fibonacci Table</p>
      <p className="mt-1 font-mono text-[11px] text-forge-500">F(n) = F(n-1) + F(n-2), reusing previously computed values instead of recomputing them</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <input
          type="number"
          min={2}
          max={20}
          value={n}
          onChange={(e) => setN(e.target.value)}
          className="w-20 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={buildTable} className="btn-primary !px-3 !py-2 text-xs">BUILD TABLE</button>
        <button onClick={next} disabled={table.length === 0} className="btn-secondary !px-3 !py-2 text-xs">NEXT →</button>
        <button onClick={reset} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {table.length > 0 && (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 overflow-x-auto">
            {table.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md border font-mono text-xs font-medium transition-all duration-300 ${
                    i === step
                      ? "border-ember-400 bg-ember-500/20 text-ember-600"
                      : i === step - 1 || i === step - 2
                      ? "border-circuit-400 bg-circuit-100 text-circuit-600"
                      : val !== null
                      ? "border-forge-400 bg-forge-200 text-forge-800"
                      : "border-forge-300 bg-forge-100 text-forge-400"
                  }`}
                >
                  {val === null ? "?" : val}
                </div>
                <span className="font-mono text-[10px] text-forge-400">F({i})</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
            {step >= table.length - 1
              ? `Done — F(${table.length - 1}) = ${table[table.length - 1]}`
              : `F(${step}) = ${table[step]} · reusing F(${step - 1}) and F(${step - 2}) computed earlier`}
          </p>
        </>
      )}
    </div>
  );
}
