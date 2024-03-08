import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

import { CartContext } from "../context/cart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import defaultImage from "../../../../../components/logo/wariatLogoBlack.png";

const ListItem = ({ item }) => {
  const navigate = useNavigate();
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      quantity: item.quantity,
    },
  });
  const { t: tCart } = useTranslation(null, { keyPrefix: "components.cart" });
  const [showNumberInput, setShowNumberInput] = useState(false);
  const { updateQuantityInCart, removeFromCart } = useContext(CartContext);
  const input = watch("quantity");

  const onChange = (data) => {
    let quantity = parseInt(data.quantity);
    updateQuantityInCart(quantity, item.id);
  };

  useEffect(() => {
    if (input > 9) {
      setShowNumberInput(true);
    }
  }, [input]);

  const handleInputNumberChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > item.maxQuantity) {
      setValue("quantity", item.maxQuantity);
    } else if (value < 10) {
      setShowNumberInput(false);
      if (value < 1) {
        setValue("quantity", 1);
      } else {
        setValue("quantity", value);
      }
    } else {
      setValue("quantity", value);
    }
  };

  return (
    <ListGroup.Item key={item.id}>
      <div className="item-left">
        <img
          src={
            item.mainImageId > 0
              ? `/api/images/${item.mainImageId}`
              : defaultImage
          }
          alt=""
        />
        <span
          className="name"
          onClick={() => {
            console.log(item);
            navigate(`/products/product/${item.id}`, {
              state: { product: item },
            });
          }}
        >
          {item.name}
        </span>
      </div>
      <div className="item-right">
        <Form onChange={handleSubmit(onChange)}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              removeFromCart(item);
            }}
            title={tCart("remove-from-cart-button")}
            id="remove-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
              />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </Button>
          {showNumberInput ? (
            <Form.Control
              type="number"
              min={"1"}
              max={`${item.maxQuantity}`}
              {...register("quantity", { min: 1, max: item.maxQuantity })}
              onBlur={handleInputNumberChange}
            />
          ) : (
            <Form.Select {...register("quantity")}>
              {[
                ...Array(item.maxQuantity >= 10 ? 10 : item.maxQuantity).keys(),
              ].map((value) =>
                value < 9 ? (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                ) : (
                  <option key={value + 1} value={value + 1}>
                    9+
                  </option>
                ),
              )}
            </Form.Select>
          )}
        </Form>
        <span className="price">
          {Number(item.priceBrutto * item.quantity).toFixed(2)} zł
        </span>
      </div>
    </ListGroup.Item>
  );
};

export default ListItem;
