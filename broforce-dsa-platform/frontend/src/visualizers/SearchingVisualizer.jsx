import { useRef, useState } from "react";

const DEFAULT_ARRAY = [4, 9, 14, 21, 30, 38, 45, 52, 61, 70];

export default function SearchingVisualizer() {
  const [algorithm, setAlgorithm] = useState("binary"); // "linear" | "binary"
  const [target, setTarget] = useState("45");
  const [steps, setSteps] = useState(null); // array of frames
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function buildBinarySteps(arr, target) {
    const frames = [];
    let low = 0, high = arr.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      frames.push({ low, high, mid, found: arr[mid] === target, eliminated: false });
      if (arr[mid] === target) break;
      if (arr[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    if (frames.length === 0 || !frames[frames.length - 1].found) {
      frames.push({ low, high, mid: -1, found: false, notFound: true });
    }
    return frames;
  }

  function buildLinearSteps(arr, target) {
    const frames = [];
    for (let i = 0; i < arr.length; i++) {
      frames.push({ current: i, found: arr[i] === target });
      if (arr[i] === target) return frames;
    }
    frames.push({ current: -1, found: false, notFound: true });
    return frames;
  }

  function start() {
    stop();
    const t = Number(target);
    if (target.trim() === "" || Number.isNaN(t)) return;
    const frames = algorithm === "binary" ? buildBinarySteps(DEFAULT_ARRAY, t) : buildLinearSteps(DEFAULT_ARRAY, t);
    setSteps(frames);
    setStepIndex(0);
  }

  function stop() {
    setPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function play() {
    if (!steps) return;
    setPlaying(true);
    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i + 1 >= steps.length) {
          clearInterval(timerRef.current);
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 900);
  }

  function reset() {
    stop();
    setSteps(null);
    setStepIndex(0);
  }

  const frame = steps?.[stepIndex];

  const cellState = (i) => {
    if (!frame) return "border-forge-400 bg-forge-200 text-forge-800";
    if (algorithm === "binary") {
      if (frame.mid === i && frame.found) return "border-success-500 bg-success-100 text-success-600";
      if (frame.mid === i) return "border-ember-400 bg-ember-500/20 text-ember-600";
      if (i < frame.low || i > frame.high) return "border-forge-300 bg-forge-100 text-forge-400 opacity-40";
      return "border-circuit-400 bg-circuit-100 text-circuit-600";
    }
    // linear
    if (frame.current === i && frame.found) return "border-success-500 bg-success-100 text-success-600";
    if (frame.current === i) return "border-ember-400 bg-ember-500/20 text-ember-600";
    if (frame.current > i || (frame.current === -1 && frame.notFound)) return "border-forge-300 bg-forge-100 text-forge-400 opacity-40";
    return "border-forge-400 bg-forge-200 text-forge-800";
  };

  return (
    <div className="card p-6">
      <p className="label-eyebrow">Searching</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => { setAlgorithm("linear"); reset(); }}
          className={`rounded-full px-3 py-1 font-mono text-xs ${algorithm === "linear" ? "bg-ember-500 text-white" : "bg-forge-200 text-forge-600"}`}
        >
          Linear Search
        </button>
        <button
          onClick={() => { setAlgorithm("binary"); reset(); }}
          className={`rounded-full px-3 py-1 font-mono text-xs ${algorithm === "binary" ? "bg-ember-500 text-white" : "bg-forge-200 text-forge-600"}`}
        >
          Binary Search
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
        {DEFAULT_ARRAY.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`flex h-11 w-11 items-center justify-center rounded-md border font-mono text-xs font-medium transition-all duration-300 ${cellState(i)}`}>
              {val}
            </div>
            <div className="flex h-4 flex-col items-center font-mono text-[9px] text-forge-500">
              {frame && algorithm === "binary" && frame.low === i && <span className="text-circuit-600">L</span>}
              {frame && algorithm === "binary" && frame.mid === i && <span className="text-ember-600">M</span>}
              {frame && algorithm === "binary" && frame.high === i && <span className="text-circuit-600">H</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="target"
          className="w-24 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-center text-sm outline-none focus:border-circuit-500"
        />
        <button onClick={start} className="btn-secondary !px-3 !py-2 text-xs">BUILD STEPS</button>
        <button onClick={play} disabled={!steps || playing} className="btn-primary !px-3 !py-2 text-xs">▶ PLAY</button>
        <button onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={!steps} className="btn-secondary !px-3 !py-2 text-xs">← STEP</button>
        <button onClick={() => setStepIndex((i) => Math.min((steps?.length || 1) - 1, i + 1))} disabled={!steps} className="btn-secondary !px-3 !py-2 text-xs">STEP →</button>
        <button onClick={reset} className="btn-secondary !px-3 !py-2 text-xs">RESET</button>
      </div>

      {frame && (
        <p className="mt-4 text-center font-mono text-xs text-forge-600" role="status">
          {frame.notFound
            ? `${target} not found in the array.`
            : frame.found
            ? `Found ${target} at index ${algorithm === "binary" ? frame.mid : frame.current}.`
            : algorithm === "binary"
            ? `Checking mid = index ${frame.mid} (value ${DEFAULT_ARRAY[frame.mid]}) — range [${frame.low}, ${frame.high}]`
            : `Checking index ${frame.current} (value ${DEFAULT_ARRAY[frame.current]})`}
          {steps && ` · Step ${stepIndex + 1}/${steps.length}`}
        </p>
      )}
    </div>
  );
}
