import React, { Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from '../src/reportWebVitals';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import App from './App';
import { CartProvider } from './context/cart';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Router>
            <Suspense fallback="Loading...">
                <I18nextProvider i18n={i18n} >
                    <CartProvider>
                        <App />
                    </CartProvider>
                </I18nextProvider>
            </Suspense>
        </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
