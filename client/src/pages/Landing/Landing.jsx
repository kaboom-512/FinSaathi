import React, { useEffect } from 'react';
import './Landing.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyFinSaathiSection from './components/WhyFinSaathiSection';
import ImpactSection from './components/ImpactSection';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Landing = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WhyFinSaathiSection />
        <ImpactSection />
        <TestimonialSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
