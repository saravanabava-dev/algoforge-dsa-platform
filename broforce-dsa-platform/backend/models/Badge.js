import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g. "FIRST_PROBLEM"
  name: { type: String, required: true }, // e.g. "First Problem"
  icon: { type: String, required: true }, // emoji, e.g. "🔥"
  description: { type: String, required: true },
  criteria: { type: String, required: true }, // human readable, evaluated in services/gamification.js
});

export default mongoose.model("Badge", badgeSchema);
