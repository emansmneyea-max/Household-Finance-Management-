import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/api", (req, res) => {
  res.json({ message: "Household Finance Management API" });
});

export default app;