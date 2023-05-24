import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Home from './components/views/home/Home';
import Products from './components/views/products/Products';
import Gallery from './components/views/gallery/Gallery';
import Contact from './components/views/contact/Contact';
import About from './components/views/about/About';
import Account from './components/views/account/Account';
import NotFound from './components/views/notFound/NotFound';
import LoginPage from './components/views/login/LoginPage';
import RegisterPage from './components/views/register/RegisterPage';
import Dashboard from './components/views/dashboard/Dashboard';
import './styles/App.css';

import i18n from 'i18next';
import { useTranslation, initReactI18next, Trans } from 'react-i18next';
import HttpBackend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    backend: { loadPath: "/translations/{{lng}}.json"},
    lng: "pl",
    fallbackLng: "pl",
    interpolation: { escapeValue: false },
  });
const App = () => {
  const { t } = useTranslation();
  const onChange = (event) => {
    i18n.changeLanguage(event.target.value);
  }


  return (
    <div className='App'>
      <Router>
        <h1>{t("welcome")}</h1>
        <select name='language' onChange={onChange}>
          <option value='pl'>Polish</option>
          <option value='en'>English</option>
        </select>
        <Routes >
          <Route path='/*' element={<NormalRoutes/>} />
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
          <Route path="/account" element={<Account/>}/>
          <Route path="/*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App