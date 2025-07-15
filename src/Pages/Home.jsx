import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/styles/MainContent.css';
import HeroImage from '../assets/hero-image.png';
import missionImage from '../assets/mission-image.png';
import vissionImage from '../assets/vision-image.png';
import mottoImage from '../assets/motto-image.png';

// SVG icons (or use react-icons if you prefer)
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

const servicesData = [
  {
    title: 'Business Registration',
    desc: 'Complete business registration services with the Corporate Affairs Commission (CAC), including name search, reservation, and documentation.',
    icon: <FaBriefcase />,
  },
  {
    title: 'Tax Registration',
    desc: 'Facilitate Tax Identification Number (TIN) acquisition and guide through tax registration processes with FIRS and State Revenue Services.',
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
    desc: 'Integrated estate management services including facility administration, security management, and community engagement.',
    icon: <FaGasPump />,
  },
];


const MainContent = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero" data-aos="fade-up">
        <div className="hero-text">
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
          <img src={HeroImage} alt="Business illustration" />
        </div>
      </section>


      {/* Introduction section */}
      <section className="introduction" data-aos="fade-up" data-aos-delay="300">
        <h2>Discover Goldcups</h2>
        <p>
          Goldcups Consulting Limited is a newly established firm dedicated to providing
          comprehensive business and estate management services. With a deep
          understanding of the local market dynamics and a commitment to excellence,
          Goldcups Consulting Limited is set to be the trusted advisor for a diverse clientele,
          from aspiring entrepreneurs to established property holders.
        </p>
      </section>

      {/* Mission, Vision, and Motto Section */}
      <section className='mission-vision-motto'>
        <section className="mission" data-aos="fade-up" data-aos-delay="600">
          <h3 className='services-offered'>We Offer</h3>
        </section>

        {/* {Our Aim} */}
        <section className='offer-list' data-aos="fade-up" data-aos-delay="400">
          <div className='offer-list-items'>
            <div className='offer-item'>
              <img className='offer-img' src={missionImage} alt="Business illustration" />
              <h4>Our Mission</h4>
              <p>To provide exceptional, client-centric business and estate management solutions that
                  foster growth, ensure compliance, and maximize value for our clients in Nigeria.
                  Core Service Areas
              </p>
            </div>
            <div className='offer-item'>
              <img className='offer-img' src={vissionImage} alt="Business illustration" />
              <h4>Our Vision</h4>
              <p>To be the leading consulting firm in Nigeria, recognized for our integrity, expertise, and
                unwavering commitment to client success in both business and estate management.</p>
            </div>
            <div className='offer-item'>
              <img className='offer-img' src={mottoImage} alt="Business illustration" />
              <h4>Our Motto</h4>
              <p>Ensure statutory compliance by managing and filing annual returns with CAC and FIRS, including financial statements preparation.</p>
            </div>
          </div>
        </section>
      </section>

      {/* Services Section */}
      <section className="services" data-aos="fade-up" data-aos-delay="300">
        <h2>Our Core Services</h2>
        <h3>
          Goldcups Consulting Limited offers a synergistic suite of services designed to address the critical needs
          of businesses and property owners in Nigeria.
        </h3>
        <div className="service-cards">
          {servicesData.map((service, i) => (
            <div key={i} className="card" data-aos="fade-up" data-aos-delay={`${400 + i * 200}`}>
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