// Original SVG illustration for the Hero section: a student at a laptop,
// surrounded by floating cards representing array/tree/complexity concepts.
// Deliberately not photorealistic — a clean geometric style consistent with
// the rest of the app's visualizer components (which are all SVG/div-based,
// no image assets, fully offline).
export default function HeroLearningVisual() {
  return (
    <div className="card relative overflow-hidden p-6">
      <p className="label-eyebrow mb-3">Learn by doing</p>

      <div className="relative flex min-h-[320px] items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full max-w-sm" aria-hidden="true">
          <defs>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EEF0F4" />
              <stop offset="100%" stopColor="#DFE3EA" />
            </linearGradient>
          </defs>

          {/* desk */}
          <rect x="40" y="230" width="320" height="14" rx="4" fill="url(#deskGrad)" />
          <rect x="60" y="244" width="14" height="36" fill="#C4CAD6" />
          <rect x="326" y="244" width="14" height="36" fill="#C4CAD6" />

          {/* student — simple geometric figure, seated behind the laptop */}
          <g>
            {/* chair back */}
            <rect x="178" y="150" width="44" height="70" rx="10" fill="#EEF0F4" stroke="#C4CAD6" strokeWidth="2" />
            {/* torso */}
            <rect x="172" y="168" width="56" height="60" rx="18" fill="#3D4457" />
            {/* head */}
            <circle cx="200" cy="150" r="20" fill="#F5A05C" />
            {/* simple hair */}
            <path d="M180 142 Q200 122 220 142 L220 148 Q200 134 180 148 Z" fill="#252B3B" />
          </g>

          {/* laptop */}
          <g>
            <rect x="150" y="196" width="100" height="6" rx="2" fill="#8D96A8" />
            <path d="M146 196 L254 196 L246 168 L154 168 Z" fill="#252B3B" />
            <rect x="160" y="174" width="80" height="18" rx="2" fill="#12151F" />
            {/* code lines on screen, syntax-highlight colors */}
            <rect x="165" y="178" width="18" height="2.5" rx="1" fill="#1FA8BD" />
            <rect x="186" y="178" width="26" height="2.5" rx="1" fill="#E9EBF1" opacity="0.5" />
            <rect x="165" y="183" width="30" height="2.5" rx="1" fill="#EC7F2E" />
            <rect x="165" y="188" width="22" height="2.5" rx="1" fill="#4FC4D6" />
          </g>

          {/* connecting node diagram, bottom-left — subtle DSA motif */}
          <g stroke="#C4CAD6" strokeWidth="2" fill="none">
            <line x1="70" y1="200" x2="100" y2="180" />
            <line x1="100" y1="180" x2="100" y2="215" />
            <line x1="100" y1="180" x2="130" y2="200" />
          </g>
          <circle cx="70" cy="200" r="7" fill="#EAFBFD" stroke="#1FA8BD" strokeWidth="2" />
          <circle cx="100" cy="180" r="7" fill="#EAFBFD" stroke="#1FA8BD" strokeWidth="2" />
          <circle cx="100" cy="215" r="7" fill="#EAFBFD" stroke="#1FA8BD" strokeWidth="2" />
          <circle cx="130" cy="200" r="7" fill="#EAFBFD" stroke="#1FA8BD" strokeWidth="2" />
        </svg>

        {/* Floating learning cards — HTML overlays so they can carry real
            text and a gentle independent bob animation. */}
        <div className="absolute left-2 top-2 animate-[floatA_4s_ease-in-out_infinite] rounded-lg border border-forge-300 bg-white px-3 py-2 font-mono text-[11px] text-forge-800 shadow-card">
          [ 4 ][ 8 ][ 2 ][ 9 ]
        </div>
        <div className="absolute right-2 top-6 animate-[floatB_5s_ease-in-out_infinite] rounded-lg border border-circuit-500/40 bg-white px-3 py-2 font-mono text-[11px] text-circuit-600 shadow-card">
          O(log n)
        </div>
        <div className="absolute bottom-6 right-4 animate-[floatA_4.5s_ease-in-out_infinite] rounded-lg border border-success-500/40 bg-white px-3 py-2 font-mono text-[11px] text-success-600 shadow-card">
          ✓ Solved
        </div>
        <div className="absolute bottom-2 left-6 animate-[floatB_5.5s_ease-in-out_infinite] rounded-lg border border-ember-500/40 bg-white px-3 py-2 font-mono text-[11px] text-ember-600 shadow-card">
          {"{ }"} main()
        </div>

        <style>{`
          @keyframes floatA {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes floatB {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
          @media (prefers-reduced-motion: reduce) {
            [class*="animate-["] { animation: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
