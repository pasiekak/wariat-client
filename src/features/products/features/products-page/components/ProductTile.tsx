import { IProduct } from "../../../../../api/types/IProduct";
import useImagesRelatedToEntity from "../../../../../api/hooks/images/useImagesRelatedToEntity";
import { useEffect, useState } from "react";
import defaultImage from "../../../../../assets/wariatLogoBlack.png";
import { useNavigate } from "react-router-dom";
import useBestDiscount from "../../../../../api/hooks/discounts/useBestDiscount";
import { isNewDate } from "../../../../../utils/dateFunctions";
import { useTranslation } from "react-i18next";
import AddOrRemoveProductFromCart from "../../../../cart/components/AddOrRemoveProductFromCart";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPercent } from "@fortawesome/free-solid-svg-icons";

const ProductTile = (props: IProduct) => {
  const [imageID, setImageID] = useState<number>();
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>();
  const { data } = useImagesRelatedToEntity({
    id: props.id,
    entityPlural: "products",
    onlyMain: true,
  });
  const { t } = useTranslation(undefined, { keyPrefix: "components.products" });
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const bestDiscount = useBestDiscount({ productID: props.id });

  useEffect(() => {
    if (data?.image) setImageID(data.image.id);
  }, [data?.image]);

  useEffect(() => {
    if (bestDiscount) {
      const discountPrice = parseFloat(
        (
          props.priceBrutto -
          props.priceBrutto * (bestDiscount.percentage / 100)
        ).toFixed(2),
      );
      setPriceAfterDiscount(discountPrice);
    }
  }, [bestDiscount, props.priceBrutto]);

  return (
    <div className="product-tile">
      <span
        className={`name animated-underline`}
        onClick={() => navigate(`/products/${props.id}`)}
      >
        {props.name}
      </span>
      <div
        className="image-wrapper"
        style={{
          backgroundImage: `url(${imageID ? `/api/images/${imageID}` : defaultImage})`,
        }}
      ></div>
      <div className="info">
        <AddOrRemoveProductFromCart
          product={props}
          quantity={1}
          bestDiscount={bestDiscount}
        />
        <div className="prices">
          <span
            className={`price-brutto${bestDiscount ? " before-discount" : ""}`}
          >
            {props.priceBrutto} zł
          </span>
          {priceAfterDiscount && (
            <span className={`discount-price`}>{priceAfterDiscount} zł</span>
          )}
        </div>
      </div>
      <div className={"labels"}>
        {isNewDate(props.createdAt) &&
          (isMobile ? (
            <FontAwesomeIcon className="new-label" icon={faClock} />
          ) : (
            <div className={"new-label"}>{t("new-label")}</div>
          ))}
        {bestDiscount &&
          (isMobile ? (
            <FontAwesomeIcon icon={faPercent} className={"discount-label"} />
          ) : (
            <div className={"discount-label"}>{bestDiscount.percentage}%</div>
          ))}
      </div>
    </div>
  );
};

export default ProductTile;
