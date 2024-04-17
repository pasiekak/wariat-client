import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faWarehouse } from "@fortawesome/free-solid-svg-icons";

import dpdPNG from "./assets/dpd.png";
import inpostcourier from "./assets/inpost-courier.png";
import inpostpaczkomat from "./assets/inpost-paczkomat.png";

import "./styles/basic-style.css";

const DeliveryIcon = ({ deliveryIcon }: { deliveryIcon: string }) => {
  const renderIcon = () => {
    switch (deliveryIcon) {
      case "dpd-courier":
        return <img className="delivery-icon" src={dpdPNG} alt={"dpd icon"} />;
      case "inpost-courier":
        return (
          <img
            className="delivery-icon"
            src={inpostcourier}
            alt={"inpost courier"}
          />
        );
      case "inpost-paczkomat":
        return (
          <img
            className="delivery-icon"
            src={inpostpaczkomat}
            alt={"inpost paczkomat"}
          />
        );
      case "in-person":
        return <FontAwesomeIcon className="delivery-icon" icon={faWarehouse} />;

      default:
        return <FontAwesomeIcon className="delivery-icon" icon={faTruck} />;
    }
  };

  return renderIcon();
};

export default DeliveryIcon;
