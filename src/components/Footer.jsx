import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/main-logo.png";
import "./Footer.css";

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
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={`footer ${isVisible ? "footer-animate" : ""}`} ref={footerRef} aria-label="Site Footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo-container">
            <img src={logoImg} alt="Goldcups Limited company logo" className="footer-logo" />
            <div className="footer-logo-text">
              <h1 className="footer-title">Goldcups Limited</h1>
              <p className="footer-rc">RC 7043380</p>
            </div>
          </div>
          <p className="footer-description">
            Your trusted partner for business services and estate management in Nigeria.
            We empower growth, ensure compliance, and maximize value for our clients.
          </p>
        </div>

        {/* Footer Links */}
        <nav className="footer-columns" aria-label="Footer Navigation">
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#purchasing-contract">Purchasing & Contract Management</Link></li>
              <li><Link to="/services#estate-property">Estate & Property Management</Link></li>
              <li><Link to="/services#oil-gas">Oil & Gas Services</Link></li>
              <li><Link to="/services#business">Business Services</Link></li>
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
        </nav>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Goldcups Limited. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
