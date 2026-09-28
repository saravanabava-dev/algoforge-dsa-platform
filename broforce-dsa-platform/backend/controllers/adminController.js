import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";
import Progress from "../models/Progress.js";
import Submission from "../models/Submission.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// GET /api/admin/stats — overview cards + chart data
export const getStats = asyncHandler(async (req, res) => {
  const [
    totalStudents,
    totalTopics,
    totalProblems,
    progresses,
    submissions,
  ] = await Promise.all([
    User.countDocuments({ role: "student" }),
    Topic.countDocuments(),
    Problem.countDocuments(),
    Progress.find(),
    Submission.find().select("verdict createdAt"),
  ]);

  const activeSince = new Date();
  activeSince.setDate(activeSince.getDate() - 7);
  const activeStudents = await User.countDocuments({
    role: "student",
    lastActiveDate: { $gte: activeSince },
  });

  const problemsSolvedTotal = progresses.reduce((s, p) => s + p.problemsSolved.length, 0);
  const quizScores = progresses.filter((p) => p.quizBestScore !== null).map((p) => p.quizBestScore);
  const avgQuizScore = quizScores.length
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  // Topic completion chart: % of students who completed each topic
  const topics = await Topic.find().select("slug title order").sort("order");
  const totalStudentsForChart = totalStudents || 1;
  const topicCompletion = topics.map((t) => {
    const completedCount = progresses.filter(
      (p) => p.topicSlug === t.slug && p.completed
    ).length;
    return {
      topic: t.title,
      completionRate: Math.round((completedCount / totalStudentsForChart) * 100),
    };
  });

  // Problem difficulty distribution
  const problems = await Problem.find().select("difficulty");
  const difficultyDistribution = {
    Easy: problems.filter((p) => p.difficulty === "Easy").length,
    Medium: problems.filter((p) => p.difficulty === "Medium").length,
    Hard: problems.filter((p) => p.difficulty === "Hard").length,
  };

  // Submission verdict breakdown (proxy for "quiz performance" / judge health)
  const verdictBreakdown = submissions.reduce((acc, s) => {
    acc[s.verdict] = (acc[s.verdict] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalStudents,
    activeStudents,
    totalTopics,
    totalProblems,
    problemsSolvedTotal,
    avgQuizScore,
    topicCompletion,
    difficultyDistribution,
    verdictBreakdown,
  });
});

// GET /api/admin/students — roster with progress summary (College Mode)
export const listStudents = asyncHandler(async (req, res) => {
  const { department, batch } = req.query;
  const filter = { role: "student" };
  if (department) filter.department = department;
  if (batch) filter.batch = batch;

  const students = await User.find(filter).select(
    "name email department batch xp level streak createdAt"
  );

  const progresses = await Progress.find({
    userId: { $in: students.map((s) => s._id) },
  });

  const withProgress = students.map((s) => {
    const own = progresses.filter((p) => p.userId.toString() === s._id.toString());
    const avgProgress = own.length
      ? Math.round(own.reduce((sum, p) => sum + p.progressPercentage, 0) / own.length)
      : 0;
    const problemsSolved = own.reduce((sum, p) => sum + p.problemsSolved.length, 0);
    return { ...s.toObject(), avgProgress, problemsSolved };
  });

  res.json({ students: withProgress });
});

// ---- Topic CRUD ----

export const createTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.create(req.body);
  res.status(201).json({ topic });
});

export const updateTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!topic) return res.status(404).json({ message: "Topic not found" });
  res.json({ topic });
});

export const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findOneAndDelete({ slug: req.params.slug });
  if (!topic) return res.status(404).json({ message: "Topic not found" });
  await Problem.deleteMany({ topicSlug: req.params.slug });
  res.json({ message: "Topic and its problems deleted" });
});

// ---- Problem CRUD ----

export const createProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.create(req.body);
  res.status(201).json({ problem });
});

export const updateProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!problem) return res.status(404).json({ message: "Problem not found" });
  res.json({ problem });
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOneAndDelete({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: "Problem not found" });
  res.json({ message: "Problem deleted" });
});
