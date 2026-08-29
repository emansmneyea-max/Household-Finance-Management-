import { useState } from "react";

const initialForm = {
  name: "",
  type: "expense",
};

export default function CategoryForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    if (!name) {
      setError("Please enter a category name.");
      return;
    }

    try {
      await onSubmit({ name, type: form.type });
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Add Category</h2>
        <p>Group transactions as income or expense</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="e.g. Groceries, Salary"
              value={form.name}
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

        {error && <p className="form__error">{error}</p>}

        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>
    </section>
  );
}
