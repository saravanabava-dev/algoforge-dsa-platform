import { Link } from "react-router-dom";
import { VISUALIZER_REGISTRY } from "../../visualizers/index.js";

export default function RoadmapTopic({ topic }) {
  const Visualizer = topic.visualizer ? VISUALIZER_REGISTRY[topic.visualizer] : null;

  return (
    <section id={topic.slug} className="scroll-mt-24 border-t border-forge-200 py-12 first:border-t-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        {/* LEFT — explanation */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forge-200 font-mono text-sm font-semibold text-forge-700">
              {String(topic.number).padStart(2, "0")}
            </span>
            <h2 className="font-display text-2xl font-bold text-forge-900">{topic.title}</h2>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-forge-600">{topic.blurb}</p>

          {topic.keyConcepts?.length > 0 && (
            <div className="mt-5">
              <p className="label-eyebrow mb-2">Key Concepts</p>
              <div className="flex flex-wrap gap-2">
                {topic.keyConcepts.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-forge-300 bg-forge-100 px-3 py-1 font-mono text-xs text-forge-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {topic.learnSlug && (
              <Link to={`/learn/${topic.learnSlug}`} className="btn-primary text-sm">
                Practice →
              </Link>
            )}
            {!topic.learnSlug && Visualizer && (
              <span className="rounded-full bg-circuit-500/10 px-3 py-1.5 text-xs font-medium text-circuit-600">
                Visualization available — full lesson &amp; practice in progress
              </span>
            )}
          </div>
        </div>

        {/* RIGHT — visualization */}
        <div>
          {Visualizer ? (
            <Visualizer />
          ) : (
            <div className="card flex min-h-[200px] flex-col items-center justify-center gap-2 p-6 text-center opacity-70">
              <span className="text-2xl">🛠️</span>
              <p className="font-display text-sm font-semibold text-forge-600">In active development</p>
              <p className="max-w-xs text-xs text-forge-500">
                The team is building the interactive {topic.title.toLowerCase()} visualization next.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
