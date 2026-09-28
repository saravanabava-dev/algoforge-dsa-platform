import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api.js";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { email, token, newPassword });
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  }

  if (!token || !email) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-center">
        <p className="font-display text-2xl font-bold text-danger-500">Invalid reset link</p>
        <p className="mt-3 text-sm text-forge-600">
          This link is missing required information. Please request a new password reset.
        </p>
        <Link to="/forgot-password" className="btn-primary mt-6 inline-flex self-center">
          Request new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-center">
        <p className="font-display text-2xl font-bold text-success-600">Password reset ✓</p>
        <p className="mt-3 text-sm text-forge-600">Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="label-eyebrow">Almost done</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Set a new password</h1>
      <p className="mt-3 text-sm text-forge-600">Resetting password for {email}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">New password</label>
          <input
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 text-forge-900 outline-none focus:border-circuit-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-forge-700">Confirm new password</label>
          <input
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-forge-300 bg-forge-100 px-4 py-2.5 text-forge-900 outline-none focus:border-circuit-500"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-danger-500/30 bg-danger-100 px-3 py-2 text-sm text-danger-500">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
