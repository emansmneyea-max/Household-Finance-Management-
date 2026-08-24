import { formatDate, formatMoney } from "../utils/format.js";

export default function TransactionItem({ transaction, onEdit, onDelete, deleting }) {
  const isIncome = transaction.type === "income";

  return (
    <li className={`transaction ${isIncome ? "transaction--income" : "transaction--expense"}`}>
      <div className="transaction__info">
        <div className="transaction__title">
          <strong>{transaction.description || "No description"}</strong>
        </div>
        <span className="transaction__date">{formatDate(transaction.date)}</span>
      </div>
      <div className="transaction__meta">
        <span className={`transaction__badge transaction__badge--${transaction.type}`}>
          {transaction.type}
        </span>
        <strong className="transaction__amount">
          {isIncome ? "+" : "-"}
          {formatMoney(transaction.amount)}
        </strong>

        <button
        type="button"
        className="button"
        onClick={() => onEdit(transaction)}
        >
       Edit
       </button>
        <button
          type="button"
          className="button button--danger"
          onClick={() => onDelete(transaction.id)}
          disabled={deleting}
          aria-label={`Delete ${transaction.description || "transaction"}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
