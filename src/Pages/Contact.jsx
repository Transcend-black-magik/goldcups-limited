import React, { useState } from 'react';
import '../components/styles/Contact.css';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyname: '',
    role: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('');

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const text = await res.text();

      try {
        const data = JSON.parse(text);
        if (!res.ok) {
          throw new Error(data.error || 'Failed to send message');
        }

        setStatus('✅ Message sent successfully!');
        setForm({
          name: '',
          email: '',
          phone: '',
          companyname: '',
          role: '',
          message: '',
        });
      } catch {
        throw new Error(`Unexpected server response: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      setStatus(`❌ Failed to send message: ${error.message}`);
      console.error('Contact form error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <h1>Contact Goldcups Limited</h1>
          <p>We’re here to answer your questions and support your business goals.</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-info">
          <h2>Reach Us</h2>
          <p><strong>Nigeria Address:</strong> Plot 1109 CADASTRAL ZONE. Life Camp Abuja </p>
          <p><strong>Nigeria Address:</strong> No. 8 Oromerezimgbu street total village, Off Aba road, Port Harcourt Rivers State </p>
          <p><strong>UK Address:</strong> 13 Ravensbourne court, SE6 4XX London</p>
          <p><strong>Phone:</strong> +234 906 693 3364, +234 803 451 2588, +44 771 4419 396</p>
          <p><strong>Email:</strong> info@goldcups.com</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Request a Callback</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={isSending}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isSending}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            disabled={isSending}
          />
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={form.companyname}
            onChange={handleChange}
            disabled={isSending}
          />
          <input
            type="text"
            name="role"
            placeholder="Your Role"
            value={form.role}
            onChange={handleChange}
            disabled={isSending}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            disabled={isSending}
          ></textarea>

          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </section>
    </div>
  );
};

export default ContactPage;