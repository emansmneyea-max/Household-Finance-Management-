import pool from "../config/db.js";

export async function findAll() {
  const result = await pool.query(
    "SELECT id, email, name, created_at FROM users ORDER BY id ASC"
  );
  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(
    "SELECT id, email, name, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function findByEmail(email) {
  const result = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

export async function create({ email, password_hash, name }) {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, name)
     VALUES ($1, $2, $3)
     RETURNING id, email, name, created_at`,
    [email, password_hash, name]
  );
  return result.rows[0];
}

export async function remove(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id, email, name, created_at",
    [id]
  );
  return result.rows[0];
}
