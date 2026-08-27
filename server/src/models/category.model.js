


import pool from "../config/db.js";

export async function findAll(userId) {
  const result = await pool.query(
     "SELECT * FROM categories WHERE user_id = $1 ORDER BY name ASC",
     [userId]
  );
  return result.rows;
}


export async function create({ name, type,user_id }) {
  const result = await pool.query(
    `INSERT INTO categories (name, type,user_id)
     VALUES ($1, $2 ,$3)
     RETURNING *`,
    [name, type ,user_id]
  );
  return result.rows[0];
}
export async function findById(id, userId) {
  const result = await pool.query(
    "SELECT * FROM categories WHERE id = $1 AND user_id = $2",
    [id ,userId]
  );
  return result.rows[0];
}

export async function remove(id ,userId) {
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *",
    [id,userId]
  );
  return result.rows[0];
}