import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";
import User from "../models/User.js";
import { SUPPORTED_LANGUAGES } from "../services/execution/index.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// Public, unauthenticated endpoint. Backs the landing page's statistics —
// deliberately real database counts rather than hardcoded marketing numbers,
// per the "do not fake statistics" requirement. Numbers will look modest on
// a fresh install; that's honest, and grows as content/seed data grows.
export const getPlatformStats = asyncHandler(async (req, res) => {
  const [topicsCount, problemsCount, studentsCount] = await Promise.all([
    Topic.countDocuments(),
    Problem.countDocuments(),
    User.countDocuments({ role: "student" }),
  ]);

  res.json({
    topicsCount,
    problemsCount,
    studentsCount,
    languagesCount: SUPPORTED_LANGUAGES.length,
    languages: SUPPORTED_LANGUAGES.map((l) => l.label),
  });
});
