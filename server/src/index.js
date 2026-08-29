import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 4000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaSql = fs.readFileSync(
  path.join(__dirname, "..", "schema.sql"),
  "utf8"
);

async function start() {
  await pool.query(schemaSql);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
