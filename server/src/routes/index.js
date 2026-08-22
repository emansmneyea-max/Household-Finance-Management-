import express from "express";
import healthRoutes from "./health.routes.js";
import transactionRoutes from "./transactions.routes.js";
import categoryRoutes from "./categories.routes.js";
import userRoutes from "./users.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/api/transactions", transactionRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/users", userRoutes);

export default router;