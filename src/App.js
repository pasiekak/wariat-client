import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import MainBody from './components/MainBody.js';
import './styles/App.css'

function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes >
          <Route path="/" element={<MainBody/>} />
          <Route path="/products" />
          <Route path="/gallery" />
          <Route path="/contact" />
          <Route path="/about" />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App