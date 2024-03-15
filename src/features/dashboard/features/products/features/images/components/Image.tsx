import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/image.css";

interface IImageProps {
  id: number;
  main: boolean;
  handleDelete: (id: number) => void;
  handleMain: (id: number) => void;
}

const Image = ({ id, main, handleDelete, handleMain }: IImageProps) => {
  return (
    <div className="image-wrapper">
      <img src={`/api/images/${id}`} alt="" />
      <div className="actions">
        <FontAwesomeIcon
          icon={faTrash}
          className="trash"
          onClick={() => handleDelete(id)}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`star${main ? " main" : ""}`}
          onClick={() => handleMain(id)}
        />
      </div>
    </div>
  );
};

export default Image;
