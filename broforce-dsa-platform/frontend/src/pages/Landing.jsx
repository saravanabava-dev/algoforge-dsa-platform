import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import HomepageRoadmapPreview from "../components/HomepageRoadmapPreview.jsx";
import CodeLabVisual from "../components/CodeLabVisual.jsx";
import api from "../services/api.js";

const FEATURES = [
  { title: "Structured DSA Roadmap", desc: "A guided path from fundamentals to advanced algorithms, one module at a time." },
  { title: "Topic-wise Learning", desc: "Theory, visualization, code and practice bundled into every topic." },
  { title: "Multi-language Code Lab", desc: "Write and run real solutions in Java, Python, C, C++ or JavaScript." },
  { title: "Progress Tracking", desc: "XP, streaks, badges and per-topic completion, always visible." },
  { title: "Difficulty-based Problems", desc: "Easy, Medium and Hard problems for every topic, with hidden test cases." },
  { title: "Staff Monitoring", desc: "Admins can track class-wide and individual student progress." },
  { title: "Secure Authentication", desc: "JWT-based sessions with hashed passwords and role-based access." },
  { title: "Offline First", desc: "Runs entirely on a local network — no internet required in the lab." },
];

function StatCard({ value, label }) {
  return (
    <div className="card p-5 text-center">
      <p className="font-display text-3xl font-bold text-ember-500">{value}</p>
      <p className="mt-1 text-sm text-forge-600">{label}</p>
    </div>
  );
}

export default function Landing() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Real database-backed counts — never hardcoded marketing numbers.
    api.get("/stats/platform").then(({ data }) => setStats(data)).catch(() => setStats(null));
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient background: a faint grid only — no binary/decorative glyphs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(theme(colors.forge.600) 1px, transparent 1px), linear-gradient(90deg, theme(colors.forge.600) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

   {/* HERO */}
<section
  className="relative h-[calc(100vh-56px)] min-h-[600px] overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: "url('/hero-student.png')",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/55" />

  <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
    <div className="w-full">

      {/* Hero Content */}
      <div className="max-w-xl text-white">

     <p className="label-eyebrow mb-5">
  Interactive DSA Learning Platform
</p>

        <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
          Master Data
          <br />
          Structures &amp;
          <br />
          <span className="text-orange-500">Algorithms.</span>
        </h1>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
          Learn fundamentals, practice coding problems, track your progress,
          and build strong problem-solving skills through a structured,
          hands-on learning platform.
        </p>

        <div className="mt-7 flex flex-wrap gap-4">
          <Link
            to={user ? "/dashboard" : "/register"}
            className="btn-primary"
          >
            Start Learning
          </Link>

          <Link
            to="/practice"
            className="rounded-lg border border-white/50 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Explore Problems
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">

        <div className="flex items-center gap-3 text-white">
          <div className="text-2xl text-orange-500">◈</div>
          <div>
            <p className="font-display text-2xl font-bold">
              {stats ? stats.topicsCount : "…"}
            </p>
            <p className="text-sm text-white/70">
              DSA Topics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          <div className="text-2xl text-orange-500">&lt;/&gt;</div>
          <div>
            <p className="font-display text-2xl font-bold">
              {stats ? stats.problemsCount : "…"}
            </p>
            <p className="text-sm text-white/70">
              Coding Problems
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          <div className="text-2xl text-orange-500">◎</div>
          <div>
            <p className="font-display text-2xl font-bold">
              {stats ? stats.languagesCount : "…"}
            </p>
            <p className="text-sm text-white/70">
              Languages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          <div className="text-2xl text-orange-500">◉</div>
          <div>
            <p className="font-display text-2xl font-bold">
              100%
            </p>
            <p className="text-sm text-white/70">
              Offline Capable
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>

      {/* WHY ALGOFORGE */}
      <section className="relative border-t border-forge-200 bg-forge-100/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="label-eyebrow">Why AlgoForge?</p>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            Not notes. A laboratory.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5">
                <p className="font-display text-base font-semibold text-forge-900">{f.title}</p>
                <p className="mt-2 text-sm text-forge-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CODING PRACTICE */}
      <section className="relative border-t border-forge-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="label-eyebrow">Coding Practice</p>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            Every topic, three difficulty levels.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-circuit-600">Easy</p>
              <p className="mt-2 text-sm text-forge-600">Beginner-friendly problems focused on understanding a topic's core idea.</p>
            </div>
            <div className="card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-ember-600">Medium</p>
              <p className="mt-2 text-sm text-forge-600">Problems that require real implementation and clear logical thinking.</p>
            </div>
            <div className="card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-danger-500">Hard</p>
              <p className="mt-2 text-sm text-forge-600">Deeper algorithmic challenges for students ready to be pushed.</p>
            </div>
          </div>
          <Link to="/practice" className="btn-secondary mt-6 inline-flex">
            Browse the Practice Arena
          </Link>
        </div>
      </section>

      {/* PROGRAMMING LANGUAGES / CODE LAB */}
      <section className="relative border-t border-forge-200 bg-forge-100/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="label-eyebrow">Code Lab</p>
              <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                Solve problems in the language you're learning.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {(stats?.languages || ["Java", "Python", "C", "C++", "JavaScript"]).map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border border-forge-300 bg-white px-5 py-2 font-mono text-sm text-forge-800 shadow-card"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-lg text-sm text-forge-600">
                Every problem runs against real compilers and interpreters on the local server —
                no code is ever sent to an external execution service.
              </p>
            </div>

            <CodeLabVisual />
          </div>
        </div>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="relative border-t border-forge-200">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center">
            <p className="label-eyebrow">The Path</p>
            <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">A Complete Learning Journey</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-forge-600">
              Fourteen stages grouped into six levels — from your first variable to advanced graph algorithms.
            </p>
          </div>

          <div className="mt-12">
            <HomepageRoadmapPreview />
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/roadmap" className="btn-secondary inline-flex">
              View Full Roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-forge-200 bg-forge-100/40">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Start your journey from fundamentals to advanced problem solving.
          </h2>
          <Link to={user ? "/dashboard" : "/register"} className="btn-primary mt-6 inline-flex">
            Start Learning
          </Link>
        </div>
      </section>
    </div>
  );
}
