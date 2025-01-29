import React, {useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import './links.css';
import Footer from '../Footer';

function RefundReturns() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
      <Navbar />
      <div id="refund-returns-container">
        <h1>Refund and Returns Policy</h1>
        <p>
          Thank you for shopping at Didwania Creations. We take great care in crafting our products and ensuring they meet the highest standards of quality. 
          Please note that all sales are final, and we do not offer refunds or returns on any of our products.
        </p>
        <p>
          We encourage you to carefully review your purchase before completing your order. If you have any questions or concerns, feel free to reach out to our 
          support team, and we will be happy to assist you.
        </p>
        <p>
          Your satisfaction is our priority, and we stand behind the quality of our creations. Thank you for your understanding and support.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default RefundReturns;
