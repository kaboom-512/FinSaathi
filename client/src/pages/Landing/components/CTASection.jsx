import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../Landing.css';

const CTASection = () => {
  return (
    <section className="landing-section cta-section">
      <div className="landing-container">
        <div className="cta-box glass-card">
          <h2>Build Your Financial Future with FinSaathi</h2>
          <p>Join thousands of users who are already taking control of their finances and achieving their goals.</p>
          <div className="cta-actions">
            <Link to="/dashboard" className="landing-btn white lg">
              Join Now <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="landing-btn outline lg border-white text-white">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
