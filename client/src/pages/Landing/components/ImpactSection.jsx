import React from 'react';
import { BookOpen, Trophy, Award } from 'lucide-react';
import '../Landing.css';

const ImpactSection = () => {
  return (
    <section className="landing-section bg-light" id="impact">
      <div className="landing-container">
        <h2 className="section-title">Financial Literacy & Impact</h2>
        <p className="section-subtitle">
          Empowering communities through accessible education and gamified learning.
        </p>

        <div className="impact-layout">
          <div className="impact-visual">
            <div className="impact-badges-container glass-card">
              <div className="badge-item">
                <Trophy className="text-yellow" size={32} />
                <span>Super Saver</span>
              </div>
              <div className="badge-item">
                <Award className="text-purple" size={32} />
                <span>Budget Master</span>
              </div>
              <div className="badge-item">
                <BookOpen className="text-blue" size={32} />
                <span>Loan Expert</span>
              </div>
            </div>
          </div>
          
          <div className="impact-content">
            <h3>Learn While You Earn</h3>
            <p className="impact-desc">
              Financial independence starts with knowledge. FinSaathi offers interactive, bite-sized modules on saving, investing, and avoiding debt traps.
            </p>
            <ul className="impact-list">
              <li><CheckIcon /> Gamified learning paths</li>
              <li><CheckIcon /> Rewards for completing modules</li>
              <li><CheckIcon /> Real-life financial simulations</li>
              <li><CheckIcon /> Community leaderboards</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ImpactSection;
