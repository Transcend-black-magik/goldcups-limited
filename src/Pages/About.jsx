import React, { useEffect, useState } from 'react';
import '../components/styles/AboutUs.css';
import aboutImage from '../assets/about-image.png';
import ceoImage from "../assets/CEO-IMG.webp"
import femaleCeo from "../assets/femaleCeo.webp"
import { motion } from 'framer-motion';

// Replace with real, optimized images (WebP recommended)

import missionImage from '../assets/mission-image.png';
import vissionImage from '../assets/vision-image.png';
import valueImage from '../assets/value-image.png';

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
            About Goldcups Consulting Limited
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
        <div className='offer-list-items'>
          <div className='offer-item'>
            <img className='offer-img' src={missionImage} alt="Mission" />
            <h4>Our Mission</h4>
            <p>
              To provide exceptional, client-centric business and estate management solutions that foster growth, ensure compliance, and maximize value for our clients in Nigeria.
            </p>
          </div>
          <div className='offer-item'>
            <img className='offer-img' src={vissionImage} alt="Vision" />
            <h4>Our Vision</h4>
            <p>
              To be the leading consulting firm in Nigeria, recognized for our integrity, expertise, and unwavering commitment to client success.
            </p>
          </div>
          <div className='offer-item'>
            <img className='offer-img' src={valueImage} alt="Core Value" />
            <h4>Our Core Value</h4>
            <ul>
              <li>Integrity & Transparency</li>
              <li>Client-Centric Approach</li>
              <li>Professionalism & Excellence</li>
              <li>Innovation & Growth</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="leadership-section">
        <motion.h2
          className="leadership-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Leadership Team
        </motion.h2>

        <div className="leadership-grid">
          <motion.div
            className="leader-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={ceoImage}
              alt="Chidozie Maduka"
              className="leader-img"
            />
            <h3 className="leader-name">Chidozie Maduka, MBA</h3>
            <h4>C.maduka@goldcupsltd.com</h4>
            <p className="leader-bio">
              An accomplished professional with an MBA and over three decades of diverse experience across multiple industries. 
              He brings a wealth of expertise from 20 years in customer services, 5 years in sales and management, 
              3 years in consulting business and management, and 3 years in contracts processing and verifications. 
              His career journey includes contributions at Shell Companies Port Harcourt, Nasco Marketing in Jos, 
              Southeastern Trains London, Eunisure Protects, and Tavistock Protects, all in London. 
              Additionally, he serves as a director for two UK companies and is the Founder and CEO of Goldcups Consulting Limited.
            </p>
          </motion.div>

          <motion.div
            className="leader-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={femaleCeo}
              alt="Barrister Sekpe Dukwo Lucy"
              className="leader-img"
            />
            <h3 className="leader-name">Barrister Sekpe Dukwo Lucy</h3>
            <h4>ldsekpe@Goldcupsltd.com</h4>
            <p className="leader-bio">
              A highly accomplished legal professional with over two decades of experience in corporate law, oil and gas, 
              tax law, business finance, and property law. She studied at Ahmadu Bello University (1997–2003) and 
              qualified at the Nigerian Law School in 2004. Lucy began her career at Alegeh and Co. (2004–2005) before 
              dedicating 17 years (2007–2024) to the Corporate Affairs Commission. She later founded Degatas and Associates 
              in 2022 and is also an Associate of the Institute of Chartered Secretaries and Administrators of Nigeria. 
              Currently, she is the Head of Legal at Goldcups Consulting.
            </p>
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
              name: 'Lilian Owoh',
              role: 'Business Owner',
              // img: client1,
              text: 'Goldcups did a business plan for my new venture and work with me till I was able to to stand out from the crowd.',
            },
            {
              name: 'Nonso Obi',
              role: 'Real Estate Investor',
              // img: client2,
              text: 'Goldcups helped me to see one of properties for a great price and less commission.',
            },
            {
              name: 'Arinzechukwu Muoma',
              role: 'Entrepreneur',
              // img: client3,
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
              {/* <img src={t.img} alt={t.name} loading="lazy" className="testimonial-img" /> */}
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
