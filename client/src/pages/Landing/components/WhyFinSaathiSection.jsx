import React from 'react';
import { HeartHandshake, Leaf, Globe2, Ear } from 'lucide-react';
import '../Landing.css';

const WhyFinSaathiSection = () => {
  return (
    <section className="landing-section" id="why-finsaathi">
      <div className="landing-container">
        <h2 className="section-title">Why Choose FinSaathi?</h2>
        <p className="section-subtitle">
          We are more than an app; we are a community-driven movement for financial empowerment.
        </p>

        <div className="why-grid">
          <div className="why-card glass-card">
            <Leaf className="why-icon text-green" size={40} />
            <h3>Rural-First Design</h3>
            <p>Built specifically for the needs and contexts of rural communities, ensuring relevance and ease of use.</p>
          </div>
          
          <div className="why-card glass-card">
            <Globe2 className="why-icon text-blue" size={40} />
            <h3>Multilingual</h3>
            <p>Breaking language barriers. Access all features in your preferred regional language.</p>
          </div>

          <div className="why-card glass-card">
            <Ear className="why-icon text-purple" size={40} />
            <h3>Voice Accessibility</h3>
            <p>Not comfortable typing? Use our advanced voice-first interface to interact naturally.</p>
          </div>

          <div className="why-card glass-card">
            <HeartHandshake className="why-icon text-red" size={40} />
            <h3>Community Driven</h3>
            <p>Empowering Self Help Groups (SHGs) to manage funds transparently and collaboratively.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFinSaathiSection;
