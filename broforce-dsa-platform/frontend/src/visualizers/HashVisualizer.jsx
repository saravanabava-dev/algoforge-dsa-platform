import { useState } from "react";

const BUCKET_COUNT = 7;

function hashFn(key) {
  const n = Number(key);
  if (!Number.isNaN(n)) return ((n % BUCKET_COUNT) + BUCKET_COUNT) % BUCKET_COUNT;
  // simple string hash: sum of char codes mod bucket count
  let sum = 0;
  for (const ch of String(key)) sum += ch.charCodeAt(0);
  return sum % BUCKET_COUNT;
}

export default function HashVisualizer() {
  const [buckets, setBuckets] = useState(() => Array.from({ length: BUCKET_COUNT }, () => []));
  const [key, setKey] = useState("");
  const [highlight, setHighlight] = useState(null); // { bucket, type }
  const [message, setMessage] = useState("");

  function flash(bucket, type, ms = 900) {
    setHighlight({ bucket, type });
    setTimeout(() => setHighlight(null), ms);
  }

  function insert() {
    if (key.trim() === "") { setMessage("Enter a key to insert."); return; }
    const idx = hashFn(key);
    const collided = buckets[idx].length > 0 && !buckets[idx].includes(key);
    setBuckets((b) => {
      const copy = b.map((bucket) => [...bucket]);
      if (!copy[idx].includes(key)) copy[idx].push(key);
      return copy;
    });
    flash(idx, "insert");
    setMessage(
      collided
        ? `hash("${key}") = ${idx} — collision! Chained onto bucket ${idx}.`
        : `hash("${key}") = ${idx} — inserted into bucket ${idx}.`
    );
    setKey("");
  }

  function search() {
    if (key.trim() === "") { setMessage("Enter a key to search for."); return; }
    const idx = hashFn(key);
    const found = buckets[idx].includes(key);
    flash(idx, found ? "found" : "miss");
    setMessage(found ? `hash("${key}") = ${idx} — found in bucket ${idx}.` : `hash("${key}") = ${idx} — not present in bucket ${idx}.`);
  }

  function remove() {
    if (key.trim() === "") { setMessage("Enter a key to delete."); return; }
    const idx = hashFn(key);
    const existed = buckets[idx].includes(key);
    setBuckets((b) => {
      const copy = b.map((bucket) => bucket.filter((k) => k !== key));
      return copy;
    });
    flash(idx, existed ? "delete" : "miss");
    setMessage(existed ? `Deleted "${key}" from bucket ${idx}.` : `"${key}" was not found in bucket ${idx}.`);
  }

  function reset() {
    setBuckets(Array.from({ length: BUCKET_COUNT }, () => []));
    setHighlight(null);
    setMessage("Table reset.");
  }

  const bucketStyle = (i) => {
    if (!highlight || highlight.bucket !== i) return "border-forge-300 bg-forge-100";
    if (highlight.type === "insert") return "border-circuit-400 bg-circuit-100";
    if (highlight.type === "found") return "border-success-500 bg-success-100";
    if (highlight.type === "delete") return "border-danger-500 bg-danger-100";
    return "border-warning-500 bg-warning-100"; // miss
  };

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Hash Table</p>
      <p className="mt-1 font-mono text-[11px] text-forge-500">hash(key) = key % {BUCKET_COUNT} (chaining on collision)</p>

      <div className="mt-5 space-y-1.5">
        {buckets.map((bucket, i) => (
          <div key={i} className={`flex items-center gap-2 rounded-md border px-3 py-1.5 transition-colors duration-300 ${bucketStyle(i)}`}>
            <span className="w-5 shrink-0 font-mono text-xs text-forge-500">{i}</span>
            <span className="text-forge-400">→</span>
            {bucket.length === 0 ? (
              <span className="font-mono text-xs text-forge-400">empty</span>
            ) : (
              <div className="flex flex-wrap items-center gap-1">
                {bucket.map((k, j) => (
                  <span key={k}>
                    <span className="rounded bg-white px-2 py-0.5 font-mono text-xs text-forge-800 shadow-sm">{k}</span>
                    {j < bucket.length - 1 && <span className="mx-1 text-forge-400">→</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && insert()}
          placeholder="key"
          className="w-28 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={insert} className="btn-primary !px-3 !py-2 text-xs">INSERT</button>
        <button onClick={search} className="btn-secondary !px-3 !py-2 text-xs">SEARCH</button>
        <button onClick={remove} className="btn-secondary !px-3 !py-2 text-xs">DELETE</button>
        <button onClick={reset} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {message && (
        <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
