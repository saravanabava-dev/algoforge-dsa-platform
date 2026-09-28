import express from "express";
import {
  getStats,
  listStudents,
  createTopic,
  updateTopic,
  deleteTopic,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/adminController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Every admin route requires a valid token. Staff and Admin both get
// monitoring/read access (stats, student roster); only Admin can create,
// edit, or delete course content — staff are monitors, not content owners.
router.use(protect, requireRole("admin", "staff"));

router.get("/stats", getStats);
router.get("/students", listStudents);

router.post("/topics", requireRole("admin"), createTopic);
router.patch("/topics/:slug", requireRole("admin"), updateTopic);
router.delete("/topics/:slug", requireRole("admin"), deleteTopic);

router.post("/problems", requireRole("admin"), createProblem);
router.patch("/problems/:slug", requireRole("admin"), updateProblem);
router.delete("/problems/:slug", requireRole("admin"), deleteProblem);

export default router;
