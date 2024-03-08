import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import PhoneInputWithCountrySelect from "react-phone-number-input";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "react-phone-number-input/style.css";
import accountActions from "../../../../../../../../../api/accountActions";

const PhoneNumberProperty = ({ phone, updateContextFunction }) => {
  const { t: tAcc } = useTranslation(null, { keyPrefix: "components.account" });
  const { t: tOrd } = useTranslation(null, {
    keyPrefix: "components.account.order-settings.person-properties",
  });
  const { handleSubmit, control, setValue, watch } = useForm();
  const [showPhoneEditor, setShowPhoneEditor] = useState(false);

  useEffect(() => {
    setValue("phone", phone);
  }, [phone, setValue]);

  const onSubmit = (data) => {
    if (data.phone) {
      accountActions.personalData.updatePhoneNumber(data.phone).then((res) => {
        if (res.data.success) {
          updateContextFunction("personalData", { phone: data.phone });
        }
      });
      setShowPhoneEditor(false);
    }
  };

  return (
    <div className="single-property-wrapper">
      <h5>{tOrd("phone-number")}</h5>
      <div className="single-property">
        {showPhoneEditor ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <PhoneInputWithCountrySelect
              name="phone"
              value={watch("phone")}
              control={control}
              rules={{ required: true }}
              onChange={(value) => setValue("phone", value)}
            />
            <div className="buttons-wrapper">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setShowPhoneEditor(false);
                }}
              >
                {tAcc("go-back-button")}
              </Button>
              <Button type="submit" variant="outline-dark">
                {tAcc("confirm-button")}
              </Button>
            </div>
          </Form>
        ) : (
          <div className="property-row">
            {phone ? (
              <span>{phone}</span>
            ) : (
              <span>{tOrd("no-phone-number-provided")}</span>
            )}
            <Button
              variant="outline-dark"
              onClick={() => setShowPhoneEditor(true)}
            >
              {tAcc("change-button")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberProperty;
