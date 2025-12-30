import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">E-Shop</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Products</Link>
        <Link to="/add" className="add-link">Add Product</Link>
      </div>
    </nav>
  );
}

export default Navbar;
