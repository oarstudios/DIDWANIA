import React, {useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import './links.css';
import Footer from '../Footer';

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
      <Navbar />
      <div id="contact-container">
        <h1>Contact Us</h1>
        
        <div className="contact-box">
          <h2>Email Us</h2>
          <p>If you have any questions or need further assistance, feel free to reach out to us via email.</p>
          <a href="mailto:didwaniacreations@gmail.com" className="contact-link">Send an Email</a>
        </div>

        <div className="contact-box">
          <h2>WhatsApp Us</h2>
          <p>You can also contact us on WhatsApp or call us directly for quick responses.</p>
          <a href="https://wa.me/+918591100176" target="_blank" rel="noopener noreferrer" className="contact-link">Chat on WhatsApp</a>
        </div>

        <div className="contact-box">
          <h2>Call Us</h2>
          <p>If you prefer to speak directly, you can call us anytime.</p>
          <a href="tel:+918591100176" className="contact-link">Call Now</a>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ContactUs;
