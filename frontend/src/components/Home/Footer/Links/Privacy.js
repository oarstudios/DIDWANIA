import React, {useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import './links.css';
import Footer from '../Footer';

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
      <Navbar />
      <div id="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>Welcome to Didwania Creations. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.didwaniacreations.in/" target="_blank" rel="noopener noreferrer">https://www.didwaniacreations.in/</a> (the "Site"). By using our Site, you agree to the practices described in this policy.</p>

        <h2>Information We Collect</h2>

        <h3>Personal Information</h3>
        <p>When you use our Site, we may collect personally identifiable information that you provide to us voluntarily, such as:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number.</li>
          <li><strong>Payment Information:</strong> Credit card details, billing address (processed through secure payment gateways).</li>
          <li><strong>Account Information:</strong> Username, password, and other details you provide when creating an account.</li>
        </ul>

        <h3>Non-Personal Information</h3>
        <p>We may also collect non-personal information about your visit to the Site, including:</p>
        <ul>
          <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages viewed, and the time spent on our Site.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> Information collected through cookies and other tracking technologies to enhance your browsing experience.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information for various purposes, including:</p>
        <ul>
          <li><strong>To Provide and Improve Services:</strong> Process your orders, respond to inquiries, and enhance our Site and services.</li>
          <li><strong>To Communicate:</strong> Send updates, newsletters, marketing materials, and other information related to our services (you may opt-out of marketing communications at any time).</li>
          <li><strong>To Process Payments:</strong> Handle transactions and prevent fraudulent activities.</li>
          <li><strong>To Personalize Experience:</strong> Customize content and advertisements based on your interests and usage patterns.</li>
          <li><strong>To Comply with Legal Obligations:</strong> Fulfill legal requirements and protect our rights and the rights of others.</li>
        </ul>

        <h2>How We Share Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third parties who assist us in operating the Site, processing payments, and delivering services (e.g., payment processors, shipping companies).</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
        </ul>

        <h2>Your Choices and Rights</h2>
        <p>You have the following rights regarding your personal information:</p>
        <ul>
          <li><strong>Access and Update:</strong> Access and update your personal information through your account settings or by contacting us.</li>
          <li><strong>Opt-Out:</strong> Opt-out of receiving marketing communications by following the unsubscribe instructions in the emails or contacting us directly.</li>
          <li><strong>Delete:</strong> Request the deletion of your personal information, subject to applicable legal and contractual obligations.</li>
        </ul>

        <h2>Data Security</h2>
        <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

        <h2>Cookies and Tracking Technologies</h2>
        <p>We use cookies and similar tracking technologies to enhance your experience on our Site. Cookies are small data files stored on your device that help us understand your preferences and improve our services. You can control cookies through your browser settings.</p>

        <h2>Third-Party Links</h2>
        <p>Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>

        <h2>Children’s Privacy</h2>
        <p>Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it.</p>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant updates. Your continued use of the Site after any changes indicates your acceptance of the revised policy.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <p><strong>Didwania Creations</strong><br/>
          Email: didwaniacreations@gmail.com<br/>
          Phone: 8591100176<br/>
          Address: Shop no 21, Ground floor, 2nd Bhoiwada, Bhuleshwar, Mumbai- 400002.</p>
        <p>Thank you for visiting Didwania Creations. We are committed to protecting your privacy and ensuring a safe and enjoyable experience on our Site.</p>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
