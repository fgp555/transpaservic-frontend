import React from "react";

const About = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are dedicated to providing top-notch services 
        and ensuring customer satisfaction. Our team works hard to deliver the 
        best experience for our users.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to empower individuals and businesses by offering innovative 
        solutions tailored to their needs.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>High-quality products and services</li>
        <li>Exceptional customer support</li>
        <li>Customized solutions</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        Have questions or need more information? Feel free to reach out to us at 
        <a href="mailto:contact@ourcompany.com"> contact@ourcompany.com</a>.
      </p>
    </div>
  );
};

export default About;
