import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="landing-container nav-container">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">
            <Leaf size={20} />
          </div>
          FinSaathi
        </Link>

        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#impact" className="nav-link">Impact</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="landing-btn outline" style={{ padding: '8px 20px' }}>Login</Link>
          <Link to="/login" className="landing-btn primary" style={{ padding: '8px 20px' }}>Get Started</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
          <a href="#impact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Impact</a>
          <a href="#faq" className="nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <Link to="/login" className="landing-btn outline" style={{ width: '100%' }}>Login</Link>
            <Link to="/login" className="landing-btn primary" style={{ width: '100%' }}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
