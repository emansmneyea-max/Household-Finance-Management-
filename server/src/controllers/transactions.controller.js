
import * as transactionModel from "../models/transaction.model.js";

export async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionModel.findAll();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}