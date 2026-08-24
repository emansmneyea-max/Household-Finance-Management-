import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({
  transactions,
  loading,
  onEdit,
  onDelete,
  deletingId,
}) {
  if (loading) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Recent Transactions</h2>
        </div>
        <p className="empty-state">Loading transactions...</p>
      </section>
    );
  }

  if (transactions.length === 0) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Recent Transactions</h2>
          <p>No transactions yet. Add your first one on the left.</p>
        </div>
        <p className="empty-state">Your transaction history will appear here.</p>
      </section>
    );
  }


  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Recent Transactions</h2>
        <p>
          {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
        </p>
      </div>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
            deleting={deletingId === transaction.id}
          />
        ))}
      </ul>
    </section>
  );
}
