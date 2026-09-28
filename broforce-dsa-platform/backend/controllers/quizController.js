import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";
import Progress from "../models/Progress.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { awardXP, XP_RULES, evaluateBadges } from "../services/gamification.js";

// GET /api/topics/:slug/quiz — returns quiz questions WITHOUT correct answers
export const getQuiz = asyncHandler(async (req, res) => {
  const topic = await Topic.findOne({ slug: req.params.slug }).select("quiz title");
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  const questions = topic.quiz.map((q, idx) => ({
    index: idx,
    question: q.question,
    options: q.options,
  }));

  res.json({ topicTitle: topic.title, questions });
});

// POST /api/topics/:slug/quiz/submit — body: { answers: [selectedIndex, ...] }
export const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const topic = await Topic.findOne({ slug: req.params.slug });
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  if (!Array.isArray(answers) || answers.length !== topic.quiz.length) {
    return res.status(400).json({ message: "Answers must match the number of quiz questions" });
  }

  const results = topic.quiz.map((q, idx) => ({
    question: q.question,
    selectedIndex: answers[idx],
    correctIndex: q.correctIndex,
    correct: answers[idx] === q.correctIndex,
    explanation: q.explanation,
  }));

  const correctCount = results.filter((r) => r.correct).length;
  const score = Math.round((correctCount / topic.quiz.length) * 100);

  let progress = await Progress.findOne({ userId: req.user._id, topicSlug: topic.slug });
  if (!progress) {
    progress = new Progress({ userId: req.user._id, topicSlug: topic.slug });
  }

  progress.quizScore = score;
  const isFirstAttempt = progress.quizBestScore === null;
  progress.quizBestScore = Math.max(progress.quizBestScore || 0, score);

  const problemsTotal = await Problem.countDocuments({ topicSlug: topic.slug });
  progress.recalculate(problemsTotal);
  await progress.save();

  let xpAwarded = 0;
  if (isFirstAttempt) {
    xpAwarded = XP_RULES.COMPLETE_QUIZ;
    await awardXP(req.user._id, xpAwarded, `Quiz: ${topic.title} — ${correctCount}/${topic.quiz.length}`);
  }
  const newlyEarnedBadges = await evaluateBadges(req.user._id);

  res.json({ score, correctCount, total: topic.quiz.length, results, xpAwarded, newlyEarnedBadges });
});
