import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/Header.js';
import Footer from './pages/Footer.js';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import './styles/App.css'

function App() {

  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes >
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products />}/>
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