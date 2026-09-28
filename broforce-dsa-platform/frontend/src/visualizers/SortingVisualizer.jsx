import { useEffect, useRef, useState } from "react";
import { ALGORITHMS } from "./sortAlgorithms.js";

function randomArray(size = 12) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export default function SortingVisualizer() {
  const [baseArray, setBaseArray] = useState(() => randomArray());
  const [algoKey, setAlgoKey] = useState("bubble");
  const [frames, setFrames] = useState(() => ALGORITHMS.bubble.generate(baseArray));
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400); // ms per frame
  const [customInput, setCustomInput] = useState("");
  const timerRef = useRef(null);

  const algo = ALGORITHMS[algoKey];
  const frame = frames[frameIndex];

  function rebuild(newArray, newAlgoKey = algoKey) {
    setIsPlaying(false);
    const gen = ALGORITHMS[newAlgoKey].generate(newArray);
    setBaseArray(newArray);
    setFrames(gen);
    setFrameIndex(0);
  }

  useEffect(() => {
    if (!isPlaying) return;
    if (frameIndex >= frames.length - 1) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setFrameIndex((i) => i + 1), speed);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, frameIndex, frames, speed]);

  // Count comparisons/swaps up to the current frame
  const comparisons = frames.slice(1, frameIndex + 1).filter((f) => f.comparing.length > 0).length;
  const swaps = frames.slice(1, frameIndex + 1).filter((f) => f.swapped).length;
  const maxVal = Math.max(...baseArray, 1);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label-eyebrow">Sorting Visualizer</p>
        <select
          value={algoKey}
          onChange={(e) => {
            setAlgoKey(e.target.value);
            rebuild(baseArray, e.target.value);
          }}
          className="rounded-lg border border-forge-300 bg-forge-100 px-3 py-1.5 text-sm outline-none focus:border-circuit-500"
        >
          {Object.entries(ALGORITHMS).map(([key, a]) => (
            <option key={key} value={key}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* Bars */}
      <div className="mt-6 flex h-56 items-end justify-center gap-1.5 rounded-lg border border-forge-200 bg-forge-50/50 p-4">
        {frame.array.map((val, i) => {
          const isComparing = frame.comparing.includes(i);
          const isSorted = frame.sortedIndices.includes(i);
          const isPivot = frame.pivot === i;
          let color = "bg-forge-400";
          if (isSorted) color = "bg-circuit-500";
          else if (isPivot) color = "bg-purple-400";
          else if (isComparing) color = frame.swapped ? "bg-ember-400" : "bg-ember-500/70";

          return (
            <div key={i} className="flex flex-col items-center gap-1" style={{ width: `${Math.max(100 / frame.array.length - 1, 3)}%` }}>
              <div
                className={`w-full rounded-t transition-all duration-200 ${color}`}
                style={{ height: `${(val / maxVal) * 170 + 8}px` }}
              />
              <span className="font-mono text-[10px] text-forge-600">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-6 font-mono text-xs text-forge-600">
        <span>Comparisons: <span className="text-forge-900">{comparisons}</span></span>
        <span>Swaps: <span className="text-forge-900">{swaps}</span></span>
        <span>Complexity: <span className="text-forge-900">{algo.complexity}</span></span>
        <span>Step {frameIndex} / {frames.length - 1}</span>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button onClick={() => rebuild(randomArray())} className="btn-secondary !px-3 !py-1.5 text-xs">
          Generate Random Array
        </button>
        <button onClick={() => setFrameIndex(0)} className="btn-secondary !px-3 !py-1.5 text-xs">Reset</button>
        <button
          onClick={() => setFrameIndex((i) => Math.max(0, i - 1))}
          disabled={frameIndex === 0}
          className="btn-secondary !px-3 !py-1.5 text-xs"
        >
          ⏮ Prev
        </button>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="btn-primary !px-4 !py-1.5 text-xs"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => setFrameIndex((i) => Math.min(frames.length - 1, i + 1))}
          disabled={frameIndex >= frames.length - 1}
          className="btn-secondary !px-3 !py-1.5 text-xs"
        >
          Next ⏭
        </button>

        <label className="ml-auto flex items-center gap-2 text-xs text-forge-600">
          Speed
          <input
            type="range"
            min="80"
            max="800"
            step="20"
            value={800 - speed + 80}
            onChange={(e) => setSpeed(880 - Number(e.target.value))}
            className="accent-ember-500"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Custom array e.g. 5,2,9,1,7"
          className="flex-1 rounded-lg border border-forge-300 bg-forge-100 px-3 py-2 text-sm outline-none focus:border-circuit-500"
        />
        <button
          onClick={() => {
            const parsed = customInput
              .split(",")
              .map((s) => Number(s.trim()))
              .filter((n) => !Number.isNaN(n));
            if (parsed.length >= 2) rebuild(parsed);
          }}
          className="btn-secondary !px-4 text-sm"
        >
          Use Array
        </button>
      </div>
    </div>
  );
}
