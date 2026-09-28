import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";
import Progress from "../models/Progress.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { runSubmission as executeCode, SUPPORTED_LANGUAGES } from "../services/execution/index.js";
import { awardXP, xpForDifficulty, evaluateBadges } from "../services/gamification.js";
import Activity from "../models/Activity.js";

// GET /api/problems?topic=stack&difficulty=Easy&status=solved
export const listProblems = asyncHandler(async (req, res) => {
  const { topic, difficulty } = req.query;
  const filter = {};
  if (topic) filter.topicSlug = topic;
  if (difficulty) filter.difficulty = difficulty;

  const problems = await Problem.find(filter).select(
    "slug title difficulty topicSlug"
  );

  let solvedSlugs = new Set();
  if (req.user) {
    const progresses = await Progress.find({ userId: req.user._id });
    progresses.forEach((p) => p.problemsSolved.forEach((s) => solvedSlugs.add(s)));
  }

  const withStatus = problems.map((p) => ({
    ...p.toObject(),
    solved: solvedSlugs.has(p.slug),
  }));

  res.json({ problems: withStatus });
});

// Languages this specific problem actually has a starter template for.
// Drives the frontend's language selector — we never offer a language with
// no authored template, since that would silently hand the student an empty
// editor pretending to be a real starting point.
function availableLanguages(problem) {
  return SUPPORTED_LANGUAGES.filter((lang) => (problem.starterCode?.[lang.id] || "").trim().length > 0);
}

// GET /api/problems/:slug — full problem detail (test cases stripped of hidden ones)
export const getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: "Problem not found" });

  const visibleTestCases = problem.testCases.filter((tc) => !tc.hidden);
  res.json({
    problem: {
      ...problem.toObject(),
      testCases: visibleTestCases,
    },
    availableLanguages: availableLanguages(problem),
  });
});

// POST /api/problems/:slug/complete — self-reported completion, no judge involved.
// The product's Practice pages show code structure to read/learn from rather
// than an executable judge (see services/execution/index.js — the engine
// itself is untouched and still backs the /run and /submit routes below for
// any future use, but the UI no longer calls them). This endpoint lets a
// student mark a problem as done and earn the same XP/progress credit,
// honestly labeled in the UI as self-reported rather than verified.
export const markProblemComplete = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: "Problem not found" });

  let progress = await Progress.findOne({ userId: req.user._id, topicSlug: problem.topicSlug });
  if (!progress) {
    progress = new Progress({ userId: req.user._id, topicSlug: problem.topicSlug });
  }

  const alreadySolved = progress.problemsSolved.includes(problem.slug);
  let xpAwarded = 0;
  let newlyEarnedBadges = [];

  if (!alreadySolved) {
    progress.problemsSolved.push(problem.slug);
    const problemsTotal = await Problem.countDocuments({ topicSlug: problem.topicSlug });
    progress.recalculate(problemsTotal);
    await progress.save();

    xpAwarded = xpForDifficulty(problem.difficulty);
    await awardXP(req.user._id, xpAwarded, `Completed: ${problem.title}`);
    newlyEarnedBadges = await evaluateBadges(req.user._id);
  }

  res.json({ alreadyCompleted: alreadySolved, xpAwarded, newlyEarnedBadges });
});

// POST /api/problems/:slug/run — run against visible test cases only, no persistence
export const runProblem = asyncHandler(async (req, res) => {
  const { code, language } = req.body;
  if (!code) return res.status(400).json({ message: "Code is required" });
  if (!language) return res.status(400).json({ message: "Language is required" });

  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: "Problem not found" });
  if (!(problem.starterCode?.[language] || "").trim()) {
    return res.status(400).json({ message: `${language} is not available for this problem yet` });
  }

  const visibleTestCases = problem.testCases.filter((tc) => !tc.hidden);
  const result = await executeCode(language, code, visibleTestCases);
  res.json(result);
});

// POST /api/problems/:slug/submit — run against ALL test cases, persist, award XP/progress
export const submitProblem = asyncHandler(async (req, res) => {
  const { code, language } = req.body;
  if (!code) return res.status(400).json({ message: "Code is required" });
  if (!language) return res.status(400).json({ message: "Language is required" });

  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: "Problem not found" });
  if (!(problem.starterCode?.[language] || "").trim()) {
    return res.status(400).json({ message: `${language} is not available for this problem yet` });
  }

  const result = await executeCode(language, code, problem.testCases);

  const submission = await Submission.create({
    userId: req.user._id,
    problemSlug: problem.slug,
    language,
    code,
    verdict: result.verdict,
    passedCount: result.passedCount,
    totalCount: result.totalCount,
    results: result.results,
  });

  let xpAwarded = 0;
  let newlyEarnedBadges = [];

  if (result.verdict === "Accepted") {
    let progress = await Progress.findOne({
      userId: req.user._id,
      topicSlug: problem.topicSlug,
    });
    if (!progress) {
      progress = new Progress({ userId: req.user._id, topicSlug: problem.topicSlug });
    }

    const alreadySolved = progress.problemsSolved.includes(problem.slug);
    if (!alreadySolved) {
      progress.problemsSolved.push(problem.slug);
      const problemsTotal = await Problem.countDocuments({ topicSlug: problem.topicSlug });
      progress.recalculate(problemsTotal);
      await progress.save();

      xpAwarded = xpForDifficulty(problem.difficulty);
      await awardXP(req.user._id, xpAwarded, `Solved: ${problem.title}`);
      newlyEarnedBadges = await evaluateBadges(req.user._id);
    }
  }

  res.json({ submission, xpAwarded, newlyEarnedBadges, systemMessage: result.systemMessage });
});
