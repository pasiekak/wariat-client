import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/attribute.css";
import axios from "axios";
import { useState } from "react";
import { IAttributeComponentProps } from "../types/IAttributeComponentProps";

const Attribute = ({
  productID,
  attribute,
  attributeNameMany,
  updateAttribute,
  selected,
  addSelectedAttribute,
  removeSelectedAttribute,
}: IAttributeComponentProps) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    if (selected) {
      axios
        .put(
          `/api/products/${productID}/${attributeNameMany}/${attribute.id}/?type=unlink`,
        )
        .then((res) => {
          if (res.status === 200) {
            removeSelectedAttribute(attribute);
          }
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .put(
          `/api/products/${productID}/${attributeNameMany}/${attribute.id}/?type=add`,
        )
        .then((res) => {
          if (res.status === 200) {
            addSelectedAttribute(attribute);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`/api/${attributeNameMany}/${attribute.id}`)
      .then((res) => {
        if (res.status === 204) {
          updateAttribute(attribute, attributeNameMany, "delete");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="attribute normal">
      <span
        className={selected ? "selected" : ""}
        title={`Kliknij żeby dodać przedmiot do kategorii: ${attribute.name}`}
        onClick={handleClick}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        {attribute.name}
      </span>
      <div className="vertical-line"></div>
      <div
        className="delete-wrapper"
        title="Całkowicie usuń kategorię."
        onClick={handleDelete}
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        <FontAwesomeIcon icon={faMinus} className="delete" />
      </div>
    </div>
  );
};

export default Attribute;
