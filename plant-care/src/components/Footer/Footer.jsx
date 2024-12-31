import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>Plant Care Reminder</h3>
          <p className="footer-tagline">Your plants, our priority 🌱</p>
          <p>&copy; 2024 Plant Care Reminder. All Rights Reserved.</p>
        </div>

        <div className="footer-center">
          <h4>Quick Links</h4>
          <nav>
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Blog</a>
            <a href="#" className="nav-link">Contact</a>
          </nav>
        </div>

        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook" className="tooltip" data-tooltip="Facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter" className="tooltip" data-tooltip="Twitter">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="tooltip" data-tooltip="Instagram">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="tooltip" data-tooltip="LinkedIn">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#" aria-label="YouTube" className="tooltip" data-tooltip="YouTube">
              <i className="fa fa-youtube"></i>
            </a>
          </div>

          <h4>Contact Us</h4>
          <p><i className="fa fa-phone"></i> +1 234 567 890</p>
          <p><i className="fa fa-envelope"></i> support@plantcare.com</p>
          <p><i className="fa fa-map-marker"></i> 123 Green Street, Green City</p>
        </div>
      </div>

      <div className="newsletter-section">
        <h4>Subscribe to Our Newsletter</h4>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
