import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../../types/IOutletContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";

const DisplayPicker = () => {
  const context = useOutletContext<IOutletContext>();

  return (
    <div className="display-picker">
      <div
        className={`pick grid${context.display === "grid" ? " selected" : ""}`}
        onClick={() => context.changeDisplay("grid")}
      >
        <FontAwesomeIcon icon={faGrip} />
      </div>
      <div
        className={`pick list${context.display === "list" ? " selected" : ""}`}
        onClick={() => context.changeDisplay("list")}
      >
        <FontAwesomeIcon icon={faList} />
      </div>
    </div>
  );
};

export default DisplayPicker;
