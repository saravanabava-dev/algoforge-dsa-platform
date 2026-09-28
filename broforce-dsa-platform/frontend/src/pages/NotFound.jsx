import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-6xl text-forge-300">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">This node doesn't exist in the tree</h1>
      <p className="mt-2 text-forge-600">The page you're looking for was never inserted, or has been removed.</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
