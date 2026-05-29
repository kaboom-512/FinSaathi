import React from 'react';
import { Star } from 'lucide-react';
import '../Landing.css';

const TestimonialCard = ({ quote, author, role }) => (
  <div className="testimonial-card glass-card">
    <div className="stars">
      <Star fill="#F59E0B" color="#F59E0B" size={16} />
      <Star fill="#F59E0B" color="#F59E0B" size={16} />
      <Star fill="#F59E0B" color="#F59E0B" size={16} />
      <Star fill="#F59E0B" color="#F59E0B" size={16} />
      <Star fill="#F59E0B" color="#F59E0B" size={16} />
    </div>
    <p className="testimonial-quote">"{quote}"</p>
    <div className="testimonial-author">
      <div className="author-avatar"></div>
      <div className="author-info">
        <h4>{author}</h4>
        <span>{role}</span>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="landing-section" id="testimonials">
      <div className="landing-container">
        <h2 className="section-title">Stories of Empowerment</h2>
        <p className="section-subtitle">
          Hear from the people who are changing their financial future with FinSaathi.
        </p>

        <div className="testimonials-grid">
          <TestimonialCard 
            quote="FinSaathi helped our SHG manage our funds transparently. We no longer rely on paper ledgers, and everyone can check the balance on their phone."
            author="Lakshmi D."
            role="SHG Member, Maharashtra"
          />
          <TestimonialCard 
            quote="The voice-first feature is incredible. I can just speak in my native language to record my daily farming expenses. It's so easy!"
            author="Ramesh K."
            role="Farmer, Karnataka"
          />
          <TestimonialCard 
            quote="I learned how to save for my children's education using the financial literacy modules. Earning badges made it fun."
            author="Sunita P."
            role="Small Business Owner"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
