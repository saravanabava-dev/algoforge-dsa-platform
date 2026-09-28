import express from "express";
import { getRuntimeStatus, SUPPORTED_LANGUAGES } from "../services/execution/index.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Public: the list of languages the platform knows how to run (used by the
// frontend language selector as a fallback before a specific problem loads).
router.get("/languages", (req, res) => {
  res.json({ languages: SUPPORTED_LANGUAGES });
});

// Admin only: live detection of which compilers/interpreters are actually
// installed on the machine running this backend. This is what Section 11 of
// the spec calls the "Runtime Status" panel — it never claims a runtime
// works if it isn't actually detected.
router.get(
  "/runtime-status",
  protect,
  requireRole("admin", "staff"),
  asyncHandler(async (req, res) => {
    const status = await getRuntimeStatus();
    res.json({ status });
  })
);

export default router;
