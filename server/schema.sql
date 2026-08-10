-- Minimal MVP: transactions table only
-- Run this in Neon SQL Editor or PostgreSQL

CREATE TABLE IF NOT EXISTS transactions (
  id          SERIAL PRIMARY KEY,
  amount      DECIMAL(10, 2) NOT NULL,
  type        VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  description VARCHAR(255),
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);
