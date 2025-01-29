import React, { useEffect } from 'react';
import './Order.css';
import OrderLeft from './OrderLeft';
import OrderRgt from './OrderRgt';
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
    <Navbar></Navbar>
    <div className="order">
      <OrderLeft />
      <OrderRgt />
    </div>
    <Footer></Footer>
    </>
  );
};

export default Order;
