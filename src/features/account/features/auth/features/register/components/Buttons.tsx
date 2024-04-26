import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";

type ButtonsProps = {
  loading: boolean;
  step: 1 | 2;
  setStep: Dispatch<SetStateAction<1 | 2>>;
  stepOneVerification: () => void;
};

const Buttons = ({
  loading,
  step,
  setStep,
  stepOneVerification,
}: ButtonsProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account.auth",
  });

  return (
    <div className="buttons">
      {step === 1 && (
        <Button variant="outline-light" onClick={stepOneVerification}>
          {loading ? <Spinner size="sm" /> : t("next-button")}
        </Button>
      )}
      {step === 2 && (
        <>
          <Button
            variant="outline-light"
            disabled={loading}
            onClick={() => setStep(1)}
          >
            {t("back-button")}
          </Button>
          <Button type="submit" variant="light">
            {loading ? <Spinner size="sm" /> : t("register-submit")}
          </Button>
        </>
      )}
    </div>
  );
};

export default Buttons;
