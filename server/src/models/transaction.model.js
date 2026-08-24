import pool from "../config/db.js";

const SELECT_WITH_CATEGORY = `
  SELECT
    t.id,
    t.amount,
    t.type,
    t.description,
    t.date,
    t.created_at,
    t.category_id,
    c.name AS category_name
  FROM transactions t
  LEFT JOIN categories c ON c.id = t.category_id
`;

export async function findAll() {
  const result = await pool.query(
    `${SELECT_WITH_CATEGORY} ORDER BY t.date DESC`
  );
  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(
    `${SELECT_WITH_CATEGORY} WHERE t.id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function create({ amount, type, description, date, category_id }) {
  const result = await pool.query(
    `INSERT INTO transactions (amount, type, description, date, category_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [amount, type, description, date || new Date(), category_id || null]
  );
  return findById(result.rows[0].id);
}

export async function update(id, { amount, type, description, date, category_id }) {
  const result = await pool.query(
    `UPDATE transactions
     SET amount = $1, type = $2, description = $3, date = $4, category_id = $5
     WHERE id = $6
     RETURNING id`,
    [amount, type, description, date, category_id || null, id]
  );

  if (!result.rows[0]) {
    return undefined;
  }

  return findById(result.rows[0].id);
}

export async function remove(id) {
  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}
