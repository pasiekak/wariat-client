import { IDiscount } from "../../../../../../../../../api/types/IDiscount";
import UserName from "./UserName";
import Category from "./Category";
import React, { useEffect, useState } from "react";
import Product from "./Product";

import "../styles/single-discount.css";
import Button from "react-bootstrap/Button";
import { isFutureDate } from "../../../../../../../../../utils/dateFunctions";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../../../../../types/IOutletContext";

type SingleDiscountProps = IDiscount & {
  type: string;
  onDelete: (id: number) => void;
};

const SingleDiscount = (props: SingleDiscountProps) => {
  const [active, setActive] = useState(
    isFutureDate(props.expires.toLocaleString()),
  );
  const [disabled, setDisabled] = useState(false);
  const { addBanner } = useOutletContext<IDefaultOutletContext>();

  useEffect(() => {
    const intervalID = setInterval(() => {
      setActive(isFutureDate(props.expires.toLocaleString()));
    }, 1000);

    return () => clearInterval(intervalID);
  }, [props.expires]);

  const handleDelete = () => {
    setDisabled(true);
    axios
      .delete(`/api/discounts/${props.id}`)
      .then((res) => {
        if (res.status === 204) {
          props.onDelete(props.id);
          addBanner({ message: "Pomyślnie usunięto zniżkę.", type: "success" });
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          addBanner({ message: "Nie udało się usunąć zniżki.", type: "error" });
        }
      })
      .finally(() => setDisabled(false));
  };

  return (
    <div className="single-discount discounts-content">
      {props.UserId && <UserName userID={props.UserId} />}
      {props.CategoryId && <Category categoryID={props.CategoryId} />}
      {props.ProductId && <Product productID={props.ProductId} />}
      <div className="created-at-info">
        <span>Data utworzenia</span>
        <span>{new Date(props.createdAt).toLocaleString()}</span>
      </div>
      <div className="expires-info">
        <span>Data wygaśnięcia</span>
        <span>{new Date(props.expires).toLocaleString()}</span>
      </div>
      <div className="percentage-info">
        <span>Wartość zniżki</span>
        <span>{props.percentage}%</span>
      </div>
      <div className={`active-info ${active ? "active" : "not-active"}`}>
        <span>Stan zniżki</span>
        <span>{active ? "Aktywna" : "Wygasła"}</span>
      </div>
      <div className="actions">
        <Button variant="dark" disabled={disabled} onClick={handleDelete}>
          Usuń
        </Button>
      </div>
    </div>
  );
};

export default SingleDiscount;
