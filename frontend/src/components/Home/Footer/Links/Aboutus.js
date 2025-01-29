import React, {useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import './links.css';  // Make sure to change the CSS import to the new filename
import Footer from '../Footer';

function Aboutus() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <>
      <Navbar />
      <div id="about-us" className="aboutus-container">
        {/* Hero Section */}
        <section className="hero-text">
          <h1>Didwania Creations</h1>
          <p>Turning Dreams into Reality through Bespoke Design Solutions</p>
        </section>

        {/* Content Sections */}
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Didwania Creations was born out of a love for creativity and a desire to offer something truly special. Our journey began with a single idea: to blend artistic vision with exceptional craftsmanship to produce stunning designs that leave a lasting impression.
          </p>
          <p>
            Our founder, Late Shri Sanjeev Didwania, with 18 years of experience in the design industry, set out to create a space where artistry meets functionality. From humble beginnings, Didwania Creations has grown into a trusted name in the industry, known for our commitment to quality and customer satisfaction.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Philosophy</h2>
          <p>
            At Didwania Creations, we believe that design is not just about aesthetics but about creating experiences. Our approach is centered around understanding your needs and translating them into tangible creations that resonate with your vision. We take pride in our attention to detail and our ability to bring out the unique essence of each project.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Custom Design Services: Whether it's for a home, office, or special event, our custom design services are tailored to bring your ideas to life.</li>
            <li>Artisanal Products: Explore our collection of handcrafted items that combine traditional techniques with modern design.</li>
            <li>Consultation and Planning: Our expert team provides personalized consultations to help you plan and execute your design projects with ease.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team is a blend of talented designers, skilled artisans, and dedicated professionals who share a common goal: to create exceptional designs that exceed expectations. Each member brings their unique skills and passion to the table, ensuring that every project we undertake is executed with precision and care.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Personalized Approach: We take the time to understand your needs and preferences, ensuring that every creation is a true reflection of your vision.</li>
            <li>Quality Craftsmanship: Our commitment to quality is evident in every detail, from the materials we use to the final execution.</li>
            <li>Innovative Designs: We stay ahead of design trends and continuously explore new ideas to offer you the most innovative solutions.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Commitment</h2>
          <p>
            At Didwania Creations, we are committed to delivering excellence in every aspect of our work. We strive to build lasting relationships with our clients by providing exceptional service and unparalleled designs. Your satisfaction is our top priority, and we are dedicated to making your experience with us memorable.
          </p>
          <p>Thank you for visiting Didwania Creations. We look forward to working with you and creating something extraordinary together!</p>
        </section>
      </div>
      <Footer/>
    </>
  );
}

export default Aboutus;
