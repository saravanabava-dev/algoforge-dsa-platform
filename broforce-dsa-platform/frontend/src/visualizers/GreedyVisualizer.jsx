import { useState } from "react";

const COINS = [50, 20, 10, 5, 2, 1];

export default function GreedyVisualizer() {
  const [amountInput, setAmountInput] = useState("93");
  const [steps, setSteps] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  function build() {
    const amount = Number(amountInput);
    if (amountInput.trim() === "" || Number.isNaN(amount) || amount < 0) return;

    const frames = [];
    let remaining = amount;
    const chosen = [];
    for (const coin of COINS) {
      let count = 0;
      while (remaining >= coin) {
        remaining -= coin;
        count++;
        chosen.push(coin);
        frames.push({ coin, remaining, chosen: [...chosen] });
      }
    }
    if (frames.length === 0) frames.push({ coin: null, remaining, chosen: [] });
    setSteps(frames);
    setStepIndex(0);
  }

  function reset() {
    setSteps(null);
    setStepIndex(0);
  }

  const frame = steps?.[stepIndex];

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Greedy — Coin Change</p>
      <p className="mt-1 font-mono text-[11px] text-forge-500">Coins available: {COINS.join(", ")}</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <input
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          placeholder="amount"
          className="w-28 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={build} className="btn-primary !px-3 !py-2 text-xs">BUILD STEPS</button>
        <button onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={!steps} className="btn-secondary !px-3 !py-2 text-xs">← STEP</button>
        <button onClick={() => setStepIndex((i) => Math.min((steps?.length || 1) - 1, i + 1))} disabled={!steps} className="btn-secondary !px-3 !py-2 text-xs">STEP →</button>
        <button onClick={reset} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {frame && (
        <>
          <div className="mt-6 flex min-h-[60px] flex-wrap items-center justify-center gap-2">
            {frame.chosen.length === 0 && <p className="font-mono text-xs text-forge-400">No coins chosen yet.</p>}
            {frame.chosen.map((c, i) => (
              <div
                key={i}
                className={`flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-all duration-300 ${
                  i === frame.chosen.length - 1
                    ? "border-ember-400 bg-ember-500/20 text-ember-600"
                    : "border-circuit-400 bg-circuit-100 text-circuit-600"
                }`}
              >
                {c}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
            {frame.coin
              ? `Picked coin ${frame.coin} (largest that fits) — ${frame.remaining} remaining.`
              : `Amount ${amountInput} needs 0 coins.`}
            {steps && ` · Step ${stepIndex + 1}/${steps.length}`}
          </p>
          {frame.remaining === 0 && (
            <p className="mt-1 text-center font-mono text-xs text-success-600">
              Done — {frame.chosen.length} coins total: {frame.chosen.join(" + ")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
