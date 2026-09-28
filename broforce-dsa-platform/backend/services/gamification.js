import User from "../models/User.js";
import Progress from "../models/Progress.js";
import Submission from "../models/Submission.js";
import UserBadge from "../models/UserBadge.js";
import Activity from "../models/Activity.js";

export const XP_RULES = {
  READ_TOPIC: 10,
  COMPLETE_VISUALIZATION: 15,
  SOLVE_EASY: 20,
  SOLVE_MEDIUM: 35,
  SOLVE_HARD: 50,
  COMPLETE_QUIZ: 15,
  DAILY_LOGIN: 5,
};

// Awards XP, recalculates level, logs an activity entry. Returns the
// updated user document.
export async function awardXP(userId, amount, message) {
  const user = await User.findById(userId);
  if (!user) return null;

  user.xp += amount;
  user.recalculateLevel();
  await user.save();

  await Activity.create({ userId, type: "problem_solved", message, xpEarned: amount });
  return user;
}

// Called once per day the user is active. Increments streak if the last
// active day was yesterday, resets to 1 if there was a gap, no-ops if
// already recorded today.
export async function touchStreak(userId) {
  const user = await User.findById(userId);
  if (!user) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastActiveDate) {
    const last = new Date(user.lastActiveDate);
    last.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return user; // already counted today
    } else if (diffDays === 1) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
  } else {
    user.streak = 1;
  }

  user.lastActiveDate = today;
  await user.save();
  return user;
}

// Badge criteria are evaluated here rather than stored as executable code,
// keeping the Badge collection pure data (safe to seed/edit without touching
// server logic).
const BADGE_EVALUATORS = {
  FIRST_PROBLEM: async (userId) => {
    const count = await Submission.countDocuments({ userId, verdict: "Accepted" });
    return count >= 1;
  },
  RECURSION_MASTER: async (userId) => {
    const p = await Progress.findOne({ userId, topicSlug: "recursion" });
    return !!p?.completed;
  },
  TREE_EXPLORER: async (userId) => {
    const p = await Progress.findOne({ userId, topicSlug: "trees" });
    return !!p?.completed;
  },
  BITWISE_BEGINNER: async (userId) => {
    const p = await Progress.findOne({ userId, topicSlug: "bitwise-algorithms" });
    return !!p?.completed;
  },
  GRAPH_MASTER: async (userId) => {
    const p = await Progress.findOne({ userId, topicSlug: "graph" });
    return !!p?.completed;
  },
  DSA_WARRIOR: async (userId) => {
    const completedCount = await Progress.countDocuments({ userId, completed: true });
    return completedCount >= 10;
  },
};

// Checks all badge criteria for a user and awards any newly-earned badges.
// Returns the list of badge codes newly earned in this call.
export async function evaluateBadges(userId) {
  const alreadyEarned = new Set(
    (await UserBadge.find({ userId })).map((ub) => ub.badgeCode)
  );
  const newlyEarned = [];

  for (const [code, evaluator] of Object.entries(BADGE_EVALUATORS)) {
    if (alreadyEarned.has(code)) continue;
    const earned = await evaluator(userId);
    if (earned) {
      await UserBadge.create({ userId, badgeCode: code });
      await Activity.create({
        userId,
        type: "badge_earned",
        message: `Earned badge: ${code.replace(/_/g, " ")}`,
        xpEarned: 0,
      });
      newlyEarned.push(code);
    }
  }

  return newlyEarned;
}

export function xpForDifficulty(difficulty) {
  if (difficulty === "Easy") return XP_RULES.SOLVE_EASY;
  if (difficulty === "Medium") return XP_RULES.SOLVE_MEDIUM;
  return XP_RULES.SOLVE_HARD;
}
