import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaLeaf, FaTruck, FaShieldAlt, FaCogs, FaOilCan } from "react-icons/fa";
import '../components/styles/ServicesPage.css';
import heroImage from '../assets/service-image.png';
import oilGasImage from '../assets/oilandgas.jpeg';

const ServicesPage = () => {
  const location = useLocation();
  const sectionRefs = useRef({});
  const heroRef = useRef(null);

  // Scroll-based animations for hero background
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), { stiffness: 100, damping: 30 });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.85]));

  // Subtitle text with typing animation
  const subtitleText = "Empowering businesses, managing properties with precision.";
  const [typedText, setTypedText] = useState('');

  // Typing effect for subtitle
  useEffect(() => {
    let currentIndex = 0;
    setTypedText('');
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + subtitleText[currentIndex]);
      currentIndex++;
      if (currentIndex === subtitleText.length) clearInterval(typingInterval);
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  // Proven Results Circle
  const ProvenResultsCircle = ({ start }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (!start) return;
      let startTime = null;
      const duration = 3000;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(t) * 100;
        setProgress(Math.round(eased));

        if (t < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [start]);

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className={`circle-container ${progress === 100 ? "circle-glow" : ""}`}>
        <svg className="progress-ring" width="150" height="150" aria-hidden="true" focusable="false">
          <circle
            className="progress-ring-bg"
            stroke="#1f1f1f"
            fill="transparent"
            strokeWidth="10"
            r={radius}
            cx="75"
            cy="75"
          />
          <circle
            className="progress-ring-bar"
            stroke="#00ff88"
            fill="transparent"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx="75"
            cy="75"
          />
        </svg>
        <div className="circle-text" aria-live="polite">{progress}%</div>
      </div>
    );
  };

  // === NEW SECTION HOOKS ===
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const listItems = [
    "Refineries",
    "Petrochemical Plants",
    "Pipeline Operators",
    "Storage Facilities",
    "Distribution Terminals",
    "Processing Plants"
  ];

  const subSections = [
    {
      title: "Comprehensive Oil & Gas Solutions",
      text: "Specialized services across the midstream and downstream sectors, ensuring operational excellence and regulatory compliance."
    },
    {
      title: "Expert Team",
      text: "Certified professionals with decades of combined experience in oil and gas operations."
    },
    {
      title: "Safety First",
      text: "Uncompromising commitment to safety with industry-leading safety records and protocols."
    },
    {
      title: "Proven Results",
      text: "Track record of successful project delivery and operational excellence across all service areas."
    }
  ];

  const totalItemsBeforeCircle = listItems.length + subSections.length;

  // Scroll and highlight based on location state
  useEffect(() => {
    const { scrollTo, highlight } = location.state || {};
    if (scrollTo && sectionRefs.current[scrollTo]) {
      const target = sectionRefs.current[scrollTo];
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (highlight) {
        const items = target.querySelectorAll('li');
        items.forEach((item) => {
          if (item.textContent.toLowerCase().includes(highlight.toLowerCase())) {
            item.classList.add('highlight-item');
            setTimeout(() => item.classList.remove('highlight-item'), 3000);
          }
        });
      }
    }
  }, [location]);

  // Animation variants for container and cards (unified easing/duration)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, ease: 'easeOut', duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <div className="services-container">
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <motion.div
          className="hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroImage})`, scale, opacity }}
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <motion.div
          className="hero-overlay"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">Empowering businesses, managing properties with precision.</p>
        </motion.div>
      </section>

      {/* BUSINESS SERVICES */}
      <section className="custom-section" ref={(el) => (sectionRefs.current['business'] = el)} tabIndex={-1}>
        <motion.div
          className="custom-overlay light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-heading">Business Services</h2>
          <p className="section-text">
            Navigating the regulatory landscape for businesses in Nigeria can be intricate. Goldcups Consulting Limited simplifies this process,
            offering end-to-end support for various business-related requirements. Our business services include:
          </p>
          <ul className="styled-list" role="list">
            <li role="listitem"><strong>Business Registration:</strong> We assist new and existing businesses in formalizing their operations by guiding them through the entire business registration process with the Corporate Affairs Commission (CAC). This includes name availability search, reservation, and submission of all necessary documentation to ensure a smooth and compliant registration.</li>
            <li role="listitem"><strong>Tax Registration:</strong> Understanding and complying with tax obligations is crucial for any business. We facilitate the acquisition of Tax Identification Numbers (TIN) for individuals and corporate entities, and guide clients through the various tax registration processes with relevant tax authorities such as the Federal Inland Revenue Service (FIRS) and State Internal Revenue Services (SIRS).</li>
            <li role="listitem"><strong>Annual Returns Filing:</strong> We ensure businesses remain compliant with statutory requirements by managing and filing their annual returns with the CAC and FIRS. This includes preparing and submitting the necessary financial statements and other relevant documents within stipulated deadlines, helping clients avoid penalties and maintain good standing.</li>
            <li role="listitem"><strong>Business Proposal Writing:</strong> A well-crafted business proposal is essential for securing funding, attracting partners, or outlining strategic direction. Our team provides expert assistance in developing compelling and comprehensive business proposals tailored to specific objectives, highlighting market opportunities, financial projections, and operational plans.</li>
            <li role="listitem"><strong>Purchasing and Contract Management and Services:</strong> We offer comprehensive support in procurement processes, including vendor selection, negotiation, and contract drafting and management. Our services ensure cost-effectiveness, compliance, and risk mitigation in all purchasing and contractual agreements.</li>
          </ul>
        </motion.div>
      </section>

      {/* ESTATE MANAGEMENT */}
      <section className="service-section" id="estate-management" ref={(el) => (sectionRefs.current['estate'] = el)}>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Estate and Property Sales and Management
        </motion.h2>
        <p>
          Goldcups Consulting Limited specializes in estate and property
          management, offering premium solutions in real estate transactions,
          property maintenance, and client relationship management.
        </p>

        {/* Sales Management Team */}
        <motion.div
          className="sub-section"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h3>Sales Management Team</h3>
          <p>
            Goldcups Consulting have a range of strategic and operational
            functions aimed at driving successful property transactions.
          </p>

          <h4>Core Functions:</h4>
          <ul>
            <li>We define sales goals and targets for different property types (residential, commercial, land).</li>
            <li>We develop marketing and sales strategies tailored to local market conditions.</li>
            <li>Identify potential buyers and investors through advertising, referrals, and digital platforms.</li>
            <li>Manage campaigns to attract interest in properties and land listings.</li>
            <li>Recruit, train, and supervise real estate agents and brokers.</li>
            <li>Build and maintain strong relationships with clients.</li>
            <li>Ensure excellent customer service throughout the buying/selling process.</li>
            <li>Analyze market trends, property values, and demand.</li>
            <li>Set competitive pricing strategies for properties and land.</li>
            <li>Ensure all transactions comply with local laws and regulations.</li>
            <li>Manage contracts, title deeds, and other legal documents.</li>
            <li>Support agents in negotiating prices, terms, and conditions.</li>
            <li>Ensure legal and financial documentation is properly handled for closing deals.</li>
          </ul>
        </motion.div>
      </section>

      {/* Core Function */}
      <section 
        className="custom-section core-section" 
        ref={(el) => (sectionRefs.current['core'] = el)}
      >
        <motion.div 
          className="core-container" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* PURCHASING & CONTRACT */}
          <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['purchas'] = el)}>
            <motion.div
              className="custom-overlay"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <h2 style={{color: 'black'}}>Purchasing and Contract Management</h2>
              <h2 className="section-heading section-heading--dark"></h2>
              <p className="section-text">
                Purchasing and Contract Management and Services, offers competencies in navigating complex regulatory environments, meticulous documentation,
                and strategic advisory services which are universally applicable and highly relevant to the needs of a state agency and private enterprise. We offer comprehensive support in:
              </p>
              <ul className="styled-list" role="list">
                <li role="listitem">Procurement processes, including vendor selection, negotiation, and contract drafting and management.</li>
              </ul>
            </motion.div>
          </section>

          <h2 className="section-heading">Core Functions</h2>

          <div className="core-grid">
            {/* Strategic Sourcing & Procurement */}
            <div className="core-card">
              <h3 className="core-heading">Strategic Sourcing and Procurement</h3>
              <p className="section-text">
                Focuses on identifying, evaluating, and engaging with suppliers to acquire goods and services that meet the organization's needs at the best possible value.
                It involves a strategic approach to purchasing, moving beyond transactional buying to consider long-term relationships and overall cost-effectiveness.
              </p>

              <div className="core-subblock">
                <h4>Goldcups assess and Specify Development</h4>
                <p>
                  Collaborating with internal departments to understand their requirements for goods, services, and works. This includes translating business needs into clear, concise,
                  and comprehensive specifications or scopes of work.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Goldcups conduct Market Research and Supplier Identification</h4>
                <p>
                  Conducting thorough market research to identify potential suppliers, assess market trends, and understand supply chain dynamics. This involves identifying
                  qualified and reliable vendors capable of meeting the organization's standards and requirements.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Supplier Qualification and Selection</h4>
                <p>
                  Developing and implementing processes for evaluating and qualifying potential suppliers based on criteria such as quality, reliability, financial stability,
                  ethical practices, and capacity. This often includes issuing Requests for Information (RFIs), Requests for Proposals (RFPs), or Requests for Quotations (RFQs).
                </p>
              </div>

              <div className="core-subblock">
                <h4>Negotiation and Price Management</h4>
                <p>
                  Goldcups leads negotiations with suppliers to secure favorable terms, conditions, and pricing. This involves understanding cost drivers, market benchmarks,
                  and leveraging purchasing power to achieve optimal value for money.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Purchase Order Management</h4>
                <p>
                  Goldcups creates, issues, and manages purchase orders, ensuring accuracy, proper authorization, and timely delivery of goods and services. This includes tracking
                  order status and resolving any discrepancies.
                </p>
              </div>
            </div>

            {/* Contract Management */}
            <div className="core-card">
              <h3 className="core-heading">Contract Management and Administration</h3>
              <p className="section-text">
                Goldcups encompasses the entire lifecycle of contractual agreements, from drafting and execution to monitoring performance and ensuring compliance.
                Effective contract management is crucial for minimizing legal and financial risks, maximizing value, and fostering strong supplier relationships.
              </p>

              <div className="core-subblock">
                <h4>Contract Drafting and Review</h4>
                <p>
                  Goldcups prepares, reviews, and finalizes contractual agreements, ensuring they accurately reflect negotiated terms, comply with legal requirements,
                  and protect the organization's interests. This involves collaboration with legal teams and internal stakeholders.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Contract Negotiation</h4>
                <p>
                  Goldcups participates in and leads contract negotiations to establish clear terms, conditions, deliverables, and performance metrics. This aims to create mutually
                  beneficial agreements that align with strategic objectives.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Contract Execution and Archiving</h4>
                <p>
                  Goldcups ensures proper execution of contracts by all parties and maintains a centralized, secure repository for all contractual documents. This includes version control
                  and easy accessibility for authorized personnel.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Performance Monitoring and Compliance</h4>
                <p>
                  We continuously monitor supplier performance against contractual obligations, service level agreements (SLAs), and key performance indicators (KPIs). This also involves ensuring
                  adherence to all legal, regulatory, and internal policy requirements throughout the contract term.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Risk Management</h4>
                <p>
                  Identifying, assessing, and mitigating contractual risks, including financial, operational, legal, and reputational risks. This involves developing contingency plans and
                  dispute resolution mechanisms.
                </p>
              </div>

              <div className="core-subblock">
                <h4>Contract Amendments and Renewals</h4>
                <p>
                  Managing changes to existing contracts through formal amendment processes and overseeing the renewal or termination of contracts based on performance, need, and strategic considerations.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* OIL & GAS */}
      <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['oil'] = el)}>
        <motion.div
          className="custom-overlay"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 className="section-heading">Oil and Gas Service</h2>
          <p className="section-text">
            The oil and gas industry encompasses a vast network of specialized services that extend far beyond the initial exploration and drilling phases.
            These essential services form the backbone of energy operations, ensuring the safe, efficient, and profitable transformation of raw petroleum resources into the products that power our modern world.
          </p>

          {/* Image */}
          <motion.div
            className="section-image-container"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.img
              src={oilGasImage}
              alt="Technicians working at an oil and gas facility"
              className="section-image"
              initial={{ scale: 0.98 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>

          <h3 className="sub-section-heading">Midstream Services</h3>
          <ul className="styled-list" role="list">
            <li role="listitem">Pipeline transportation and maintenance</li>
            <li role="listitem">Storage facility management</li>
            <li role="listitem">Gas processing and treatment</li>
            <li role="listitem">Compression services</li>
            <li role="listitem">Flow measurement and monitoring</li>
          </ul>

          <h3 className="sub-section-heading">Support Services</h3>
          <ul className="styled-list" role="list">
            <li role="listitem">Environmental compliance and remediation</li>
            <li role="listitem">Safety consulting and training</li>
            <li role="listitem">Equipment rental and Leasing</li>
            <li role="listitem">Logistics and supply chain management</li>
            <li role="listitem">Engineering consulting</li>
            <li role="listitem">Project management</li>
            <li role="listitem">Asset integrity management</li>
          </ul>
        </motion.div>
      </section>

      {/* Additional Specialized Services */}
      <section
        className="custom-section"
        ref={(el) => (sectionRefs.current['additional'] = el)}
      >
        <motion.div
          className="custom-overlay"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <h2 className="section-heading">Additional Specialized Services</h2>

          <motion.div className="service-card-grid" variants={containerVariants}>
            {/* Environmental Services */}
            <motion.div className="service-card" variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <div className="service-icon"><FaLeaf aria-hidden="true" /></div>
              <h3 className="service-title">Environmental Services</h3>
              <p className="service-desc">Compliance, remediation, and environmental management solutions.</p>
              <ul className="card-list" role="list">
                <li role="listitem">Environmental Compliance</li>
                <li role="listitem">Site Remediation</li>
                <li role="listitem">Waste Management</li>
                <li role="listitem">Environmental Monitoring</li>
              </ul>
            </motion.div>

            {/* Logistics Services */}
            <motion.div className="service-card" variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <div className="service-icon"><FaTruck aria-hidden="true" /></div>
              <h3 className="service-title">Logistics Services</h3>
              <p className="service-desc">Supply chain management and logistics optimization solutions.</p>
              <ul className="card-list" role="list">
                <li role="listitem">Supply Chain Management</li>
                <li role="listitem">Equipment Transportation</li>
                <li role="listitem">Inventory Management</li>
                <li role="listitem">Route Optimization</li>
              </ul>
            </motion.div>

            {/* Safety & Compliance */}
            <motion.div className="service-card" variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <div className="service-icon"><FaShieldAlt aria-hidden="true" /></div>
              <h3 className="service-title">Safety & Compliance</h3>
              <p className="service-desc">Safety consulting, training, and regulatory compliance services.</p>
              <ul className="card-list" role="list">
                <li role="listitem">Safety Consulting</li>
                <li role="listitem">Training Programs</li>
                <li role="listitem">Regulatory Compliance</li>
                <li role="listitem">Risk Assessment</li>
              </ul>
            </motion.div>

            {/* Engineering Consulting */}
            <motion.div className="service-card" variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <div className="service-icon"><FaCogs aria-hidden="true" /></div>
              <h3 className="service-title">Engineering Consulting</h3>
              <p className="service-desc">Technical consulting and engineering solutions for complex projects.</p>
              <ul className="card-list" role="list">
                <li role="listitem">Process Engineering</li>
                <li role="listitem">Asset Integrity Management</li>
                <li role="listitem">Project Management</li>
                <li role="listitem">Technical Audits</li>
              </ul>
            </motion.div>

            {/* Downstream Services */}
            <motion.div className="service-card" variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <div className="service-icon"><FaOilCan aria-hidden="true" /></div>
              <h3 className="service-title">Downstream Services</h3>
              <p className="service-desc">Refinery support, product distribution, and quality control services.</p>
              <ul className="card-list" role="list">
                <li role="listitem">Refinery Support Services</li>
                <li role="listitem">Product Distribution</li>
                <li role="listitem">Quality Control & Testing</li>
                <li role="listitem">Process Optimization</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* === NEW: Serving Critical Energy Infrastructure === */}
      <section
        ref={sectionRef}
        className={`energy-infra fade-section ${visible ? "fade-in" : ""}`}
      >
        <div className="energy-infra-content">
          <div className="energy-infra-text">
            <h2>Serving Critical Energy Infrastructure</h2>
            <p>
              Our expertise spans across the entire energy value chain,
              excluding exploration and drilling. We focus on the essential
              infrastructure that keeps energy flowing to communities and
              industries worldwide.
            </p>
            <ul role="list">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  role="listitem"
                  className={`fade-item ${visible ? "fade-item-in" : ""}`}
                  style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
                >
                  {item}
                </li>
              ))}
            </ul>

            {subSections.map((sec, index) => (
              <div
                key={index}
                className={`infra-subsection fade-item ${visible ? "fade-item-in" : ""}`}
                style={{
                  transitionDelay: `${0.2 + (listItems.length + index) * 0.15}s`
                }}
              >
                <h3>{sec.title}</h3>
                <p>{sec.text}</p>
              </div>
            ))}
          </div>

          <div
            className={`energy-infra-chart fade-item ${visible ? "fade-item-in" : ""}`}
            style={{ transitionDelay: `${0.2 + totalItemsBeforeCircle * 0.15}s` }}
          >
            <ProvenResultsCircle start={visible} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;


























// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { FaLeaf, FaTruck, FaShieldAlt, FaCogs, FaOilCan } from "react-icons/fa";
// import '../components/styles/ServicesPage.css';
// import heroImage from '../assets/service-image.png';
// import oilGasImage from '../assets/oilandgas.jpeg'

// const ServicesPage = () => {
//   const location = useLocation();
//   const sectionRefs = useRef({});
//   const heroRef = useRef(null);

//   // Scroll-based animations for hero background
//   const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
//   const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), { stiffness: 100, damping: 30 });
//   const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.75]));

//   // Subtitle text with typing animation
//   const subtitleText = "Empowering businesses, managing properties with precision.";
//   const [typedText, setTypedText] = useState('');

//   // Typing effect for subtitle
//   useEffect(() => {
//     let currentIndex = 0;
//     setTypedText(''); // Reset typed text on mount
//     const typingInterval = setInterval(() => {
//       setTypedText((prev) => prev + subtitleText[currentIndex]);
//       currentIndex++;
//       if (currentIndex === subtitleText.length) clearInterval(typingInterval);
//     }, 60);
//     return () => clearInterval(typingInterval);
//   }, []);




//   const ProvenResultsCircle = ({ start }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     if (!start) return;

//     let startTime = null;
//     const duration = 3000;

//     const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

//     const animate = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const elapsed = timestamp - startTime;
//       const t = Math.min(elapsed / duration, 1);
//       const eased = easeOutCubic(t) * 100;
//       setProgress(Math.round(eased));

//       if (t < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [start]);

//   const radius = 60;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <div
//       className={`circle-container ${progress === 100 ? "circle-glow" : ""}`}
//     >
//       <svg className="progress-ring" width="150" height="150">
//         <circle
//           className="progress-ring-bg"
//           stroke="#1f1f1f"
//           fill="transparent"
//           strokeWidth="10"
//           r={radius}
//           cx="75"
//           cy="75"
//         />
//         <circle
//           className="progress-ring-bar"
//           stroke="#00ff88"
//           fill="transparent"
//           strokeWidth="10"
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           r={radius}
//           cx="75"
//           cy="75"
//         />
//       </svg>
//       <div className="circle-text">{progress}%</div>
//     </div>
//   );
// };



// // === NEW SECTION HOOKS ===
//   const sectionRef = useRef();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.2 }
//     );
//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }
//     return () => observer.disconnect();
//   }, []);

//   const listItems = [
//     "Refineries",
//     "Petrochemical Plants",
//     "Pipeline Operators",
//     "Storage Facilities",
//     "Distribution Terminals",
//     "Processing Plants"
//   ];

//   const subSections = [
//     {
//       title: "Comprehensive Oil & Gas Solutions",
//       text: "Specialized services across the midstream and downstream sectors, ensuring operational excellence and regulatory compliance."
//     },
//     {
//       title: "Expert Team",
//       text: "Certified professionals with decades of combined experience in oil and gas operations."
//     },
//     {
//       title: "Safety First",
//       text: "Uncompromising commitment to safety with industry-leading safety records and protocols."
//     },
//     {
//       title: "Proven Results",
//       text: "Track record of successful project delivery and operational excellence across all service areas."
//     }
//   ];

//   const totalItemsBeforeCircle = listItems.length + subSections.length;

//   // Scroll and highlight based on location state
//   useEffect(() => {
//     const { scrollTo, highlight } = location.state || {};
//     if (scrollTo && sectionRefs.current[scrollTo]) {
//       const target = sectionRefs.current[scrollTo];
//       target.scrollIntoView({ behavior: 'smooth', block: 'start' });

//       if (highlight) {
//         const items = target.querySelectorAll('li');
//         items.forEach((item) => {
//           if (item.textContent.toLowerCase().includes(highlight.toLowerCase())) {
//             item.classList.add('highlight-item');
//             setTimeout(() => item.classList.remove('highlight-item'), 3000);
//           }
//         });
//       }
//     }
//   }, [location]);

//   // Animation variants for container and cards
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <div className="services-container">
//       {/* HERO */}
//       <section className="hero" ref={heroRef}>
//         <motion.div
//           className="hero-bg"
//           style={{ backgroundImage: `url(${heroImage})`, scale, opacity }}
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: 1.1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//         />
//         <motion.div
//           className="hero-overlay"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           <h1 className="hero-title">Our Services</h1>
//           <p className="hero-subtitle">{typedText}</p>
//         </motion.div>
//       </section>

//       {/* BUSINESS SERVICES */}
//       <section className="custom-section" ref={(el) => (sectionRefs.current['business'] = el)}>
//         <motion.div className="custom-overlay light" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <h2 className="section-heading">Business Services</h2>
//           <p className="section-text">
//             Navigating the regulatory landscape for businesses in Nigeria can be intricate. Goldcups Consulting Limited simplifies this process,
//             offering end-to-end support for various business-related requirements. Our business services include:
//           </p>
//           <ul className="styled-list">
//             <li><strong>Business Registration:</strong> We assist new and existing businesses in formalizing their operations by guiding them through the entire business registration process with the Corporate Affairs Commission (CAC). This includes name availability search, reservation, and submission of all necessary documentation to ensure a smooth and compliant registration.</li>
//             <li><strong>Tax Registration:</strong> Understanding and complying with tax obligations is crucial for any business. We facilitate the acquisition of Tax Identification Numbers (TIN) for individuals and corporate entities, and guide clients through the various tax registration processes with relevant tax authorities such as the Federal Inland Revenue Service (FIRS) and State Internal Revenue Services (SIRS).</li>
//             <li><strong>Annual Returns Filing:</strong> We ensure businesses remain compliant with statutory requirements by managing and filing their annual returns with the CAC and FIRS. This includes preparing and submitting the necessary financial statements and other relevant documents within stipulated deadlines, helping clients avoid penalties and maintain good standing.</li>
//             <li><strong>Business Proposal Writing:</strong> A well-crafted business proposal is essential for securing funding, attracting partners, or outlining strategic direction. Our team provides expert assistance in developing compelling and comprehensive business proposals tailored to specific objectives, highlighting market opportunities, financial projections, and operational plans.</li>
//             <li><strong>Purchasing and Contract Management and Services:</strong> We offer comprehensive support in procurement processes, including vendor selection, negotiation, and contract drafting and management. Our services ensure cost-effectiveness, compliance, and risk mitigation in all purchasing and contractual agreements.</li>
//           </ul>
//         </motion.div>
//       </section>

//       {/* ESTATE MANAGEMENT */}
      
//       {/* Estate Management and Property Management */}
//       <section className="service-section" id="estate-management">
//         <motion.h2
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Estate Management and Property Management
//         </motion.h2>
//         <p>
//           Goldcups Consulting Limited specializes in estate and property
//           management, offering premium solutions in real estate transactions,
//           property maintenance, and client relationship management.
//         </p>

//         {/* New Content: Sales Management Team */}
//         <motion.div
//           className="sub-section"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <h3>Sales Management Team</h3>
//           <p>
//             Goldcups Consulting have a range of strategic and operational
//             functions aimed at driving successful property transactions.
//           </p>

//           <h4>Core Functions:</h4>
//           <ul>
//             <li>We define sales goals and targets for different property types (residential, commercial, land).</li>
//             <li>We develop marketing and sales strategies tailored to local market conditions.</li>
//             <li>Identify potential buyers and investors through advertising, referrals, and digital platforms.</li>
//             <li>Manage campaigns to attract interest in properties and land listings.</li>
//             <li>Recruit, train, and supervise real estate agents and brokers.</li>
//             <li>Build and maintain strong relationships with clients.</li>
//             <li>Ensure excellent customer service throughout the buying/selling process.</li>
//             <li>Analyze market trends, property values, and demand.</li>
//             <li>Set competitive pricing strategies for properties and land.</li>
//             <li>Ensure all transactions comply with local laws and regulations.</li>
//             <li>Manage contracts, title deeds, and other legal documents.</li>
//             <li>Support agents in negotiating prices, terms, and conditions.</li>
//             <li>Ensure legal and financial documentation is properly handled for closing deals.</li>
//           </ul>
//         </motion.div>
//       </section>


//       {/* Core Function */}
//       <section 
//         className="custom-section core-section" 
//         ref={(el) => (sectionRefs.current['core'] = el)}
//       >
//         <motion.div 
//           className="core-container" 
//           initial={{ opacity: 0, y: 40 }} 
//           whileInView={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.7 }}
//         >
//           {/* PURCHASING & CONTRACT */}
//       <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['purchas'] = el)}>
//         <motion.div className="custom-overlay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <h2 style={{color: 'black'}}>Purchasing and Contract Management</h2>
//           <p className="section-text">
//             Purchasing and Contract Management and Services, offers competencies in navigating complex regulatory environments, meticulous documentation,
//             and strategic advisory services which are universally applicable and highly relevant to the needs of a state agency and private enterprise. We offer comprehensive support in:
//           </p>
//           <ul className="styled-list">
//             <li>Procurement processes, including vendor selection, negotiation, and contract drafting and management.</li>
//           </ul>
//         </motion.div>
//       </section>
//           <h2 className="section-heading">Core Functions</h2>

//           <div className="core-grid">
            
//             {/* Strategic Sourcing & Procurement */}
//             <div className="core-card">
//               <h3 className="core-heading">Strategic Sourcing and Procurement</h3>
//               <p className="section-text">
//                 Focuses on identifying, evaluating, and engaging with suppliers to acquire goods and services that meet the organization's needs at the best possible value.
//                 It involves a strategic approach to purchasing, moving beyond transactional buying to consider long-term relationships and overall cost-effectiveness.
//               </p>

//               <div className="core-subblock">
//                 <h4>Goldcups assess and Specify Development</h4>
//                 <p>
//                   Collaborating with internal departments to understand their requirements for goods, services, and works. This includes translating business needs into clear, concise,
//                   and comprehensive specifications or scopes of work.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Goldcups conduct Market Research and Supplier Identification</h4>
//                 <p>
//                   Conducting thorough market research to identify potential suppliers, assess market trends, and understand supply chain dynamics. This involves identifying
//                   qualified and reliable vendors capable of meeting the organization's standards and requirements.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Supplier Qualification and Selection</h4>
//                 <p>
//                   Developing and implementing processes for evaluating and qualifying potential suppliers based on criteria such as quality, reliability, financial stability,
//                   ethical practices, and capacity. This often includes issuing Requests for Information (RFIs), Requests for Proposals (RFPs), or Requests for Quotations (RFQs).
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Negotiation and Price Management</h4>
//                 <p>
//                   Goldcups leads negotiations with suppliers to secure favorable terms, conditions, and pricing. This involves understanding cost drivers, market benchmarks,
//                   and leveraging purchasing power to achieve optimal value for money.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Purchase Order Management</h4>
//                 <p>
//                   Goldcups creates, issues, and manages purchase orders, ensuring accuracy, proper authorization, and timely delivery of goods and services. This includes tracking
//                   order status and resolving any discrepancies.
//                 </p>
//               </div>
//             </div>

//             {/* Contract Management */}
//             <div className="core-card">
//               <h3 className="core-heading">Contract Management and Administration</h3>
//               <p className="section-text">
//                 Goldcups encompasses the entire lifecycle of contractual agreements, from drafting and execution to monitoring performance and ensuring compliance.
//                 Effective contract management is crucial for minimizing legal and financial risks, maximizing value, and fostering strong supplier relationships.
//               </p>

//               <div className="core-subblock">
//                 <h4>Contract Drafting and Review</h4>
//                 <p>
//                   Goldcups prepares, reviews, and finalizes contractual agreements, ensuring they accurately reflect negotiated terms, comply with legal requirements,
//                   and protect the organization's interests. This involves collaboration with legal teams and internal stakeholders.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Contract Negotiation</h4>
//                 <p>
//                   Goldcups participates in and leads contract negotiations to establish clear terms, conditions, deliverables, and performance metrics. This aims to create mutually
//                   beneficial agreements that align with strategic objectives.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Contract Execution and Archiving</h4>
//                 <p>
//                   Goldcups ensures proper execution of contracts by all parties and maintains a centralized, secure repository for all contractual documents. This includes version control
//                   and easy accessibility for authorized personnel.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Performance Monitoring and Compliance</h4>
//                 <p>
//                   We continuously monitor supplier performance against contractual obligations, service level agreements (SLAs), and key performance indicators (KPIs). This also involves ensuring
//                   adherence to all legal, regulatory, and internal policy requirements throughout the contract term.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Risk Management</h4>
//                 <p>
//                   Identifying, assessing, and mitigating contractual risks, including financial, operational, legal, and reputational risks. This involves developing contingency plans and
//                   dispute resolution mechanisms.
//                 </p>
//               </div>

//               <div className="core-subblock">
//                 <h4>Contract Amendments and Renewals</h4>
//                 <p>
//                   Managing changes to existing contracts through formal amendment processes and overseeing the renewal or termination of contracts based on performance, need, and strategic considerations.
//                 </p>
//               </div>
//             </div>

//           </div>
//         </motion.div>
        
//       </section>



      

//       {/* OIL & GAS */}
//       <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['oil'] = el)}>
//         <motion.div className="custom-overlay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <h2 className="section-heading">Oil and Gas Service</h2>
//           <p className="section-text">
//             The oil and gas industry encompasses a vast network of specialized services that extend far beyond the initial exploration and drilling phases.
//             These essential services form the backbone of energy operations, ensuring the safe, efficient, and profitable transformation of raw petroleum resources into the products that power our modern world.
//           </p>

//           {/* add image here */}
//           <motion.div
//             className="section-image-container"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <motion.img
//               src={oilGasImage}
//               alt="Oil and Gas Service"
//               className="section-image"
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             />
//           </motion.div>

//           <h3 className="sub-section-heading">Midstream Services</h3>
//           <ul className="styled-list">
//             <li>Pipeline transportation and maintenance</li>
//             <li>Storage facility management</li>
//             <li>Gas processing and treatment</li>
//             <li>Compression services</li>
//             <li>Flow measurement and monitoring</li>

//           </ul>
//           <h3 className="sub-section-heading">Support Services</h3>
//           <ul className="styled-list">
//             <li>Environmental compliance and remediation</li>
//             <li>Safety consulting and training</li>
//             <li>Equipment rental and Leasing</li>
//             <li>Logistics and supply chain management</li>
//             <li>Engineering consulting</li>
//             <li>Project management</li>
//             <li>Asset intergrity management</li>
//           </ul>
//         </motion.div>
//       </section>



//       {/* Additional Specialized Services */}
//       <section
//         className="custom-section"
//         ref={(el) => (sectionRefs.current['additional'] = el)}
//       >
//         <motion.div
//           className="custom-overlay"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           <h2 className="section-heading">Additional Specialized Services</h2>

//           <motion.div className="service-card-grid" variants={containerVariants}>
//             {/* Environmental Services */}
//             <motion.div className="service-card" variants={cardVariants}>
//               <div className="service-icon"><FaLeaf /></div>
//               <h3 className="service-title">Environmental Services</h3>
//               <p className="service-desc">Compliance, remediation, and environmental management solutions.</p>
//               <ul className="card-list">
//                 <li>Environmental Compliance</li>
//                 <li>Site Remediation</li>
//                 <li>Waste Management</li>
//                 <li>Environmental Monitoring</li>
//               </ul>
//             </motion.div>

//             {/* Logistics Services */}
//             <motion.div className="service-card" variants={cardVariants}>
//               <div className="service-icon"><FaTruck /></div>
//               <h3 className="service-title">Logistics Services</h3>
//               <p className="service-desc">Supply chain management and logistics optimization solutions.</p>
//               <ul className="card-list">
//                 <li>Supply Chain Management</li>
//                 <li>Equipment Transportation</li>
//                 <li>Inventory Management</li>
//                 <li>Route Optimization</li>
//               </ul>
//             </motion.div>

//             {/* Safety & Compliance */}
//             <motion.div className="service-card" variants={cardVariants}>
//               <div className="service-icon"><FaShieldAlt /></div>
//               <h3 className="service-title">Safety & Compliance</h3>
//               <p className="service-desc">Safety consulting, training, and regulatory compliance services.</p>
//               <ul className="card-list">
//                 <li>Safety Consulting</li>
//                 <li>Training Programs</li>
//                 <li>Regulatory Compliance</li>
//                 <li>Risk Assessment</li>
//               </ul>
//             </motion.div>

//             {/* Engineering Consulting */}
//             <motion.div className="service-card" variants={cardVariants}>
//               <div className="service-icon"><FaCogs /></div>
//               <h3 className="service-title">Engineering Consulting</h3>
//               <p className="service-desc">Technical consulting and engineering solutions for complex projects.</p>
//               <ul className="card-list">
//                 <li>Process Engineering</li>
//                 <li>Asset Integrity Management</li>
//                 <li>Project Management</li>
//                 <li>Technical Audits</li>
//               </ul>
//             </motion.div>

//             {/* Downstream Services */}
//             <motion.div className="service-card" variants={cardVariants}>
//               <div className="service-icon"><FaOilCan /></div>
//               <h3 className="service-title">Downstream Services</h3>
//               <p className="service-desc">Refinery support, product distribution, and quality control services.</p>
//               <ul className="card-list">
//                 <li>Refinery Support Services</li>
//                 <li>Product Distribution</li>
//                 <li>Quality Control & Testing</li>
//                 <li>Process Optimization</li>
//               </ul>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </section>




//       {/* === NEW: Serving Critical Energy Infrastructure === */}
//       <section
//         ref={sectionRef}
//         className={`energy-infra fade-section ${visible ? "fade-in" : ""}`}
//       >
//         <div className="energy-infra-content">
//           <div className="energy-infra-text">
//             <h2>Serving Critical Energy Infrastructure</h2>
//             <p>
//               Our expertise spans across the entire energy value chain,
//               excluding exploration and drilling. We focus on the essential
//               infrastructure that keeps energy flowing to communities and
//               industries worldwide.
//             </p>
//             <ul>
//               {listItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className={`fade-item ${visible ? "fade-item-in" : ""}`}
//                   style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             {subSections.map((sec, index) => (
//               <div
//                 key={index}
//                 className={`infra-subsection fade-item ${
//                   visible ? "fade-item-in" : ""
//                 }`}
//                 style={{
//                   transitionDelay: `${
//                     0.2 + (listItems.length + index) * 0.15
//                   }s`
//                 }}
//               >
//                 <h3>{sec.title}</h3>
//                 <p>{sec.text}</p>
//               </div>
//             ))}
//           </div>

//           <div
//             className={`energy-infra-chart fade-item ${
//               visible ? "fade-item-in" : ""
//             }`}
//             style={{
//               transitionDelay: `${0.2 + totalItemsBeforeCircle * 0.15}s`
//             }}
//           >
//             <ProvenResultsCircle start={visible} />
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default ServicesPage;
