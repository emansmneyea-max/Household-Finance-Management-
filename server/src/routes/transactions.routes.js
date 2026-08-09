

import express from "express";
import { getAllTransactions } from "../controllers/transactions.controller.js";

const router = express.Router();

router.get("/", getAllTransactions);

export default router;