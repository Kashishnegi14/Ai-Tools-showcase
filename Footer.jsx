import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">
            We are dedicated to providing the best service and products to our
            customers.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Info</h3>
          <ul className="footer-contact">
            <li>123 Main Street, City</li>
            <li>Email: info@example.com</li>
            <li>Phone: (123) 456-7890</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
