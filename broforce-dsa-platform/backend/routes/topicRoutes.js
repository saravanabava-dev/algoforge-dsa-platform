import express from "express";
import {
  listTopics,
  getTopic,
  getTopicProgress,
  updateTopicProgress,
} from "../controllers/topicController.js";
import { getQuiz, submitQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", listTopics);
router.get("/:slug", getTopic);
router.get("/:slug/progress", protect, getTopicProgress);
router.patch("/:slug/progress", protect, updateTopicProgress);
router.get("/:slug/quiz", protect, getQuiz);
router.post("/:slug/quiz/submit", protect, submitQuiz);

export default router;
