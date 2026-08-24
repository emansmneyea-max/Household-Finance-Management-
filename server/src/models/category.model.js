


import pool from "../config/db.js";

export async function findAll() {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY name ASC"
  );
  return result.rows;
}


export async function create({ name, type }) {
  const result = await pool.query(
    `INSERT INTO categories (name, type)
     VALUES ($1, $2)
     RETURNING *`,
    [name, type]
  );
  return result.rows[0];
}
export async function findById(id) {
  const result = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function remove(id) {
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}