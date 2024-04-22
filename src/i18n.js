import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import OtaClient from '@crowdin/ota-client';
import HttpBackend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    lng: localStorage.getItem("lang") ? localStorage.getItem("lang") : "pl",
    backend: { loadPath: "/translations/{{lng}}.json" },
    fallbackLng: "pl",
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export default i18n;
