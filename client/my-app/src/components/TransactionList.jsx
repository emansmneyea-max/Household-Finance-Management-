import TransactionItem from "./TransactionItem.jsx";

function groupByCategory(transactions) {
  const groups = new Map();

  for (const transaction of transactions) {
    const name = transaction.category_name || "Uncategorized";
    if (!groups.has(name)) {
      groups.set(name, []);
    }
    groups.get(name).push(transaction);
  }

  return Array.from(groups.entries()).sort(([a], [b]) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });
}

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

  const groups = groupByCategory(transactions);

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Recent Transactions</h2>
        <p>
          {transactions.length === 1
            ? "1 transaction"
            : `${transactions.length} transactions`}
        </p>
      </div>
      <div className="category-groups">
        {groups.map(([categoryName, items]) => (
          <section key={categoryName} className="category-group">
            <div className="category-group__header">
              <h3>{categoryName}</h3>
              <p>
                {items.length === 1
                  ? "1 transaction"
                  : `${items.length} transactions`}
              </p>
            </div>
            <ul className="transaction-list">
              {items.map((transaction) => (
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
        ))}
      </div>
    </section>
  );
}
