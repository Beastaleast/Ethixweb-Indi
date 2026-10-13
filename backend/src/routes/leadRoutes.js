
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createLead } from "../controllers/leadController.js";

const router = Router();

const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many submissions. Please try again later.",
  },
});

router.post("/", leadSubmissionLimiter, createLead);

export default router;
