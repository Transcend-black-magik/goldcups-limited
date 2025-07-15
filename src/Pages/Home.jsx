import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/styles/MainContent.css';
import HeroImage from '../assets/hero-image.png';

// Icons
import {
  FaBriefcase,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaPenFancy,
  FaShoppingCart,
  FaBuilding,
  FaHome
} from 'react-icons/fa';

const servicesData = [
  {
    title: 'Business Registration',
    desc: 'Complete business registration services with the Corporate Affairs Commission (CAC), including name search, reservation, and documentation.',
    icon: <FaBriefcase />
  },
  {
    title: 'Tax Registration',
    desc: 'Facilitate Tax Identification Number (TIN) acquisition and guide through tax registration processes with FIRS and State Revenue Services.',
    icon: <FaFileInvoiceDollar />
  },
  {
    title: 'Annual Returns Filing',
    desc: 'Ensure statutory compliance by managing and filing annual returns with CAC and FIRS, including financial statements preparation.',
    icon: <FaFileAlt />
  },
  {
    title: 'Business Proposal Writing',
    desc: 'Expert assistance in developing compelling business proposals for funding, partnerships, and strategic planning.',
    icon: <FaPenFancy />
  },
  {
    title: 'Purchasing and Contract Management',
    desc: 'Comprehensive support in procurement processes, vendor selection, negotiation, and contract drafting and management.',
    icon: <FaShoppingCart />
  },
  {
    title: 'Property Management',
    desc: 'Comprehensive property management for residential, commercial, and industrial properties including tenant management and maintenance.',
    icon: <FaBuilding />
  },
  {
    title: 'Estate Management',
    desc: 'Integrated estate management services including facility administration, security management, and community engagement.',
    icon: <FaHome />
  }
];

const MainContent = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false, offset: 100, mirror: true });
    AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-wrapper">
          <div className="hero-text" data-aos="fade-up">
            <h1>
              Empowering Business and Property Growth in{' '}
              <span className="highlight-nigeria">Nigeria</span>
            </h1>
            <p>
              Delivering excellence in business consulting, registration, and property management across Nigeria.
              Let us simplify compliance and maximize your value.
            </p>
            <div class="btn-container">
            <button class="btn-primary" id="actionBtn" onClick={() => window.location.href = '/#'}>
              <span class="btn-icon">🚀</span>
              <span class="btn-text">Get Started</span>
              <span class="btn-spinner"></span>
            </button>
          </div>
          </div>
          <div className="hero-image" data-aos="zoom-in" data-aos-delay="200">
            <img src={HeroImage} alt="Business Illustration" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services" data-aos="fade-up" data-aos-delay="300">
        <h2>Our Core Services</h2>
        <h3>
          Goldcups Consulting Limited offers a synergistic suite of services designed to address the critical needs
          of businesses and property owners in Nigeria.
        </h3>
        <div className="service-cards">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="card"
              data-aos="fade-up"
              data-aos-delay={`${200 + index * 100}`}
            >
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
