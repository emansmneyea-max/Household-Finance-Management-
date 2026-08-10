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

export async function getTransactionById(req, res) {
  try {
    const id = Number(req.params.id);
    const transaction = await transactionModel.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { amount, type, description, date } = req.body;

    if (!amount || !type) {
      return res.status(400).json({ error: "amount and type are required" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "type must be income or expense" });
    }

    const transaction = await transactionModel.create({
      amount,
      type,
      description,
      date,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const id = Number(req.params.id);
    const deleted = await transactionModel.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted", transaction: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
