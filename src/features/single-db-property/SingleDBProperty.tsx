import { SingleDBPropertyProps } from "./types/SingleDBPropertyProps";
import Label from "./components/Label";
import Value from "./components/Value";
import { useEffect, useRef, useState } from "react";
import PropertyForm from "./components/PropertyForm";
import Button from "react-bootstrap/Button";
import { singleAttribute } from "../../api/types/singleAttribute";
import BannerPortal from "../message-banner/BannerPortal";
import { IBannerPortalForwardedFunctions } from "../message-banner/types/IBannerPortalForwardedFunctions";
import axios from "axios";

import "./styles/single-db-property.css";
import { useTranslation } from "react-i18next";

const SingleDBProperty = ({
  modifiable = false,
  attributeName,
  input,
  getURL,
  putURL,
  labelText,
  updateContextValueFN,
  initialValue,
}: SingleDBPropertyProps) => {
  const portalRef = useRef<IBannerPortalForwardedFunctions>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<singleAttribute>();
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.account",
  });

  useEffect(() => {
    if (!initialValue) {
      setLoading(true);
      axios
        .get(getURL)
        .then((res) => {
          if (res?.data?.singleAttribute) {
            setValue(res.data.singleAttribute);
          }
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    } else {
      setValue(initialValue);
    }
  }, [initialValue, getURL]);

  const updateValue = (value: string | number) => {
    if (portalRef.current)
      portalRef.current.addBanner({
        message: "Udało się zmienić wartość",
        type: "success",
      });
    if (attributeName && updateContextValueFN) {
      updateContextValueFN(value, attributeName);
    }
    setValue(value);
  };

  return (
    <div
      className={`single-db-property${attributeName ? ` ${attributeName}` : ""}`}
    >
      <Label labelText={labelText} />
      {showForm && modifiable ? (
        input &&
        attributeName &&
        putURL && (
          <PropertyForm
            input={input}
            attributeName={attributeName}
            value={value}
            putURL={putURL}
            updateValue={updateValue}
            hideForm={() => setShowForm(false)}
          />
        )
      ) : (
        <Value loading={loading} value={value} />
      )}
      {!showForm && modifiable && !loading && (
        <Button variant="outline-dark" onClick={() => setShowForm(true)}>
          {t("change-button")}
        </Button>
      )}
      <BannerPortal ref={portalRef} autoClose={true} autoCloseTime={5000} />
    </div>
  );
};

export default SingleDBProperty;
