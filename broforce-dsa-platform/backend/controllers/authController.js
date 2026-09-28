import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { touchStreak } from "../services/gamification.js";
import { sendPasswordResetEmail } from "../services/mailer.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function sanitize(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    college: user.college,
    department: user.department,
    batch: user.batch,
    xp: user.xp,
    level: user.level,
    streak: user.streak,
    isDemo: user.isDemo,
  };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, college, department, batch } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    college,
    department,
    batch,
  });

  const token = signToken(user);
  res.status(201).json({ token, user: sanitize(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  await touchStreak(user._id);

  const token = signToken(user);
  res.json({ token, user: sanitize(user) });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: sanitize(req.user) });
});

function hashToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

// POST /api/auth/forgot-password — always responds the same way whether or
// not the email exists, so the endpoint can't be used to enumerate
// registered accounts.
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const genericResponse = {
    message: "If an account exists for that email, a password reset link has been sent.",
  };

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.json(genericResponse);

  // Invalidate any previous outstanding tokens for this user before issuing
  // a new one, so only the most recent reset link is ever valid.
  await PasswordResetToken.deleteMany({ userId: user._id, used: false });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await PasswordResetToken.create({
    userId: user._id,
    tokenHash: hashToken(rawToken),
    expiresAt,
  });

  const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
  const resetUrl = `${clientOrigin}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;

  await sendPasswordResetEmail(user.email, resetUrl);

  res.json(genericResponse);
});

// POST /api/auth/reset-password — body: { email, token, newPassword }
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) {
    return res.status(400).json({ message: "Email, token and new password are required" });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(400).json({ message: "Invalid or expired reset link" });

  const tokenHash = hashToken(token);
  const resetToken = await PasswordResetToken.findOne({
    userId: user._id,
    tokenHash,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!resetToken) {
    return res.status(400).json({ message: "Invalid or expired reset link" });
  }

  user.password = newPassword; // re-hashed by the User model's pre-save hook
  await user.save();

  resetToken.used = true;
  await resetToken.save();

  // Any other outstanding tokens for this user are now moot.
  await PasswordResetToken.deleteMany({ userId: user._id, used: false });

  res.json({ message: "Password reset successfully. You can now log in with your new password." });
});
