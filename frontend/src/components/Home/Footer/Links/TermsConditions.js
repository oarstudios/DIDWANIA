import React, {useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import './links.css';  // Make sure to change the CSS import to the new filename
import Footer from '../Footer';

function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
      <Navbar />
      <div id="terms-conditions" className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to Didwania Creations! These Terms and Conditions ("Terms") govern your use of our website located at <a href="https://www.didwaniacreations.in/" target="_blank" rel="noopener noreferrer">https://www.didwaniacreations.in/</a>. By accessing or using the Site, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the Site.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          Didwania Creations reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on the Site. Your continued use of the Site after any changes indicates your acceptance of the revised Terms.
        </p>

        <h2>Use of the Site</h2>
        <ul>
          <li><strong>Eligibility:</strong> You must be at least 18 years old or have the consent of a parent or guardian to use the Site.</li>
          <li><strong>Account Responsibility:</strong> If you create an account on the Site, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>
          <li><strong>Prohibited Conduct:</strong> You agree not to use the Site for any unlawful purpose or in any way that may damage, disable, overburden, or impair the Site.</li>
        </ul>

        <h2>Intellectual Property</h2>
        <ul>
          <li><strong>Ownership:</strong> All content and materials on the Site, including but not limited to text, graphics, logos, images, and software, are the property of Didwania Creations or its licensors and are protected by intellectual property laws.</li>
          <li><strong>Usage:</strong> You may not reproduce, distribute, modify, or create derivative works from any content on the Site without the prior written permission of Didwania Creations.</li>
        </ul>

        <h2>Products and Services</h2>
        <ul>
          <li><strong>Product Information:</strong> We strive to provide accurate descriptions of our products and services. However, we do not warrant that product descriptions or other content on the Site are accurate, complete, reliable, or error-free.</li>
          <li><strong>Pricing:</strong> Prices for products and services are subject to change without notice. We reserve the right to correct any errors in pricing or product information.</li>
        </ul>

        <h2>Orders and Payments</h2>
        <ul>
          <li><strong>Order Processing:</strong> All orders are subject to acceptance and availability. We may refuse or cancel any order at our discretion.</li>
          <li><strong>Payment:</strong> Payments for products and services must be made through the payment methods specified on the Site. You are responsible for providing accurate payment information.</li>
        </ul>

        <h2>Shipping and Returns</h2>
        <ul>
          <li><strong>Shipping:</strong> Shipping terms, including delivery times and costs, will be provided during the checkout process.</li>
          <li><strong>Returns:</strong> Our return policy is outlined on the Site. Please review our return policy before making a purchase.</li>
        </ul>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Didwania Creations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data or use, arising from your use of the Site or any products or services purchased through the Site.
        </p>

        <h2>Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Didwania Creations, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or related to your use of the Site or your violation of these Terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from or relating to these Terms or your use of the Site shall be resolved exclusively in the courts located in [Your Jurisdiction].
        </p>
      </div>
      <Footer/>
    </>
  );
}

export default TermsConditions;

