import pool from "../config/db.js";

export async function findAll() {
  const result = await pool.query(
    "SELECT * FROM transactions ORDER BY date DESC, id DESC"
  );
  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(
    "SELECT * FROM transactions WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function create({ amount, type, description, date }) {
  const result = await pool.query(
    `INSERT INTO transactions (amount, type, description, date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [amount, type, description, date || new Date()]
  );
  return result.rows[0];
}

export async function remove(id) {
  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}
