import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import { Mail, Shield, CheckCircle, ArrowRight, RefreshCw, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Login.css';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useSupabase();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '', '', '']);
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const otpInputsRef = useRef([]);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Countdown timer for resending OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus first OTP field on step 2 transition
  useEffect(() => {
    if (step === 2 && otpInputsRef.current[0]) {
      setTimeout(() => otpInputsRef.current[0].focus(), 150);
    }
  }, [step]);

  // Email format validation helper
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Handlers for Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Sending verification code...');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        email: email.trim()
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Verification code sent!', { id: toastId });
        setStep(2);
        setCountdown(30); // 30 seconds cooldown
        
        // Developer Helper Toast (if backend returned a devMessage)
        if (response.data.devMessage) {
          toast.success(response.data.devMessage, {
            duration: 10000,
            icon: '🔧'
          });
        }
      } else {
        toast.error(response.data.message || 'Failed to send OTP.', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error connecting to the auth server. Ensure backend is running.';
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers for Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    const toastId = toast.loading('Resending verification code...');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        email: email.trim()
      });

      if (response.data.success) {
        toast.success('Verification code resent!', { id: toastId });
        setCountdown(30);
        setOtp(['', '', '', '', '', '', '', '']); // Clear current OTP inputs
        
        if (response.data.devMessage) {
          toast.success(response.data.devMessage, {
            duration: 10000,
            icon: '🔧'
          });
        }
      } else {
        toast.error(response.data.message || 'Failed to resend OTP.', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error resending code.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // OTP segmented inputs handling
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Allow numbers only
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Maintain single character
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 7) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Navigate backwards on Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (pastedData.length === 8 && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpInputsRef.current[7].focus();
    }
  };

  // Handler for OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 8) {
      toast.error('Please enter the full 8-digit verification code.');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Verifying code...');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        email: email.trim(),
        otp: enteredOtp
      });

      if (response.data.success) {
        const { token, user: userProfile } = response.data;
        login(token, userProfile);
        toast.success(`Namaste! Welcome back to FinSaathi. 🙏`, { id: toastId });
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid verification code.', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Verification failed. Try again.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-root-container">
      <div className="login-visual-sidebar">
        <div className="visual-branding">
          <div className="brand-logo-row">
            <div className="brand-icon-box">
              <Landmark size={32} className="brand-icon" />
            </div>
            <span className="brand-name">FinSaathi</span>
          </div>
          
          <div className="visual-content">
            <h1 className="visual-headline">Secure Access to Your Financial Journey</h1>
            <p className="visual-subhead">
              We empower self-help groups, farmers, youth, and small businesses to build a brighter financial future. Log in securely to access tailored resources, transaction ledgers, and government schemes.
            </p>
          </div>
          
          <div className="visual-footer">
            <div className="trust-badge">
              <Shield size={18} className="trust-badge-icon" />
              <span>Cryptographically Secured authentication</span>
            </div>
            <p className="footer-copyright">&copy; 2026 FinSaathi. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      <div className="login-form-wrapper">
        <div className="login-card-container">
          <div className="mobile-only-header">
            <div className="brand-logo-row">
              <div className="brand-icon-box">
                <Landmark size={28} className="brand-icon" />
              </div>
              <span className="brand-name">FinSaathi</span>
            </div>
          </div>

          <div className="card-header">
            <h2 className="card-title">
              {step === 1 ? 'Namaste! Welcome Back' : 'Verify Your Email'}
            </h2>
            <p className="card-subtitle">
              {step === 1 
                ? 'Sign in or register your account securely using single-use OTP' 
                : `We sent an 8-digit login verification code to ${email}`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="auth-form animate-fade-in">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={20} />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="btn-auth-submit"
              >
                <span>Send OTP Code</span>
                <ArrowRight size={18} className="btn-icon" />
              </button>

              <div className="security-notice">
                <Shield size={14} className="security-icon" />
                <span>No password required. Your account will be created automatically if you do not have one.</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="auth-form animate-fade-in">
              <div className="form-group">
                <label className="form-label">Enter 8-Digit Code</label>
                <div className="otp-inputs-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="otp-digit-input"
                      disabled={isLoading}
                      autoFocus={idx === 0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join('').length !== 8}
                className="btn-auth-submit"
              >
                <span>Verify &amp; Sign In</span>
                <CheckCircle size={18} className="btn-icon" />
              </button>

              <div className="resend-timer-row">
                {countdown > 0 ? (
                  <p className="resend-countdown-text">
                    Resend code in <strong>{countdown}s</strong>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="btn-resend-otp"
                  >
                    <RefreshCw size={14} className="resend-icon" />
                    <span>Resend Verification Code</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-back-to-email"
                disabled={isLoading}
              >
                Change Email Address
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
