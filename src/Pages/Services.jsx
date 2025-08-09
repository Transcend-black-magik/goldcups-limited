import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaLeaf, FaTruck, FaShieldAlt, FaCogs, FaOilCan } from "react-icons/fa";
import '../components/styles/ServicesPage.css';
import heroImage from '../assets/service-image.png';
import oilGasImage from '../assets/oilandgas.jpeg'

const ServicesPage = () => {
  const location = useLocation();
  const sectionRefs = useRef({});
  const heroRef = useRef(null);

  // Scroll-based animations for hero background
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), { stiffness: 100, damping: 30 });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.75]));

  // Subtitle text with typing animation
  const subtitleText = "Empowering businesses, managing properties with precision.";
  const [typedText, setTypedText] = useState('');

  // Typing effect for subtitle
  useEffect(() => {
    let currentIndex = 0;
    setTypedText(''); // Reset typed text on mount
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + subtitleText[currentIndex]);
      currentIndex++;
      if (currentIndex === subtitleText.length) clearInterval(typingInterval);
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);




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
    <div
      className={`circle-container ${progress === 100 ? "circle-glow" : ""}`}
    >
      <svg className="progress-ring" width="150" height="150">
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
      <div className="circle-text">{progress}%</div>
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

  // Animation variants for container and cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="services-container">
      {/* HERO */}
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

      {/* BUSINESS SERVICES */}
      <section className="custom-section" ref={(el) => (sectionRefs.current['business'] = el)}>
        <motion.div className="custom-overlay light" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="section-heading">Business Services</h2>
          <p className="section-text">
            Navigating the regulatory landscape for businesses in Nigeria can be intricate. Goldcups Consulting Limited simplifies this process,
            offering end-to-end support for various business-related requirements. Our business services include:
          </p>
          <ul className="styled-list">
            <li><strong>Business Registration:</strong> We assist new and existing businesses in formalizing their operations by guiding them through the entire business registration process with the Corporate Affairs Commission (CAC). This includes name availability search, reservation, and submission of all necessary documentation to ensure a smooth and compliant registration.</li>
            <li><strong>Tax Registration:</strong> Understanding and complying with tax obligations is crucial for any business. We facilitate the acquisition of Tax Identification Numbers (TIN) for individuals and corporate entities, and guide clients through the various tax registration processes with relevant tax authorities such as the Federal Inland Revenue Service (FIRS) and State Internal Revenue Services (SIRS).</li>
            <li><strong>Annual Returns Filing:</strong> We ensure businesses remain compliant with statutory requirements by managing and filing their annual returns with the CAC and FIRS. This includes preparing and submitting the necessary financial statements and other relevant documents within stipulated deadlines, helping clients avoid penalties and maintain good standing.</li>
            <li><strong>Business Proposal Writing:</strong> A well-crafted business proposal is essential for securing funding, attracting partners, or outlining strategic direction. Our team provides expert assistance in developing compelling and comprehensive business proposals tailored to specific objectives, highlighting market opportunities, financial projections, and operational plans.</li>
            <li><strong>Purchasing and Contract Management and Services:</strong> We offer comprehensive support in procurement processes, including vendor selection, negotiation, and contract drafting and management. Our services ensure cost-effectiveness, compliance, and risk mitigation in all purchasing and contractual agreements.</li>
          </ul>
        </motion.div>
      </section>

      {/* ESTATE MANAGEMENT */}
      <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['estate'] = el)}>
        <motion.div className="custom-overlay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="section-heading">Estate Management and Property Management</h2>
          <p className="section-text">
            Nigeria's real estate sector offers significant investment potential, but effective management is key to realizing its full value.
            Goldcups Consulting Limited provides professional estate and property management services to ensure optimal performance and preservation of property assets. Our services in this area include:
          </p>
          <ul className="styled-list">
            <li><strong>Property Management:</strong> We offer comprehensive property management services for residential, commercial, and industrial properties. This includes tenant sourcing and vetting, lease administration, rent collection, property maintenance and repairs, and ensuring compliance with property laws and regulations. Our goal is to maximize rental income and minimize vacancies while preserving property value.</li>
            <li><strong>Estate Management:</strong> For larger developments and estates, we provide integrated estate management services. This encompasses the overall administration, maintenance, and enhancement of communal facilities, security management, waste management, and community engagement. We aim to create well-maintained, secure, and harmonious living or working environments within estates.</li>
          </ul>
        </motion.div>
      </section>

      {/* PURCHASING & CONTRACT */}
      <section className="custom-section alt-bg" ref={(el) => (sectionRefs.current['purchas'] = el)}>
        <motion.div className="custom-overlay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="section-heading">Purchasing and Contract Management</h2>
          <p className="section-text">
            Purchasing and Contract Management and Services, offers competencies in navigating complex regulatory environments, meticulous documentation,
            and strategic advisory services which are universally applicable and highly relevant to the needs of a state agency and private enterprise. We offer comprehensive support in:
          </p>
          <ul className="styled-list">
            <li>Procurement processes, including vendor selection, negotiation, and contract drafting and management.</li>
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
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
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
        <motion.div className="custom-overlay" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="section-heading">Oil and Gas Service</h2>
          <p className="section-text">
            The oil and gas industry encompasses a vast network of specialized services that extend far beyond the initial exploration and drilling phases.
            These essential services form the backbone of energy operations, ensuring the safe, efficient, and profitable transformation of raw petroleum resources into the products that power our modern world.
          </p>

          {/* add image here */}
          <motion.div
            className="section-image-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src={oilGasImage}
              alt="Oil and Gas Service"
              className="section-image"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          <h3 className="sub-section-heading">Midstream Services</h3>
          <ul className="styled-list">
            <li>Pipeline transportation and maintenance</li>
            <li>Storage facility management</li>
            <li>Gas processing and treatment</li>
            <li>Compression services</li>
            <li>Flow measurement and monitoring</li>

          </ul>
          <h3 className="sub-section-heading">Support Services</h3>
          <ul className="styled-list">
            <li>Environmental compliance and remediation</li>
            <li>Safety consulting and training</li>
            <li>Equipment rental and Leasing</li>
            <li>Logistics and supply chain management</li>
            <li>Engineering consulting</li>
            <li>Project management</li>
            <li>Asset intergrity management</li>
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
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="section-heading">Additional Specialized Services</h2>

          <motion.div className="service-card-grid" variants={containerVariants}>
            {/* Environmental Services */}
            <motion.div className="service-card" variants={cardVariants}>
              <div className="service-icon"><FaLeaf /></div>
              <h3 className="service-title">Environmental Services</h3>
              <p className="service-desc">Compliance, remediation, and environmental management solutions.</p>
              <ul className="card-list">
                <li>Environmental Compliance</li>
                <li>Site Remediation</li>
                <li>Waste Management</li>
                <li>Environmental Monitoring</li>
              </ul>
            </motion.div>

            {/* Logistics Services */}
            <motion.div className="service-card" variants={cardVariants}>
              <div className="service-icon"><FaTruck /></div>
              <h3 className="service-title">Logistics Services</h3>
              <p className="service-desc">Supply chain management and logistics optimization solutions.</p>
              <ul className="card-list">
                <li>Supply Chain Management</li>
                <li>Equipment Transportation</li>
                <li>Inventory Management</li>
                <li>Route Optimization</li>
              </ul>
            </motion.div>

            {/* Safety & Compliance */}
            <motion.div className="service-card" variants={cardVariants}>
              <div className="service-icon"><FaShieldAlt /></div>
              <h3 className="service-title">Safety & Compliance</h3>
              <p className="service-desc">Safety consulting, training, and regulatory compliance services.</p>
              <ul className="card-list">
                <li>Safety Consulting</li>
                <li>Training Programs</li>
                <li>Regulatory Compliance</li>
                <li>Risk Assessment</li>
              </ul>
            </motion.div>

            {/* Engineering Consulting */}
            <motion.div className="service-card" variants={cardVariants}>
              <div className="service-icon"><FaCogs /></div>
              <h3 className="service-title">Engineering Consulting</h3>
              <p className="service-desc">Technical consulting and engineering solutions for complex projects.</p>
              <ul className="card-list">
                <li>Process Engineering</li>
                <li>Asset Integrity Management</li>
                <li>Project Management</li>
                <li>Technical Audits</li>
              </ul>
            </motion.div>

            {/* Downstream Services */}
            <motion.div className="service-card" variants={cardVariants}>
              <div className="service-icon"><FaOilCan /></div>
              <h3 className="service-title">Downstream Services</h3>
              <p className="service-desc">Refinery support, product distribution, and quality control services.</p>
              <ul className="card-list">
                <li>Refinery Support Services</li>
                <li>Product Distribution</li>
                <li>Quality Control & Testing</li>
                <li>Process Optimization</li>
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
            <ul>
              {listItems.map((item, index) => (
                <li
                  key={index}
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
                className={`infra-subsection fade-item ${
                  visible ? "fade-item-in" : ""
                }`}
                style={{
                  transitionDelay: `${
                    0.2 + (listItems.length + index) * 0.15
                  }s`
                }}
              >
                <h3>{sec.title}</h3>
                <p>{sec.text}</p>
              </div>
            ))}
          </div>

          <div
            className={`energy-infra-chart fade-item ${
              visible ? "fade-item-in" : ""
            }`}
            style={{
              transitionDelay: `${0.2 + totalItemsBeforeCircle * 0.15}s`
            }}
          >
            <ProvenResultsCircle start={visible} />
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ServicesPage;
