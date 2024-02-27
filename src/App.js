import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/landing-page/Home';
import Products from './features/products/Products';
import ProductDetails from './features/products/features/product-page/ProductDetails';
import Gallery from './features/gallery/Gallery';
import Account from './features/account/features/page/Account';
import NotFound from './components/not-found-page/NotFound';
import LoginPage from './features/account/features/auth/features/login/LoginPage';
import RegisterPage from './features/account/features/auth/features/register/RegisterPage';
import EmailVerification from './features/account/features/auth/features/email/EmailVerification';
import NotLogged from './features/account/features/auth/components/not-logged/Not-logged';
import DashboardLayout from './features/dashboard/DashboardLayout';
import Order from './features/order/Order';
import Summary from './features/order/features/summary/Summary';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
        <Routes >
          <Route path="/*" Component={NormalRoutes} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
          <Route path='/dashboard' Component={DashboardLayout}>

          </Route>
          <Route path='/email-verification' Component={EmailVerification}/>
          <Route path='/not-logged' Component={NotLogged}/>
        </Routes>
    </div>
  );
}

const NormalRoutes = () => {
  return (
    <>
      <Header/>
      <Routes >
          <Route path="/" Component={Home}/>
          <Route path="/products" Component={Products}/>
          <Route path="/products/product/:productId" Component={ProductDetails}/>
          <Route path="/gallery" Component={Gallery} />
          <Route path="/account" Component={Account}/>
          <Route path="/order" Component={Order}/>
          <Route path="/order/:orderID" Component={Summary}/>
          <Route path="/*" Component={NotFound}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App