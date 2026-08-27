import * as transactionModel from "../models/transaction.model.js";
import * as categoryModel from "../models/category.model.js";

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

function parseAmount(value,) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return amount;
}

async function parseCategoryId(value, userId) {
  if (value == null || value === "") {
    return { ok: true, id: null };
  }

  const id = parseId(value);
  if (!id) {
    return { ok: false, error: "Invalid category id" };
  }

  const category = await categoryModel.findById(id ,userId);
  if (!category) {
    return { ok: false, error: "Category not found" };
  }

  return { ok: true, id };
}

export async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionModel.findAll(req.user.userId);
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

    const transaction = await transactionModel.findById(id,req.user.userId);

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
    const { amount, type, description, date, category_id } = req.body;

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

    const categoryId = await parseCategoryId(category_id, req.user.userId,);
    if (!categoryId.ok) {
      return res.status(400).json({ error: categoryId.error });
    }

    const transaction = await transactionModel.create({
      amount: parsedAmount,
      type,
      description,
      date,
      category_id: categoryId.id,
      user_id: req.user.userId,
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

    const { amount, type, description, date, category_id } = req.body;

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

    const categoryId = await parseCategoryId(category_id,req.user.userId);
    if (!categoryId.ok) {
      return res.status(400).json({ error: categoryId.error });
    }

    const transaction = await transactionModel.update(id, {
      amount: parsedAmount,
      type,
      description,
      date,
      category_id: categoryId.id,
    }, req.user.userId);
    

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

    const deleted = await transactionModel.remove(id, req.user.userId);

    if (!deleted) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted", transaction: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
