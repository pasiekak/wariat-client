import { useEffect, useState } from "react";
import { ICategory } from "../../../../../api/types/ICategory";
import axios from "axios";
import { IMark } from "../../../../../api/types/IMark";
import { useTranslation } from "react-i18next";

type AttributesProps = {
  id: number;
  attributePlural: "categories" | "marks";
};

const Attributes = (props: AttributesProps) => {
  const [attributes, setAttributes] = useState<ICategory[] | IMark[]>([]);
  const { t } = useTranslation(undefined, { keyPrefix: "components.product" });

  useEffect(() => {
    axios
      .get(`/api/products/${props.id}/${props.attributePlural}`)
      .then((res) => {
        if (res.data?.attributes) {
          setAttributes(res.data.attributes);
        }
      });
  }, [props.id, props.attributePlural]);

  return (
    <div className={props.attributePlural}>
      <h4>{t(`${props.attributePlural}-label`)}</h4>
      <div className={"attributes-wrapper"}>
        {attributes.map((attribute, index) => (
          <span key={index}>{attribute.name}</span>
        ))}
      </div>
      {attributes.length === 0 && <h6>{t(`no-${props.attributePlural}`)}</h6>}
    </div>
  );
};

export default Attributes;
