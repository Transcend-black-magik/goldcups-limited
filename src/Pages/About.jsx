import React, { useEffect, useState } from 'react';
import '../components/styles/AboutUs.css';
import aboutImage from '../assets/about-image.png';
import { motion } from 'framer-motion';

// Replace with real, optimized images (WebP recommended)
import client1 from '../assets/about-image.png';
import client2 from '../assets/contact-image.png';
import client3 from '../assets/mission-img.jpg';

const AboutUs = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = `Nigeria, a nation characterized by its dynamic economy and burgeoning entrepreneurial spirit, presents a landscape of immense opportunities alongside unique challenges. For businesses and property owners navigating this vibrant environment, access to expert guidance and streamlined services is paramount for sustainable growth and compliance. It is within this context that Goldcups Consulting Limited proudly announces its launch, poised to become a pivotal partner for individuals and organizations seeking to establish, manage, and grow their ventures in Nigeria.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="about-wrapper">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-overlay">
          <motion.h1
            className="about-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Goldcups Limited
          </motion.h1>
        </div>
        <div
          className="about-image"
          style={{ backgroundImage: `url(${aboutImage})` }}
        />
      </section>

      {/* CONTENT */}
      <section className="about-content">
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Who We Are</h2>
          <p>
            Goldcups Consulting Limited is an established firm dedicated to providing
            comprehensive business and estate management services...
          </p>
          <p className="auto-type">{typedText}</p>
          <h2 className="section-heading">What We Bring</h2>
          <p>
            Goldcups Consulting Limited brings a unique blend of expertise and a client-centric
            approach...
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="about-cards">
          <motion.div className="about-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h3>Our Mission</h3>
            <p>
              To provide exceptional, client-centric business and estate management solutions...
            </p>
          </motion.div>
          <motion.div className="about-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <h3>Our Vision</h3>
            <p>
              To be the leading consulting firm in Nigeria, recognized for our integrity...
            </p>
          </motion.div>
          <motion.div className="about-card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <h3>Our Values</h3>
            <ul>
              <li>Integrity & Transparency</li>
              <li>Client-Centric Approach</li>
              <li>Professionalism & Excellence</li>
              <li>Innovation & Growth</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">
        <motion.h2
          className="testimonial-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="testimonial-grid">
          {[
            {
              name: 'Chika Obinna',
              role: 'Business Owner',
              img: client1,
              text: 'Goldcups helped me navigate complex business regulations with ease...',
            },
            {
              name: 'Adeola Akinyemi',
              role: 'Real Estate Investor',
              img: client2,
              text: 'Their estate management services are top-notch...',
            },
            {
              name: 'Tunde Bakare',
              role: 'Entrepreneur',
              img: client3,
              text: 'From business registration to strategy, they guided me every step...',
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              <img src={t.img} alt={t.name} loading="lazy" className="testimonial-img" />
              <p className="testimonial-text">"{t.text}"</p>
              <h4 className="testimonial-name">{t.name}</h4>
              <span className="testimonial-role">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
