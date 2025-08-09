import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendEmails from './sendEmail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Stronger CORS setup
app.use(cors({
  origin: '*', // Change to your frontend domain in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Test route (optional, to check connectivity)
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// ✅ Contact route
app.post('/contact', async (req, res) => {
  try {
    console.log('📩 Incoming form data:', req.body); // Debug log

    await sendEmails(req.body);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    res.status(500).json({ error: error.message || 'Failed to send emails' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
