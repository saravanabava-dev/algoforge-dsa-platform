import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["student", "staff", "admin"], default: "student" },

    // College Mode fields — optional so the platform still works for a single college
    // or standalone users without forcing this data in.
    college: { type: String, default: "" },
    department: { type: String, default: "" },
    batch: { type: String, default: "" },

    // Gamification
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },

    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Simple level curve: every 500 XP is a new level, capped conceptually at 5
// named levels (Beginner -> DSA Master) as per the product spec.
userSchema.methods.recalculateLevel = function recalculateLevel() {
  this.level = Math.min(5, Math.floor(this.xp / 500) + 1);
  return this.level;
};

export default mongoose.model("User", userSchema);
