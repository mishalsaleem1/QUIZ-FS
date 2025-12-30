import { Link } from "react-router-dom";

function ProductCard({ id, name, description, price, image, onDelete }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-img" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-desc">{description}</p>
        <div className="product-price">PKR{Number(price).toFixed(2)}</div>
        <Link to={`/edit/${id}`} className="btn primary" style={{ marginTop: "10px", display: "inline-block", textDecoration: "none" }}>
          Edit Product
        </Link>
        {onDelete && (
          <button className="btn secondary" style={{ marginTop: "10px", marginLeft: "10px" }} onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
