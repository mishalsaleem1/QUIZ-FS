import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct({ products, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Load product data when component mounts or product changes
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setPreview(product.image);
    }
  }, [product]);

  // Form validation
  useEffect(() => {
    const errors = {};
    if (name && name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (price && (isNaN(price) || parseFloat(price) <= 0)) {
      errors.price = "Price must be a positive number";
    }
    if (description && description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }
    setFormErrors(errors);
  }, [name, price, description]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !preview) return;
    if (Object.keys(formErrors).length > 0) return;
    setIsLoading(true);
    try {
      const updatedProduct = {
        name,
        description,
        price: parseFloat(price),
        image: preview,
      };
      await onUpdate(parseInt(id), updatedProduct);
      navigate("/");
    } catch (err) {
      alert("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <section>
        <h2 className="section-title">Product Not Found</h2>
        <p style={{ textAlign: "center", color: "#666" }}>
          The product you're trying to edit doesn't exist.
        </p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button 
            className="btn primary" 
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">Edit Product</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Product Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Smart Lamp"
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            rows="4"
          />
        </label>

        <label>
          Price (PKR)
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
            placeholder="e.g., 49.99"
          />
        </label>

        <label>
          Product Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "8px" }}
          />
        </label>

        {preview && <img src={preview} alt="preview" className="image-preview" />}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn primary" 
            disabled={isLoading || Object.keys(formErrors).length > 0}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
          <button 
            type="button" 
            className="btn secondary" 
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>

        {Object.keys(formErrors).length > 0 && (
          <div className="form-errors">
            {Object.values(formErrors).map((error, index) => (
              <p key={index} style={{ color: "red", fontSize: "0.8em" }}>
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}

export default EditProduct;
