// src/components/AnimatedServices.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserShield,       // SCUML
  FaFileInvoiceDollar,// Tax clearance
  FaIdCard,           // NIN
  FaFingerprint,      // TIN
  FaLaptopCode,       // Tax Promax
  FaRegistered,       // Trademark
  FaGraduationCap,    // WAEC
  FaShippingFast,     // Export License
  FaPassport,         // International Passport
  FaMapMarkerAlt,     // State of Origin
  FaVial,             // NAFDAC
  FaBaby,             // Birth Certificate
} from 'react-icons/fa';
import '../components/styles/AnimatedServices.css';

const services = [
  { icon: <FaUserShield />, title: 'SCUML Registration' },
  { icon: <FaFileInvoiceDollar />, title: 'Tax Clearance Certificate' },
  { icon: <FaIdCard />, title: 'NIN Registration' },
  { icon: <FaFingerprint />, title: 'TIN Number' },
  { icon: <FaLaptopCode />, title: 'Tax Promax' },
  { icon: <FaRegistered />, title: 'Trademark Registration' },
  { icon: <FaGraduationCap />, title: 'WAEC Certificate Retrieval' },
  { icon: <FaShippingFast />, title: 'Export Licence Registration' },
  { icon: <FaPassport />, title: 'International Passport' },
  { icon: <FaMapMarkerAlt />, title: 'State of Origin Certificate' },
  { icon: <FaVial />, title: 'NAFDAC Registration' },
  { icon: <FaBaby />, title: 'Birth Certificate' },
];

const AnimatedServices = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">We Help You Get These</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {service.icon}
            </motion.div>
            <h3>{service.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedServices;
