const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const JWT_SECRET = process.env.JWT_SECRET || 'finsaathi_super_secret_jwt_key_2026_dev_only';

// Helper: SHA-256 OTP hashing
function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

// Helper: Email format validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// -------------------------------------------------------------
// POST /api/auth/send-otp
// -------------------------------------------------------------
router.post('/send-otp', async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    email = email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const now = new Date();

    // 1. Cooldown protection (30 seconds)
    const { data: lastOtp, error: lastOtpError } = await supabase
      .from('email_otps')
      .select('created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastOtp) {
      const secondsSinceLast = Math.floor((now - new Date(lastOtp.created_at)) / 1000);
      if (secondsSinceLast < 30) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${30 - secondsSinceLast} seconds before requesting a new code.`
        });
      }
    }

    // 2. Hourly rate limiting (max 5 requests per hour)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from('email_otps')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gt('created_at', oneHourAgo);

    if (count !== null && count >= 5) {
      return res.status(429).json({
        success: false,
        message: 'Maximum verification requests exceeded. Please try again in 1 hour.'
      });
    }

    // 3. Generate random 8-digit OTP
    const otp = crypto.randomInt(10000000, 99999999).toString();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000).toISOString(); // 5 minutes validity

    // 4. Invalidate older active OTPs for this email to prevent multiple valid OTPs
    await supabase
      .from('email_otps')
      .update({ verified: true })
      .eq('email', email)
      .eq('verified', false);

    // 5. Store new hashed OTP in database
    const { error: insertError } = await supabase
      .from('email_otps')
      .insert({
        email,
        otp_hash: otpHash,
        expires_at: expiresAt,
        verified: false,
        attempts: 0,
        resend_count: count || 0
      });

    if (insertError) {
      console.error('Error inserting OTP:', insertError);
      return res.status(500).json({ success: false, message: 'Server database error. Please try again.' });
    }

    // 6. Send Email using Nodemailer
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    let emailSent = false;
    let devMessage = '';

    // If SMTP is configured properly and not placeholders
    if (gmailUser && gmailUser !== 'yourgmail@gmail.com' && gmailPassword && gmailPassword !== 'your_app_password') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // TLS
        auth: {
          user: gmailUser,
          pass: gmailPassword
        }
      });

      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>FinSaathi Verification Code</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7f9fc; margin: 0; padding: 0; color: #333333; }
            .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 30px; text-align: center; color: #ffffff; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 5px; letter-spacing: 1px; }
            .subtitle { font-size: 14px; opacity: 0.9; }
            .content { padding: 40px 30px; text-align: center; }
            .greeting { font-size: 18px; margin-bottom: 20px; font-weight: 600; text-align: left; }
            .message { font-size: 16px; line-height: 1.6; text-align: left; color: #555555; margin-bottom: 30px; }
            .otp-box { background-color: #f0f4ff; border: 2px dashed #3b82f6; border-radius: 8px; padding: 20px 30px; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e3a8a; display: inline-block; margin-bottom: 30px; text-shadow: 1px 1px 0 #ffffff; }
            .expiry { font-size: 14px; color: #e11d48; font-weight: 600; margin-bottom: 20px; }
            .security-note { font-size: 13px; color: #666666; background-color: #fafafa; border-radius: 6px; padding: 15px; text-align: left; line-height: 1.5; border-left: 4px solid #94a3b8; }
            .footer { background-color: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #eeeeee; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">FinSaathi</div>
              <div class="subtitle">Secure Financial Empowerment</div>
            </div>
            <div class="content">
              <div class="greeting">Namaste,</div>
              <div class="message">
                Verify your identity to log in securely to your FinSaathi account. Please use the following single-use verification code to complete your login:
              </div>
              <div class="otp-box">${otp}</div>
              <div class="expiry">This code will expire in 5 minutes.</div>
              <div class="security-note">
                <strong>Security Alert:</strong> If you did not request this code, please ignore this email or contact support if you suspect unauthorized access. Never share this code with anyone.
              </div>
            </div>
            <div class="footer">
              This is an automated system email. Please do not reply directly to this message.<br>
              &copy; 2026 FinSaathi. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"FinSaathi Security" <${gmailUser}>`,
        to: email,
        subject: 'FinSaathi Login Verification Code',
        html: htmlTemplate
      });

      emailSent = true;
      console.log(`Verification OTP email sent successfully to: ${email}`);
    } else {
      console.log(`[SMTP Not Configured] OTP generated for ${email}: ${otp}`);
      devMessage = `[DEV MODE] SMTP not configured. OTP is: ${otp}`;
    }

    // Return a generic success response to prevent email enumeration, but add devMessage in development
    return res.status(200).json({
      success: true,
      message: 'A verification code has been sent to your email address if it is registered.',
      ...(process.env.NODE_ENV === 'development' && devMessage ? { devMessage } : {})
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ success: false, message: 'Server encountered an error while sending OTP.' });
  }
});

// -------------------------------------------------------------
// POST /api/auth/verify-otp
// -------------------------------------------------------------
router.post('/verify-otp', async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required.' });
    }

    email = email.trim().toLowerCase();
    otp = otp.trim();

    const now = new Date().toISOString();

    // 1. Fetch the most recent active OTP record
    const { data: otpRecord, error: otpError } = await supabase
      .from('email_otps')
      .select('*')
      .eq('email', email)
      .eq('verified', false)
      .gt('expires_at', now)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code.' });
    }

    // 2. Brute force protection: check if there are 5 or more failed attempts
    if (otpRecord.attempts >= 5) {
      return res.status(429).json({
        success: false,
        message: 'Too many failed attempts. Please request a new verification code.'
      });
    }

    // 3. Hash input OTP and compare
    const hashedInput = hashOtp(otp);

    if (hashedInput !== otpRecord.otp_hash) {
      // Increment attempt counter in the DB
      const newAttempts = otpRecord.attempts + 1;
      await supabase
        .from('email_otps')
        .update({ attempts: newAttempts })
        .eq('id', otpRecord.id);

      if (newAttempts >= 5) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect code. Too many failed attempts. This code is now locked. Please request a new one.'
        });
      }

      return res.status(400).json({
        success: false,
        message: `Incorrect verification code. You have ${5 - newAttempts} attempts remaining.`
      });
    }

    // 4. Mark OTP as verified (used)
    await supabase
      .from('email_otps')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    // 5. Auto User Registration
    let { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!userProfile) {
      // Register new user profile automatically
      const { data: newUser, error: registerError } = await supabase
        .from('users')
        .insert({
          email,
          role: 'USER',
          onboarding_pending: true
        })
        .select()
        .single();

      if (registerError) {
        console.error('Error auto-registering user:', registerError);
        return res.status(500).json({ success: false, message: 'Error automatically registering user.' });
      }

      userProfile = newUser;

      // Seed default user stats to prevent empty dashboards
      const { error: seedError } = await supabase
        .from('user_stats')
        .insert({
          user_id: userProfile.id,
          total_balance: 0,
          active_savings: 0,
          active_loans: 0
        });

      if (seedError) {
        console.error('Error seeding user stats:', seedError);
      }
    }

    // 6. Sign JWT session token (valid for 7 days)
    const token = jwt.sign(
      {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        onboarding_pending: userProfile.onboarding_pending
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        onboardingPending: userProfile.onboarding_pending
      }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ success: false, message: 'Server encountered an error while verifying code.' });
  }
});

module.exports = router;
