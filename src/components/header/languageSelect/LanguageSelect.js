import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./languageSelect.css";

const LanguageSelect = ({ className }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "pl",
  );
  const { i18n } = useTranslation();

  const onChange = (event) => {
    localStorage.setItem("lang", event.target.value);
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, [lang]);

  return (
    <div className={`LanguageSelect${" " + className}`}>
      <select name="language" onChange={onChange} value={lang}>
        Wybierz język
        <option value="pl">Polski</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelect;
