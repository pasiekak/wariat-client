import { Route, Routes } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Home from './components/views/normal/home/Home';
import Products from './components/views/normal/products/Products';
import Gallery from './components/views/normal/gallery/Gallery';
import Contact from './components/views/normal/contact/Contact';
import About from './components/views/normal/about/About';
import Account from './components/views/accountRelated/account/Account';
import NotFound from './components/views/normal/notFound/NotFound';
import LoginPage from './components/views/accountRelated/login/LoginPage';
import RegisterPage from './components/views/accountRelated/register/RegisterPage';
import Dashboard from './components/views/normal/dashboard/Dashboard';
import EmailVerification from './components/views/accountRelated/email/emailVerification';
import './styles/App.css';

function App() {

  return (
    <div className='App'>
        <Routes >
          <Route path="/*" Component={NormalRoutes} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
          <Route path='/dashboard' Component={Dashboard}/>
          <Route path='/email-verification' Component={EmailVerification}/>
        </Routes>
    </div>
  );
}

const NormalRoutes = () => {
  return (
    <>
      <Header/>
      <Routes >
          <Route path='/' Component={Home} />
          <Route path="/products" Component={Products} />
          <Route path="/gallery" Component={Gallery} />
          <Route path="/contact" Component={Contact}/>
          <Route path="/about" Component={About}/>
          <Route path="/account" Component={Account}/>
          <Route path="/*" Component={NotFound} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App