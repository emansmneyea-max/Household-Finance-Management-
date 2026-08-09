

import pool from "../config/db.js";

export async function findAll() {
  const result = await pool.query(
    "SELECT * FROM transactions ORDER BY date DESC"
  );
  return result.rows;
}