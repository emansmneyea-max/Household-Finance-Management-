import { requireAuth } from "../middleware/auth.js";
import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);


export default router;