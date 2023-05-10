import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/Header.js';
import Footer from './pages/Footer.js';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import LoginForm from './pages/LoginForm.js';
import CreateProduct from './pages/CreateProduct.js';
import './styles/App.css'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes >
          <Route path="/*" element={<NormalRoutes/>} />
          <Route path='/login' element={<LoginForm/>}/>
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
          <Route path='/createProduct' element={<CreateProduct />} />
          <Route path="/gallery" />
          <Route path="/contact" />
          <Route path="/about" />
      </Routes>
      <Footer/>
    </>
  )
}

export default App