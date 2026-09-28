import mongoose from "mongoose";

// A Topic is one roadmap node, e.g. "Stack", "Sorting", "Trees".
// It carries the full learning content inline (theory/visual/code/complexity)
// rather than splitting into a separate "lessons" collection, since in
// practice each topic has exactly one lesson body — this keeps queries to
// a single round trip for the whole learning page.
const complexitySchema = new mongoose.Schema(
  {
    time: { type: String, default: "" },
    space: { type: String, default: "" },
    best: { type: String, default: "" },
    average: { type: String, default: "" },
    worst: { type: String, default: "" },
  },
  { _id: false }
);

const codeExampleSchema = new mongoose.Schema(
  {
    language: { type: String, default: "java" },
    code: { type: String, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const topicSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // e.g. "stack"
    title: { type: String, required: true }, // e.g. "Stack"
    module: { type: String, required: true }, // e.g. "MODULE 5 — STACK"
    order: { type: Number, required: true }, // position in the roadmap

    whatIsIt: { type: String, default: "" },
    whyNeeded: { type: String, default: "" },
    howItWorks: { type: String, default: "" },
    example: { type: String, default: "" },

    // Which reusable visualizer component renders this topic's
    // "Visualize" tab, e.g. "StackVisualizer", "SortingVisualizer".
    visualizerType: { type: String, required: true },

    codeExamples: [codeExampleSchema],
    complexity: complexitySchema,

    prerequisites: [{ type: String }], // slugs of prerequisite topics

    // Quick quiz shown inside the "Quiz" tab of the topic.
    quiz: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
        explanation: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
