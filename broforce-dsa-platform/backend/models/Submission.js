import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    problemSlug: { type: String, required: true, index: true },
    language: { type: String, required: true, default: "java" },
    code: { type: String, required: true },
    verdict: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "Runtime Error", "Pending"],
      default: "Pending",
    },
    passedCount: { type: Number, default: 0 },
    totalCount: { type: Number, default: 0 },
    results: [
      {
        input: String,
        expectedOutput: String,
        actualOutput: String,
        passed: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
