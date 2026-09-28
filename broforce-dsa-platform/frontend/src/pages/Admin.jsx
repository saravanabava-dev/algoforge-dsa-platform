import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/stats").then(({ data }) => setStats(data)).catch((e) => setError(e.response?.data?.message || "Failed to load stats"));
    api.get("/admin/students").then(({ data }) => setStudents(data.students)).catch(() => {});
  }, []);

  if (error) return <div className="mx-auto max-w-4xl px-6 py-16 text-red-300">{error}</div>;
  if (!stats) return <div className="flex min-h-[60vh] items-center justify-center"><p className="label-eyebrow">Loading admin data...</p></div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="label-eyebrow">Admin Dashboard</p>
      <h1 className="mt-2 font-display text-3xl font-bold">College Overview</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Students" value={stats.totalStudents} />
        <StatCard label="Active (7d)" value={stats.activeStudents} />
        <StatCard label="Topics" value={stats.totalTopics} />
        <StatCard label="Problems" value={stats.totalProblems} />
        <StatCard label="Problems Solved" value={stats.problemsSolvedTotal} />
        <StatCard label="Avg Quiz Score" value={`${stats.avgQuizScore}%`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <p className="label-eyebrow mb-4">Topic Completion Rate</p>
          <div className="space-y-3">
            {stats.topicCompletion.map((t) => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm">
                  <span>{t.topic}</span>
                  <span className="font-mono text-forge-600">{t.completionRate}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-forge-200">
                  <div className="h-full rounded-full bg-circuit-500" style={{ width: `${t.completionRate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
  <p className="label-eyebrow mb-4">Problem Difficulty Distribution</p>

  <div className="flex h-40 items-end justify-around gap-4">
    {Object.entries(stats.difficultyDistribution).map(([diff, count]) => (
      <div key={diff} className="flex h-full flex-col items-center justify-end gap-2">
        <span className="font-mono text-xs text-forge-600">{count}</span>

        <div
          className="w-14 rounded-t bg-ember-500"
          style={{
            height: `${Math.min(Math.max(count * 10, 8), 120)}px`
          }}
        />

        <span className="text-xs text-forge-500">{diff}</span>
      </div>
    ))}
  </div>
</div>
      </div>

      <div className="mt-8 card p-6">
        <p className="label-eyebrow mb-4">Student Roster</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-forge-500">
              <tr className="border-b border-forge-200">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Department / Batch</th>
                <th className="pb-2 pr-4">XP</th>
                <th className="pb-2 pr-4">Level</th>
                <th className="pb-2 pr-4">Streak</th>
                <th className="pb-2 pr-4">Avg Progress</th>
                <th className="pb-2">Problems Solved</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b border-forge-100">
                  <td className="py-2 pr-4">{s.name}<br /><span className="text-xs text-forge-500">{s.email}</span></td>
                  <td className="py-2 pr-4">{s.department || "—"} / {s.batch || "—"}</td>
                  <td className="py-2 pr-4 font-mono">{s.xp}</td>
                  <td className="py-2 pr-4">{s.level}</td>
                  <td className="py-2 pr-4">🔥{s.streak}</td>
                  <td className="py-2 pr-4">{s.avgProgress}%</td>
                  <td className="py-2">{s.problemsSolved}</td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr><td colSpan={7} className="py-4 text-center text-forge-500">No students registered yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card p-4 text-center">
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-forge-500">{label}</p>
    </div>
  );
}
