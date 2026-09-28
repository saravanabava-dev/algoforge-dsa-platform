import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

function ProgressBar({ value }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-forge-200">
      <div
        className="h-full rounded-full bg-gradient-to-r from-ember-600 to-ember-400 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

const ACTIVITY_ICON = {
  problem_solved: "✅",
  topic_completed: "📘",
  quiz_taken: "📝",
  badge_earned: "🏅",
  streak: "🔥",
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/dashboard")
      .then(({ data }) => setData(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"));
  }, []);

  if (error) {
    return <div className="mx-auto max-w-4xl px-6 py-16 text-red-300">{error}</div>;
  }
  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="label-eyebrow">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold">Welcome, {data.user.name.split(" ")[0]} </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Overall progress */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="label-eyebrow">Overall Progress</p>
            <span className="font-mono text-sm text-forge-700">{data.overallProgress}%</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={data.overallProgress} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Topics Done" value={`${data.topicsCompleted}/${data.topicsTotal}`} />
            <Stat label="Problems Solved" value={`${data.problemsSolved}/${data.problemsTotal}`} />
            <Stat label="Quiz Avg" value={`${data.avgQuizScore}%`} />
            <Stat label="Level" value={data.user.level} />
          </div>
        </div>

        {/* Streak + XP */}
        <div className="card flex flex-col justify-center gap-4 p-6 text-center">
          <div>
            <p className="text-4xl">🔥</p>
            <p className="mt-1 font-display text-2xl font-bold">{data.user.streak} Day Streak</p>
          </div>
          <div className="border-t border-forge-300 pt-4">
            <p className="font-mono text-sm text-forge-600">Total XP</p>
            <p className="font-display text-xl font-semibold text-ember-600">{data.user.xp} XP</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Continue learning */}
        <div className="card p-6 lg:col-span-2">
          <p className="label-eyebrow">Continue Learning</p>
          {data.continueLearning ? (
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-display text-xl font-semibold">{data.continueLearning.title}</p>
                <div className="mt-2">
                  <ProgressBar value={data.continueLearning.progressPercentage} />
                </div>
                <p className="mt-1 font-mono text-xs text-forge-500">
                  {data.continueLearning.progressPercentage}% complete
                </p>
              </div>
              <Link to={`/learn/${data.continueLearning.slug}`} className="btn-primary whitespace-nowrap">
                Continue Learning
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-forge-600">
              You've completed every available topic — amazing work! Check the{" "}
              <Link to="/roadmap" className="text-circuit-600 hover:underline">
                roadmap
              </Link>{" "}
              for what's coming next.
            </p>
          )}

          <div className="mt-8">
            <p className="label-eyebrow mb-3">Recent Activity</p>
            {data.recentActivity.length === 0 ? (
              <p className="text-sm text-forge-500">
                No activity yet — solve a problem or finish a topic to see it here.
              </p>
            ) : (
              <ul className="space-y-2">
                {data.recentActivity.map((a, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg bg-forge-200/50 px-4 py-2.5 text-sm">
                    <span>
                      {ACTIVITY_ICON[a.type] || "•"} {a.message}
                    </span>
                    {a.xpEarned > 0 && (
                      <span className="font-mono text-xs text-ember-600">+{a.xpEarned} XP</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="card p-6">
          <p className="label-eyebrow mb-4">Badges</p>
          <div className="grid grid-cols-3 gap-3">
            {data.badges.map((b) => (
              <div
                key={b.code}
                title={b.description}
                className={`flex flex-col items-center rounded-lg border p-3 text-center ${
                  b.earned ? "border-ember-500/50 bg-ember-500/10" : "border-forge-300 bg-forge-200/40 opacity-40"
                }`}
              >
                <span className="text-2xl">{b.icon}</span>
                <span className="mt-1 text-[10px] leading-tight text-forge-700">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="font-mono text-xs text-forge-500">{label}</p>
    </div>
  );
}
