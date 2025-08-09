import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;

async function sendEmails(data) {
  const { name, email, phone, companyname, role, message } = data;

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

  async function send(emailData) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Api-Key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Brevo error: ${err}`);
    }
    return res.json();
  }

  await send(emailToGoldcups);
  await send(emailToClient);
}

export default sendEmails;