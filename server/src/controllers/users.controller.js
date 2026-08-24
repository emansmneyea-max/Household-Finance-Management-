import * as userModel from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getUserById(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function createUser(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "email, password, and name are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const trimmedName = String(name).trim();

    if (!normalizedEmail.includes("@")) {
      return res.status(400).json({ error: "email must be valid" });
    }

    if (String(password).length < 8) {
      return res.status(400).json({ error: "password must be at least 8 characters" });
    }

    const existing = await userModel.findByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: "email already exists" });
    }

    const user = await userModel.create({
      email: normalizedEmail,
      password_hash: await hashPassword(password),
      name: trimmedName,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const deleted = await userModel.remove(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted", user: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
