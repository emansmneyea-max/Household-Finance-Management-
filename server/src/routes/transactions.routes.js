import express from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactions.controller.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;
