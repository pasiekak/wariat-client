import { IDelivery } from "../../../../../api/types/IDelivery";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../../types/IOutletContext";

type DeliveriesProps = {
  deliveries: IDelivery[];
  deleteDelivery: (delivery: IDelivery) => void;
};

const Deliveries = ({ deliveries, deleteDelivery }: DeliveriesProps) => {
  const { addBanner } = useOutletContext<IDefaultOutletContext>();

  const handleDelete = (delivery: IDelivery) => {
    axios.delete(`/api/delivery/${delivery.id}`).then((res) => {
      if (res.status === 204) {
        deleteDelivery(delivery);
        addBanner({ type: "success", message: "Usunięto rodzaj dostawy." });
      }
    });
  };

  return (
    <div className="deliveries solo">
      <div className="columns">
        <span>Nazwa</span>
        <span>Opłata</span>
        <span>Opis</span>
        <span>Dostawca</span>
      </div>
      {deliveries.map((delivery) => (
        <div key={delivery.id} className="delivery-item">
          <span>{delivery.name}</span>
          <span>{delivery.price.toFixed(2)} zł</span>
          <span>{delivery.description}</span>
          <span>{delivery.company}</span>
          <Button variant="dark" onClick={() => handleDelete(delivery)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Deliveries;
