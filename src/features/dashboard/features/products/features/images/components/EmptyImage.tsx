import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/empty-image.css";
import { ChangeEvent, useRef } from "react";

interface IEmptyImageProps {
  handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmptyImage = ({ handleAddImage }: IEmptyImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <form className="empty-image-wrapper">
      <FontAwesomeIcon
        icon={faPlus}
        className="add-image-icon"
        onClick={handleClick}
      />
      <input
        type="file"
        accept=".jpg, .png"
        onChange={handleAddImage}
        style={{ display: "none" }}
        ref={inputRef}
      />
    </form>
  );
};

export default EmptyImage;
