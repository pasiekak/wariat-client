import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AccountContext } from "../account/context/account";
import { CartContext } from "./features/cart/context/cart";
import Cart from "./features/cart/Cart";
import Delivery from "./features/delivery/Delivery";
import ReceiverData from "./features/receiver/ReceiverData";
import SummaryBeforeSubmission from "./features/before-submission/SummaryBeforeSubmission";

import "./styles/order.css";
import orderActions from "../../api/orderActions";

const countReducer = (state, action) => {
  switch (action.type) {
    case "inc":
      localStorage.setItem("order-index", JSON.stringify(state + 1));
      return state + 1;
    case "dec":
      localStorage.setItem("order-index", JSON.stringify(state - 1));
      return state - 1;
    case "setIndex":
      localStorage.setItem("order-index", JSON.stringify(action.value));
      return action.value;
    default:
      return state;
  }
};

const Order = () => {
  const navigate = useNavigate();
  const [needAddress, setNeedAddress] = useState(true);
  const [loading, setLoading] = useState(false);
  const [index, dispatch] = useReducer(
    countReducer,
    localStorage.getItem("order-index")
      ? JSON.parse(localStorage.getItem("order-index"))
      : 1,
  );
  const { cartItems, isEmpty, clearCart, deliveryMethod } =
    useContext(CartContext);
  const { address, companyData, personalData, user } =
    useContext(AccountContext);

  useEffect(() => {
    if (isEmpty()) {
      dispatch({ type: "setIndex", value: 1 });
    }
  }, [isEmpty]);

  useEffect(() => {
    if (deliveryMethod === "Odbior osobisty") {
      setNeedAddress(false);
    } else {
      setNeedAddress(true);
    }
  }, [deliveryMethod]);

  const prepareOrder = (data) => {
    const products = cartItems.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: product.mainImageId || null,
        priceBrutto: product.priceBrutto,
        priceNetto: product.priceNetto,
        quantity: product.quantity,
      };
    });
    const order = {
      username: user?.username ? user.username : "Not logged user",
      products: products,
      deliveryType: deliveryMethod,
      wantInvoice: data.wantInvoice,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      ...(needAddress && {
        deliveryAddress: {
          country: data.country,
          city: data.city,
          postalCode: data.postalCode,
          street: data.street,
          homeNumber: parseInt(data.homeNumber),
        },
      }),
      ...(data.wantInvoice && {
        invoiceDetails: {
          nip: data.companyNip,
          companyName: data.companyName,
          country: data.companyCountry,
          city: data.companyCity,
          postalCode: data.companyPostalCode,
          street: data.companyStreet,
          buildingNumber: parseInt(data.companyBuildingNumber),
        },
      }),
    };
    sessionStorage.setItem("order-before-submission", JSON.stringify(order));
    dispatch({ type: "inc" });
  };

  const performOrder = (order) => {
    setLoading(true);
    orderActions.makeOrder(order).then((res) => {
      if (res.success) {
        clearCart();
        sessionStorage.clear();
        localStorage.setItem("order-index", 1);
        let orderID = res.data;
        navigate(`/order/${orderID}`);
        setLoading(false);
      } else {
        alert(res.message);
        setLoading(false);
      }
    });
  };

  return (
    <>
      {index === 1 && <Cart dispatch={dispatch} />}
      {index === 2 && (
        <Delivery dispatch={dispatch} needAddress={needAddress} />
      )}
      {index === 3 && (
        <ReceiverData
          dispatch={dispatch}
          prepareOrder={prepareOrder}
          needAddress={needAddress}
          user={user}
          address={address}
          personalData={personalData}
          companyData={companyData}
          loading={loading}
        />
      )}
      {index === 4 && (
        <SummaryBeforeSubmission
          performOrder={performOrder}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default Order;
