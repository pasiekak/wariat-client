import "./styles/attributes.css";
import { useEffect, useState } from "react";
import AttributeAdd from "./components/AttributeAdd";
import Attribute from "./components/Attribute";
import axios from "axios";
import { ICategory } from "./types/ICategory";
import { IMark } from "./types/IMark";
import { IAttributesComponentProps } from "./types/IAttributesComponentProps";

const Attributes = ({
  productID,
  attributeNameMany,
  attributes,
  updateAttribute,
}: IAttributesComponentProps) => {
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    (ICategory | IMark)[]
  >([]);

  useEffect(() => {
    axios.get(`/api/products/${productID}/${attributeNameMany}`).then((res) => {
      if (res.status === 200) {
        setSelectedAttributes(res.data.attributes);
      }
    });
  }, []);

  const addSelectedAttribute = (attribute: ICategory | IMark) => {
    setSelectedAttributes((prev) => {
      return [...prev, attribute];
    });
  };

  const removeSelectedAttribute = (attribute: ICategory | IMark) => {
    setSelectedAttributes((prev) => {
      return prev.filter((ob) => ob !== attribute);
    });
  };

  return (
    <section className="attributes">
      {attributeNameMany === "categories" && <h3>Kategorie</h3>}
      {attributeNameMany === "marks" && <h3>Marki</h3>}
      <div className="attributes-wrapper">
        {attributes.map((attribute) => (
          <Attribute
            attribute={attribute}
            attributeNameMany={attributeNameMany}
            key={attribute.id}
            productID={productID}
            updateAttribute={updateAttribute}
            selected={selectedAttributes?.some(
              (attr) => attr.id === attribute.id,
            )}
            addSelectedAttribute={addSelectedAttribute}
            removeSelectedAttribute={removeSelectedAttribute}
          />
        ))}
        <AttributeAdd
          attributeNameMany={attributeNameMany}
          updateAttribute={updateAttribute}
          setApiMessage={setApiMessage}
        />
        {apiMessage && <div className={`api-message`}>{apiMessage}</div>}
      </div>
    </section>
  );
};

export default Attributes;
