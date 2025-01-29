import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductPage.css";
import Testimonials from "../Home/Testimonials/Testimonials";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";
import NavbarAdmin from "../Admin/Navbar/NavbarAdmin";

function BuyProduct() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  const { user } = useAuthContext();
  const { id } = useParams();
  const {count} = useParams();
  const [product, setProduct] = useState({}); // Initialize as an empty object
  const [quantity, setQuantity] = useState(parseInt(count));
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/products/getproductbyid/${id}`);
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        setProduct(json.product);
        setTotalPrice(json.product.price); // Set the initial total price
        setSelectedImage(json.product.productImages[0]); // Set the initial selected image
      }
    };

    // if (user) {
      fetchData();
    // }
  }, [user, id]);

  useEffect(() => {
    if (product.price) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product.price]);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleImageClick = (index) => {
    // setSelectedImage(image);
    setImgIndex(index)
  };

  const updateUserCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/getuserbyid/${user.user?._id}`, {
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
        console.log("updt", user)
      }
    } catch (error) {
      console.error('Failed to update user cart:', error);
    }
  };


  return (
    <>
      {user?.user?.userType === 'User' ? <Navbar /> : <NavbarAdmin/> }
      <span style={{ margin: "16px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            fontSize: "19px",
            color: "black",
          }}
        >
          Home
        </Link>{" "}
        &gt;
        <span
          style={{
            textDecoration: "none",
            cursor: "pointer",
            fontSize: "19px",
          }}
        >
          {product?.title}
        </span>
      </span>
      <div className="productMain">
        <div className="prdImgs">
          <div className="prdiMin">
            {product?.productImages?.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${product.productImages[index]}`}
                alt={`pd${index + 1}`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div className="prdiMax">
            {selectedImage && <img src={`http://localhost:5000/uploads/${product.productImages[imgIndex]}`} alt="Selected Product" />}
          </div>
        </div>
        <div className="prdDets">
          <h1>{product?.title}</h1>
          <h1 className="price">₹{totalPrice}</h1>
          <p className="tax">Inclusive of all taxes</p>
          <p className="desc">Description</p>
          <p className="desc-p">{product?.description}</p>

          <div className="qua">
            <p>Quantity</p>
            <div className="quantity-controls">
              <button onClick={decrementQuantity}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={incrementQuantity}>+</button>
            </div>
          </div>

          <p className= {product?.itemInStock ? "ins success" : "ins error"}>
            {product?.itemInStock ? "Item in Stock" : "Out of Stock"}
          </p>

          <div className="abBtns">
            {/* <Link
              to="/cart"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "black",
              }}
            > */}
              {/* <button onClick={()=>handleAddToCart(product)}>ADD TO CART</button> */}
            {/* </Link> */}
            {user && product?.itemInStock &&
            <Link
              to={`/billing/${product._id}/${quantity}`}
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "black",
              }}
            >
              <button>BUY NOW</button>
            </Link>
            }
          </div>

          <div className="productDetails">
            <h2>Delivery Information</h2>
            <ul>
              <li>Standard Delivery: 7-9 business days.</li>
              <li>
                Although we make 100% efforts to match the image displayed, the
                actual product delivered may vary in shape or design as per the
                availability.
              </li>
              <li>
                Most orders are delivered on time, but delays can occur due to
                traffic congestion or remote delivery addresses.
              </li>
              <li>
                Once the order is placed for delivery, it cannot be redirected
                to another address also it cannot be cancelled.
              </li>
              <li>
                Although we try not to, occasionally, substitution is necessary
                due to temporary and/or regional unavailability issues. Please
                be noted that we may have to do this without informing you
                because we give utmost importance to delivery on time since most
                of our orders are gifts for a certain occasion.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Testimonials />
      <Footer />
    </>
  );
}

export default BuyProduct;
