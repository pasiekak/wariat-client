import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
} from "react";
import { useLocalStorage } from "../../../hooks/useStorage.ts";
import i18n from "i18next";

export type LanguageType = "pl" | "en";

export type LanguageContextValues = {
  lang: LanguageType;
  setLang: Dispatch<SetStateAction<LanguageType>>;
};
export const LanguageContext = createContext<LanguageContextValues>(
  {} as LanguageContextValues,
);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLang] = useLocalStorage<LanguageType>("lang", "pl");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
