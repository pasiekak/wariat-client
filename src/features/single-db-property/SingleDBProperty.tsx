import { SingleDBPropertyProps } from "./types/SingleDBPropertyProps";
import useAxiosGet from "../../api/hooks/useAxiosGet";
import Label from "./components/Label";
import Value from "./components/Value";
import { useEffect, useRef, useState } from "react";
import PropertyForm from "./components/PropertyForm";
import Button from "react-bootstrap/Button";
import { singleAttribute } from "../../api/types/singleAttribute";
import BannerPortal from "../message-banner/BannerPortal";
import { IBannerPortalForwardedFunctions } from "../message-banner/types/IBannerPortalForwardedFunctions";

const SingleDBProperty = ({
  modifiable = false,
  attributeName,
  input,
  getURL,
  putURL,
  labelText,
}: SingleDBPropertyProps) => {
  const portalRef = useRef<IBannerPortalForwardedFunctions>(null);
  const { data, loading } = useAxiosGet({ url: getURL });
  const [value, setValue] = useState<singleAttribute>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data?.singleAttribute !== undefined) {
      setValue(data.singleAttribute);
    }
  }, [data]);

  const updateValue = (value: string | number) => {
    if (portalRef.current)
      portalRef.current.addBanner({
        message: "Udało się zmienić wartość",
        type: "success",
      });
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
        <Button variant="dark" onClick={() => setShowForm(true)}>
          Edytuj
        </Button>
      )}
      <BannerPortal ref={portalRef} autoClose={true} autoCloseTime={5000} />
    </div>
  );
};

export default SingleDBProperty;
