import CategoryItem from "./CategoryItem.jsx";

export default function CategoryList({
  categories,
  loading,
  onDelete,
  deletingId,
}) {
  if (loading) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Categories</h2>
        </div>
        <p className="empty-state">Loading categories...</p>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Categories</h2>
          <p>No categories yet. Add your first one on the left.</p>
        </div>
        <p className="empty-state">Your categories will appear here.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Categories</h2>
        <p>
          {categories.length === 1
            ? "1 category"
            : `${categories.length} categories`}
        </p>
      </div>
      <ul className="transaction-list">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onDelete={onDelete}
            deleting={deletingId === category.id}
          />
        ))}
      </ul>
    </section>
  );
}
