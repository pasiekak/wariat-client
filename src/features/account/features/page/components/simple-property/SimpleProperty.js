import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SimpleProperty = ({
  inputType,
  titleTranslation,
  placeholderTranslation,
  attrName,
  attrValue,
  updateFunction,
  updateContextFunction,
  contextAttrName,
}) => {
  const { t } = useTranslation();
  const [showEditor, setShowEditor] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      [attrName]: attrValue,
    },
  });
  const input = watch(attrName);

  const onSubmit = (data) => {
    if (input !== "") {
      updateFunction(input).then((res) => {
        if (res.data.success) {
          updateContextFunction(contextAttrName, data);
        }
      });
      setShowEditor(false);
    } else {
      setShowEditor(false);
    }
  };

  return (
    <div className="single-property-wrapper">
      <h5>{t(`components.account.${titleTranslation}`)}</h5>
      <div className="single-property">
        {showEditor ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              type={inputType}
              placeholder={t(`components.account.${placeholderTranslation}`)}
              {...register(`${attrName}`)}
            />
            <div className="buttons-wrapper">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setShowEditor(false);
                }}
              >
                {t("components.account.go-back-button")}
              </Button>
              <Button type="submit" variant="outline-dark">
                {t("components.account.confirm-button")}
              </Button>
            </div>
          </Form>
        ) : (
          <div className="property-row">
            <span>{attrValue}</span>
            <Button variant="outline-dark" onClick={() => setShowEditor(true)}>
              {t("components.account.change-button")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleProperty;
