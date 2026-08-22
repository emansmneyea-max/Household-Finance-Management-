import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/api", (req, res) => {
  res.json({
    message: "Household Finance Management API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      transactions: "GET /api/transactions",
      createTransaction: "POST /api/transactions",
      updateTransaction: "PUT /api/transactions/:id",
      getTransaction: "GET /api/transactions/:id",
      deleteTransaction: "DELETE /api/transactions/:id",
      categories: "GET /api/categories",
      createCategory: "POST /api/categories",
      getCategory: "GET /api/categories/:id",
      deleteCategory: "DELETE /api/categories/:id",
      users: "GET /api/users",
      createUser: "POST /api/users",
      getUser: "GET /api/users/:id",
      deleteUser: "DELETE /api/users/:id",
    

    },
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
