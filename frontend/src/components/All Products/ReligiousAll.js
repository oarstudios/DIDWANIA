import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Religious from "../../components/Images/religious.png";
import Daily from "../Images/daily.png";

import { FaCartPlus } from "react-icons/fa";
import Testimonials from "../Home/Testimonials/Testimonials";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";
import useNotify from "../../hooks/useNotify";
import { ToastContainer } from "react-toastify";
import PersonalizedGiftDesktop from "../Images/daily-desktop.png"; // Desktop version of the image
import PersonalizedGiftMobile from "../Images/daily-mobile.png"; // Mobile version of the image

function ReligiousAll() {
  const {notify} = useNotify()
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  // Array of product objects
  // const products = [
  //   { id: 1, name: "Corporate Gift Set", price: 599, image: img1 },
  //   { id: 2, name: "Corporate Gift Set", price: 599, image: img2 },
  //   { id: 3, name: "Corporate Gift Set", price: 599, image: img3 },
  //   { id: 4, name: "Corporate Gift Set", price: 599, image: img4 },
  //   { id: 5, name: "Corporate Gift Set", price: 599, image: img5 },
  //   { id: 6, name: "Corporate Gift Set", price: 599, image: img6 },
  //   { id: 7, name: "Corporate Gift Set", price: 599, image: img7 },
  //   { id: 8, name: "Corporate Gift Set", price: 599, image: img8 },
  //   { id: 9, name: "Corporate Gift Set", price: 599, image: img9 },
  //   { id: 10, name: "Corporate Gift Set", price: 599, image: img10 },
  //   { id: 11, name: "Corporate Gift Set", price: 599, image: img11 },
  //   { id: 12, name: "Corporate Gift Set", price: 599, image: img12 },
  //   { id: 13, name: "Corporate Gift Set", price: 599, image: img13 },
  //   { id: 14, name: "Corporate Gift Set", price: 599, image: img14 },
  //   { id: 15, name: "Corporate Gift Set", price: 599, image: img15 },
  //   { id: 16, name: "Corporate Gift Set", price: 599, image: img16 },
  //   { id: 17, name: "Corporate Gift Set", price: 599, image: img17 },
  //   { id: 18, name: "Corporate Gift Set", price: 599, image: img18 },
  //   { id: 19, name: "Corporate Gift Set", price: 599, image: img19 },
  // ];

  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://147.93.103.125:5000/products/getallproducts');
    const json = await response.json();
    if (response.ok) {
      const daProducts = json.products.filter((prd)=> prd.category === "Religious Accessories")
      setProducts(daProducts);
      console.log("products", json.products);
    }
  };
  useEffect(() => {
    

    // if (user) {
      fetchData();
    // }

  }, [user]);

  const updateUserCart = async () => {
    try {
      const response = await fetch(`http://147.93.103.125:5000/users/getuserbyid/${user.user?._id}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const updatedUser = await response.json();
      console.log('updated user', updatedUser)
      if (response.ok) {
        // setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify({token: user.token, user: updatedUser}));
        notify('Product added to cart', 'success')
        console.log("updt", user)
      }
    } catch (error) {
      console.error('Failed to update user cart:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      if(!user)
        {
         return notify('Login in to add to cart', 'error')
        }
  
      const formData = {
        'productId': product._id,
        'quantity': 1
      }
      console.log(formData)
      
      const response = await fetch(`http://147.93.103.125:5000/users/addtocart/${user.user?._id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const json = await response.json();
      if (response.ok) {
        console.log('successfully added to the cart', json);
        updateUserCart()
        console.log('adt user', user);
      } else {
        console.log('Failed to add to cart', json);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  return (
    <>
    <Navbar></Navbar>
      <div className="religious-accessories-container">
        <img
          src={Religious}
          alt="Corporate Gifts"
          className="religious-accessories-image"
        />
        <div className="overlay">
          <div className="text-content">
            <h1>Religious Accesories</h1>
            <p>Kadas, murtis and many more..</p>
          </div>
        </div>
      </div>

      <span style={{ margin: "16px" }}><Link to="/" style={{ textDecoration: "none", cursor: "pointer", fontSize: "19px", color:"black" }}>Home</Link> &gt; <span style={{ textDecoration: "none", cursor: "pointer", fontSize: "19px" }}>Religious Accessories</span> </span>
      <div className="sub-title">
        <div className="header">
          <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
            <h2 className="trendingNow-text">RELIGIOUS ACCESSORIES</h2>
          </Link>
        </div>

        <div className="product-section">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={`http://147.93.103.125:5000/uploads/${product.productImages[0]}`}
                  alt={product.title}
                  className="hoverable"
                />
              </Link>
              <div className="product-details">
                <p className="model-type">{product.title}</p>
                <div className="price-container">
                  <p className="price">&#8377;{product.price}</p>
                  {/* <Link to={"/cart"}> */}
                    <FaCartPlus className="fa-cart-plus" onClick={()=>handleAddToCart(product)}/>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

      <Testimonials />
      <Footer></Footer>
      <ToastContainer/>
    </>
  );
}

export default ReligiousAll;
