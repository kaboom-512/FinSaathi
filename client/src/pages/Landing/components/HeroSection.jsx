import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Smartphone, Mic } from 'lucide-react';
import '../Landing.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="landing-container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Empowering Rural India
          </div>
          <h1 className="hero-title">
            Financial Inclusion for <br />
            <span className="text-gradient">Every Village, Every Family.</span>
          </h1>
          <p className="hero-subtitle">
            A multilingual, voice-first rural finance platform helping communities manage savings, loans, financial literacy, and digital inclusion.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="landing-btn primary lg">
              Get Started <ArrowRight size={18} />
            </Link>
            <a href="#features" className="landing-btn outline lg">
              Explore Features
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><ShieldCheck size={16} /> Secure</div>
            <div className="trust-item"><Smartphone size={16} /> Offline Ready</div>
            <div className="trust-item"><Mic size={16} /> Voice First</div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-dashboard-mockup glass-card">
            <div className="mockup-header">
              <div className="mockup-circles">
                <span className="circle r"></span>
                <span className="circle y"></span>
                <span className="circle g"></span>
              </div>
              <div className="mockup-title">FinSaathi Dashboard</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-card balance-card">
                <div className="card-label">Total Savings</div>
                <div className="card-value">₹ 12,450</div>
                <div className="card-trend positive">+ ₹450 this month</div>
              </div>
              <div className="mockup-grid">
                <div className="mockup-mini-card">
                  <div className="mc-icon shg"></div>
                  <div className="mc-info">
                    <div className="mc-title">SHG Group</div>
                    <div className="mc-sub">Active</div>
                  </div>
                </div>
                <div className="mockup-mini-card">
                  <div className="mc-icon loan"></div>
                  <div className="mc-info">
                    <div className="mc-title">Loan EMI</div>
                    <div className="mc-sub">Due in 5 days</div>
                  </div>
                </div>
              </div>
              <div className="mockup-chart">
                <div className="chart-bar" style={{height: '40%'}}></div>
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '35%'}}></div>
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar primary" style={{height: '100%'}}></div>
              </div>
            </div>
          </div>
          <div className="hero-blob"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
