import * as transactionModel from "../models/transaction.model.js";

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

function parseAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return amount;
}

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
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid transaction id" });
    }

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

    if (amount == null || amount === "" || !type) {
      return res.status(400).json({ error: "amount and type are required" });
    }

    const parsedAmount = parseAmount(amount);
    if (!parsedAmount) {
      return res.status(400).json({ error: "amount must be a positive number" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "type must be income or expense" });
    }

    const transaction = await transactionModel.create({
      amount: parsedAmount,
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


export async function updateTransaction(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid transaction id" });
    }

    const { amount, type, description, date } = req.body;

    if (amount == null || amount === "" || !type) {
      return res.status(400).json({ error: "amount and type are required" });
    }

    const parsedAmount = parseAmount(amount);
    if (!parsedAmount) {
      return res.status(400).json({ error: "amount must be a positive number" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "type must be income or expense" });
    }

    const transaction = await transactionModel.update(id, {
      amount: parsedAmount,
      type,
      description,
      date,
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid transaction id" });
    }

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
