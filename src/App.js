import { Route, Routes } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Home from './components/views/normal/home/Home';
import Products from './components/views/normal/products/Products';
import ProductDetails from './components/views/normal/productDetails/ProductDetails';
import Gallery from './components/views/normal/gallery/Gallery';
import Account from './components/views/accountRelated/account/Account';
import NotFound from './components/views/normal/notFound/NotFound';
import LoginPage from './components/views/accountRelated/login/LoginPage';
import RegisterPage from './components/views/accountRelated/register/RegisterPage';
import EmailVerification from './components/views/accountRelated/email/EmailVerification';
import NotLogged from './components/views/accountRelated/not-logged/Not-logged';
import DashboardLayout from './components/views/normal/dashboard/DashboardLayout';
import BasicTable from './components/views/normal/dashboard/tables/BasicTable';
import Order from './components/views/normal/order/Order';
import Orders from './components/views/normal/dashboard/customTables/Orders';
import Summary from './components/views/normal/order/summary/Summary';

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
            <Route path='users' element={<BasicTable tableName='users'/>} />
            <Route path='products' element={<BasicTable tableName='products'/>}/>
            <Route path='orders' Component={Orders}/>
            <Route path='categories' element={<BasicTable tableName='categories'/>}/>
            <Route path='marks' element={<BasicTable tableName='marks'/>}/>
            <Route path='discounts' element={<BasicTable tableName='discounts'/>}/>
            <Route path='discountGroups' element={<BasicTable tableName='discountGroups'/>}/>
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