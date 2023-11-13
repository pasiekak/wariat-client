import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import OtaClient from '@crowdin/ota-client';
import HttpBackend from 'i18next-http-backend';

// ota setup - Crowdin
// import axios from 'axios';
// const hash = '21f525e7630b47d1eab3839flvp';
// const otaClient = new OtaClient(hash, {httpClient: axios});

i18n
    .use(initReactI18next)
    .use(HttpBackend)
    .init({
        backend: { loadPath: '/translations/{{lng}}.json'},
        lng: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pl',
        fallbackLng: 'pl',
        interpolation: { escapeValue: false },
        react: { useSuspense: true }
    })

export default i18n;