import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

import HeroImage from '../assets/hero-image.png';
import missionImage from '../assets/mission-image.png';
import vissionImage from '../assets/vision-image.png';
import valueImage from '../assets/value-image.png'
// import GetStartedImage from '../assets/get-started.png';
import "../components/styles/MainContent.css";

import {
  FaBriefcase,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaPenFancy,
  FaShoppingCart,
  FaBuilding,
  FaHome,
  FaGasPump,
} from 'react-icons/fa';
import AnimatedServices from "./AnimatedServices";

const businessServicesData = [
  {
    title: 'Business Registration',
    desc: 'Complete business registration services with the Corporate Affairs Commission (CAC), including name search, reservation, and documentation.',
    icon: <FaBriefcase />,
    sectionId: 'business-services',
  },
  {
    title: 'Tax Registration',
    desc: 'Facilitate Tax Identification Number (TIN) acquisition and guide through tax registration processes with FIRS and State Revenue Services.',
    icon: <FaFileInvoiceDollar />,
    sectionId: 'business-services',
  },
  {
    title: 'Annual Returns Filing',
    desc: 'Ensure statutory compliance by managing and filing annual returns with CAC and FIRS, including financial statements preparation.',
    icon: <FaFileAlt />,
    sectionId: 'business-services',
  },
  {
    title: 'Business Proposal Writing',
    desc: 'Expert assistance in developing compelling business proposals for funding, partnerships, and strategic planning.',
    icon: <FaPenFancy />,
    sectionId: 'business-services',
  },
];

const coreServicesData = [
  {
    title: 'Purchasing and Contract Management',
    desc: 'Comprehensive support in procurement processes, vendor selection, negotiation, and contract drafting and management.',
    icon: <FaShoppingCart />,
    sectionId: 'support-functions',
  },
  {
    title: 'Estate and Property Management',
    desc: 'Integrated estate management services including facility administration, security management, and community engagement.',
    icon: <FaHome />,
    sectionId: 'estate-property-management',
  },
  {
    title: 'Oil and Gas Services',
    desc: 'This business plan outlines the establishment of a new enterprise dedicated to providing specialized services, essential supplies, and comprehensive support to the oil and gas industry.',
    icon: <FaGasPump />,
    sectionId: 'oil-and-gas-services',
  },
];

const MainContent = () => {
  const navigate = useNavigate();

  const [typedText, setTypedText] = useState("");
  const [showNextParagraph, setShowNextParagraph] = useState(false);

  const fullText = `Goldcups Consulting Limited is dedicated to providing comprehensive business and estate management services. With a deep understanding of the local market dynamics and a commitment to excellence, Goldcups Consulting Limited is set to be the trusted advisor for a diverse clientele, from aspiring entrepreneurs to established property holders.`;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowNextParagraph(true), 500);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const handleCardClick = () => {
    navigate('/services', {
      state: {
        scrollTo: 'business-services',
        highlight: 'Business Services',
      },
    });
  };

  const handleGetStartedClick = () => {
    navigate("/contact");
  };

  return (
    <div className="main-content">
      {/* Hero Section with animated background */}
      <section className="hero" data-aos="fade-up">
        <motion.div
          className="hero-background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ backgroundImage: `url(${HeroImage})` }}
        />
        <div className="hero-text" data-aos="fade-right" data-aos-delay="300">
          <h1>
            Empowering Business and Property Growth in{' '}
            <span className="highlight-nigeria">Nigeria</span>
          </h1>
          <p>
            Delivering excellence in business consulting, registration, and property management across Nigeria.
            Let us simplify compliance and maximize your value.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="introduction" data-aos="fade-up" data-aos-delay="300">
        <h2>Discover Goldcups</h2>
        <p className="typing-text">
          <span>{typedText}</span><span className="blinking-cursor">|</span>
        </p>
        {showNextParagraph && (
          <motion.p
            className="intro-secondary-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Nigeria, a nation characterized by its dynamic economy and burgeoning
            entrepreneurial spirit, presents a landscape of immense opportunities
            alongside unique challenges. For businesses and property owners
            navigating this vibrant environment, access to expert guidance and
            streamlined services is paramount for sustainable growth and compliance.
            It is within this context that Goldcups Consulting Limited proudly
            announces its launch, poised to become a pivotal partner for individuals
            and organizations seeking to establish, manage, and grow their ventures
            in Nigeria.
          </motion.p>
        )}
      </section>

      {/* Mission and Vision */}
      <section className="offer-list" data-aos="fade-up" data-aos-delay="400">
        <div className='offer-list-items'>
          <div className='offer-item' data-aos="flip-left" data-aos-delay="100">
            <img className='offer-img' src={missionImage} alt="Mission" />
            <h4>Our Mission</h4>
            <p>
              To provide exceptional, client-centric business and estate management solutions that foster growth, ensure compliance, and maximize value for our clients in Nigeria.
            </p>
          </div>
          <div className='offer-item' data-aos="flip-right" data-aos-delay="200">
            <img className='offer-img' src={vissionImage} alt="Vision" />
            <h4>Our Vision</h4>
            <p>
              To be the leading consulting firm in Nigeria, recognized for our integrity, expertise, and unwavering commitment to client success.
            </p>
          </div>
          <div className='offer-item' data-aos="flip-right" data-aos-delay="200">
            <img className='offer-img' src={valueImage} alt="Vision" />
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

      {/* Core Services */}
      <section className="mission-header" data-aos="fade-up" data-aos-delay="100">
        <h2>Our Core Services</h2>
        <h3>
          Goldcups Consulting Limited offers a synergistic suite of services designed to address the critical needs of businesses, property owners and oil and gas sectors in Nigeria.
        </h3>
      </section>
      <section className="mission" data-aos="fade-up" data-aos-delay="200">
        

        <div className="service-cards">
          {coreServicesData.map((service, i) => (
            <div
              key={i}
              className="card"
              data-aos="zoom-in-up"
              data-aos-delay={`${400 + i * 200}`}
              onClick={() => handleCardClick(service.sectionId, service.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
          <div className='card'
            data-aos="zoom-in-up"
            data-aos-delay="1000"
            onClick={() => handleCardClick('business-services', 'Business Services')}
            style={{ cursor: 'pointer' }}>
            <div className="card-icon"><FaBuilding /></div>
            <h3>Business Services</h3>
            <ul className="services-list">
              {businessServicesData.map((service, i) => (
                <li key={i} className="service-item">
                  <span className="service-icon">{service.icon}</span>
                  <span>{service.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Document Services Section */}
      <section className="document-services" data-aos="fade-up" data-aos-delay="300">
        <AnimatedServices/>
      </section>


      {/* Get Started Section */}
      <div className="get-started-section" onClick={handleGetStartedClick}>
        <div className="get-started-overlay">
          <h2>Ready to Partner with Goldcups?</h2>
          <p>Let’s build something impactful together.</p>
          <motion.div
            className="animated-arrow"
            initial={{ x: 0 }}
            animate={{ x: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            →
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
