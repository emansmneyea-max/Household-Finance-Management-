# Household Finance Tracker — Frontend (Client)

React + Vite client application for the Finance Tracker project.

## Run

```bash
# Start backend first (server folder)
cd ../server
npm run dev

# Then start frontend
cd ../my-app
npm install
npm run dev
```

Open http://localhost:5173

## Structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Root component
├── pages/Dashboard.jsx   # Main page (state + logic)
├── components/           # UI components
├── services/api.js       # Backend API calls
└── utils/format.js       # Format money and dates
```

## Features

- View income, expenses, and balance
- Add transactions (POST)
- Delete transactions (DELETE)
- API connection status indicator
