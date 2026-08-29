import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pool from "../src/config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaSql = fs.readFileSync(
  path.join(__dirname, "..", "schema.sql"),
  "utf8"
);

export async function resetDatabase() {
  await pool.query(schemaSql);
 await pool.query(
  "TRUNCATE TABLE transactions, categories, users RESTART IDENTITY CASCADE"
);
}

export async function closeDatabase() {
  await pool.end();
}
