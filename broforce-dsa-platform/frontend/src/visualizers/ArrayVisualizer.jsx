import { useState } from "react";

export default function ArrayVisualizer() {
  const [arr, setArr] = useState([10, 20, 30, 40, 50]);
  const [indexInput, setIndexInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [highlight, setHighlight] = useState(null); // { index, type: "access"|"update"|"insert"|"delete"|"found"|"probe" }
  const [message, setMessage] = useState("");

  function flash(index, type, ms = 700) {
    setHighlight({ index, type });
    setTimeout(() => setHighlight(null), ms);
  }

  function access() {
    const i = Number(indexInput);
    if (indexInput.trim() === "" || Number.isNaN(i) || i < 0 || i >= arr.length) {
      setMessage(`Enter a valid index (0 to ${arr.length - 1}).`);
      return;
    }
    flash(i, "access");
    setMessage(`arr[${i}] = ${arr[i]}`);
  }

  function update() {
    const i = Number(indexInput);
    const v = Number(valueInput);
    if (Number.isNaN(i) || i < 0 || i >= arr.length) {
      setMessage(`Enter a valid index (0 to ${arr.length - 1}).`);
      return;
    }
    if (valueInput.trim() === "" || Number.isNaN(v)) {
      setMessage("Enter a value to update with.");
      return;
    }
    setArr((a) => a.map((x, idx) => (idx === i ? v : x)));
    flash(i, "update");
    setMessage(`arr[${i}] updated to ${v}.`);
  }

  function insert() {
    const v = Number(valueInput);
    if (valueInput.trim() === "" || Number.isNaN(v)) {
      setMessage("Enter a value to insert.");
      return;
    }
    if (arr.length >= 8) {
      setMessage("Max 8 elements in this demo.");
      return;
    }
    setArr((a) => [...a, v]);
    flash(arr.length, "insert");
    setMessage(`Inserted ${v} at the end.`);
  }

  function remove() {
    if (arr.length === 0) {
      setMessage("Array is empty.");
      return;
    }
    const last = arr.length - 1;
    flash(last, "delete", 350);
    setMessage(`Deleted arr[${last}] (${arr[last]}).`);
    setTimeout(() => setArr((a) => a.slice(0, -1)), 300);
  }

  function search() {
    const target = Number(searchInput);
    if (searchInput.trim() === "" || Number.isNaN(target)) {
      setMessage("Enter a value to search for.");
      return;
    }
    const foundIndex = arr.indexOf(target);
    if (foundIndex === -1) {
      setMessage(`${target} not found in the array.`);
      return;
    }
    flash(foundIndex, "found", 900);
    setMessage(`Found ${target} at index ${foundIndex}.`);
  }

  const colorFor = (i) => {
    if (!highlight || highlight.index !== i) return "border-forge-400 bg-forge-200 text-forge-800";
    if (highlight.type === "delete") return "border-danger-500 bg-danger-100 text-danger-500 scale-90 opacity-0";
    if (highlight.type === "found") return "border-success-500 bg-success-100 text-success-600";
    if (highlight.type === "insert") return "border-circuit-400 bg-circuit-100 text-circuit-600";
    return "border-ember-400 bg-ember-500/20 text-ember-600"; // access / update
  };

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Array</p>

      <div className="mt-6 flex min-h-[120px] flex-wrap items-center justify-center gap-2">
        {arr.length === 0 && <p className="font-mono text-xs text-forge-400">empty</p>}
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-md border font-mono text-sm font-medium transition-all duration-300 ${colorFor(i)}`}
            >
              {val}
            </div>
            <span className="font-mono text-[10px] text-forge-400">{i}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <input
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          placeholder="index"
          className="w-20 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="value"
          className="w-20 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={access} className="btn-secondary !px-3 !py-2 text-xs">ACCESS</button>
        <button onClick={update} className="btn-secondary !px-3 !py-2 text-xs">UPDATE</button>
        <button onClick={insert} className="btn-primary !px-3 !py-2 text-xs">INSERT</button>
        <button onClick={remove} className="btn-secondary !px-3 !py-2 text-xs">DELETE</button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="search value"
          className="w-28 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={search} className="btn-secondary !px-3 !py-2 text-xs">SEARCH</button>
      </div>

      {message && (
        <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
