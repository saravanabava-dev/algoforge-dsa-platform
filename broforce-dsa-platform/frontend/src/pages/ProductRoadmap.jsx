const PHASES = [
  { phase: "Phase 1", title: "DSA Learning", desc: "The full 14-stage interactive curriculum, practice arena and quiz system.", status: "In Progress" },
  { phase: "Phase 2", title: "College Analytics", desc: "Deeper cohort analytics for departments and batches across a full semester.", status: "Planned" },
  { phase: "Phase 3", title: "Coding Contests", desc: "Timed contests and leaderboards across a college or between colleges.", status: "Planned" },
  { phase: "Phase 4", title: "AI-assisted Learning", desc: "Optional, locally-hosted hints and personalized problem recommendations.", status: "Planned" },
  { phase: "Phase 5", title: "Multi-college Platform", desc: "Multi-tenant support so AlgoForge can be licensed to other colleges.", status: "Planned" },
];

export default function ProductRoadmap() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="label-eyebrow">Where we're headed</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Product Roadmap</h1>
      <p className="mt-3 text-forge-600">
        These future phases are not built yet — this page sets expectations honestly rather than
        promising features that don't exist today.
      </p>

      <ol className="mt-10 space-y-4">
        {PHASES.map((p) => (
          <li key={p.phase} className="card flex items-start gap-4 p-5">
            <span className="font-mono text-xs text-forge-400">{p.phase}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold">{p.title}</p>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    p.status === "In Progress" ? "bg-ember-500/15 text-ember-600" : "bg-forge-200 text-forge-600"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-forge-600">{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
