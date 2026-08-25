import { formatMoney } from "../utils/format.js";

export default function SummaryCards({ transactions,currency }) {
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
        <h2>{formatMoney(income,currency)}</h2>
      </article>
      <article className="summary__card summary__card--expense">
        <p>Total Expenses</p>
        <h2>{formatMoney(expenses,currency)}</h2>
      </article>
      <article className="summary__card summary__card--balance">
        <p>Balance</p>
        <h2>{formatMoney(balance,currency)}</h2>
      </article>
    </section>
  );
}
