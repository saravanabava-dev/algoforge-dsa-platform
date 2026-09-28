import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api from "../services/api.js";
import "../monacoSetup.js";

// Maps our internal language ids to Monaco's built-in Monarch tokenizer ids.
// Monaco doesn't ship a distinct "c" grammar — its "cpp" tokenizer covers
// C syntax well enough for highlighting purposes, so we reuse it for C.
const MONACO_LANGUAGE = {
  java: "java",
  python: "python",
  c: "cpp",
  cpp: "cpp",
  javascript: "javascript",
};

// The Practice code panel is a real, editable Code Lab: Run Code and Submit
// both go through the local multi-language execution engine
// (services/execution) — no code is ever sent to an external service. This
// is intentionally different from the read-only "Code" tab on a topic's
// Lesson page (TopicLearn.jsx), which shows reference implementations to
// read rather than an editor to write in.
export default function ProblemDetail() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [language, setLanguage] = useState(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false); // true while Run or Submit is in flight
  const [busyAction, setBusyAction] = useState(null); // "run" | "submit"
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProblem(null);
    setResult(null);
    api
      .get(`/problems/${slug}`)
      .then(({ data }) => {
        setProblem(data.problem);
        setAvailableLanguages(data.availableLanguages);
        const defaultLang = data.availableLanguages[0]?.id;
        setLanguage(defaultLang);
        setCode(data.problem.starterCode?.[defaultLang] || "");
      })
      .catch((err) => setError(err.response?.data?.message || "Problem not found"));
  }, [slug]);

  function changeLanguage(newLang) {
    setLanguage(newLang);
    setCode(problem.starterCode?.[newLang] || "");
    setResult(null);
  }

  function resetCode() {
    setCode(problem.starterCode?.[language] || "");
    setResult(null);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setResult({ mode: "error", message: "Couldn't copy — your browser may be blocking clipboard access." });
    }
  }

  async function runCode() {
    setBusy(true);
    setBusyAction("run");
    setResult(null);
    try {
      const { data } = await api.post(`/problems/${slug}/run`, { code, language });
      setResult({ ...data, mode: "run" });
    } catch (err) {
      setResult({ mode: "error", message: err.response?.data?.message || "Couldn't run code right now." });
    } finally {
      setBusy(false);
      setBusyAction(null);
    }
  }

  async function submitCode() {
    setBusy(true);
    setBusyAction("submit");
    setResult(null);
    try {
      const { data } = await api.post(`/problems/${slug}/submit`, { code, language });
      setResult({
        ...data.submission,
        xpAwarded: data.xpAwarded,
        newlyEarnedBadges: data.newlyEarnedBadges,
        systemMessage: data.systemMessage,
        mode: "submit",
      });
    } catch (err) {
      setResult({ mode: "error", message: err.response?.data?.message || "Couldn't submit right now." });
    } finally {
      setBusy(false);
      setBusyAction(null);
    }
  }

  const languageLabel = useMemo(
    () => availableLanguages.find((l) => l.id === language)?.label,
    [availableLanguages, language]
  );

  if (error) return <div className="mx-auto max-w-4xl px-6 py-16 text-danger-500">{error}</div>;
  if (!problem) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="label-eyebrow">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Problem statement */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-forge-900">{problem.title}</h1>
            <span className="rounded-full bg-forge-200 px-3 py-1 text-xs font-medium text-forge-700">
              {problem.difficulty}
            </span>
          </div>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-forge-700">{problem.statement}</p>

          <p className="label-eyebrow mb-2 mt-6">Examples</p>
          {problem.examples.map((ex, i) => (
            <div key={i} className="mb-3 rounded-lg border border-forge-300 bg-forge-100 p-3 font-mono text-xs">
              <p><span className="text-forge-500">Input:</span> {ex.input}</p>
              <p><span className="text-forge-500">Output:</span> {ex.output}</p>
              {ex.explanation && <p className="mt-1 text-forge-600">{ex.explanation}</p>}
            </div>
          ))}

          {problem.constraints?.length > 0 && (
            <>
              <p className="label-eyebrow mb-2 mt-4">Constraints</p>
              <ul className="list-inside list-disc text-sm text-forge-600">
                {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </>
          )}

          {problem.hints?.length > 0 && <ProgressiveHints hints={problem.hints} />}
        </div>

        {/* Practice code editor */}
        <div className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="label-eyebrow">Practice</p>
            <div className="flex items-center gap-2">
              <label className="text-xs text-forge-500">Language</label>
              <select
                value={language || ""}
                onChange={(e) => changeLanguage(e.target.value)}
                className="rounded-lg border border-forge-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-circuit-500"
              >
                {availableLanguages.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          {availableLanguages.length === 0 ? (
            <p className="mt-4 rounded-lg border border-warning-500/30 bg-warning-100 px-4 py-3 text-sm text-forge-700">
              No starter code has been authored for this problem yet in any language.
            </p>
          ) : (
            <>
              <div className="mt-3 overflow-hidden rounded-lg border border-forge-300">
                <Editor
                  height="360px"
                  language={MONACO_LANGUAGE[language] || "plaintext"}
                  value={code}
                  onChange={(v) => setCode(v ?? "")}
                  theme="light"
                  options={{
                    fontSize: 13,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                />
              </div>

              {/* The four required Practice actions. Run/Submit are orange
                  (btn-primary); Reset/Copy are secondary/white
                  (btn-secondary) — reusing the existing design system
                  exactly rather than one-off styling. */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={runCode} disabled={busy} className="btn-primary text-sm">
                  {busy && busyAction === "run" ? "Running..." : "Run Code"}
                </button>
                <button onClick={submitCode} disabled={busy} className="btn-primary text-sm">
                  {busy && busyAction === "submit" ? "Submitting..." : "Submit"}
                </button>
                <button onClick={resetCode} disabled={busy} className="btn-secondary text-sm">
                  Reset
                </button>
                <button onClick={copyCode} className="btn-secondary text-sm">
                  {copied ? "Copied ✓" : "Copy Code"}
                </button>
              </div>
            </>
          )}

          {result && <ResultPanel result={result} languageLabel={languageLabel} />}
        </div>
      </div>
    </div>
  );
}

function ProgressiveHints({ hints }) {
  const [unlocked, setUnlocked] = useState(0);

  return (
    <div className="mt-4">
      <p className="label-eyebrow mb-2">Need a Hint?</p>
      <div className="space-y-2">
        {hints.slice(0, unlocked).map((h, i) => (
          <p key={i} className="rounded-lg border border-forge-300 bg-forge-100 p-3 text-sm text-forge-700">
            <span className="font-semibold text-forge-900">Hint {i + 1}: </span>{h}
          </p>
        ))}
      </div>
      {unlocked < hints.length && (
        <button onClick={() => setUnlocked((u) => u + 1)} className="btn-secondary mt-2 text-xs">
          Show Hint {unlocked + 1} of {hints.length}
        </button>
      )}
    </div>
  );
}

function ResultPanel({ result, languageLabel }) {
  if (result.mode === "error") {
    return (
      <p className="mt-5 rounded-lg border border-danger-500/30 bg-danger-100 px-4 py-3 text-sm text-danger-500" role="alert">
        {result.message}
      </p>
    );
  }

  return (
    <div className="mt-5">
      <p
        className={`font-display text-lg font-semibold ${
          result.verdict === "Accepted" ? "text-success-600" : "text-danger-500"
        }`}
      >
        {result.verdict}
        {result.mode === "submit" && result.passedCount !== undefined && (
          <span className="ml-2 font-mono text-sm text-forge-500">
            {result.passedCount}/{result.totalCount} test cases · {languageLabel}
          </span>
        )}
        {result.mode === "run" && result.passedCount !== undefined && (
          <span className="ml-2 font-mono text-sm text-forge-500">
            {result.passedCount}/{result.totalCount} visible test cases · {languageLabel}
          </span>
        )}
      </p>
      {result.xpAwarded > 0 && <p className="mt-1 font-mono text-xs text-ember-600">+{result.xpAwarded} XP earned</p>}
      {result.systemMessage && (
        <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-forge-900 p-3 font-mono text-xs text-forge-100">
          {result.systemMessage}
        </pre>
      )}
      {result.results?.length > 0 && (
        <div className="mt-3 space-y-2">
          {result.results.map((r, i) => (
            <div
              key={i}
              className={`rounded-lg border p-3 font-mono text-xs ${
                r.passed ? "border-success-500/40 bg-success-100/40" : "border-danger-500/40 bg-danger-100/40"
              }`}
            >
              <p>Input: {r.input}</p>
              <p>Expected: {r.expectedOutput}</p>
              <p>Got: {r.actualOutput}</p>
              <p className={r.passed ? "text-success-600" : "text-danger-500"}>
                {r.passed ? "Passed ✓" : "Failed ✗"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
