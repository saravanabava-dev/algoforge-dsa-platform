import express from "express";
import {
  listProblems,
  getProblem,
  runProblem,
  submitProblem,
  markProblemComplete,
} from "../controllers/problemController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, listProblems);
router.get("/:slug", getProblem);
router.post("/:slug/complete", protect, markProblemComplete);
// /run and /submit remain available (the local execution engine is fully
// functional and verified) but the current Practice UI no longer calls
// them, per product direction — the code panel is read-only/structural now.
router.post("/:slug/run", protect, runProblem);
router.post("/:slug/submit", protect, submitProblem);

export default router;
