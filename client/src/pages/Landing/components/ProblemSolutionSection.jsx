import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import '../Landing.css';

const ProblemSolutionSection = () => {
  return (
    <section className="landing-section bg-light" id="problem-solution">
      <div className="landing-container">
        <h2 className="section-title">Bridging the Financial Divide</h2>
        <p className="section-subtitle">
          Rural communities face unique challenges. FinSaathi provides tailored digital solutions.
        </p>

        <div className="ps-grid">
          <div className="ps-card problem">
            <div className="ps-header">
              <XCircle className="ps-icon text-red" size={32} />
              <h3>The Challenge</h3>
            </div>
            <ul className="ps-list">
              <li>Limited access to formal banking</li>
              <li>Complex financial systems and jargon</li>
              <li>Low digital and financial literacy</li>
              <li>Dependence on informal credit (high interest)</li>
            </ul>
          </div>

          <div className="ps-divider">
            <div className="ps-arrow"></div>
          </div>

          <div className="ps-card solution glass-card">
            <div className="ps-header">
              <CheckCircle className="ps-icon text-green" size={32} />
              <h3>The FinSaathi Solution</h3>
            </div>
            <ul className="ps-list">
              <li>Assisted and accessible banking features</li>
              <li>Multilingual and Voice-First interfaces</li>
              <li>Gamified financial literacy programs</li>
              <li>Community-driven SHG (Self Help Group) management</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
