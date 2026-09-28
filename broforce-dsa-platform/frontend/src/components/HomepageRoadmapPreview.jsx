import { Link } from "react-router-dom";
import { ROADMAP_TOPICS, ROADMAP_LEVELS } from "../data/roadmapTopics.js";

function TopicCard({ topic }) {
  const href = topic.learnSlug ? `/learn/${topic.learnSlug}` : "/roadmap";

  return (
    <Link
      to={href}
      className="card group flex w-full max-w-xs flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ember-500/50 hover:shadow-card-hover sm:w-64"
    >
      <span className="font-display text-2xl font-bold text-forge-300">{String(topic.number).padStart(2, "0")}</span>
      <p className="font-display text-lg font-bold leading-tight text-forge-900">{topic.title}</p>
      <p className="text-sm leading-snug text-forge-600">{topic.blurb}</p>
      <span className="mt-2 font-mono text-xs font-medium text-ember-600 transition-colors group-hover:text-ember-700">
        Practice →
      </span>
    </Link>
  );
}

export default function HomepageRoadmapPreview() {
  const byLevel = ROADMAP_LEVELS.map((lvl) => ({
    ...lvl,
    topics: ROADMAP_TOPICS.filter((t) => t.level === lvl.level),
  }));

  return (
    <div className="relative">
      {/* Connecting vertical path behind the level groups */}
      <div
        className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-gradient-to-b from-forge-300 via-forge-300 to-transparent md:block"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-14">
        {byLevel.map((lvl) => (
          <div key={lvl.level} className="relative">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ember-500 bg-white font-mono text-xs font-bold text-ember-600">
                {String(lvl.level).padStart(2, "0")}
              </span>
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-forge-700">
                {lvl.title}
              </p>
            </div>
            <div className="flex flex-wrap items-stretch justify-center gap-4">
              {lvl.topics.map((t) => (
                <TopicCard key={t.slug} topic={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
