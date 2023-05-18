import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Products from './components/Products.js';
import LoginPage from './components/LoginPage.js';
import Gallery from './components/Gallery.js';
import NotFound from './components/NotFound.js';
import Dashboard from './components/dashboard/Dashboard.js';
import './styles/App.css'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes >
          <Route path="/*" element={<NormalRoutes/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

const NormalRoutes = () => {
  return (
    <>
      <Header/>
      <Routes >
          <Route path='/' element={<Home/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" />
          <Route path="/about" />
          <Route path="/*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App