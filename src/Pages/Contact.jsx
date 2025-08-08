import React, { useState } from 'react';
import '../components/styles/Contact.css';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      message: form.message,
    };

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    )
      .then(() => {
        setStatus('✅ Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
      })
      .catch((error) => {
        console.error('❌ Failed to send email:', error);
        setStatus('❌ Failed to send message. Try again.');
      });
  };

  return (
    <div className="contact-page">
      {/* your same form and layout here */}
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
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Your Role"
            value={form.name}
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
        </form>
      </section>
    </div>
  );
};

export default ContactPage;