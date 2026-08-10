const API_BASE = "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

export function getHealth() {
  return request("/health");
}

export function getTransactions() {
  return request("/api/transactions");
}

export function createTransaction(data) {
  return request("/api/transactions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
