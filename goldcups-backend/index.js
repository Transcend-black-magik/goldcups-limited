import express from 'express';
import cors from 'cors';
import sendEmails from './sendEmail.js'; // Note the .js extension in ES modules
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  try {
    await sendEmails(req.body);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: error.message || 'Failed to send emails' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
