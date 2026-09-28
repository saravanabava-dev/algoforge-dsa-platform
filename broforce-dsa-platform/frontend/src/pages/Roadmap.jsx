import { useState } from "react";
import { ROADMAP_TOPICS } from "../data/roadmapTopics.js";
import RoadmapTopic from "../components/roadmap/RoadmapTopic.jsx";

export default function Roadmap() {
  const [jumpOpen, setJumpOpen] = useState(false);
  const liveCount = ROADMAP_TOPICS.filter((t) => t.visualizer).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <p className="label-eyebrow">Foundation to Mastery</p>
      <h1 className="mt-2 font-display text-3xl font-bold">The DSA Roadmap</h1>
      <p className="mt-3 max-w-2xl text-forge-600">
        Fourteen stages, foundation to mastery. {liveCount} are fully interactive today — try each
        one right here on the page. The rest are actively being built out by the team.
      </p>

      {/* Progress rail / jump nav — a compact way to move stage to stage,
          matching the "01 -> 02 -> ... -> 14" vertical progression concept
          without repeating a full second list. */}
      <div className="mt-8">
        <button
          onClick={() => setJumpOpen((o) => !o)}
          className="btn-secondary text-xs"
          aria-expanded={jumpOpen}
        >
          {jumpOpen ? "Hide" : "Jump to a stage"} ↓
        </button>
        {jumpOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            {ROADMAP_TOPICS.map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                onClick={() => setJumpOpen(false)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                  t.visualizer
                    ? "border-ember-500/40 bg-ember-500/5 text-ember-600 hover:bg-ember-500/15"
                    : "border-forge-300 bg-forge-100 text-forge-500 hover:border-forge-400"
                }`}
              >
                {String(t.number).padStart(2, "0")} {t.title}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        {ROADMAP_TOPICS.map((topic) => (
          <RoadmapTopic key={topic.slug} topic={topic} />
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3 rounded-xl border border-circuit-600/30 bg-circuit-600/5 px-5 py-4">
        <span className="text-xl">🏆</span>
        <p className="text-sm text-forge-700">
          Complete every stage and earn the <span className="text-circuit-600">DSA Master</span> title.
        </p>
      </div>
    </div>
  );
}
