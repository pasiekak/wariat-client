import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import IPublicationInput from "../types/publicationInput";
import "../styles/publication-input.css";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

interface IOutletContext {
  updateItem: (id: number, data: { published: boolean }) => void;
}

const PublicationInput = ({ id, published }: IPublicationInput) => {
  const { updateItem } = useOutletContext<IOutletContext>();
  const handleClick = (published: boolean) => {
    axios.put(`/api/products/${id}`, { published }).then((res) => {
      if (res.status === 204) {
        updateItem(id, { published });
      }
    });
  };

  return (
    <div className="publication-input">
      {published ? (
        <FontAwesomeIcon
          icon={faCircleCheck}
          color={"green"}
          onClick={() => handleClick(false)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCircleXmark}
          color={"red"}
          onClick={() => handleClick(true)}
        />
      )}
    </div>
  );
};

export default PublicationInput;
