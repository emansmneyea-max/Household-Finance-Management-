import "./setup.js";
import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import request from "supertest";
import app from "../src/app.js";
import { closeDatabase, resetDatabase } from "./helpers.js";

async function postTransaction(body) {
  return request(app).post("/api/transactions").send(body);
}

describe("Household Finance API", () => {
  before(async () => {
    await resetDatabase();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  after(async () => {
    await closeDatabase();
  });

  describe("GET /health", () => {
    it("returns ok when the server is running", async () => {
      const res = await request(app).get("/health");

      assert.equal(res.status, 200);
      assert.equal(res.body.status, "ok");
    });
  });

  describe("POST /api/transactions", () => {
    it("creates an expense and returns 201", async () => {
      const res = await postTransaction({
        amount: 45.5,
        type: "expense",
        description: "Groceries",
        date: "2026-08-10",
      });

      assert.equal(res.status, 201);
      assert.equal(res.body.type, "expense");
      assert.equal(res.body.description, "Groceries");
      assert.equal(Number(res.body.amount), 45.5);
      assert.ok(res.body.id);
    });

    it("rejects missing amount or type", async () => {
      const res = await postTransaction({ description: "No money fields" });

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "amount and type are required");
    });

    it("rejects a non-positive amount", async () => {
      const res = await postTransaction({
        amount: -10,
        type: "expense",
      });

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "amount must be a positive number");
    });

    it("rejects a type that is not income or expense", async () => {
      const res = await postTransaction({
        amount: 20,
        type: "transfer",
      });

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "type must be income or expense");
    });

    it("saves category_id when the category exists", async () => {
      const category = await request(app).post("/api/categories").send({
        name: "Food",
        type: "expense",
      });

      const res = await postTransaction({
        amount: 12,
        type: "expense",
        description: "Lunch",
        category_id: category.body.id,
      });

      assert.equal(res.status, 201);
      assert.equal(res.body.category_id, category.body.id);
      assert.equal(res.body.category_name, "Food");
    });

    it("rejects a category_id that does not exist", async () => {
      const res = await postTransaction({
        amount: 12,
        type: "expense",
        description: "Lunch",
        category_id: 999,
      });

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "Category not found");
    });
  });

  describe("GET /api/transactions", () => {
    it("returns an empty list when there are no rows", async () => {
      const res = await request(app).get("/api/transactions");

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, []);
    });

    it("returns created transactions newest first", async () => {
      await postTransaction({
        amount: 100,
        type: "income",
        description: "Salary",
        date: "2026-08-01",
      });
      await postTransaction({
        amount: 20,
        type: "expense",
        description: "Bus",
        date: "2026-08-11",
      });

      const res = await request(app).get("/api/transactions");

      assert.equal(res.status, 200);
      assert.equal(res.body.length, 2);
      assert.equal(res.body[0].description, "Bus");
      assert.equal(res.body[1].description, "Salary");
    });
  });

  describe("GET /api/transactions/:id", () => {
    it("returns one transaction", async () => {
      const created = await postTransaction({
        amount: 12,
        type: "expense",
        description: "Coffee",
      });

      const res = await request(app).get(
        `/api/transactions/${created.body.id}`
      );

      assert.equal(res.status, 200);
      assert.equal(res.body.description, "Coffee");
    });

    it("returns 404 when the id does not exist", async () => {
      const res = await request(app).get("/api/transactions/999");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "Transaction not found");
    });

    it("returns 400 for a non-numeric id", async () => {
      const res = await request(app).get("/api/transactions/abc");

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "Invalid transaction id");
    });
  });


  describe("PUT /api/transactions/:id", () => {
  it("updates an existing transaction", async () => {
    const created = await postTransaction({
      amount: 10,
      type: "expense",
      description: "Coffee",
    });

    const res = await request(app)
      .put(`/api/transactions/${created.body.id}`)
      .send({
        amount: 12,
        type: "expense",
        description: "Coffee (updated)",
        date: "2026-08-10",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.description, "Coffee (updated)");
    assert.equal(Number(res.body.amount), 12);
  });

it("returns 404 when the id does not exist", async () => {
  const res = await request(app)
    .put("/api/transactions/999")
    .send({
      amount: 12,
      type: "expense",
      description: "Missing",
      date: "2026-08-10",
    });

  assert.equal(res.status, 404);
  assert.equal(res.body.error, "Transaction not found");
});

});

  describe("DELETE /api/transactions/:id", () => {
    it("deletes a transaction", async () => {
      const created = await postTransaction({
        amount: 8,
        type: "expense",
        description: "Snack",
      });

      const res = await request(app).delete(
        `/api/transactions/${created.body.id}`
      );

      assert.equal(res.status, 200);
      assert.equal(res.body.message, "Transaction deleted");

      const missing = await request(app).get(
        `/api/transactions/${created.body.id}`
      );
      assert.equal(missing.status, 404);
    });

    it("returns 404 when deleting a missing id", async () => {
      const res = await request(app).delete("/api/transactions/999");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "Transaction not found");
    });
  });


  describe("POST /api/categories", () => {
    it("creates a category and returns 201", async () => {
      const res = await request(app).post("/api/categories").send({
        name: "Groceries",
        type: "expense",
      });

      assert.equal(res.status, 201);
      assert.equal(res.body.name, "Groceries");
      assert.equal(res.body.type, "expense");
      assert.ok(res.body.id);
    });

    it("rejects missing name or type", async () => {
      const res = await request(app).post("/api/categories").send({
        name: "Groceries",
      });

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "name and type are required");
    });
  });

  describe("GET /api/categories", () => {
    it("returns an empty list when there are no rows", async () => {
      const res = await request(app).get("/api/categories");

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, []);
    });

    it("returns created categories", async () => {
      await request(app).post("/api/categories").send({
        name: "Salary",
        type: "income",
      });

      const res = await request(app).get("/api/categories");

      assert.equal(res.status, 200);
      assert.equal(res.body.length, 1);
      assert.equal(res.body[0].name, "Salary");
    });
  });

  describe("GET /api/categories/:id", () => {
    it("returns one category", async () => {
      const created = await request(app).post("/api/categories").send({
        name: "Rent",
        type: "expense",
      });

      const res = await request(app).get(
        `/api/categories/${created.body.id}`
      );

      assert.equal(res.status, 200);
      assert.equal(res.body.name, "Rent");
    });

    it("returns 404 when the id does not exist", async () => {
      const res = await request(app).get("/api/categories/999");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "Category not found");
    });
  });

  describe("DELETE /api/categories/:id", () => {
    it("deletes a category", async () => {
      const created = await request(app).post("/api/categories").send({
        name: "Snacks",
        type: "expense",
      });

      const res = await request(app).delete(
        `/api/categories/${created.body.id}`
      );

      assert.equal(res.status, 200);
      assert.equal(res.body.message, "Category deleted");

      const missing = await request(app).get(
        `/api/categories/${created.body.id}`
      );
      assert.equal(missing.status, 404);
    });

    it("returns 404 when deleting a missing id", async () => {
      const res = await request(app).delete("/api/categories/999");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "Category not found");
    });
  });

  describe("POST /api/users", () => {
    it("creates a user and returns 201 without the password hash", async () => {
      const res = await request(app).post("/api/users").send({
        email: "ada@example.com",
        password: "secret123",
        name: "Ada",
      });

      assert.equal(res.status, 201);
      assert.equal(res.body.email, "ada@example.com");
      assert.equal(res.body.name, "Ada");
      assert.ok(res.body.id);
      assert.equal(res.body.password_hash, undefined);
    });

    it("rejects missing fields", async () => {
      const res = await request(app).post("/api/users").send({
        email: "ada@example.com",
      });

      assert.equal(res.status, 400);
      assert.equal(res.body.error, "email, password, and name are required");
    });

    it("rejects a duplicate email", async () => {
      await request(app).post("/api/users").send({
        email: "ada@example.com",
        password: "secret123",
        name: "Ada",
      });

      const res = await request(app).post("/api/users").send({
        email: "Ada@example.com",
        password: "secret123",
        name: "Ada Two",
      });

      assert.equal(res.status, 409);
      assert.equal(res.body.error, "email already exists");
    });
  });

  describe("GET /api/users", () => {
    it("returns an empty list when there are no rows", async () => {
      const res = await request(app).get("/api/users");

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, []);
    });

    it("returns created users", async () => {
      await request(app).post("/api/users").send({
        email: "ada@example.com",
        password: "secret123",
        name: "Ada",
      });

      const res = await request(app).get("/api/users");

      assert.equal(res.status, 200);
      assert.equal(res.body.length, 1);
      assert.equal(res.body[0].email, "ada@example.com");
      assert.equal(res.body[0].password_hash, undefined);
    });
  });

  describe("GET /api/users/:id", () => {
    it("returns one user", async () => {
      const created = await request(app).post("/api/users").send({
        email: "ada@example.com",
        password: "secret123",
        name: "Ada",
      });

      const res = await request(app).get(`/api/users/${created.body.id}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.name, "Ada");
    });

    it("returns 404 when the id does not exist", async () => {
      const res = await request(app).get("/api/users/999");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "User not found");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("deletes a user", async () => {
      const created = await request(app).post("/api/users").send({
        email: "ada@example.com",
        password: "secret123",
        name: "Ada",
      });

      const res = await request(app).delete(`/api/users/${created.body.id}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.message, "User deleted");

      const missing = await request(app).get(`/api/users/${created.body.id}`);
      assert.equal(missing.status, 404);
    });

    it("returns 404 when deleting a missing id", async () => {
      const res = await request(app).delete("/api/users/999");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "User not found");
    });
  });

  describe("unknown routes", () => {
    it("returns JSON 404", async () => {
      const res = await request(app).get("/does-not-exist");

      assert.equal(res.status, 404);
      assert.equal(res.body.error, "Route not found");
    });
  });
});


