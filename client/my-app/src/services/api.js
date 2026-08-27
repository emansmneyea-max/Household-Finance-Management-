/**
 * API service — single place for all HTTP calls to the Express backend.
 *
 * Vite proxies /api and /health → http://localhost:4000
 * so we use relative paths (no hardcoded host).
 *
 * Backend contract (server/schema.sql + Express routes):
 *   transactions: id, amount, type ('income'|'expense'), description, date, category_id, created_at
 */

const API_BASE = "";

const TOKEN_KEY = "token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

/** GET /health → { status, message } */
export function getHealth() {
  return request("/health");
}

/** GET /api/transactions → Transaction[] */
export function getTransactions() {
  return request("/api/transactions");
}

/** GET /api/transactions/:id → Transaction */
export function getTransactionById(id) {
  return request(`/api/transactions/${id}`);
}

/**
 * POST /api/transactions
 * Body: { amount, type: 'income'|'expense', description?, date?, category_id? }
 * → created Transaction (201)
 */
export function createTransaction(data) {
  return request("/api/transactions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function updateTransaction(id, data) {
  return request(`/api/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE /api/transactions/:id
 * → { message, transaction }
 */
export function deleteTransaction(id) {
  return request(`/api/transactions/${id}`, {
    method: "DELETE",
  });
}

/** GET /api/categories → Category[] */
export function getCategories() {
  return request("/api/categories");
}

/**
 * POST /api/categories
 * Body: { name, type: 'income'|'expense' }
 * → created Category (201)
 */
export function createCategory(data) {
  return request("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE /api/categories/:id
 * → { message, category }
 */
export function deleteCategory(id) {
  return request(`/api/categories/${id}`, {
    method: "DELETE",
  });
}


export async function login(email, password) {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
}
export async function register(name, email, password) {
  await request("/api/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return login(email, password);
}
