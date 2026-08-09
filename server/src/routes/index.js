

import express from "express";
import healthRoutes from "./health.routes.js";
import transactionRoutes from "./transactions.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/api/transactions", transactionRoutes);

export default router;