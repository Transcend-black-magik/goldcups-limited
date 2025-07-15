import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from '../assets/main-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleMenuToggle = () => setIsMenuOpen(prev => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  // Detect window resize to toggle between mobile and desktop layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // close menu if switching to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src={logoImg} alt="Goldcups Limited Logo" className="logo-image" />
          <h1 className="logo">Goldcups <span className="logo-sub">Limited</span></h1>
        </div>

        {isMobile ? (
          <>
            {/* Mobile Hamburger Icon */}
            <div className="menu-icon" onClick={handleMenuToggle} aria-label="Toggle menu">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </div>

            {/* Mobile Navigation Links */}
            <ul className={`nav-links-mobile ${isMenuOpen ? 'active' : ''}`}>
              <li><Link to="/" onClick={handleCloseMenu}>Home</Link></li>
              <li><Link to="/services" onClick={handleCloseMenu}>Services</Link></li>
              <li><Link to="/about" onClick={handleCloseMenu}>About Us</Link></li>
              <li><Link to="/contact" onClick={handleCloseMenu}>Contact</Link></li>
            </ul>
          </>
        ) : (
          // Desktop Navigation Links
          <ul className="nav-links-desktop">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
