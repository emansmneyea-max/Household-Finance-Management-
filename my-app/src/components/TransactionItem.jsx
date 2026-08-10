function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TransactionItem({ transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <li className={`transaction ${isIncome ? "transaction--income" : "transaction--expense"}`}>
      <div className="transaction__info">
        <strong>{transaction.description || "No description"}</strong>
        <span>{formatDate(transaction.date)}</span>
      </div>
      <div className="transaction__meta">
        <span className={`transaction__badge transaction__badge--${transaction.type}`}>
          {transaction.type}
        </span>
        <strong className="transaction__amount">
          {isIncome ? "+" : "-"}
          {formatMoney(transaction.amount)}
        </strong>
      </div>
    </li>
  );
}
