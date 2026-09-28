import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: {
      type: String,
      enum: ["problem_solved", "topic_completed", "quiz_taken", "badge_earned", "streak"],
      required: true,
    },
    message: { type: String, required: true }, // e.g. "Solved: Binary Search"
    xpEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
