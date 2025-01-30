import React, { useEffect, useState } from "react";
import "./Billing.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import backprint_t from "../../components/Images/Product Photos/12.jpeg";
import del from "../../components/Images/cross.png";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";

function BillingForOne() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
    const {id} = useParams();
    const {count} = useParams();
  const [country, setCountry] = useState({
    display: "none",
  });

  const handleCountryClick = () => {
    setCountry({ display: "block" });
  };

  const [selectedState, setSelectedState] = useState("");
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);

  const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleChange = (e) => {
    setSelectedState(e.target.value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const isValid = /^[789]\d{9}$/.test(value);

    if (!isValid && value !== "") {
      setErrorMessage(
        "Invalid phone number. Please enter a valid 10-digit phone number starting with 7, 8, or 9."
      );
    } else {
      setErrorMessage("");
    }

    setPhoneNumber(value);
  };

  const handleBlur = () => {
    if (!errorMessage && phoneNumber === "") {
      setErrorMessage("");
    }
  };

  const [email, setEmail] = useState("");
  const [errorMessagee, setErrorMessagee] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isValid && value !== "") {
      setErrorMessagee(
        "Invalid email address. Please enter a valid email address."
      );
    } else {
      setErrorMessagee("");
    }

    setEmail(value);
  };

  const handleBlurr = () => {
    if (!errorMessagee && email === "") {
      setErrorMessagee("");
    }
  };

  const [pincode, setPincode] = useState("");
  const [errorMessageee, setErrorMessageee] = useState("");

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    const isValid = /^\d{6}$/.test(value);

    if (!isValid && value !== "") {
      setErrorMessageee(
        "Invalid PIN code. Please enter a valid 6-digit PIN code."
      );
    } else {
      setErrorMessageee("");
    }

    setPincode(value);
  };

  const handleBlurrr = () => {
    if (!errorMessageee && pincode === "") {
      setErrorMessageee("");
    }
  };

  // const [cartItems, setcartItems] = useState([]);

  const {user} = useAuthContext()
  // const [cartItems, setCartItems]
//   const [adtItems, setAdtItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

//   const fetchData = async () => {
//     if (user) {
//       const response = await fetch(`http://localhost:5000/users/getuserbyid/${user.user?._id}`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//         },
//       });
//       const json = await response.json();
//       if (response.ok) {
//         setAdtItems(json.cart);
//       }
//     }
//   };

// useEffect(() => {
  

//   fetchData();
// }, [user]);

// Use another useEffect to monitor cartItems changes
useEffect(() => {
  const fetchData = async () => {
    try {
      
      const response = await fetch(`http://localhost:5000/products/getproductbyid/${id}`)
      const json = await response.json();
      if(response.ok)
      {
        setCartItems(json)
        console.log('cartItems', json)
      }
      
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // console.log('products', cartItems)

//   if (adtItems && adtItems.length > 0) {
if(user)
{

    fetchData();
}
    // console.log('adtItems', cartItems)
//   }
}, [user]);

  const totalAmount = cartItems.product?.price * count

  
  

  const handleDeleteItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    // e.preventDefault();
  
    try {
  
      // Prepare the data object for the request
      const data = {
        productIds: {product: id, quantity: count},
        firstName: firstName,
        lastName: lastName,
        country: 'INDIA',
        address: address,
        city: city,
        state: selectedState,
        pincode: pincode,
        phoneNumber: phoneNumber,
        email: email,
        totalPrice: totalAmount,
        status: 'Order Placed'
      };
      console.log("data", data);
  
      const response = await fetch(`http://localhost:5000/bills/billforone/${user.user?._id}/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const json = await response.json();
      if (response.ok) {
        console.log(json);
      } else {
        console.log('Failed to submit form:', json);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  

  //PAYMENT GATEWAY
  
  const paymentHandler = async(e) =>{
    e.preventDefault();
    const amount= totalAmount * 100;
    const currency= "INR";
    const receipt = "abcdef"
    const response = await fetch('http://localhost:5000/order',{
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const order = await response.json();
    console.log('payment', order)

    var options = {
      "key": "rzp_test_q34DaePkfJ8UeT", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "Acme Corp", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.order?.id, 
      "handler": async function(response){
        const body = {
          ...response, 
        }

        const validateRes = await fetch('http://localhost:5000/order/validate',{
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const json = await validateRes.json()
        if(validateRes.ok)
        {
          handleSubmit()
          navigate('/order')
        }
        console.log(json)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
      rzp1.open();
      e.preventDefault();
  }

  return (
    <>
    <Navbar></Navbar>
      <form className="billingMain" onSubmit={handleSubmit}>
        <div className="billingLeftMain">
          <div className="billingLeft">
            {/* <Link to={"/cart"}>
              <div className="backToCart">
                <p>Back to Cart</p>
              </div>
            </Link> */}
            <div className="blHeading">
              <h1>Billing and Shipping</h1>
            </div>
            <form className="form" action="">
              <div className="customerName">
                <div className="firstname">
                  <label htmlFor="">
                    First Name <span className="star">*</span>
                  </label>
                  <input type="text" placeholder="" onChange={(e)=>setFirstName(e.target.value)}/>
                </div>

                <div className="firstname">
                  <label htmlFor="">
                    Last Name <span className="star">*</span>
                  </label>
                  <input type="text" placeholder="" onChange={(e)=>setLastName(e.target.value)}/>
                </div>
              </div>

              <div className="newPass">
                <label htmlFor="">
                  Country <span className="star">*</span>
                </label>
                <input
                  type="text"
                  value="INDIA"
                  placeholder=""
                  onClick={handleCountryClick}
                />
                <p style={country}>Currently available for India.</p>
              </div>

              <div className="firstname">
                <label htmlFor="">
                  Street Address <span className="star">*</span>
                </label>
                <input type="text" placeholder="" onChange={(e)=>setAddress(e.target.value)}/>
              </div>

              <div className="customerName">
                <div className="firstname">
                  <label htmlFor="">
                    Town/City <span className="star">*</span>
                  </label>
                  <input type="text" placeholder="" onChange={(e)=>setCity(e.target.value)}/>
                </div>

                <div className="firstname">
                  <label htmlFor="">
                    State <span className="star">*</span>
                  </label>
                  <select
                    id="states"
                    value={selectedState}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="customerName">
                <div className="firstname">
                  <label htmlFor="">
                    Pin Code <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={handlePincodeChange}
                    onBlur={handleBlurrr}
                    placeholder="Enter your PIN code"
                  />
                  {errorMessageee && <p>{errorMessageee}</p>}
                </div>

                <div className="firstname">
                  <label htmlFor="">
                    Phone <span className="star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number"
                  />
                  {errorMessage && <p>{errorMessage}</p>}
                </div>
              </div>

              <div className="firstname">
                <label htmlFor="">
                  Email <span className="star">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleBlurr}
                  placeholder="Enter your email address"
                />
                {errorMessagee && <p>{errorMessagee}</p>}
              </div>
            </form>
          </div>
        </div>

        <div className="billingRgt">
          <div className="cartRgt cartRgtt">
            <div className="cartTotalHeading cartTotalHeadingg">
              <h1>Your Order</h1>
              <Link to={`/product/${id}/${count}`}>
              <p>Edit Order</p>
              </Link>
              {/* <p onClick={() => setShowDeleteIcons(!showDeleteIcons)}>Edit Order</p> */}
            </div>
            <div className="clContent clContentt">
              {cartItems &&  (
                <div key={cartItems._id} className="cItem1 cItem11">
                  <div className="cItem cItemm">
                    <div className="cItemImg cItemImgg">
                      <img src={`http://localhost:5000/uploads/${cartItems.product?.productImages[0]}`} alt={cartItems.product?.title} />
                    </div>
                    <div className="cItemDetails cItemDetailss">
                      <h2>{cartItems.product?.title}</h2>
                      <p>{cartItems.product?.category}</p>
                      <p className="quantity">Quantity: x{count}</p>
                    </div>
                    <div className="cItemPrice cItemPricee">
                      <h3>₹{cartItems.product?.price}</h3>
                    </div>
                    {showDeleteIcons && (
                      <div className="cItemDelete" onClick={() => handleDeleteItem(cartItems._id)}>
                        <img src={del} alt="Delete" className="del" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="clTotal clTotall">
                <h2>Total:</h2>
                <h2>₹{totalAmount}</h2>
              </div>
              {/* <Link to={'/order'} style={{ textDecoration: "none", cursor: "pointer" }}> */}
                <div className="cartCheckoutBtn">
                  <button onClick={paymentHandler}>Place Order</button>
                </div>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </form>
      <Footer></Footer>
    </>
  );
}

export default BillingForOne;
