import { useForm } from "react-hook-form";
import { singleAttribute } from "../../../api/types/singleAttribute";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CustomInput from "./CustomInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type propertyFormProps = {
  input: string;
  attributeName: string;
  value: singleAttribute | undefined;
  hideForm: () => void;
  putURL: string;
  updateValue: (value: string) => void;
};

const PropertyForm = ({
  input,
  attributeName,
  value,
  hideForm,
  putURL,
  updateValue,
}: propertyFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      [attributeName]: value,
    },
  });
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    axios
      .put(putURL, data)
      .then((res) => {
        if (res.status === 200) {
          updateValue(data[attributeName]);
          hideForm();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type={input}
        register={register}
        attributeName={attributeName}
      />
      <Button variant="dark" onClick={() => hideForm()}>
        {t("go-back-button")}
      </Button>
      <Button variant="success" type="submit" disabled={loading}>
        {t("confirm-button")}
      </Button>
    </form>
  );
};

export default PropertyForm;
