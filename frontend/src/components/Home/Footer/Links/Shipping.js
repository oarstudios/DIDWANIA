import React, {useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import './links.css';
import Footer from '../Footer';

function Shipping() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
      <Navbar />
      <div id="shipping-policy-container">
        <h1>Shipping & Delivery Policy</h1>
        
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
            Once the order is placed for delivery, it cannot be redirected to
            another address and also cannot be cancelled.
          </li>
          <li>
            Although we try not to, occasionally, substitution is necessary
            due to temporary and/or regional unavailability issues. Please
            be noted that we may have to do this without informing you
            because we give utmost importance to delivery on time since most
            of our orders are gifts for a certain occasion.
          </li>
        </ul>

        <h2>Order Status</h2>
        <p>
          You can check the status of your order in the Orders section of your account. 
          If you have any questions regarding your order, feel free to <a href="/ContactUs">contact us</a>.
        </p>

      </div>
      <Footer/>
    </>
  );
}

export default Shipping;

