import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/styles/MainContent.css';
import HeroImage from '../assets/hero-image.png';
import missionImage from '../assets/mission-image.png';
import vissionImage from '../assets/vision-image.png';

import {
  FaBriefcase,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaPenFancy,
  FaShoppingCart,
  FaBuilding,
  FaHome,
  FaGasPump
} from 'react-icons/fa';

const businessServicesData = [
  {
    title: 'Business Registration',
    desc: 'Complete business registration services with the Corporate Affairs Commission (CAC), including name search, reservation, and documentation.',
    icon: <FaBriefcase />,
  },
  {
    title: 'Tax Registration',
    desc: 'Facilitate Tax Identification Number (TIN) acquisition and guide through tax registration  processes with FIRS and State Revenue Services.',
    icon: <FaFileInvoiceDollar />,
  },
  {
    title: 'Annual Returns Filing',
    desc: 'Ensure statutory compliance by managing and filing annual returns with CAC and FIRS, including financial statements preparation.',
    icon: <FaFileAlt />,
  },
  {
    title: 'Business Proposal Writing',
    desc: 'Expert assistance in developing compelling business proposals for funding, partnerships, and strategic planning.',
    icon: <FaPenFancy />,
  },
];

const coreServicesData = [
  {
    title: 'Purchasing and Contract Management',
    desc: 'Comprehensive support in procurement processes, vendor selection, negotiation, and contract drafting and management.',
    icon: <FaShoppingCart />,
  },
  {
    title: 'Property Management',
    desc: 'Comprehensive property management for residential, commercial, and industrial properties including tenant management and maintenance.',
    icon: <FaBuilding />,
  },
  {
    title: 'Estate Management',
    desc: 'Integrated estate management services including facility administration, security management, and community engagement.',
    icon: <FaHome />,
  },
  {
    title: 'Oil and Gas Services',
    desc: 'This business plan outlines the establishment of a new enterprise dedicated to providing specialized services, essential supplies, and comprehensive support to the oil and gas industry.',
    icon: <FaGasPump />,
  },
];

const MainContent = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: 'ease-in-out', once: false, offset: 100, mirror: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content">
      <section className="hero" data-aos="fade-up">
        <div className="hero-text" data-aos="fade-right" data-aos-delay="300">
          <h1>
            Empowering Business and Property Growth in{' '}
            <span className="highlight-nigeria">Nigeria</span>
          </h1>
          <p>
            Delivering excellence in business consulting, registration, and property management across Nigeria.
            Let us simplify compliance and maximize your value.
          </p>
          <div className="btn-container" data-aos="zoom-in" data-aos-delay="600">
            <button className="btn-primary" id="actionBtn" onClick={() => window.location.href = '/#'}>
              <span className="btn-icon">🚀</span>
              <span className="btn-text">Get Started</span>
              <span className="btn-spinner"></span>
            </button>
          </div>
        </div>
        <div className="hero-image" data-aos="fade-left" data-aos-delay="500">
          <img src={HeroImage} alt="Business illustration" />
        </div>
      </section>

      <section className="introduction" data-aos="fade-up" data-aos-delay="300">
        <h2>Discover Goldcups</h2>
        <p>
          Goldcups Consulting Limited is dedicated to providing
          comprehensive business and estate management services. With a deep
          understanding of the local market dynamics and a commitment to excellence,
          Goldcups Consulting Limited is set to be the trusted advisor for a diverse clientele,
          from aspiring entrepreneurs to established property holders.
        </p>
        <p className="highlight-nigeria">
          Nigeria, a nation characterized by its dynamic economy and burgeoning
          entrepreneurial spirit, presents a landscape of immense opportunities alongside
          unique challenges. For businesses and property owners navigating this vibrant
          environment, access to expert guidance and streamlined services is paramount for
          sustainable growth and compliance. It is within this context that Goldcups Consulting
          Limited proudly announces its launch, poised to become a pivotal partner for
          individuals and organizations seeking to establish, manage, and grow their ventures in
          Nigeria.
        </p>
      </section>

      <section className='mission-vision-motto'>
        {/* <section className="mission" data-aos="fade-up" data-aos-delay="600">
          <h3 className='services-offered'>We Offer</h3>
        </section> */}

        <section className='offer-list' data-aos="fade-up" data-aos-delay="400">
          <div className='offer-list-items'>
            <div className='offer-item' data-aos="flip-left" data-aos-delay="100">
              <img className='offer-img' src={missionImage} alt="Mission" />
              <h4>Our Mission</h4>
              <p>To provide exceptional, client-centric business and estate management solutions that
                foster growth, ensure compliance, and maximize value for our clients in Nigeria.
                Core Service Areas
              </p>
            </div>
            <div className='offer-item' data-aos="flip-right" data-aos-delay="200">
              <img className='offer-img' src={vissionImage} alt="Vision" />
              <h4>Our Vision</h4>
              <p>To be the leading consulting firm in Nigeria, recognized for our integrity, expertise, and
                unwavering commitment to client success in both business and estate management.</p>
            </div>
          </div>
        </section>
      </section>

      <section className="mission" data-aos="fade-up" data-aos-delay="200">
        <h2 style={{ color: "white", textAlign: "start", fontSize: "1.1rem" }}>Business Services</h2>
        <h3 style={{ color: "white", textAlign: "start", fontSize: "1.2rem", marginBottom: "3rem" }}>
          Goldcups Consulting Limited offers a synergistic suite of services designed to address the critical needs
          of businesses and property owners in Nigeria.
        </h3>
        <div className="service-cards">
          {businessServicesData.map((service, i) => (
            <div key={i} className="card" data-aos="zoom-in" data-aos-delay={`${300 + i * 150}`}>
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services" data-aos="fade-up" data-aos-delay="300">
        <h2>Our Core Services</h2>
        <div className="service-cards">
          {coreServicesData.map((service, i) => (
            <div key={i} className="card" data-aos="zoom-in-up" data-aos-delay={`${400 + i * 200}`}>
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