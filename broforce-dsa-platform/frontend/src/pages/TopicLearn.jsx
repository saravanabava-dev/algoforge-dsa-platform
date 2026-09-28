import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api.js";
import { VISUALIZER_REGISTRY } from "../visualizers/index.js";

const TABS = ["Theory", "Visualize", "Code", "Practice", "Quiz"];
const DIFFICULTY_DOTS = { Easy: "●○○", Medium: "●●○", Hard: "●●●" };
const DIFFICULTY_COLOR = { Easy: "text-circuit-600", Medium: "text-ember-600", Hard: "text-red-400" };

export default function TopicLearn() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState(null);
  const [activeTab, setActiveTab] = useState("Theory");
  const [error, setError] = useState("");

  useEffect(() => {
    setActiveTab("Theory");
    api
      .get(`/topics/${slug}`)
      .then(({ data }) => {
        setTopic(data.topic);
        setProblems(data.problems);
      })
      .catch((err) => setError(err.response?.data?.message || "Topic not found"));

    api.get(`/topics/${slug}/progress`).then(({ data }) => setProgress(data.progress));
  }, [slug]);

  async function markComplete(field) {
    const { data } = await api.patch(`/topics/${slug}/progress`, { [field]: true });
    setProgress(data.progress);
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-red-300">{error}</p>
        <Link to="/roadmap" className="mt-4 inline-block text-circuit-600 hover:underline">
          ← Back to roadmap
        </Link>
      </div>
    );
  }
  if (!topic || !progress) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="label-eyebrow">Loading topic...</p>
      </div>
    );
  }

  const Visualizer = VISUALIZER_REGISTRY[topic.visualizerType];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="card p-5">
        <p className="label-eyebrow">{topic.module}</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold">{topic.title}</h1>
          <div className="flex items-center gap-3">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-forge-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ember-600 to-ember-400"
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
            <span className="font-mono text-xs text-forge-600">{progress.progressPercentage}%</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex gap-1 border-b border-forge-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-ember-500 text-ember-600"
                  : "border-transparent text-forge-600 hover:text-forge-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px]">
        {/* Main content */}
        <div>
          {activeTab === "Theory" && <TheoryTab topic={topic} onDone={() => markComplete("theoryCompleted")} />}
          {activeTab === "Visualize" && (
            <div>
              {Visualizer ? <Visualizer /> : <p className="text-forge-600">No visualizer registered for this topic yet.</p>}
              <button
                onClick={() => markComplete("visualizationCompleted")}
                className="btn-secondary mt-4 text-sm"
              >
                Mark Visualization Complete
              </button>
            </div>
          )}
          {activeTab === "Code" && <CodeTab topic={topic} />}
          {activeTab === "Practice" && <PracticeTab problems={problems} slug={slug} />}
          {activeTab === "Quiz" && <QuizTab slug={slug} onSubmitted={(p) => setProgress(p)} />}
        </div>

        {/* Right sidebar: progress checklist */}
        <aside className="card h-fit p-5">
          <p className="label-eyebrow mb-3">Your Progress</p>
          <ul className="space-y-2 text-sm">
            <ChecklistItem label="Theory" done={progress.theoryCompleted} />
            <ChecklistItem label="Visualization" done={progress.visualizationCompleted} />
            <ChecklistItem
              label={`Problems (${progress.problemsSolved.length}/${problems.length})`}
              done={problems.length > 0 && progress.problemsSolved.length === problems.length}
            />
            <ChecklistItem
              label={progress.quizBestScore !== null ? `Quiz (${progress.quizBestScore}%)` : "Quiz"}
              done={progress.quizBestScore !== null && progress.quizBestScore >= 60}
            />
          </ul>
          {progress.completed && (
            <p className="mt-4 rounded-lg bg-ember-500/10 px-3 py-2 text-center text-xs font-medium text-ember-600">
              🏆 Topic Completed!
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function ChecklistItem({ label, done }) {
  return (
    <li className="flex items-center gap-2">
      <span className={done ? "text-circuit-600" : "text-forge-400"}>{done ? "✓" : "○"}</span>
      <span className={done ? "text-forge-900" : "text-forge-600"}>{label}</span>
    </li>
  );
}

function TheoryTab({ topic, onDone }) {
  return (
    <div className="card space-y-6 p-6">
      <Section title="What is it?" text={topic.whatIsIt} />
      <Section title="Why do we need it?" text={topic.whyNeeded} />
      <Section title="How does it work?" text={topic.howItWorks} />
      <Section title="Example" text={topic.example} pre />

      <div>
        <p className="label-eyebrow mb-2">Complexity</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <ComplexityStat label="Time" value={topic.complexity?.time} />
          <ComplexityStat label="Space" value={topic.complexity?.space} />
          <ComplexityStat label="Best" value={topic.complexity?.best} />
          <ComplexityStat label="Average" value={topic.complexity?.average} />
          <ComplexityStat label="Worst" value={topic.complexity?.worst} />
        </div>
      </div>

      <button onClick={onDone} className="btn-primary text-sm">Mark Theory Complete</button>
    </div>
  );
}

function Section({ title, text, pre }) {
  return (
    <div>
      <p className="label-eyebrow mb-2">{title}</p>
      {pre ? (
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-forge-700">{text}</pre>
      ) : (
        <p className="leading-relaxed text-forge-700">{text}</p>
      )}
    </div>
  );
}

function ComplexityStat({ label, value }) {
  return (
    <div className="rounded-lg border border-forge-300 bg-forge-200/40 p-3 text-center">
      <p className="font-mono text-[10px] uppercase tracking-widest text-forge-500">{label}</p>
      <p className="mt-1 font-mono text-sm text-circuit-600">{value || "—"}</p>
    </div>
  );
}

function CodeTab({ topic }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const example = topic.codeExamples[active];

  function copy() {
    navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card p-6">
      <div className="flex flex-wrap gap-2">
        {topic.codeExamples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              active === i ? "bg-ember-500 text-forge-50" : "bg-forge-200 text-forge-700 hover:bg-forge-300"
            }`}
          >
            {ex.language.toUpperCase()}{topic.codeExamples.filter((e) => e.language === ex.language).length > 1 ? ` #${topic.codeExamples.slice(0, i + 1).filter((e) => e.language === ex.language).length}` : ""}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-forge-700">{example.explanation}</p>

      <div className="relative mt-4">
        <button onClick={copy} className="btn-secondary absolute right-3 top-3 !px-3 !py-1 text-xs">
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="overflow-x-auto rounded-lg border border-forge-200 bg-forge-50 p-4 font-mono text-sm leading-relaxed text-forge-800">
          {example.code}
        </pre>
      </div>
    </div>
  );
}

function PracticeTab({ problems, slug }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? problems : problems.filter((p) => p.difficulty === filter);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap gap-2">
        {["All", "Easy", "Medium", "Hard"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              filter === f ? "bg-ember-500 text-forge-50" : "bg-forge-200 text-forge-700 hover:bg-forge-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-5 space-y-2">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/practice/${p.slug}`}
              className="flex items-center justify-between rounded-lg border border-forge-200 bg-forge-200/30 px-4 py-3 transition-colors hover:border-circuit-500/50"
            >
              <span className="font-medium">{p.title}</span>
              <span className={`font-mono text-sm ${DIFFICULTY_COLOR[p.difficulty]}`}>
                {p.difficulty} {DIFFICULTY_DOTS[p.difficulty]}
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && <p className="text-sm text-forge-500">No problems in this filter.</p>}
      </ul>
    </div>
  );
}

function QuizTab({ slug, onSubmitted }) {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
    setAnswers({});
    api.get(`/topics/${slug}/quiz`).then(({ data }) => setQuestions(data.questions));
  }, [slug]);

  async function submit() {
    const ordered = questions.map((q) => answers[q.index] ?? -1);
    const { data } = await api.post(`/topics/${slug}/quiz/submit`, { answers: ordered });
    setResult(data);
    const { data: progressData } = await api.get(`/topics/${slug}/progress`);
    onSubmitted(progressData.progress);
  }

  if (!questions) return <div className="card p-6 text-forge-600">Loading quiz...</div>;

  if (result) {
    return (
      <div className="card p-6">
        <p className="label-eyebrow">Quiz Result</p>
        <p className="mt-2 font-display text-3xl font-bold text-ember-600">
          {result.correctCount}/{result.total} · {result.score}%
        </p>
        {result.xpAwarded > 0 && <p className="mt-1 font-mono text-xs text-circuit-600">+{result.xpAwarded} XP earned</p>}

        <ul className="mt-6 space-y-4">
          {result.results.map((r, i) => (
            <li key={i} className="rounded-lg border border-forge-200 bg-forge-200/30 p-4">
              <p className="font-medium">{r.question}</p>
              <p className={`mt-1 text-sm ${r.correct ? "text-circuit-600" : "text-red-400"}`}>
                {r.correct ? "Correct ✓" : "Not quite ✗"}
              </p>
              <p className="mt-1 text-sm text-forge-600">{r.explanation}</p>
            </li>
          ))}
        </ul>

        <button onClick={() => { setResult(null); setAnswers({}); }} className="btn-secondary mt-6 text-sm">
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="card space-y-6 p-6">
      {questions.map((q) => (
        <div key={q.index}>
          <p className="font-medium">{q.question}</p>
          <div className="mt-2 space-y-2">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                  answers[q.index] === i ? "border-ember-500 bg-ember-500/10" : "border-forge-300 hover:border-forge-400"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${q.index}`}
                  checked={answers[q.index] === i}
                  onChange={() => setAnswers({ ...answers, [q.index]: i })}
                  className="accent-ember-500"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={submit} className="btn-primary text-sm">Submit Quiz</button>
    </div>
  );
}
