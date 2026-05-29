import React from 'react';
import { Wallet, Target, Calculator, Mic, Languages, WifiOff, Users, ShieldAlert, Sparkles } from 'lucide-react';
import '../Landing.css';

const FeatureCard = ({ icon: Icon, title, description, type }) => (
  <div className={`feature-card ${type}`}>
    <div className={`feature-icon-wrapper ${type}`}>
      <Icon size={24} />
    </div>
    <h4 className="feature-title">{title}</h4>
    <p className="feature-desc">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="landing-section" id="features">
      <div className="landing-container">
        <h2 className="section-title">Designed for Rural Empowerment</h2>
        <p className="section-subtitle">
          Comprehensive tools built with simplicity and accessibility at the core.
        </p>

        <div className="features-category">
          <h3 className="category-title">Financial Features</h3>
          <div className="features-grid">
            <FeatureCard icon={Wallet} title="Expense Tracking" description="Easily log daily expenses and manage cash flow." type="financial" />
            <FeatureCard icon={Target} title="Savings Goals" description="Set targets for education, farming, or emergencies." type="financial" />
            <FeatureCard icon={Calculator} title="EMI Calculator" description="Understand loan repayments clearly before borrowing." type="financial" />
          </div>
        </div>

        <div className="features-category">
          <h3 className="category-title">Inclusion Features</h3>
          <div className="features-grid">
            <FeatureCard icon={Mic} title="Voice-First Interface" description="Navigate and interact using just your voice." type="inclusion" />
            <FeatureCard icon={Languages} title="Multilingual" description="Available in regional languages for better understanding." type="inclusion" />
            <FeatureCard icon={Users} title="SHG Management" description="Digital ledger and management for Self Help Groups." type="inclusion" />
          </div>
        </div>

        <div className="features-category">
          <h3 className="category-title">Smart Features</h3>
          <div className="features-grid">
            <FeatureCard icon={Sparkles} title="AI Financial Assistant" description="Get personalized advice and insights on your finances." type="smart" />
            <FeatureCard icon={ShieldAlert} title="Fraud Detection" description="Smart alerts to protect against unauthorized activities." type="smart" />
            <FeatureCard icon={WifiOff} title="Offline Access" description="Core features work even without an active internet connection." type="smart" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
