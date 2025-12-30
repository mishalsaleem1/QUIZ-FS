import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onDelete }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    // Filter and sort products based on search term and sort criteria
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy]);

  useEffect(() => {
    // Log product count changes
    console.log(`Product list updated: ${filteredProducts.length} products displayed`);
  }, [filteredProducts]);
  return (
    <section>
      <h2 className="section-title">Available Products</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.description}
            price={p.price}
            image={p.image}
            onDelete={onDelete}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && searchTerm && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          No products found matching "{searchTerm}"
        </p>
      )}
    </section>
  );
}

export default ProductList;
