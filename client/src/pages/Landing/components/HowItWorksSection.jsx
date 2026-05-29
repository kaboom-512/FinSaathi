import React from 'react';
import { UserPlus, UserCheck, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import '../Landing.css';

const StepCard = ({ number, icon: Icon, title, desc }) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <div className="step-icon-wrapper">
      <Icon size={28} />
    </div>
    <h4 className="step-title">{title}</h4>
    <p className="step-desc">{desc}</p>
  </div>
);

const HowItWorksSection = () => {
  return (
    <section className="landing-section bg-light" id="how-it-works">
      <div className="landing-container">
        <h2 className="section-title">Your Journey to Financial Freedom</h2>
        <p className="section-subtitle">
          Getting started with FinSaathi is simple, secure, and tailored for you.
        </p>

        <div className="steps-container">
          <div className="steps-timeline"></div>
          <div className="steps-grid">
            <StepCard number="1" icon={UserPlus} title="Sign Up" desc="Quick and easy registration with mobile number." />
            <StepCard number="2" icon={UserCheck} title="Build Profile" desc="Create your financial profile and set goals." />
            <StepCard number="3" icon={TrendingUp} title="Track & Save" desc="Log expenses, track income, and build savings." />
            <StepCard number="4" icon={Landmark} title="Access Services" desc="Apply for micro-loans or join SHGs." />
            <StepCard number="5" icon={ShieldCheck} title="Grow Confidence" desc="Learn through gamified financial literacy modules." />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
