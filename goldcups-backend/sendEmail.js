import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  console.error('❌ Missing BREVO_API_KEY in environment variables');
  throw new Error('BREVO_API_KEY is not set');
}

async function sendEmails(data) {
  const { name, email, phone, companyname, role, message } = data;

  // Email to Goldcups
  const emailToGoldcups = {
    sender: { name: 'Goldcups Limited', email: 'info@goldcupsltd.com' },
    to: [{ email: 'info@goldcupsltd.com', name: 'Goldcups Team' }],
    subject: `New Contact Form Submission from ${name}`,
    htmlContent: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Company:</b> ${companyname}</p>
      <p><b>Role:</b> ${role}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  // Confirmation email to client
  const emailToClient = {
    sender: { name: 'Goldcups Limited', email: 'info@goldcupsltd.com' },
    to: [{ email, name }],
    subject: 'Thank you for contacting Goldcups Limited',
    htmlContent: `
      <p>Dear ${name},</p>
      <p>Thank you for contacting Goldcups Limited. We have received your message and will be in touch shortly.</p>
      <p>Best regards,<br/>Goldcups Team</p>
    `,
  };

  // Helper to send an email and log results
  async function send(emailData, description) {
    try {
      console.log(`📨 Sending ${description}...`);
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Api-Key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const resultText = await res.text();

      if (!res.ok) {
        console.error(`❌ Brevo error for ${description}:`, resultText);
        throw new Error(`Brevo returned ${res.status} for ${description}`);
      }

      console.log(`✅ ${description} sent successfully:`, resultText);
      return JSON.parse(resultText);

    } catch (err) {
      console.error(`❌ Failed to send ${description}:`, err.message);
      throw err; // Pass to index.js for proper response
    }
  }

  // Send both emails (separately so failure in one doesn’t block the other)
  await send(emailToGoldcups, 'notification to Goldcups');
  await send(emailToClient, 'confirmation to client');
}

export default sendEmails;
