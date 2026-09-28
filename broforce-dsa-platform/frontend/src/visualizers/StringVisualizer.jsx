import { useState } from "react";

export default function StringVisualizer() {
  const [text, setText] = useState("racecar");
  const [pointers, setPointers] = useState(null); // { left, right, matched: bool[] }
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState(null); // "palindrome" | "reverse" | "traverse"
  const [traverseIndex, setTraverseIndex] = useState(-1);

  function checkPalindrome() {
    setMode("palindrome");
    setTraverseIndex(-1);
    let left = 0, right = text.length - 1;
    const matched = new Array(text.length).fill(false);
    setPointers({ left, right, matched: [...matched] });
    setMessage(`Comparing s[${left}]='${text[left]}' and s[${right}]='${text[right]}'`);
  }

  function stepPalindrome() {
    if (!pointers) return;
    let { left, right, matched } = pointers;
    if (left >= right) {
      setMessage(`Done — "${text}" is ${isPalindromeSoFar(matched, text) ? "a palindrome" : "not a palindrome"}.`);
      return;
    }
    if (text[left] !== text[right]) {
      setMessage(`s[${left}]='${text[left]}' ≠ s[${right}]='${text[right]}' — not a palindrome.`);
      setPointers({ left, right, matched, failed: true });
      return;
    }
    matched = [...matched];
    matched[left] = true;
    matched[right] = true;
    left++; right--;
    setPointers({ left, right, matched });
    if (left >= right) {
      setMessage(`All pairs matched — "${text}" is a palindrome!`);
    } else {
      setMessage(`Match! Now comparing s[${left}]='${text[left]}' and s[${right}]='${text[right]}'`);
    }
  }

  function isPalindromeSoFar(matched) {
    return !matched.includes(false) || matched.every((v, i) => v || true);
  }

  function traverse() {
    setMode("traverse");
    setPointers(null);
    setTraverseIndex(0);
    setMessage(`Visiting index 0: '${text[0]}'`);
  }

  function stepTraverse() {
    setTraverseIndex((i) => {
      const next = i + 1;
      if (next >= text.length) {
        setMessage("Reached the end of the string.");
        return i;
      }
      setMessage(`Visiting index ${next}: '${text[next]}'`);
      return next;
    });
  }

  function reset() {
    setMode(null);
    setPointers(null);
    setTraverseIndex(-1);
    setMessage("");
  }

  const charStyle = (i) => {
    if (mode === "traverse") {
      return i === traverseIndex ? "border-ember-400 bg-ember-500/20 text-ember-600" : "border-forge-400 bg-forge-200 text-forge-800";
    }
    if (mode === "palindrome" && pointers) {
      if (pointers.matched[i]) return "border-success-500 bg-success-100 text-success-600";
      if (i === pointers.left || i === pointers.right) {
        return pointers.failed ? "border-danger-500 bg-danger-100 text-danger-500" : "border-ember-400 bg-ember-500/20 text-ember-600";
      }
    }
    return "border-forge-400 bg-forge-200 text-forge-800";
  };

  return (
    <div className="card p-6">
      <p className="label-eyebrow">String Traversal &amp; Comparison</p>

      <div className="mt-3">
        <input
          value={text}
          onChange={(e) => { setText(e.target.value.slice(0, 14)); reset(); }}
          className="w-full rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center font-mono text-sm outline-none focus:border-circuit-500"
          placeholder="Type a short string"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
        {text.split("").map((ch, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`flex h-10 w-10 items-center justify-center rounded-md border font-mono text-sm font-medium uppercase transition-all duration-300 ${charStyle(i)}`}>
              {ch}
            </div>
            <span className="font-mono text-[9px] text-forge-400">{i}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <button onClick={checkPalindrome} className="btn-secondary !px-3 !py-2 text-xs">CHECK PALINDROME</button>
        <button onClick={stepPalindrome} disabled={mode !== "palindrome"} className="btn-primary !px-3 !py-2 text-xs">NEXT STEP</button>
        <button onClick={traverse} className="btn-secondary !px-3 !py-2 text-xs">TRAVERSE</button>
        <button onClick={stepTraverse} disabled={mode !== "traverse"} className="btn-primary !px-3 !py-2 text-xs">NEXT CHAR</button>
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
