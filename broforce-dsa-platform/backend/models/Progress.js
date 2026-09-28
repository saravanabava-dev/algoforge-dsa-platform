import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    topicSlug: { type: String, required: true, index: true },

    theoryCompleted: { type: Boolean, default: false },
    visualizationCompleted: { type: Boolean, default: false },
    problemsSolved: [{ type: String }], // problem slugs
    quizScore: { type: Number, default: null }, // out of 100, null = not attempted
    quizBestScore: { type: Number, default: null },

    progressPercentage: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, topicSlug: 1 }, { unique: true });

// Weighted completion: theory 20%, visualization 20%, problems 40%, quiz 20%.
// problemsTotal is passed in by the caller since it depends on how many
// problems the topic actually has.
progressSchema.methods.recalculate = function recalculate(problemsTotal) {
  const theoryPart = this.theoryCompleted ? 20 : 0;
  const visPart = this.visualizationCompleted ? 20 : 0;
  const problemsPart = problemsTotal > 0
    ? Math.round((this.problemsSolved.length / problemsTotal) * 40)
    : 0;
  const quizPart = this.quizBestScore ? Math.round((this.quizBestScore / 100) * 20) : 0;

  this.progressPercentage = Math.min(100, theoryPart + visPart + problemsPart + quizPart);
  this.completed = this.progressPercentage >= 100;
  return this.progressPercentage;
};

export default mongoose.model("Progress", progressSchema);
