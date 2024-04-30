import { LanguageContext, LanguageType } from "../context/LanguageContext.tsx";
import { ChangeEvent, useContext } from "react";

type FormFields = {
  lang: LanguageType;
};

const LanguageChanger = () => {
  const { lang, setLang } = useContext(LanguageContext);

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    setLang(e.target.value);
  };

  return (
    <form onChange={handleChange} className="language-changer">
      <select defaultValue={lang}>
        <option value={"pl"}>Polski</option>
        <option value={"en"}>English</option>
      </select>
    </form>
  );
};

export default LanguageChanger;
