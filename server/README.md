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

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/health` | Server health check |
| GET | `/api` | API info |
| GET | `/api/transactions` | List all transactions |
| GET | `/api/transactions/:id` | Get one transaction |
| POST | `/api/transactions` | Create transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

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
