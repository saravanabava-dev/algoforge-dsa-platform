import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const DIFFICULTY_COLOR = { Easy: "text-circuit-600 border-circuit-500/40", Medium: "text-ember-600 border-ember-500/40", Hard: "text-red-400 border-red-500/40" };

export default function Practice() {
  const [problems, setProblems] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    api.get("/problems").then(({ data }) => setProblems(data.problems));
  }, []);

  const filtered = problems.filter((p) => {
    if (difficulty !== "All" && p.difficulty !== difficulty) return false;
    if (status === "Solved" && !p.solved) return false;
    if (status === "Unsolved" && p.solved) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="label-eyebrow">Practice Arena</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Solve Problems</h1>

      <div className="mt-6 flex flex-wrap gap-4">
        <FilterGroup label="Difficulty" options={["All", "Easy", "Medium", "Hard"]} value={difficulty} onChange={setDifficulty} />
        <FilterGroup label="Status" options={["All", "Solved", "Unsolved"]} value={status} onChange={setStatus} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to={`/practice/${p.slug}`}
            className="card flex flex-col justify-between p-5 transition-colors hover:border-circuit-500/50"
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-forge-500">{p.topicSlug}</p>
                {p.solved && <span className="text-xs text-circuit-600">✓ Solved</span>}
              </div>
              <p className="mt-1 font-display font-semibold">{p.title}</p>
            </div>
            <span className={`mt-3 inline-block w-fit rounded-full border px-3 py-0.5 text-xs font-medium ${DIFFICULTY_COLOR[p.difficulty]}`}>
              {p.difficulty}
            </span>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-sm text-forge-500">No problems match these filters.</p>}
      </div>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-forge-500">{label}</p>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              value === opt ? "bg-ember-500 text-forge-50" : "bg-forge-200 text-forge-700 hover:bg-forge-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
