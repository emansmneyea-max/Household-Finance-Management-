import { useEffect, useState } from "react";

const initialForm = {
  amount: "",
  type: "expense",
  description: "",
  date: new Date().toISOString().split("T")[0],
  category_id: "",
};

export default function TransactionForm({
  onSubmit,
  loading,
  transaction,
  categories = [],
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!transaction) {
    return;
  }

  const dateValue = String(transaction.date).slice(0, 10);

  setForm({
    amount: String(transaction.amount),
    type: transaction.type,
    description: transaction.description || "",
    date: dateValue,
    category_id:
      transaction.category_id != null ? String(transaction.category_id) : "",
  });
}, [transaction]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.amount || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await onSubmit({
        amount: Number(form.amount),
        type: form.type,
        description: form.description.trim(),
        date: form.date,
        category_id: form.category_id ? Number(form.category_id) : null,
      });
      setForm({ ...initialForm, date: new Date().toISOString().split("T")[0] });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>{transaction ? "Edit Transaction" : "Add Transaction"}</h2>
        <p>Record a new income or expense</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__field">
            <span>Amount</span>
            <input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__field">
            <span>Type</span>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        <div className="form__row">
          <label className="form__field">
            <span>Description</span>
            <input
              type="text"
              name="description"
              placeholder="e.g. Groceries, Salary"
              value={form.description}
              onChange={handleChange}
            />
          </label>

          <label className="form__field">
            <span>Date</span>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label className="form__field">
          <span>Category</span>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
          >
            <option value="">
              {categories.length === 0
                ? "No categories yet"
                : "Select a category"}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.type})
              </option>
            ))}
          </select>
        </label>

        {error && <p className="form__error">{error}</p>}

        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? "Saving..." : transaction ? "Save changes" : "Add Transaction"}
        </button>
      </form>
    </section>
  );
}
