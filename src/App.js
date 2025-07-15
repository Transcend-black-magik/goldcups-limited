import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './Pages/Home';
import ServicesPage from './Pages/Services';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent/>} />
        <Route path="/services" element={<ServicesPage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
