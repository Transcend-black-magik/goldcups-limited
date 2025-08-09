import React, { useEffect, useState } from 'react';
import '../components/styles/AboutUs.css';
import aboutImage from '../assets/about-image.png';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = `Nigeria, a nation characterized by its dynamic economy and burgeoning entrepreneurial spirit, presents a landscape of immense opportunities alongside unique challenges. For businesses and property owners navigating this vibrant environment, access to expert guidance and streamlined services is paramount for sustainable growth and compliance. It is within this context that Goldcups Consulting Limited proudly announces its launch, poised to become a pivotal partner for individuals and organizations seeking to establish, manage, and grow their ventures in Nigeria.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 20); // Adjust typing speed here (ms per character)
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="about-wrapper">
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
            comprehensive business and estate management services. Our mission is to empower
            our clients by simplifying complex administrative processes, oﬀering strategic insights,
            and ensuring compliance with Nigerian regulatory frameworks. With a deep
            understanding of the local market dynamics and a commitment to excellence,
            Goldcups Consulting Limited is set to be the trusted advisor for a diverse clientele,
            from aspiring entrepreneurs to established property holders.
          </p>

          {/* Auto type section */}
          <p className="auto-type">{typedText}</p>
          <h2 className="section-heading">What we bring</h2>
          <p>
           Goldcups Consulting Limited brings a unique blend of expertise and a client-centric
          approach that can significantly benefit individuals and businesses.
          </p>
          
        </motion.div>

        <div className="about-cards">
          <motion.div
            className="about-card"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>Our Mission</h3>
            <p>
              To provide exceptional, client-centric business and estate management solutions that
              foster growth, ensure compliance, and maximize value for our clients in Nigeria.
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3>Our Vision</h3>
            <p>
              To be the leading consulting firm in Nigeria, recognized for our integrity, expertise,
              and unwavering commitment to client success in both business and estate management.
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
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
    </div>
  );
};

export default AboutUs;
