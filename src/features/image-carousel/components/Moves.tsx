import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

type MovesProps = {
  handleMove: (type: string) => void;
  leftDisabled: boolean;
  rightDisabled: boolean;
};

const Moves = (props: MovesProps) => {
  return (
    <>
      <div
        className={`move left${props.leftDisabled ? " disabled" : ""}`}
        onClick={() => props.handleMove("previous")}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div
        className={`move right${props.rightDisabled ? " disabled" : ""}`}
        onClick={() => props.handleMove("next")}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </>
  );
};

export default Moves;
