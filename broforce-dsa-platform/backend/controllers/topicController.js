import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";
import Progress from "../models/Progress.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// GET /api/topics — roadmap listing (lightweight fields only)
export const listTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find()
    .select("slug title module order visualizerType prerequisites")
    .sort("order");
  res.json({ topics });
});

// GET /api/topics/:slug — full learning page content
export const getTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findOne({ slug: req.params.slug });
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  const problems = await Problem.find({ topicSlug: topic.slug }).select(
    "slug title difficulty"
  );

  res.json({ topic, problems });
});

// GET /api/topics/:slug/progress — the current user's progress on this topic
export const getTopicProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.findOne({
    userId: req.user._id,
    topicSlug: req.params.slug,
  });
  res.json({
    progress: progress || {
      theoryCompleted: false,
      visualizationCompleted: false,
      problemsSolved: [],
      quizScore: null,
      quizBestScore: null,
      progressPercentage: 0,
      completed: false,
    },
  });
});

// PATCH /api/topics/:slug/progress — mark theory/visualization complete
export const updateTopicProgress = asyncHandler(async (req, res) => {
  const { theoryCompleted, visualizationCompleted } = req.body;
  const topicSlug = req.params.slug;

  const topic = await Topic.findOne({ slug: topicSlug });
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  let progress = await Progress.findOne({ userId: req.user._id, topicSlug });
  if (!progress) {
    progress = new Progress({ userId: req.user._id, topicSlug });
  }

  if (typeof theoryCompleted === "boolean") progress.theoryCompleted = theoryCompleted;
  if (typeof visualizationCompleted === "boolean")
    progress.visualizationCompleted = visualizationCompleted;

  const problemsTotal = await Problem.countDocuments({ topicSlug });
  progress.recalculate(problemsTotal);
  await progress.save();

  res.json({ progress });
});
