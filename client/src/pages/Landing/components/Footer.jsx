import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Globe } from 'lucide-react';
import '../Landing.css';

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Leaf size={24} className="text-green" />
              FinSaathi
            </Link>
            <p className="footer-desc">
              Empowering rural communities through accessible, voice-first, and multilingual financial technology.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Website"><Globe size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#impact">Impact</a>
            <a href="#faq">FAQ</a>
          </div>
          
          <div className="footer-links-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
          </div>
          
          <div className="footer-links-group">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/security">Security</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FinSaathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
