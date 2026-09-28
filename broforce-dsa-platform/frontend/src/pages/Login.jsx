import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="label-eyebrow">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Log in to AlgoForge</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 text-forge-900 outline-none focus:border-circuit-500"
            placeholder="you@college.edu"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="mb-1.5 block text-sm text-forge-700">Password</label>
            <Link to="/forgot-password" className="text-xs text-circuit-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 text-forge-900 outline-none focus:border-circuit-500"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-danger-500/30 bg-danger-100 px-3 py-2 text-sm text-danger-500">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-forge-600">
        New here?{" "}
        <Link to="/register" className="text-circuit-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
