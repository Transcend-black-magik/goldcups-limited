import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../components/styles/ServicesPage.css';
import heroImage from '../assets/service-image.png';
import { useScroll, useTransform, useSpring } from 'framer-motion';

const ServicesPage = () => {
const location = useLocation();
const sectionRefs = useRef({});
const heroRef = useRef(null);
const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), { stiffness: 100, damping: 30 });
const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.7]));
const subtitleText = "Empowering businesses, managing properties with precision.";
const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + subtitleText[currentIndex]);
      currentIndex++;
      if (currentIndex === subtitleText.length) clearInterval(typingInterval);
    }, 60); // Typing speed (ms per character)

    return () => clearInterval(typingInterval);
  }, []);


  useEffect(() => {
    const { scrollTo, highlight } = location.state || {};
    if (scrollTo && sectionRefs.current[scrollTo]) {
      const target = sectionRefs.current[scrollTo];
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (highlight) {
        const items = target.querySelectorAll('li');
        items.forEach((item) => {
          if (item.textContent.includes(highlight)) {
            item.classList.add('highlight-item');
            setTimeout(() => item.classList.remove('highlight-item'), 3000);
          }
        });
      }
    }
  }, [location]);

  return (
    <div className="services-container">
      {/* === Hero Section (Keep Original Styling) === */}
      <section className="hero" ref={heroRef}>
        <motion.div
          className="hero-bg"
          style={{ backgroundImage: `url(${heroImage})`, scale, opacity }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.div
          className="hero-overlay"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">{typedText}<span className="blinking-cursor">|</span></p>
        </motion.div>
      </section>

      {/* === Business Services === */}
      <section className="custom-section" ref={(el) => (sectionRefs.current['business'] = el)}>
        <motion.div className="custom-overlay light" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="section-heading">Business Services</h2>
          <p className="section-text">Navigating the regulatory landscape for businesses in Nigeria can be intricate. Goldcups Consulting Limited simplifies this process, offering end-to-end support for various business-related requirements. Our business services include:</p>
          <ul className="styled-list">
            <li><strong>Business Registration:</strong> We assist new and existing businesses in formalizing their operations by guiding them through the entire business registration process with the Corporate Affairs Commission (CAC). This includes name availability search, reservation, and submission of all necessary documentation to ensure a smooth and compliant registration.</li>
            <li><strong>Tax Registration:</strong> Understanding and complying with tax obligations is crucial for any business. We facilitate the acquisition of Tax Identification Numbers (TIN) for individuals and corporate entities, and guide clients through the various tax registration processes with relevant tax authorities such as the Federal Inland Revenue Service (FIRS) and State Internal Revenue Services (SIRS).</li>
            <li><strong>Annual Returns Filing:</strong> We ensure businesses remain compliant with statutory requirements by managing and filing their annual returns with the CAC and FIRS. This includes preparing and submitting the necessary financial statements and other relevant documents within stipulated deadlines, helping clients avoid penalties and maintain good standing.</li>
            <li><strong>Business Proposal Writing:</strong> A well-crafted business proposal is essential for securing funding, attracting partners, or outlining strategic direction. Our team provides expert assistance in developing compelling and comprehensive business proposals tailored to specific objectives, highlighting market opportunities, financial projections, and operational plans.</li>
            <li><strong>Purchasing and Contract Management and Services:</strong> We offer comprehensive support in procurement processes, including vendor selection, negotiation, and contract drafting and management. Our services ensure cost-effectiveness, compliance, and risk mitigation in all purchasing and contractual agreements.</li>
          </ul>
        </motion.div>
      </section>

      {/* === Estate Management and Property Management === */}
      <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['estate'] = el)}>
        <motion.div className="custom-overlay" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="section-heading">Estate Management and Property Management</h2>
          <p className="section-text">Nigeria's real estate sector offers significant investment potential, but effective management is key to realizing its full value. Goldcups Consulting Limited provides professional estate and property management services to ensure optimal performance and preservation of property assets. Our services in this area include:</p>
          <ul className="styled-list">
            <li><strong>Property Management:</strong> We offer comprehensive property management services for residential, commercial, and industrial properties. This includes tenant sourcing and vetting, lease administration, rent collection, property maintenance and repairs, and ensuring compliance with property laws and regulations. Our goal is to maximize rental income and minimize vacancies while preserving property value.</li>
            <li><strong>Estate Management:</strong> For larger developments and estates, we provide integrated estate management services. This encompasses the overall administration, maintenance, and enhancement of communal facilities, security management, waste management, and community engagement. We aim to create well-maintained, secure, and harmonious living or working environments within estates.</li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;






















// import React, { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import '../components/styles/ServicesPage.css';
// import heroImage from '../assets/service-image.png';

// const sections = [
//   {
//     id: 'business-services',
//     title: 'Business Services',
//     services: [
//       'Business Registration (CAC name search, reservation, documentation)',
//       'Tax Registration (TIN acquisition, FIRS & SIRS process support)',
//       'Annual Returns Filing (CAC/FIRS filings, financial statement prep)',
//       'Business Proposal Writing (funding, strategy, and partnership proposals)',
//       'Purchasing and Contract Management (procurement, vendor management, negotiation)',
//     ],
//   },
//   {
//     id: 'estate-property-management',
//     title: 'Estate & Property Management',
//     services: [
//       'Property Management (tenant vetting, lease admin, maintenance, rent collection)',
//       'Estate Management (facilities admin, security, waste, community engagement)',
//     ],
//   },
//   {
//     id: 'oil-and-gas-services',
//     title: 'Oil and Gas Services',
//     services: [
//       'Well Completion and Intervention: tubing install, packers, artificial lift systems',
//       'Well Intervention and Workover: wireline, coiled tubing, slickline, workovers',
//       'Stimulation Services: acidizing, hydraulic fracturing support',
//       'Production Surveillance and Optimization: real-time monitoring, flow assurance',
//       'Pipeline Integrity Management: inspection, corrosion control, repairs, compliance',
//       'Refinery & Plant Maintenance: predictive maintenance, turnarounds, decontamination',
//       'Environmental Compliance: EIAs, waste management, emissions monitoring, permitting',
//     ],
//   },
//   {
//     id: 'supplies',
//     title: 'Supplies',
//     services: [
//       'Safety Equipment & PPE: FR clothing, hard hats, safety gear',
//       'Industrial Chemicals: inhibitors, demulsifiers, water treatment products',
//       'Pipes, Valves, and Fittings for facility use',
//       'Instrumentation and Controls: gauges, meters, sensors',
//       'Maintenance & Repair Parts: pumps, compressors, turbines',
//       'Operational Consumables: lubricants, sealants, filters, cleaning items',
//     ],
//   },
//   {
//     id: 'support-functions',
//     title: 'Support Functions',
//     services: [
//       'Technical Consulting: optimization, troubleshooting',
//       'Project Management: turnarounds, upgrades, infrastructure delivery',
//       'Logistics and Warehousing: inventory, JIT delivery',
//       'Training and Workforce Development: safety and equipment training',
//       'IT & Digital Solutions: data analytics, remote monitoring, OT cybersecurity',
//     ],
//   },
// ];

// const ServicesPage = () => {
//   const location = useLocation();
//   const sectionRefs = useRef({});

//   useEffect(() => {
//     const { scrollTo, highlight } = location.state || {};
//     if (scrollTo && sectionRefs.current[scrollTo]) {
//       const target = sectionRefs.current[scrollTo];
//       target.scrollIntoView({ behavior: 'smooth', block: 'start' });

//       // Apply highlight animation
//       if (highlight) {
//         const items = target.querySelectorAll('.service-item');
//         items.forEach((item) => {
//           if (item.textContent.includes(highlight)) {
//             item.classList.add('highlight-item');
//             setTimeout(() => item.classList.remove('highlight-item'), 2500);
//           }
//         });
//       }
//     }
//   }, [location]);

//   return (
//     <div className="services-container">
//       <section className="hero">
//         <div
//           className="hero-bg"
//           style={{ backgroundImage: `url(${heroImage})` }}
//         />
//         <div className="hero-overlay">
//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Our Services
//           </motion.h1>
//         </div>
//       </section>

//       <div className="services-content">
//         {sections.map((section, index) => (
//           <motion.div
//             key={section.id}
//             id={section.id}
//             ref={(el) => (sectionRefs.current[section.id] = el)}
//             className="service-section"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="section-title">{section.title}</h2>
//             <ul className="services-list">
//               {section.services.map((service, i) => (
//                 <li key={i} className="service-item">
//                   <span className="service-icon">★</span>
//                   <span>{service}</span>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;
