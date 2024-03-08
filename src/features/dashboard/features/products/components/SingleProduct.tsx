import ProductNotDetailed from "../../../types/product";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleProduct = ({
  id,
  name,
  priceBrutto,
  maxQuantity,
  published,
}: ProductNotDetailed) => {
  return (
    <div className="product">
      <span>{id}</span>
      <span>{name}</span>
      <span>{maxQuantity}</span>
      <span>{priceBrutto} zł</span>
      <span>
        {published ? (
          <FontAwesomeIcon icon={faCircleCheck} color={"green"} />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} color={"red"} />
        )}
      </span>
    </div>
  );
};

export default SingleProduct;
