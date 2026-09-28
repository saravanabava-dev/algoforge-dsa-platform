import { useState } from "react";

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(null); // { type: "enqueue"|"dequeue" }
  const [message, setMessage] = useState("");

  function enqueue() {
    const value = Number(input);
    if (input.trim() === "" || Number.isNaN(value)) {
      setMessage("Enter a number to enqueue.");
      return;
    }
    if (queue.length >= 8) {
      setMessage("Queue is full — max 8 elements in this demo.");
      return;
    }
    setQueue((q) => [...q, value]);
    setFlash({ type: "enqueue" });
    setInput("");
    setMessage(`Enqueued ${value} at the rear.`);
    setTimeout(() => setFlash(null), 500);
  }

  function dequeue() {
    if (queue.length === 0) {
      setMessage("Queue is empty — nothing to dequeue.");
      return;
    }
    const front = queue[0];
    setFlash({ type: "dequeue" });
    setMessage(`Dequeued ${front} from the front.`);
    setTimeout(() => {
      setQueue((q) => q.slice(1));
      setFlash(null);
    }, 350);
  }

  function peek() {
    if (queue.length === 0) {
      setMessage("Queue is empty — nothing to peek.");
      return;
    }
    setMessage(`Front of queue is ${queue[0]}.`);
  }

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Queue (FIFO)</p>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest text-forge-500">
          <span className={queue.length > 0 ? "text-ember-600" : ""}>Front</span>
          <span className="flex-1" />
          <span className={queue.length > 0 ? "text-circuit-600" : ""}>Rear</span>
        </div>

        <div className="mt-2 flex min-h-[64px] w-full items-center justify-center gap-1.5 overflow-x-auto rounded-lg border border-forge-400 bg-forge-100/40 p-3">
          {queue.length === 0 && !flash && <p className="font-mono text-xs text-forge-400">empty</p>}
          {queue.map((val, i) => {
            const isFront = i === 0;
            const isRear = i === queue.length - 1;
            const isDequeuing = flash?.type === "dequeue" && isFront;
            return (
              <div
                key={i}
                className={`flex h-11 w-14 shrink-0 items-center justify-center rounded-md border font-mono text-sm font-medium transition-all duration-300
                  ${isFront ? "border-ember-400 bg-ember-500/20 text-ember-600" : isRear ? "border-circuit-400 bg-circuit-100 text-circuit-600" : "border-forge-400 bg-forge-200 text-forge-800"}
                  ${isDequeuing ? "translate-x-[-24px] opacity-0" : "translate-x-0 opacity-100"}`}
              >
                {val}
              </div>
            );
          })}
          {flash?.type === "enqueue" && (
            <div className="flex h-11 w-14 shrink-0 animate-[slideIn_0.4s_ease] items-center justify-center rounded-md border border-circuit-400 bg-circuit-500/20 font-mono text-sm text-circuit-600">
              {queue[queue.length - 1]}
            </div>
          )}
        </div>
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(24px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enqueue()}
          placeholder="value"
          className="w-24 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center outline-none focus:border-circuit-500"
        />
        <button onClick={enqueue} className="btn-primary !px-4 !py-2 text-sm">ENQUEUE</button>
        <button onClick={dequeue} className="btn-secondary !px-4 !py-2 text-sm">DEQUEUE</button>
        <button onClick={peek} className="btn-secondary !px-4 !py-2 text-sm">PEEK</button>
      </div>

      {message && (
        <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
