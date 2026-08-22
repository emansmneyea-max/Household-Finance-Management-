# Household Finance — Backend API

Express + PostgreSQL (Neon) REST API for household finance tracking.

## Structure

```
server/
├── src/
│   ├── index.js              # Starts the server
│   ├── app.js                # Express app + middleware
│   ├── config/db.js          # PostgreSQL connection (Neon)
│   ├── models/               # SQL queries
│   ├── controllers/          # Request/response logic
│   ├── routes/               # API endpoints
│   └── middleware/           # 404 + error handling
├── tests/                    # API integration tests
├── schema.sql                # Database schema
├── .env                      # Secrets (not in Git)
└── package.json
```

## Setup

```bash
cd server
cp .env.example .env
# Edit .env with your Neon DATABASE_URL
npm install
npm run dev
```

API runs at http://localhost:4000

## Tests

API tests hit Express and a real Postgres database. They **truncate** `transactions`, `categories`, and `users`, so use a dedicated URL in `TEST_DATABASE_URL` — not your production Neon database.

```bash
# Optional local DB from the repo root:
docker compose up -d

cd server
# Set TEST_DATABASE_URL in .env (see .env.example)
npm test
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/health` | Server health check |
| GET | `/api` | API info |
| GET | `/api/transactions` | List all transactions |
| GET | `/api/transactions/:id` | Get one transaction |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:id` | Get one category |
| POST | `/api/categories` | Create category |
| DELETE | `/api/categories/:id` | Delete category |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get one user |
| POST | `/api/users` | Create user |
| DELETE | `/api/users/:id` | Delete user |

### POST body example

```json
{
  "amount": 45.50,
  "type": "expense",
  "description": "Groceries",
  "date": "2026-08-10"
}
```

## Database

Run `schema.sql` in Neon SQL Editor to create the `transactions` table.
