import React, { useState } from 'react';
import '../components/styles/Contact.css';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [errorDetails, setErrorDetails] = useState(null); // <-- to hold raw error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
        setErrorDetails(null); // clear error
      } else {
        setStatus('❌ Failed to send message.');
        setErrorDetails(data.message || 'Unknown server error');
      }
    } catch (error) {
      setStatus('❌ Something went wrong. Check console.');
      console.error('Error during fetch:', error);
      setErrorDetails(error.message || 'Network error occurred.');
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
          <p><strong>Address:</strong> 12 Goldcups Avenue, Lagos, Nigeria</p>
          <p><strong>Phone:</strong> +234-800-000-0000</p>
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
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>

          {status && <p className="form-status">{status}</p>}
          {errorDetails && <p className="form-error">Error: {errorDetails}</p>}
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
