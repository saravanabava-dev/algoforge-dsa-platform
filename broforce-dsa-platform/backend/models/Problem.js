import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    hidden: { type: Boolean, default: false }, // hidden test cases aren't shown to the student
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    topicSlug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },

    statement: { type: String, required: true },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    constraints: [{ type: String }],
    hints: [{ type: String }],

    // Per-language starter code. Only languages with a non-empty entry are
    // offered to students for this problem — the frontend reads this map to
    // decide which language options to show, rather than faking empty
    // templates for languages that haven't been authored yet.
    starterCode: {
      java: { type: String, default: "" },
      python: { type: String, default: "" },
      c: { type: String, default: "" },
      cpp: { type: String, default: "" },
      javascript: { type: String, default: "" },
    },
    testCases: [testCaseSchema],

    // Reference/expected outputs are matched string-wise by the local
    // multi-language execution engine (see services/execution/index.js) —
    // no external code execution API involved for any supported language.
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);
