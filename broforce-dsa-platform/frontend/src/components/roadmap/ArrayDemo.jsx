import { useState } from "react";

export default function ArrayDemo() {
  const [arr, setArr] = useState([10, 20, 30, 40, 50]);
  const [input, setInput] = useState("");
  const [highlight, setHighlight] = useState(null); // { index, kind: "access"|"found"|"insert"|"delete" }
  const [message, setMessage] = useState("");

  function flashIndex(index, kind, msg) {
    setHighlight({ index, kind });
    setMessage(msg);
    setTimeout(() => setHighlight(null), 700);
  }

  function access() {
    const i = Number(input);
    if (Number.isNaN(i) || i < 0 || i >= arr.length) return setMessage("Enter a valid index.");
    flashIndex(i, "access", `arr[${i}] = ${arr[i]}`);
  }

  function update() {
    const i = Number(input);
    if (Number.isNaN(i) || i < 0 || i >= arr.length) return setMessage("Enter a valid index.");
    const newVal = arr[i] + 1;
    setArr((a) => a.map((v, idx) => (idx === i ? newVal : v)));
    flashIndex(i, "access", `Updated arr[${i}] to ${newVal}`);
  }

  function search() {
    const target = Number(input);
    const idx = arr.indexOf(target);
    if (idx === -1) return setMessage(`${target} not found.`);
    flashIndex(idx, "found", `Found ${target} at index ${idx}`);
  }

  function insertEnd() {
    if (arr.length >= 8) return setMessage("Demo array capped at 8 elements.");
    const value = Number(input) || Math.floor(Math.random() * 90) + 10;
    setArr((a) => [...a, value]);
    setTimeout(() => flashIndex(arr.length, "insert", `Inserted ${value} at end`), 0);
  }

  function deleteLast() {
    if (arr.length === 0) return setMessage("Array is empty.");
    setMessage(`Deleted ${arr[arr.length - 1]}`);
    setArr((a) => a.slice(0, -1));
  }

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Array Operations</p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {arr.map((v, i) => {
          const isHi = highlight?.index === i;
          const color = isHi
            ? highlight.kind === "found"
              ? "border-circuit-500 bg-circuit-100 text-circuit-700"
              : "border-ember-500 bg-ember-100 text-ember-700"
            : "border-forge-400 bg-forge-200 text-forge-800";
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`flex h-12 w-12 items-center justify-center rounded-md border font-mono text-sm font-medium transition-colors ${color}`}>
                {v}
              </div>
              <span className="font-mono text-[10px] text-forge-400">{i}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="index / value"
          className="w-28 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={access} className="btn-secondary !px-3 !py-2 text-xs">ACCESS</button>
        <button onClick={update} className="btn-secondary !px-3 !py-2 text-xs">UPDATE</button>
        <button onClick={search} className="btn-secondary !px-3 !py-2 text-xs">SEARCH</button>
        <button onClick={insertEnd} className="btn-primary !px-3 !py-2 text-xs">INSERT</button>
        <button onClick={deleteLast} className="btn-secondary !px-3 !py-2 text-xs">DELETE</button>
      </div>

      {message && <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">{message}</p>}
    </div>
  );
}
