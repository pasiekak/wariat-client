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
import EmailVerification from './components/views/accountRelated/email/EmailVerification';
import './styles/App.css';
import DashboardLayout from './components/views/normal/dashboard/DashboardLayout';
import UserTable from './components/views/normal/dashboard/tables/UserTable';
import ProductTable from './components/views/normal/dashboard/tables/ProductTable';
import ImageTable from './components/views/normal/dashboard/tables/ImageTable';
import CategoryTable from './components/views/normal/dashboard/tables/CategoryTable';

function App() {

  return (
    <div className='App'>
        <Routes >
          <Route path="/*" Component={NormalRoutes} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
          <Route path='/dashboard' Component={DashboardLayout}>
            <Route path='users' Component={UserTable} />
            <Route path='products' Component={ProductTable} />
            <Route path='images' Component={ImageTable} />
            <Route path='categories' Component={CategoryTable} />
          </Route>
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