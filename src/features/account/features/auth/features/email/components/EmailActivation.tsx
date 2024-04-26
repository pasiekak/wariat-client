import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import FormLinks from "../../../components/form-links/FormLinks.tsx";

const EmailActivation = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [apiCode, setApiCode] = useState<string | undefined>();

  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = searchParams.get("token");
    if (token) {
      axios
        .post(`/api/auth/register?token=${token}`)
        .then((res) => {
          if (res.status === 201) {
            setApiCode("account-activated");
          }
        })
        .catch((err) => {
          if (err?.response?.data?.code) {
            setApiCode(err.response.data.code);
          } else {
            setApiCode("not-known-error");
          }
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className={`email-activation auth-outlet${loading ? " loading" : ""}`}>
      <h2>{t("email-activation-title")}</h2>
      <div className="message">
        {loading ? (
          <Spinner size={"sm"} />
        ) : (
          apiCode && (
            <>
              <p>{t(`api-messages.${apiCode}`)}</p>
              <FormLinks
                withRegister={
                  apiCode !== "account-activated" &&
                  apiCode !== "account-already-activated"
                }
                withLogin={
                  apiCode === "account-activated" ||
                  apiCode === "account-already-activated"
                }
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default EmailActivation;
