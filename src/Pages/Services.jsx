import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../components/styles/ServicesPage.css';
import heroImage from '../assets/service-image.png'; // Make sure the path is correct

const sections = [
  {
    title: 'Business Services',
    services: [
      'Business Registration (CAC name search, reservation, documentation)',
      'Tax Registration (TIN acquisition, FIRS & SIRS process support)',
      'Annual Returns Filing (CAC/FIRS filings, financial statement prep)',
      'Business Proposal Writing (funding, strategy, and partnership proposals)',
      'Purchasing and Contract Management (procurement, vendor management, negotiation)',
    ],
  },
  {
    title: 'Estate & Property Management',
    services: [
      'Property Management (tenant vetting, lease admin, maintenance, rent collection)',
      'Estate Management (facilities admin, security, waste, community engagement)',
    ],
  },
  {
    title: 'Oil and Gas Services',
    services: [
      'Well Completion and Intervention: tubing install, packers, artificial lift systems',
      'Well Intervention and Workover: wireline, coiled tubing, slickline, workovers',
      'Stimulation Services: acidizing, hydraulic fracturing support',
      'Production Surveillance and Optimization: real-time monitoring, flow assurance',
      'Pipeline Integrity Management: inspection, corrosion control, repairs, compliance',
      'Refinery & Plant Maintenance: predictive maintenance, turnarounds, decontamination',
      'Environmental Compliance: EIAs, waste management, emissions monitoring, permitting',
    ],
  },
  {
    title: 'Supplies',
    services: [
      'Safety Equipment & PPE: FR clothing, hard hats, safety gear',
      'Industrial Chemicals: inhibitors, demulsifiers, water treatment products',
      'Pipes, Valves, and Fittings for facility use',
      'Instrumentation and Controls: gauges, meters, sensors',
      'Maintenance & Repair Parts: pumps, compressors, turbines',
      'Operational Consumables: lubricants, sealants, filters, cleaning items',
    ],
  },
  {
    title: 'Support Functions',
    services: [
      'Technical Consulting: optimization, troubleshooting',
      'Project Management: turnarounds, upgrades, infrastructure delivery',
      'Logistics and Warehousing: inventory, JIT delivery',
      'Training and Workforce Development: safety and equipment training',
      'IT & Digital Solutions: data analytics, remote monitoring, OT cybersecurity',
    ],
  },
];

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-container">
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-overlay">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Services
          </motion.h1>
        </div>
      </section>

      <div className="services-content">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="service-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{section.title}</h2>
            <ul className="services-list">
              {section.services.map((service, i) => (
                <li key={i} className="service-item">
                  <span className="service-icon">★</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
