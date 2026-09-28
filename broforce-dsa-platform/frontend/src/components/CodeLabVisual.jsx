import { useState } from "react";

// Simple programming structure only
const SNIPPETS = {
  Java: [
    { t: "kw", v: "public class " },
    { t: "cls", v: "Main" },
    { t: "p", v: " {" },
    { t: "nl" },
    { t: "kw", v: "  void " },
    { t: "fn", v: "method" },
    { t: "p", v: "() {" },
    { t: "nl" },
    { t: "p", v: "  }" },
    { t: "nl" },
    { t: "p", v: "}" },
  ],

  Python: [
    { t: "kw", v: "class " },
    { t: "cls", v: "Main" },
    { t: "p", v: ":" },
    { t: "nl" },
    { t: "kw", v: "  def " },
    { t: "fn", v: "method" },
    { t: "p", v: "(self):" },
    { t: "nl" },
    { t: "p", v: "    pass" },
  ],

  C: [
    { t: "kw", v: "void " },
    { t: "fn", v: "method" },
    { t: "p", v: "() {" },
    { t: "nl" },
    { t: "p", v: "}" },
  ],

  "C++": [
    { t: "kw", v: "class " },
    { t: "cls", v: "Main" },
    { t: "p", v: " {" },
    { t: "nl" },
    { t: "kw", v: "public:" },
    { t: "nl" },
    { t: "kw", v: "  void " },
    { t: "fn", v: "method" },
    { t: "p", v: "() {" },
    { t: "nl" },
    { t: "p", v: "  }" },
    { t: "nl" },
    { t: "p", v: "};" },
  ],

  JavaScript: [
    { t: "kw", v: "class " },
    { t: "cls", v: "Main" },
    { t: "p", v: " {" },
    { t: "nl" },
    { t: "fn", v: "  method" },
    { t: "p", v: "() {" },
    { t: "nl" },
    { t: "p", v: "  }" },
    { t: "nl" },
    { t: "p", v: "}" },
  ],
};

export default function CodeLabVisual() {
  const [activeTab, setActiveTab] = useState("Java");

  return (
    <div className="card overflow-hidden">

      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-forge-200 bg-forge-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success-500/70" />

        <span className="ml-3 font-mono text-[11px] text-forge-500">
          structure.{activeTab === "Python"
            ? "py"
            : activeTab === "C++"
            ? "cpp"
            : activeTab === "C"
            ? "c"
            : activeTab === "JavaScript"
            ? "js"
            : "java"}
        </span>
      </div>

      {/* 5 language tabs */}
      <div className="flex gap-1 border-b border-forge-200 bg-white px-3 pt-2">
        {Object.keys(SNIPPETS).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`rounded-t-md px-3 py-1.5 font-mono text-xs transition-colors ${
              activeTab === lang
                ? "border-x border-t border-forge-200 bg-forge-100 text-forge-900"
                : "text-forge-500 hover:text-forge-700"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Simple code structure */}
      <div className="bg-forge-900 px-5 py-4 font-mono text-[13px] leading-relaxed">
        {SNIPPETS[activeTab].map((tok, i) =>
          tok.t === "nl" ? (
            <br key={i} />
          ) : (
            <span
              key={i}
              className={
                tok.t === "kw"
                  ? "text-circuit-400"
                  : tok.t === "fn"
                  ? "text-ember-400"
                  : tok.t === "cls"
                  ? "text-warning-500"
                  : "text-forge-200"
              }
            >
              {tok.v}
            </span>
          )
        )}
      </div>

    </div>
  );
}