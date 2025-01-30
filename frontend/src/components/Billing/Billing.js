import React, { useEffect, useState } from "react";
import "./Billing.css";
import { Link } from "react-router-dom";
import backprint_t from "../../components/Images/Product Photos/12.jpeg";
import del from "../../components/Images/cross.png";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Razorpay from 'razorpay'

function Billing() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
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
  const [error, setError] = useState('')

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const isValid = /^[789]\d{9}$/.test(value);

    if (!isValid && value !== "") {
      setErrorMessage(
        "Invalid phone number. Please enter a valid 10-digit phone number starting with 7, 8, or 9."
      );
      setError(true)
    } else {
      setErrorMessage("");
      setError(false)
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
      setError(true)
    } else {
      setErrorMessagee("");
      setError(false)
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
      setError(true)
    } else {
      setErrorMessageee("");
      setError(false) 
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
  const [adtItems, setAdtItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    if (user) {
      const response = await fetch(`https://147.93.103.125:5000/users/getuserbyid/${user.user?._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAdtItems(json.cart);
      }
    }
  };

useEffect(() => {
  

  fetchData();
}, [user]);

// Use another useEffect to monitor cartItems changes
useEffect(() => {
  const fetchData = async () => {
    try {
      
      const productPromises = adtItems.map(item => 
        fetch(`https://147.93.103.125:5000/products/getproductbyid/${item.product}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        }).then(response => response.json())
      );

      const products = await Promise.all(productPromises);
     
      // setCartItems(products)
      

      // Assuming you want to set the fetched products in the cart items
      const updatedCartItems = products.map((product, index) => ({
        ...adtItems[index],
        productDetails: product // Adding product details to each cart item
      }));

      setCartItems(updatedCartItems);
      
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // console.log('products', cartItems)

  if (adtItems && adtItems.length > 0) {
    fetchData();
    console.log('adtItems', cartItems)
  }
}, [adtItems, user]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.productDetails?.product?.price * item.quantity,
    0
  );

  const productIds = cartItems?.reduce((accumulator, item) => {
    if (item?.productDetails?.product?._id) {
      accumulator.push(item.productDetails.product._id);
    }
    return accumulator;
  }, []);
  
  console.log('productIds', productIds);
  

  const handleDeleteItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()
 
  const [pay, setPay] = useState();
  


   //PAYMENT GATEWAY

  const paymentHandler = async(e) =>{
    e.preventDefault();

    const productDataArray = cartItems.map(item => ({
      product: item.productDetails.product._id,
      quantity: item.quantity // Include the quantity for each product
    }));

    if (productDataArray.length === 0) {
      console.log('No product data to submit.');
      return;
    }
    const data = {
      productIds: productDataArray, // Changed from productIds to productData
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

    if(!data?.firstName || !data?.lastName || !data?.country || !data?.address || !data?.city || !data?.state || !data?.pincode || !data?.phoneNumber || !data?.email || !data?.status || error)
      {
        return setPay(false)
      }
    const amount= totalAmount * 100;
    const currency= "INR";
    const receipt = "abcdef"
    const response = await fetch('https://147.93.103.125:5000/order',{
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

        const validateRes = await fetch('https://147.93.103.125:5000/order/validate',{
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        
    
        // Prepare the data object for the request
        

        const json = await validateRes.json()
        if(validateRes.ok)
        {
          try{
            const response = await fetch(`https://147.93.103.125:5000/bills/billforcart/${user.user?._id}`, {
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
              setPay(true)
              
              setTimeout(() => {
                
                navigate('/order')
              }, 1000);
            } else {
              setPay(false);
              console.log('Failed to submit form:', json);
            }
          }catch(error)
          {
            console.log('Error:', error);
          }
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
      // e.preventDefault();
  
  }
  // console.log(pay)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     // Prepare the data object with product IDs and quantities
  //     const productDataArray = cartItems.map(item => ({
  //       product: item.productDetails.product._id,
  //       quantity: item.quantity // Include the quantity for each product
  //     }));
  
  //     if (productDataArray.length === 0) {
  //       console.log('No product data to submit.');
  //       return;
  //     }
  
  //     // Prepare the data object for the request
  //     const data = {
  //       productIds: productDataArray, // Changed from productIds to productData
  //       firstName: firstName,
  //       lastName: lastName,
  //       country: 'INDIA',
  //       address: address,
  //       city: city,
  //       state: selectedState,
  //       pincode: pincode,
  //       phoneNumber: phoneNumber,
  //       email: email,
  //       totalPrice: totalAmount,
  //       status: 'Pending'
  //     };
  //     console.log("data", data);

  //     if(!data?.firstName || !data?.lastName || !data?.country || !data?.address || !data?.city || !data?.state || !data?.pincode || !data?.phoneNumber || !data?.email || !data?.status)
  //     {
  //       return setError(true)
  //     }else{
  //       paymentHandler();
  //       if(!pay)
  //       {
  //         console.log(pay)
  //         return setError(false)
  //       }
  //     }
      
  //     // if(pay)
  //     // {
  //       const response = await fetch(`https://147.93.103.125:5000/bills/billforcart/${user.user?._id}`, {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //         headers: {
  //           'Authorization': `Bearer ${user.token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       });
    
  //       const json = await response.json();
  //       if (response.ok) {
  //         console.log(json);
  //         setError(false)
          
  //         setTimeout(() => {
            
  //           navigate('/order')
  //         }, 1000);
  //       } else {
  //         setError(true);
  //         console.log('Failed to submit form:', json);
  //       }
  //     // }

     
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // }

  return (
    <>
    <Navbar></Navbar>
      <form className="billingMain">
        <div className="billingLeftMain">
          <div className="billingLeft">
            <Link to={`/cart/${user?.user?._id}`}>
              <div className="backToCart">
                <p>Back to Cart</p>
              </div>
            </Link>
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
              <Link to={`/cart/${user?.user?._id}`}>
              <p>Edit Order</p>
              </Link>
              {/* <p onClick={() => setShowDeleteIcons(!showDeleteIcons)}>Edit Order</p> */}
            </div>
            <div className="clContent clContentt">
              {cartItems?.map((item) => (
                <div key={item._id} className="cItem1 cItem11">
                  <div className="cItem cItemm">
                    <div className="cItemImg cItemImgg">
                      <img src={`https://147.93.103.125:5000/uploads/${item.productDetails?.product?.productImages[0]}`} alt={item.productDetails?.product?.title} />
                    </div>
                    <div className="cItemDetails cItemDetailss">
                      <h2>{item.productDetails?.product?.title}</h2>
                      <p>{item.productDetails?.product?.category}</p>
                      <p className="quantity">Quantity: x{item.quantity}</p>
                    </div>
                    <div className="cItemPrice cItemPricee">
                      <h3>₹{item.productDetails?.product?.price}</h3>
                    </div>
                    {showDeleteIcons && (
                      <div className="cItemDelete" onClick={() => handleDeleteItem(item._id)}>
                        <img src={del} alt="Delete" className="del" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="clTotal clTotall">
                <h2>Total:</h2>
                <h2>₹{totalAmount}</h2>
              </div>
              {/* <Link to={'/order'} style={{ textDecoration: "none", cursor: "pointer" }}> */}
              {pay===false && <p className="error">Failed to submit the form. Please check the details.</p> }
              { pay && <p className="success">
                Order placed successfully</p>}
                <div className="cartCheckoutBtn-po"  >
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

export default Billing;
