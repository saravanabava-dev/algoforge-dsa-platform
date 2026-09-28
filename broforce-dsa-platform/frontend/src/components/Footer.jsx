import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-forge-200 bg-forge-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-ember-500 to-ember-600 font-display text-xs font-bold text-forge-50">
                {"</>"}
              </span>
              <span className="font-display font-semibold">AlgoForge</span>
            </div>
            <p className="mt-3 text-sm text-forge-600">
              An interactive Data Structures &amp; Algorithms learning laboratory.
            </p>
          </div>

          <div>
            <p className="label-eyebrow">Learn</p>
            <ul className="mt-3 space-y-2 text-sm text-forge-700">
              <li><Link to="/roadmap" className="hover:text-circuit-600">DSA Roadmap</Link></li>
              <li><Link to="/practice" className="hover:text-circuit-600">Practice Arena</Link></li>
              <li><Link to="/dashboard" className="hover:text-circuit-600">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-forge-700">
              <li><Link to="/about" className="hover:text-circuit-600">About the Platform</Link></li>
              <li><Link to="/product-roadmap" className="hover:text-circuit-600">Product Roadmap</Link></li>
            </ul>
          </div>

        <div>
  <p className="label-eyebrow">About</p>
  <p className="mt-3 text-sm text-forge-600">
    AlgoForge — Interactive DSA Learning Platform
  </p>
</div>
        </div>

       <div className="mt-10 border-t border-forge-200 pt-6 text-center text-xs text-forge-500">
  © {new Date().getFullYear()} AlgoForge. All Rights Reserved.
</div>
      </div>
    </footer>
  );
}
