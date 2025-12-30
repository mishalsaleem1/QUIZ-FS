import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import {
  fetchProducts,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  fetchInventory,
  updateInventoryApi
} from "./api";


function App() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState({ totalValue: 0, productCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products and inventory from backend
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prods, inv] = await Promise.all([
          fetchProducts(),
          fetchInventory()
        ]);
        setProducts(prods);
        setInventory(inv);
      } catch (err) {
        setError("Failed to load data from backend");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Add product via API
  const handleAddProduct = async (newProduct) => {
    try {
      setLoading(true);
      const created = await addProductApi(newProduct);
      setProducts((prev) => [...prev, created]);
      // Optionally update inventory
      const inv = await fetchInventory();
      setInventory(inv);
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Update product via API
  const handleUpdateProduct = async (id, updatedData) => {
    try {
      setLoading(true);
      const updated = await updateProductApi(id, updatedData);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      const inv = await fetchInventory();
      setInventory(inv);
    } catch (err) {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product via API
  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      const inv = await fetchInventory();
      setInventory(inv);
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div className="app-container">
      <Navbar />
      <div className="inventory-bar">
        <div className="inventory-stats">
          <div className="stat-item">
            <span className="stat-label">Inventory:</span>
            <span className="stat-value">{inventory.productCount} products</span>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <span className="stat-label">Total Value:</span>
            <span className="stat-value">${Number(inventory.totalValue).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <main className="main">
        <Routes>
          <Route path="/" element={<ProductList products={products} onDelete={handleDeleteProduct} />} />
          <Route path="/add" element={<AddProduct onAdd={handleAddProduct} />} />
          <Route path="/edit/:id" element={<EditProduct products={products} onUpdate={handleUpdateProduct} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
