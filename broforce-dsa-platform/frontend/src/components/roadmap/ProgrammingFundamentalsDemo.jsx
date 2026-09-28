import { useState } from "react";

const STEPS = [
  { code: "int age = 20;", vars: { age: 20 } },
  { code: "int score = 95;", vars: { age: 20, score: 95 } },
  { code: "if (score > 90) {", vars: { age: 20, score: 95 } },
  { code: '  grade = "A";', vars: { age: 20, score: 95, grade: "A" } },
  { code: "}", vars: { age: 20, score: 95, grade: "A" } },
  { code: "for (i = 0; i < 3; i++)", vars: { age: 20, score: 95, grade: "A", i: 0 } },
];

export default function ProgrammingFundamentalsDemo() {
  const [step, setStep] = useState(0);

  const current = STEPS[step];

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function reset() {
    setStep(0);
  }

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Variables, Conditions &amp; Loops</p>

      <div className="mt-5 rounded-lg border border-forge-300 bg-forge-900 p-4 font-mono text-sm text-forge-100">
        {STEPS.slice(0, step + 1).map((s, i) => (
          <p key={i} className={i === step ? "text-ember-300" : "text-forge-400"}>
            {s.code}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs uppercase tracking-widest text-forge-500">Variables</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {Object.entries(current.vars).map(([k, v]) => (
          <span
            key={k}
            className="rounded-lg border border-circuit-500/40 bg-circuit-100/60 px-3 py-1.5 font-mono text-xs text-circuit-700"
          >
            {k} → {JSON.stringify(v)}
          </span>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button onClick={next} disabled={step >= STEPS.length - 1} className="btn-primary !px-4 !py-2 text-sm">
          NEXT
        </button>
        <button onClick={reset} className="btn-secondary !px-4 !py-2 text-sm">
          RESET
        </button>
      </div>
    </div>
  );
}
