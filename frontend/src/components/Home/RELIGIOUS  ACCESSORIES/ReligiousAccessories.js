import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import ReligiousDesktop from "../../Images/religious-desktop.png"; // Desktop version of the image
import ReligiousMobile from "../../Images/religious-mobile.png";   // Mobile version of the image
import { FaCartPlus } from "react-icons/fa";
import './ReligiousAccessories.css';
import { useAuthContext } from "../../../hooks/useAuthContext";
import useNotify from "../../../hooks/useNotify";

function ReligiousAccessories() {
  const { notify } = useNotify();
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://didwaniacreations.in:5000/products/getallproducts');
    const json = await response.json();
    if (response.ok) {
      const filteredProducts = json.products.filter((prd) => prd.category === "Religious Accessories");
      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      if (!user) {
        return notify("Login in to add to cart", "error");
      }

      const formData = { 'productId': product._id, 'quantity': 1 };
      const response = await fetch(`https://didwaniacreations.in:5000/users/addtocart/${user.user?._id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        notify("Product added to cart", "success");
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      {/* Display different images for desktop and mobile */}
      <div className="religious-accessories-container">
  <Link to="/religiousAll">
    <img
      src={ReligiousDesktop}
      alt="Religious Accessories - Desktop"
      className="religious-accessories-image desktop-only"
    />
    <img
      src={ReligiousMobile}
      alt="Religious Accessories - Mobile"
      className="religious-accessories-image mobile-only"
    />
  </Link>
</div>

      <div className="sub-title">
        <div className="product-section">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={`https://didwaniacreations.in:5000/uploads/${product.productImages[0]}`}
                  alt={product.title}
                  className="hoverable"
                />
              </Link>
              <div className="product-details">
                <p className="model-type">{product.title}</p>
                <div className="price-container">
                  <p className="price">&#8377;{product.price}</p>
                  <div>
                    {product?.itemInStock && (
                      <FaCartPlus className="fa-cart-plus" onClick={() => handleAddToCart(product)} />
                    )}
                  </div>
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

export default ReligiousAccessories;
