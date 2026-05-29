import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../Landing.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h3>{question}</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="landing-section bg-light" id="faq">
      <div className="landing-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Got questions? We have answers.
        </p>

        <div className="faq-container">
          <FAQItem 
            question="Is FinSaathi free to use?" 
            answer="Yes, the core features of FinSaathi including expense tracking, savings goals, and basic financial literacy modules are completely free for individual users." 
          />
          <FAQItem 
            question="Does it support local languages?" 
            answer="Absolutely! FinSaathi is designed to support multiple regional languages. You can switch your preferred language at any time in the settings." 
          />
          <FAQItem 
            question="Can it work offline?" 
            answer="Yes, we understand that internet connectivity can be an issue in rural areas. Essential features like logging expenses and checking saved ledgers work offline and sync when you're back online." 
          />
          <FAQItem 
            question="Is my data secure?" 
            answer="Security is our top priority. Your financial data is encrypted and securely stored. We do not share your personal information with third parties without your explicit consent." 
          />
          <FAQItem 
            question="How do loans and savings work?" 
            answer="FinSaathi acts as a bridge. We partner with formal financial institutions to offer you micro-loans based on your digital financial profile built on our platform." 
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
