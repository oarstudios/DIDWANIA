import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import backprint_t from "../Images/Product Photos/12.jpeg";
import Navbar from "../Home/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

function OrderDetails() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  const { user } = useAuthContext();
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    townCity: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();

  // Fetch order details
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`https://147.93.103.125
/bills/getbillbyid/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          // Assuming orderItems include product IDs and quantities
          setOrderItems(json.productIds || []); 
          // Example structure: [{ productId: 'id1', quantity: 2 }, ...]
          console.log(json.productIds)
          setFormData({
            firstName: json.firstName || "",
            lastName: json.lastName || "",
            country: json.country || "",
            streetAddress: json.address || "",
            townCity: json.city || "",
            state: json.state || "",
            pinCode: json.pincode || "",
            phone: json.phoneNumber || "",
            email: json.email || "",
          });
        } else {
          console.log("Failed to fetch order details", json);
        }
      } catch (error) {
        console.log('Error fetching order details:', error);
      }
    };

    if (user) {
      fetchOrderData();
    }
  }, [user, id]);

  // Fetch product data based on order items
  console.log('ordasd', orderItems)
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product details based on the product IDs in orderItems
        const productPromises = orderItems.map(orderItem =>
          fetch(`https://147.93.103.125
/products/getproductbyid/${orderItem.product}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          }).then(response => response.json())
        );
  
        const products = await Promise.all(productPromises);
  
        console.log('Fetched Products:', products); // Debugging
  
        // Combine product details with quantities
        const updatedCartItems = orderItems.map(orderItem => {
          // Find the product matching the current orderItem
          const product = products.find(p => p.product?._id === orderItem.product);
          
          console.log('Order Item:', orderItem); // Debugging
          console.log('Product Found:', product); // Debugging
          
          return {
            ...orderItem,
            productDetails: product // Add product details to each order item
          };
        });
  
        console.log('Updated Cart Items:', updatedCartItems); // Debugging
  
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    if (orderItems.length > 0) {
      fetchProductData();
    }
  }, [orderItems, user]);
  
  console.log('cartItems', cartItems)
  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.productDetails?.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <>
      <Navbar />
      <div className="billingMain">
        <div className="billingLeftMain">
          <div className="billingLeft">
            <div className="blHeading">
              <h1>Billing and Shipping Details</h1>
            </div>

            <form className="form" action="">
              <div className="customerName">
                <div className="firstname">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    readOnly
                  />
                </div>

                <div className="firstname">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    readOnly
                  />
                </div>
              </div>

              <div className="newPass">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  readOnly
                />
                <p>Currently available for India.</p>
              </div>

              <div className="firstname">
                <label>Street Address</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  readOnly
                />
              </div>

              <div className="customerName">
                <div className="firstname">
                  <label>Town/City</label>
                  <input
                    type="text"
                    name="townCity"
                    value={formData.townCity}
                    readOnly
                  />
                </div>

                <div className="firstname">
                  <label>State</label>
                  <select
                    id="states"
                    name="state"
                    value={formData.state}
                    readOnly
                  >
                    <option value={formData.state}>{formData.state}</option>
                  </select>
                </div>
              </div>

              <div className="customerName">
                <div className="firstname">
                  <label>Pin Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    readOnly
                  />
                </div>

                <div className="firstname">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    readOnly
                  />
                </div>
              </div>

              <div className="firstname">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
        <div className="billingRgt">
          <div className="cartRgtt">
            <div className="cartTotalHeading">
              <h1>Order Summary</h1>
            </div>
            <div className="clContentt">
              {cartItems.map((item, index) => (
                console.log(item),
                <div key={index} className="cItem1">
                  <div className="cItemImg">
                    <img src={`https://147.93.103.125
/uploads/${item?.productDetails?.product?.productImages[0]}` || backprint_t} alt={item.productDetails?.product?.name} />
                  </div>
                  <div className="cItemDetails">
                    <h2>{item.productDetails?.product?.name}</h2>
                    <p>{item.productDetails?.product?.category}</p>
                    <p className="quantity">Quantity: x{item.quantity}</p>
                  </div>
                  <div className="cItemPrice">
                    <h3>₹{item.productDetails?.product?.price}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="clTotal">
              <h2>Total Amount:</h2>
              <h2>₹{totalAmount}</h2>
            </div>
            {/* <div className="button-Container">
              <button className="actionButton3">View Invoice</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
