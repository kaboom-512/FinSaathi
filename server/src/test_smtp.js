require('dotenv').config();
const nodemailer = require('nodemailer');

const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_APP_PASSWORD;

console.log('--- FinSaathi SMTP Diagnostic ---');
console.log('GMAIL_USER:', gmailUser ? 'Present' : 'Missing');
console.log('GMAIL_APP_PASSWORD:', gmailPassword ? 'Present' : 'Missing');

if (!gmailUser || gmailUser === 'yourgmail@gmail.com' || !gmailPassword || gmailPassword === 'your_app_password') {
  console.log('\n[INFO] SMTP credentials are not configured or still using placeholders. Verification bypassed. Fallback console logging will be active.');
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: gmailUser,
    pass: gmailPassword
  }
});

console.log('\nVerifying SMTP connection to smtp.gmail.com:587...');

transporter.verify((error, success) => {
  if (error) {
    console.error('\n[ERROR] SMTP Connection Verification Failed:');
    console.error(error);
    process.exit(1);
  } else {
    console.log('\n[SUCCESS] SMTP connection established! Server is ready to dispatch emails.');
    process.exit(0);
  }
});
