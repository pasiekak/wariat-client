import { IDelivery } from "../../../../../api/types/IDelivery";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../types/IOutletContext";
import DeliveryIcon from "../../../../../components/deliveryIcon/DeliveryIcon";
import Price from "./Price";

type DeliveriesProps = {
  deliveries: IDelivery[];
  deleteDelivery: (delivery: IDelivery) => void;
};

const Deliveries = ({ deliveries, deleteDelivery }: DeliveriesProps) => {
  const { addBanner } = useOutletContext<IDefaultOutletContext>();

  const handleDelete = (delivery: IDelivery) => {
    if (delivery.modifiable) {
      axios.delete(`/api/delivery/${delivery.id}`).then((res) => {
        if (res.status === 204) {
          deleteDelivery(delivery);
          addBanner({ type: "success", message: "Usunięto rodzaj dostawy." });
        }
      });
    }
  };

  return (
    <div className="deliveries solo">
      <div className="columns">
        <span>Ikona</span>
        <span>Nazwa</span>
        <span>Opłata* (zł)</span>
        <span>Opis</span>
        <span>Dostawca</span>
      </div>
      {deliveries.map((delivery) => (
        <div key={delivery.id} className="delivery-item">
          <DeliveryIcon deliveryIcon={delivery.icon} />
          <span>{delivery.name}</span>
          <Price {...delivery} />
          <span>
            {delivery.description ? delivery.description : "Nie podano"}
          </span>
          <span>{delivery.company ? delivery.company : "Nie podano"}</span>
          <Button
            variant="dark"
            disabled={!delivery.modifiable}
            onClick={() => handleDelete(delivery)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      ))}
      <p>* - Aby zmienić cenę wprowadź nową cenę i kliknij enter</p>
    </div>
  );
};

export default Deliveries;
