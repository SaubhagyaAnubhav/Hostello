import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard-stats", protect, adminOnly, getDashboardStats);

export default router;