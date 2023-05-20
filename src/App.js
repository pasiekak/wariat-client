import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Products from './components/products/Products';
import Gallery from './components/gallery/Gallery';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Account from './components/account/Account';
import NotFound from './components/notFound/NotFound';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import './styles/App.css';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes >
          <Route path="/*" element={<NormalRoutes/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
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
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About />}/>
          <Route path="/accountManager" element={<Account/>}/>
          <Route path="/*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App