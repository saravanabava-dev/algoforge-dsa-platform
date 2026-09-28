import { useState } from "react";

export default function StackVisualizer() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(null); // { type: "push"|"pop", value }
  const [message, setMessage] = useState("");

  function push() {
    const value = Number(input);
    if (input.trim() === "" || Number.isNaN(value)) {
      setMessage("Enter a number to push.");
      return;
    }
    if (stack.length >= 8) {
      setMessage("Stack Overflow — max 8 elements in this demo.");
      return;
    }
    setStack((s) => [...s, value]);
    setFlash({ type: "push", value });
    setInput("");
    setMessage(`Pushed ${value} onto the stack.`);
    setTimeout(() => setFlash(null), 500);
  }

  function pop() {
    if (stack.length === 0) {
      setMessage("Stack Underflow — nothing to pop.");
      return;
    }
    const top = stack[stack.length - 1];
    setFlash({ type: "pop", value: top });
    setMessage(`Popped ${top} from the stack.`);
    setTimeout(() => {
      setStack((s) => s.slice(0, -1));
      setFlash(null);
    }, 350);
  }

  function peek() {
    if (stack.length === 0) {
      setMessage("Stack is empty — nothing to peek.");
      return;
    }
    setMessage(`Top of stack is ${stack[stack.length - 1]}.`);
  }

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Stack (LIFO)</p>

      <div className="mt-6 flex flex-col items-center">
        {/* the stack itself, rendered top-down like a physical stack of plates */}
        <div className="flex min-h-[280px] w-48 flex-col-reverse items-center justify-start gap-1.5 rounded-b-lg border-b-4 border-l-4 border-r-4 border-forge-400 bg-forge-100/40 p-3">
          {stack.length === 0 && !flash && (
            <p className="mb-auto mt-auto font-mono text-xs text-forge-400">empty</p>
          )}
          {stack.map((val, i) => {
            const isTop = i === stack.length - 1;
            const isPopping = flash?.type === "pop" && isTop;
            return (
              <div
                key={i}
                className={`flex h-10 w-full items-center justify-center rounded-md border font-mono text-sm font-medium transition-all duration-300
                  ${isTop ? "border-ember-400 bg-ember-500/20 text-ember-600" : "border-forge-400 bg-forge-200 text-forge-800"}
                  ${isPopping ? "translate-y-[-16px] opacity-0" : "translate-y-0 opacity-100"}`}
              >
                {val} {isTop && <span className="ml-2 text-[10px] text-ember-600">← TOP</span>}
              </div>
            );
          })}
          {flash?.type === "push" && (
            <div className="flex h-10 w-full animate-[dropIn_0.4s_ease] items-center justify-center rounded-md border border-circuit-400 bg-circuit-500/20 font-mono text-sm text-circuit-600">
              {flash.value}
            </div>
          )}
        </div>
        <style>{`
          @keyframes dropIn {
            from { transform: translateY(-24px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && push()}
          placeholder="value"
          className="w-24 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center outline-none focus:border-circuit-500"
        />
        <button onClick={push} className="btn-primary !px-4 !py-2 text-sm">PUSH</button>
        <button onClick={pop} className="btn-secondary !px-4 !py-2 text-sm">POP</button>
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
