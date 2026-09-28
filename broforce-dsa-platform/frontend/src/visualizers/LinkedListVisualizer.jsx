import { useState } from "react";

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState([10, 20, 30]);
  const [valueInput, setValueInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [flashIndex, setFlashIndex] = useState(null);
  const [flashType, setFlashType] = useState(null); // "insert" | "delete" | "found"
  const [message, setMessage] = useState("");

  function insertAtEnd() {
    const v = Number(valueInput);
    if (valueInput.trim() === "" || Number.isNaN(v)) {
      setMessage("Enter a value to insert.");
      return;
    }
    if (nodes.length >= 7) {
      setMessage("Max 7 nodes in this demo.");
      return;
    }
    setNodes((n) => [...n, v]);
    setFlashIndex(nodes.length);
    setFlashType("insert");
    setValueInput("");
    setMessage(`Inserted node ${v} at the end.`);
    setTimeout(() => setFlashIndex(null), 600);
  }

  function insertAtHead() {
    const v = Number(valueInput);
    if (valueInput.trim() === "" || Number.isNaN(v)) {
      setMessage("Enter a value to insert.");
      return;
    }
    if (nodes.length >= 7) {
      setMessage("Max 7 nodes in this demo.");
      return;
    }
    setNodes((n) => [v, ...n]);
    setFlashIndex(0);
    setFlashType("insert");
    setValueInput("");
    setMessage(`Inserted node ${v} at the head.`);
    setTimeout(() => setFlashIndex(null), 600);
  }

  function deleteHead() {
    if (nodes.length === 0) {
      setMessage("List is empty.");
      return;
    }
    setFlashIndex(0);
    setFlashType("delete");
    setMessage(`Deleted head node (${nodes[0]}).`);
    setTimeout(() => {
      setNodes((n) => n.slice(1));
      setFlashIndex(null);
    }, 300);
  }

  function reverse() {
    setNodes((n) => [...n].reverse());
    setMessage("List reversed.");
  }

  function search() {
    const target = Number(searchInput);
    if (searchInput.trim() === "" || Number.isNaN(target)) {
      setMessage("Enter a value to search for.");
      return;
    }
    const idx = nodes.indexOf(target);
    if (idx === -1) {
      setMessage(`${target} not found.`);
      return;
    }
    setFlashIndex(idx);
    setFlashType("found");
    setMessage(`Found ${target} — ${idx} hop${idx === 1 ? "" : "s"} from head.`);
    setTimeout(() => setFlashIndex(null), 900);
  }

  const nodeColor = (i) => {
    if (flashIndex !== i) return "border-forge-400 bg-forge-200 text-forge-800";
    if (flashType === "delete") return "border-danger-500 bg-danger-100 text-danger-500 scale-90 opacity-0";
    if (flashType === "found") return "border-success-500 bg-success-100 text-success-600";
    return "border-circuit-400 bg-circuit-100 text-circuit-600";
  };

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Linked List</p>

      <div className="mt-6 flex min-h-[100px] flex-wrap items-center justify-center gap-1 overflow-x-auto py-2">
        {nodes.length === 0 && <p className="font-mono text-xs text-forge-400">NULL</p>}
        {nodes.map((val, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className={`flex h-11 w-14 items-center justify-center rounded-md border font-mono text-sm font-medium transition-all duration-300 ${nodeColor(i)}`}
            >
              {val}
            </div>
            <span className="font-mono text-forge-400">→</span>
          </div>
        ))}
        <span className="font-mono text-xs text-forge-500">NULL</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="value"
          className="w-20 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={insertAtHead} className="btn-secondary !px-3 !py-2 text-xs">INSERT HEAD</button>
        <button onClick={insertAtEnd} className="btn-primary !px-3 !py-2 text-xs">INSERT END</button>
        <button onClick={deleteHead} className="btn-secondary !px-3 !py-2 text-xs">DELETE HEAD</button>
        <button onClick={reverse} className="btn-secondary !px-3 !py-2 text-xs">REVERSE</button>
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
