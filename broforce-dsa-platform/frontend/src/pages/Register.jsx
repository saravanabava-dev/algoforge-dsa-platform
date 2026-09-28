import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    department: "",
    batch: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      await register(payload);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="label-eyebrow">Join AlgoForge</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Create your account</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Full name</label>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={update("password")}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
          />
          <p className="mt-1 text-xs text-forge-500">At least 6 characters.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Confirm password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm text-forge-700">Course / Department</label>
            <input
              value={form.department}
              onChange={update("department")}
              placeholder="CSE"
              className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-forge-700">Year</label>
            <input
              value={form.batch}
              onChange={update("batch")}
              placeholder="2026"
              className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">College / Institution</label>
          <input
            value={form.college}
            onChange={update("college")}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 outline-none focus:border-circuit-500"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-danger-500/30 bg-danger-100 px-3 py-2 text-sm text-danger-500">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-forge-600">
        Already have an account?{" "}
        <Link to="/login" className="text-circuit-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
