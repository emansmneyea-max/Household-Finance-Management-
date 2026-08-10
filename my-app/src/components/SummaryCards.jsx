function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);
}

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  return (
    <section className="summary">
      <article className="summary__card summary__card--income">
        <p>Total Income</p>
        <h2>{formatMoney(income)}</h2>
      </article>
      <article className="summary__card summary__card--expense">
        <p>Total Expenses</p>
        <h2>{formatMoney(expenses)}</h2>
      </article>
      <article className="summary__card summary__card--balance">
        <p>Balance</p>
        <h2>{formatMoney(balance)}</h2>
      </article>
    </section>
  );
}
