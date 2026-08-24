export default function CategoryItem({ category, onDelete, deleting }) {
  return (
    <li className="transaction">
      <div className="transaction__info">
        <strong>{category.name}</strong>
      </div>
      <div className="transaction__meta">
        <span className={`transaction__badge transaction__badge--${category.type}`}>
          {category.type}
        </span>
        <button
          type="button"
          className="button button--danger"
          onClick={() => onDelete(category.id)}
          disabled={deleting}
          aria-label={`Delete ${category.name}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
