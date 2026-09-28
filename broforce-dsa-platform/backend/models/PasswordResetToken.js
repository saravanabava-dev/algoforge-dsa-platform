import mongoose from "mongoose";

// We store a SHA-256 hash of the reset token, never the raw token — the same
// principle as password hashing. The raw token only ever exists in the
// email/console output sent to the user and the URL they click.
const passwordResetTokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// MongoDB TTL index — expired tokens are automatically purged, so stale
// reset tokens don't accumulate forever.
passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("PasswordResetToken", passwordResetTokenSchema);
