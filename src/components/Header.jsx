import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoImg from '../assets/main-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const handleMenuToggle = () => setIsMenuOpen(prev => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      ref={navRef}
    >
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src={logoImg} alt="Goldcups Limited Logo" className={`logo-image ${isScrolled ? 'shrink' : ''}`} />
          <div className="logo-text">
            <h1 className="logo">Goldcups <span className="logo-sub">Limited</span></h1>
            <div className="rc-number">RC 7043380</div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="menu-icon" onClick={handleMenuToggle} aria-label="Toggle menu">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>

        {/* Mobile Nav */}
        <ul className={`nav-links-mobile ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={handleCloseMenu}>Home</Link></li>
          <li><Link to="/services" onClick={handleCloseMenu}>Services</Link></li>
          <li><Link to="/about" onClick={handleCloseMenu}>About Us</Link></li>
          <li><Link to="/contact" onClick={handleCloseMenu}>Contact</Link></li>
        </ul>

        {/* Desktop Nav */}
        <ul className="nav-links-desktop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
