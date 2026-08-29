# Household Finance Tracker

Full-stack app for tracking household income and expenses.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Express + ES Modules |
| Database | PostgreSQL (Neon) |
| DevOps | Docker Compose (optional) |

## Project Structure

```
Finance-Tracker/
├── client/
│   └── my-app/      # React frontend
├── server/          # Express backend
├── docker-compose.yml
└── README.md
```

## Quick Start

### 1. Database (Neon)

1. Create a free project at https://neon.tech
2. Run `server/schema.sql` in Neon SQL Editor
3. Copy connection string to `server/.env`

### 2. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

API: http://localhost:4000

### 3. Frontend

```bash
cd client/my-app
npm install
npm run dev
```

App: http://localhost:5173

## API Endpoints

- `GET /health` — health check
- `GET /api/transactions` — list transactions
- `POST /api/transactions` — add transaction
- `DELETE /api/transactions/:id` — delete transaction

## Branch Strategy

- `main` — production
- `develop` — integration
- `feature/*` — feature branches

## Roadmap

| Sprint | Status |
|--------|--------|
| Sprint 0 | Project scaffold + transactions MVP |
| Sprint 1 | Auth + households |
| Sprint 2 | Categories |
| Sprint 3 | Dashboard reports |
| Sprint 4 | Budgets |
