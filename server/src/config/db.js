import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

function getConnectionString() {
  if (process.env.NODE_ENV === "test") {
    const url = process.env.TEST_DATABASE_URL;
    if (!url) {
      throw new Error(
        "TEST_DATABASE_URL is required to run tests. Use a dedicated database (see .env.example). Do not point this at production data."
      );
    }
    return url;
  }

  return process.env.DATABASE_URL;
}

function getSslConfig(connectionString) {
  if (!connectionString || /localhost|127\.0\.0\.1/.test(connectionString)) {
    return false;
  }

  return { rejectUnauthorized: false };
}

const connectionString = getConnectionString();

const pool = new Pool({
  connectionString,
  ssl: getSslConfig(connectionString),
});

export default pool;
