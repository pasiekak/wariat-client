import { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./languageSelect.css";
import { useLocalStorage } from "../../../hooks/useStorage";
import { uuid } from "../../../utils/uuid";

type LanguageSelect = {
  className: string;
};

type availableLanguages = "pl" | "en";
const availableLanguages = [
  {
    name: "Polski",
    value: "pl",
  },
  {
    name: "English",
    value: "en",
  },
];

const LanguageSelect = ({ className }: LanguageSelect) => {
  const [lang, setLang] = useLocalStorage<availableLanguages>("lang", "pl");

  const { i18n } = useTranslation();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value as availableLanguages);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div className={`LanguageSelect${" " + className}`}>
      <select name="language" onChange={onChange} value={lang}>
        Wybierz język
        {availableLanguages.map((l) => (
          <option key={"option" + uuid()} value={l.value}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelect;
