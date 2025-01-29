import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import "./ViewCustOrder.css";
import backprint_t from "../../Images/Product Photos/11.jpeg";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import Footer from "../../Home/Footer/Footer";
import { useAuthContext } from "../../../hooks/useAuthContext";

function ViewCustOrder() {
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
  const [status, setStatus] = useState()

  // Fetch order details
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bills/getbillbyid/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        

        if (response.ok) {
          // Assuming orderItems include product IDs and quantities
          setOrderItems(json.productIds || []); 
          // Example structure: [{ productId: 'id1', quantity: 2 }, ...]
          console.log('bill', json)
          setStatus(json.status)
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
          fetch(`http://localhost:5000/products/getproductbyid/${orderItem.product}`, {
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

  useEffect(()=>{
console.log(status)
  },[status])
 

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const formData = {
        status
      }
      const response = await fetch(`http://localhost:5000/bills/editbill/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json();
      if(response.ok)
      {
        console.log('Bill edited successfully', json)
      }
    }catch(error)
    {
      console.log(error)
    }
  }
  return (
    <>
      <NavbarAdmin />
     
      <form className="billingMain"onSubmit={handleSubmit}>
      <Link to="/adminOrders"style={{ textDecoration: 'none', cursor: 'pointer' }} className="cust-orders-icon"><IoMdArrowRoundBack /></Link>
        <div className="billingLeftMain">
          <div className="billingLeft">
            <div className="blHeading">
              <h1>Billing and Shipping Details</h1>
            </div>

            <div className="form" >
              <div className="customerName">
                <div className="firstname">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    //onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="firstname">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    //onChange={handleChange}
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
                  //onChange={handleChange}
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
                  //onChange={handleChange}
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
                    //onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="firstname">
                  <label>State</label>
                  <select
                    id="states"
                    name="state"
                    value={formData.state}
                    //onChange={handleChange}
                    readOnly
                  >
                    <option value="State Name">{formData.state}</option>
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
                    //onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="firstname">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    //onChange={handleChange}
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
                  //onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="billingRgt">
          <div className="cartRgtt">
            <div className="cartTotalHeading">
              <h1>Order Summary</h1>
            </div>
            <div className="clContentt">
            {cartItems.map((item) => (
                <div key={item._id} className="cItem1">
                  <div className="cItemImg">
                    <img src={`http://localhost:5000/uploads/${item.productDetails?.product?.productImages[0]}` || backprint_t} alt={item.name} />
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
            <div className="button-Container">
              <button className="actionButton1" onClick={()=>setStatus('Dispatched')} style={{backgroundColor: status === 'Dispatched'? 'orange': 'white', color: status === 'Dispatched'? 'white': 'orange' }}>Dispatched</button>
              <button className="actionButton2" onClick={()=>setStatus('Shipped')} style={{backgroundColor: status === 'Shipped'? 'green': 'white', color: status === 'Shipped'? 'white': 'green' }}>Shipped</button>
              <button className="actionButton3" onClick={()=>setStatus('Order Placed')} style={{backgroundColor: status === 'Order Placed'? 'purple': 'white', color: status === 'Order Placed'? 'white': 'purple' }}>Order Placed</button>
            </div>
          </div>
        </div>
      </form>
      {/* <Footer /> */}
    </>
  );
}

export default ViewCustOrder;
