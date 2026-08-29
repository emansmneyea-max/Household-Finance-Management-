import express from "express";
import { requireAuth } from "../middleware/auth.js";

import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}
 from "../controllers/transactions.controller.js";
const router = express.Router();
router.use(requireAuth);

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
