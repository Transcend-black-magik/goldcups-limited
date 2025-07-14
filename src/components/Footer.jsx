import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className="footer"
      ref={footerRef}
    >
      <div className={`footer-container ${isVisible ? 'footer-animate' : ''}`}>
        <div className={`footer-brand ${isVisible ? 'footer-animate' : ''}`}>
          <h2 className="footer-logo">🏆 Goldcups Limited</h2>
          <p className="footer-description">
            Your trusted partner for business services and estate management in Nigeria. We empower growth,
            ensure compliance, and maximize value for our clients.
          </p>
        </div>

        <div className={`footer-columns ${isVisible ? 'footer-animate' : ''}`}>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>Business Registration</li>
              <li>Tax Registration</li>
              <li>Annual Returns</li>
              <li>Property Management</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Our Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`footer-bottom ${isVisible ? 'footer-animate' : ''}`}>
        <small>© {new Date().getFullYear()} Goldcups Limited. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
