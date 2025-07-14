import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './Pages/Home';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-content">
        {/* Other components or routes can be added here */}
        <main>
          {/* Main content will be rendered here */}
          <MainContent />
        </main>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
