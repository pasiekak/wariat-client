import { useTranslation } from "react-i18next";

import FormLinks from "../form-links/FormLinks";
import "./not-logged.css";

type NotLoggedProps = {
  message?: string;
};

const NotLogged = ({ message }: NotLoggedProps) => {
  const { t } = useTranslation("apiMessages", {
    keyPrefix: "apiMessages.token",
  });

  return (
    <div className="NotLogged bck-smooth">
      <span className="not-logged-span-message">
        {message
          ? t(message)
          : "Jesteś niezalogowany i nie masz dostępu do tych treści"}
      </span>
      <FormLinks withLogin={true} withRegister={true} color={"black"} />
    </div>
  );
};

export default NotLogged;
