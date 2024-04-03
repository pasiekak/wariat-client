import { IProduct } from "../../../../../api/types/IProduct";
import useImagesRelatedToEntity from "../../../../../api/hooks/images/useImagesRelatedToEntity";
import { useEffect, useState } from "react";
import defaultImage from "../../../../../assets/wariatLogoBlack.png";
import { useNavigate } from "react-router-dom";

const ProductTile = (props: IProduct) => {
  const [imageID, setImageID] = useState<number>();
  const { data } = useImagesRelatedToEntity({
    id: props.id,
    entityPlural: "products",
    onlyMain: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.image) setImageID(data.image.id);
  }, [data?.image]);

  return (
    <div
      className="product-tile"
      onClick={() => navigate(`/products/${props.id}`)}
    >
      <span className="name">{props.name}</span>
      <div
        className="image-wrapper"
        style={{
          backgroundImage: `url(${imageID ? `/api/images/${imageID}` : defaultImage})`,
        }}
      ></div>
      <span className="price-brutto">{props.priceBrutto} zł</span>
    </div>
  );
};

export default ProductTile;
