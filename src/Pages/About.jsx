import React from 'react';
import '../components/styles/AboutUs.css';
import aboutImage from '../assets/about-image.png'; // Use your latest realistic image here
import { motion } from 'framer-motion';

const AboutUs = () => {
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
            Goldcups Limited is a Nigerian-owned consulting firm specializing in business support,
            estate management, oil & gas services, and professional supply chain solutions. Our
            mission is to empower businesses and property owners with services that are both
            reliable and transformative. With a reputation built on integrity, precision, and
            excellence, we pride ourselves in being client-centric and results-driven.
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



// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { motion } from 'framer-motion';
// import '../components/styles/AboutUs.css';
// import aboutImage from '../assets/about-image.png'; // Replace with a suitable image

// const AboutUs = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="about-container">
//       <section className="about-hero" data-aos="fade-up">
//         <div className="about-hero-content">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             About Goldcups Limited
//           </motion.h1>
//           <p>
//             Goldcups Limited is a dynamic consulting and management company dedicated to empowering entrepreneurs,
//             businesses, and property owners across Nigeria. We provide streamlined, reliable, and innovative services
//             to help clients navigate business registration, regulatory compliance, and property management efficiently.
//           </p>
//         </div>
//         <div className="about-image">
//           <img src={aboutImage} alt="About Us" />
//         </div>
//       </section>

//       <section className="mission-vision-values" data-aos="fade-up">
//         <div className="mvv-box">
//           <h2>Our Mission</h2>
//           <p>
//             To provide exceptional, client-focused business and estate management services that foster growth,
//             ensure compliance, and maximize value in Nigeria’s vibrant business environment.
//           </p>
//         </div>
//         <div className="mvv-box">
//           <h2>Our Vision</h2>
//           <p>
//             To become the most trusted and respected consulting firm in Nigeria through integrity, expertise, and
//             lasting client success.
//           </p>
//         </div>
//         <div className="mvv-box">
//           <h2>Our Core Values</h2>
//           <ul>
//             <li>Integrity</li>
//             <li>Excellence</li>
//             <li>Client-Centricity</li>
//             <li>Innovation</li>
//             <li>Transparency</li>
//           </ul>
//         </div>
//       </section>

//       <section className="why-choose-us" data-aos="fade-up">
//         <h2>Why Choose Goldcups Limited?</h2>
//         <ul>
//           <li>✔ Extensive knowledge of Nigerian business regulations</li>
//           <li>✔ Reliable estate and property management solutions</li>
//           <li>✔ Personalized consulting tailored to your goals</li>
//           <li>✔ Proven track record of success with diverse clients</li>
//         </ul>
//       </section>

//       <section className="impact" data-aos="fade-up">
//         <h2>Our Experience & Impact</h2>
//         <p>
//           Goldcups Limited has worked with over 150 businesses and individuals across Nigeria, delivering expert
//           services in registration, compliance, estate and property management, oil and gas support, and business
//           consulting. Our impact is measured in the success stories of clients we’ve helped thrive in competitive markets.
//         </p>
//       </section>

//       <section className="cta-section" data-aos="zoom-in">
//         <h2>Ready to Partner With Us?</h2>
//         <p>Let’s help you grow your business or manage your estate the smart way.</p>
//         <button onClick={() => window.location.href = '/contact'} className="btn-primary">Contact Us</button>
//       </section>
//     </div>
//   );
// };

// export default AboutUs;
