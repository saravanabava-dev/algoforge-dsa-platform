import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      // The backend intentionally responds the same way whether or not the
      // email exists, so a request error here is a genuine failure (network,
      // validation), not "email not found" — that ambiguity is by design.
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-center">
        <p className="label-eyebrow">Check your inbox</p>
        <h1 className="mt-2 font-display text-2xl font-bold">Reset link sent</h1>
        <p className="mt-4 text-sm text-forge-600">
          If an account exists for <span className="font-medium text-forge-900">{email}</span>, a
          password reset link has been sent. The link expires in 1 hour.
        </p>
        <p className="mt-4 text-xs text-forge-500">
          Running this offline without SMTP configured? Ask your instructor to check the backend
          server console — the reset link is printed there too.
        </p>
        <Link to="/login" className="btn-secondary mt-6 inline-flex self-center">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="label-eyebrow">Reset your password</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Forgot password?</h1>
      <p className="mt-3 text-sm text-forge-600">
        Enter the email on your account and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 text-forge-900 outline-none focus:border-circuit-500"
            placeholder="you@college.edu"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-danger-500/30 bg-danger-100 px-3 py-2 text-sm text-danger-500">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-forge-600">
        Remembered it?{" "}
        <Link to="/login" className="text-circuit-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
