import * as categoryModel from "../models/category.model.js";

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

export async function getAllCategories(req, res) {
  try {
    const categories = await categoryModel.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function createCategory(req, res) {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: "name and type are required" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "type must be income or expense" });
    }

    const category = await categoryModel.create({
      name: name.trim(),
      type,
    });

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function getCategoryById(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid category id" });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function deleteCategory(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid category id" });
    }

    const deleted = await categoryModel.remove(id);
    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted", category: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}