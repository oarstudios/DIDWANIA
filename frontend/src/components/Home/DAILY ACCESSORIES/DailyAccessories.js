import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalizedGiftDesktop from "../../Images/daily-desktop.png"; // Desktop version of the image
import PersonalizedGiftMobile from "../../Images/daily-mobile.png"; // Mobile version of the image
import "./DailyAccessories.css";
import { FaCartPlus } from "react-icons/fa";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { ToastContainer } from 'react-toastify';
import useNotify from "../../../hooks/useNotify";

function DailyAccessories() {
  const { notify } = useNotify();
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/products/getallproducts');
    const json = await response.json();
    if (response.ok) {
      const filteredProducts = json.products.filter((prd) => prd.category === "Daily Accessories");
      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUserCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/getuserbyid/${user.user?._id}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const updatedUser = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ token: user.token, user: updatedUser }));
        notify('Product added to cart', "success");
      }
    } catch (error) {
      console.error('Failed to update user cart:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      if (!user) {
        return notify('Login in to add to cart', "error");
      }

      const formData = { 'productId': product._id, 'quantity': 1 };
      const response = await fetch(`http://localhost:5000/users/addtocart/${user.user?._id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        notify("Product added to cart", "success");
        updateUserCart();
      } else {
        console.error('Failed to add to cart:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {/* Display different images for desktop and mobile */}
      <div className="daily-accessories-container">
          <Link to="/DailyAll">
        <img
          src={PersonalizedGiftDesktop}
          alt="Daily Accessories - Desktop"
          className="daily-accessories-image desktop-only"
        />
        </Link>
        <Link to="/DailyAll">
        <img
          src={PersonalizedGiftMobile}
          alt="Daily Accessories - Mobile"
          className="daily-accessories-image mobile-only"
        />
        </Link>
      </div>

      <div className="sub-title">
        <div className="product-section">
          {products?.map((product) => (
            <div className="product-item" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={`http://localhost:5000/uploads/${product.productImages[0]}`}
                  alt={product.title}
                  className="hoverable"
                />
              </Link>
              <div className="product-details">
                <p className="model-type">{product.title}</p>
                <div className="price-container">
                  <p className="price">&#8377;{product.price}</p>
                  {product?.itemInStock && <FaCartPlus className="fa-cart-plus" onClick={() => handleAddToCart(product)} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DailyAccessories;
