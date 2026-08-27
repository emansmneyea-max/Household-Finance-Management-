import express from "express";
import healthRoutes from "./health.routes.js";
import transactionRoutes from "./transactions.routes.js";
import categoryRoutes from "./categories.routes.js";
import userRoutes from "./users.routes.js";
import authRoutes from "./auth.routes.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/api/transactions", transactionRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use(requireAuth);

export default router;