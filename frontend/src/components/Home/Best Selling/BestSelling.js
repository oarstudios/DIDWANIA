import React from "react";
import { Link } from "react-router-dom";
import img1 from '../../Images/Product Photos/1.jpeg';
import img2 from '../../Images/Product Photos/2.jpeg';
import img3 from '../../Images/Product Photos/3.jpeg';
import img4 from '../../Images/Product Photos/4.jpeg';
import { FaCartPlus } from "react-icons/fa";
import './BestSelling.css';

// Array of product objects
const products = [
  { id: 1, name: "ABCDEF", price: 599, image: img1 },
  { id: 2, name: "ABCDEF", price: 599, image: img2 },
  { id: 3, name: "ABCDEF", price: 599, image: img3 },
  { id: 4, name: "ABCDEF", price: 599, image: img4 },
  // Add more products as needed
];

function BestSelling() {
  return (
    <div className="sub-title">
      <div className="header">
        <h2 className="trendingNow-text">Best Selling</h2>
        {/* <h3 className="view-all-best-selling">View All</h3> */}
        {/* <Link to="/bestSellingProducts" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <h3 className="view-all-best-selling">View All</h3>
        </Link> */}
      </div>
      <div className="product-section">
        {products.map(product => (
          <div className="product-item" key={product.id}>
            <Link to={'/product'}>
              <img src={product.image} alt={product.name} className="hoverable" />
            </Link>
            <div className="product-details">
              <p className="model-type">{product.name}</p>
              <div className="price-container">
                <p className="price">&#8377;{product.price}</p>
                <Link to={"/cart"}>
                    <FaCartPlus className="fa-cart-plus" />
                  </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSelling;
