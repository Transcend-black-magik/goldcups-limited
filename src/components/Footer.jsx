import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/main-logo.png'; // Update the path if needed
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
    <footer className="footer" ref={footerRef}>
      <div className={`footer-container ${isVisible ? 'footer-animate' : ''}`}>
        <div className={`footer-brand ${isVisible ? 'footer-animate' : ''}`}>
          <div className="footer-logo-container">
            <img src={logoImg} alt="Goldcups Limited Logo" className="footer-logo" />
            <div className="footer-logo-text">
              <h1 className="footer-title">Goldcups Limited</h1>
              <p className="footer-rc">RC 7043380</p>
            </div>
          </div>
          <p className="footer-description">
            Your trusted partner for business services and estate management in Nigeria. We empower growth,
            ensure compliance, and maximize value for our clients.
          </p>
        </div>

        <div className={`footer-columns ${isVisible ? 'footer-animate' : ''}`}>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>Purchasing and Contract Management</li>
              <li>Estate and Property Management</li>
              <li>Oil and Gas Service</li>
              <li>Business Service</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              
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
