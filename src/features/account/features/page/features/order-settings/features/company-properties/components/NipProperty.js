import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "react-bootstrap/Button";

import accountActions from "../../../../../../../../../api/accountActions";

import "../styles/nip-property.css";

const schema = yup.object({
  nip: yup
    .string()
    .required("nip-required")
    .matches(/^\d{10}$/, "nip-digits"),
});
export const isValidNip = (nip) => {
  if (typeof nip !== "string") return false;

  let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  let controlNumber = parseInt(nip.substring(9, 10));
  let weightCount = weight.length;
  for (let i = 0; i < weightCount; i++) {
    sum += parseInt(nip.substr(i, 1)) * weight[i];
  }

  return sum % 11 === controlNumber;
};
const NipProperty = ({ nipOriginal, uploadNIPdata, updateContextFunction }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nip: nipOriginal ? nipOriginal : "",
    },
    resolver: yupResolver(schema),
  });
  const { t: tCom } = useTranslation(null, {
    keyPrefix:
      "components.account.order-settings.delivery-or-company-properties",
  });
  const { t: tAcc } = useTranslation(null, { keyPrefix: "components.account" });
  const [showEditor, setShowEditor] = useState(false);

  const onSubmit = (data) => {
    if (isValidNip(data.nip)) {
      clearErrors("nip");
      accountActions.companyData.updateNIP(data.nip).then((res) => {
        if (res.data.success) {
          updateContextFunction("companyData", { nip: data.nip });
          setShowEditor(false);
        }
      });
    } else {
      setError("nip", { type: "valid", message: "nip-invalid" });
    }
  };

  const loadCompanyDataFromApi = () => {
    let nip = watch("nip");
    if (isValidNip(nip)) {
      uploadNIPdata(nip).then((res) => {
        if (!res.success) {
          setError("nip", { type: "valid", message: res.message });
        } else {
          clearErrors("nip");
        }
      });
    }
  };

  return (
    <div className="nip-property single-property-wrapper">
      <h5>{tCom("nip")}</h5>
      <div className="single-property">
        {showEditor ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="nip-form-input-error">
              <input type="number" {...register("nip")} />
              <span>{errors?.nip && tCom(errors.nip.message)}</span>
            </div>
            <div className="buttons-wrapper">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setShowEditor(false);
                }}
              >
                {tAcc("go-back-button")}
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  loadCompanyDataFromApi();
                }}
              >
                {tAcc("upload-company-data")}
              </Button>
              <Button type="submit" variant="outline-success">
                {tAcc("confirm-button")}
              </Button>
            </div>
          </form>
        ) : (
          <div className="property-row">
            <span>
              {nipOriginal ? nipOriginal : tAcc("empty-property-message")}
            </span>
            <Button variant="outline-dark" onClick={() => setShowEditor(true)}>
              {tAcc("change-button")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default NipProperty;
