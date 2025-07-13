import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="trophy-icon" role="img" aria-label="trophy" style={{ fontSize: '2rem', marginRight: '0.1rem' }}>🏆</span>
        <h1 className="logo" >Goldcups Limited</h1>
        <div className="menu-icon" onClick={toggleMenu} style={{ marginRight: '1rem' }}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} style={{ display: 'flex', gap: '2.5rem', marginLeft: 'auto' }}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header
