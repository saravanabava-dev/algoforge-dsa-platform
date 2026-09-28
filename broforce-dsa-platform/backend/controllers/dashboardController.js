import Topic from "../models/Topic.js";
import Progress from "../models/Progress.js";
import Problem from "../models/Problem.js";
import Activity from "../models/Activity.js";
import Badge from "../models/Badge.js";
import UserBadge from "../models/UserBadge.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// GET /api/dashboard — everything the student dashboard needs in one call
export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [topics, progresses, activities, earnedBadges, allBadges, totalProblems] =
    await Promise.all([
      Topic.find().select("slug title order").sort("order"),
      Progress.find({ userId }),
      Activity.find({ userId }).sort("-createdAt").limit(8),
      UserBadge.find({ userId }),
      Badge.find(),
      Problem.countDocuments(),
    ]);

  const progressBySlug = Object.fromEntries(progresses.map((p) => [p.topicSlug, p]));

  const overallProgress = topics.length
    ? Math.round(
        topics.reduce((sum, t) => sum + (progressBySlug[t.slug]?.progressPercentage || 0), 0) /
          topics.length
      )
    : 0;

  const topicsCompleted = progresses.filter((p) => p.completed).length;
  const problemsSolved = progresses.reduce((sum, p) => sum + p.problemsSolved.length, 0);
  const quizScores = progresses.filter((p) => p.quizBestScore !== null).map((p) => p.quizBestScore);
  const avgQuizScore = quizScores.length
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  // "Continue learning": first topic that's started but not completed,
  // falling back to the first not-yet-started topic.
  const inProgress = topics.find((t) => {
    const p = progressBySlug[t.slug];
    return p && p.progressPercentage > 0 && !p.completed;
  });
  const notStarted = topics.find((t) => !progressBySlug[t.slug]);
  const continueLearning = inProgress || notStarted || null;

  const earnedCodes = new Set(earnedBadges.map((b) => b.badgeCode));
  const badges = allBadges.map((b) => ({
    code: b.code,
    name: b.name,
    icon: b.icon,
    description: b.description,
    earned: earnedCodes.has(b.code),
  }));

  res.json({
    user: {
      name: req.user.name,
      xp: req.user.xp,
      level: req.user.level,
      streak: req.user.streak,
    },
    overallProgress,
    topicsCompleted,
    topicsTotal: topics.length,
    problemsSolved,
    problemsTotal: totalProblems,
    avgQuizScore,
    continueLearning: continueLearning
      ? {
          slug: continueLearning.slug,
          title: continueLearning.title,
          progressPercentage: progressBySlug[continueLearning.slug]?.progressPercentage || 0,
        }
      : null,
    recentActivity: activities.map((a) => ({
      type: a.type,
      message: a.message,
      xpEarned: a.xpEarned,
      at: a.createdAt,
    })),
    badges,
  });
});
