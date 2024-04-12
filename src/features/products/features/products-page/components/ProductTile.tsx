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
import { faBan, faPercent } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { calculateFinalPrice } from "../../../../../utils/priceFunctions";

type ProductTileProps = {
  product: IProduct;
};

const ProductTile = ({ product }: ProductTileProps) => {
  const [imageID, setImageID] = useState<number>();
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>();
  const [available, setAvailable] = useState<boolean>();
  const { data } = useImagesRelatedToEntity({
    id: product.id,
    entityPlural: "products",
    onlyMain: true,
  });
  const { t } = useTranslation(undefined, { keyPrefix: "components.products" });
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 1200 });

  const bestDiscount = useBestDiscount({ productID: product.id });

  useEffect(() => {
    setAvailable(product.maxQuantity > 0);
  }, [product.maxQuantity]);

  useEffect(() => {
    if (data?.image) setImageID(data.image.id);
  }, [data?.image]);

  useEffect(() => {
    if (bestDiscount) {
      setPriceAfterDiscount(
        calculateFinalPrice(product.priceBrutto, bestDiscount.percentage, 1),
      );
    }
  }, [bestDiscount, product.priceBrutto]);

  return (
    <div className="product-tile">
      <span
        className={`name animated-underline`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {product.name}
      </span>
      <div
        className="image-wrapper"
        style={{
          backgroundImage: `url(${imageID ? `/api/images/${imageID}` : defaultImage})`,
        }}
        onClick={() => navigate(`/products/${product.id}`)}
      ></div>
      <div className="info">
        {available && (
          <AddOrRemoveProductFromCart
            product={product}
            quantity={1}
            bestDiscount={bestDiscount}
            fullPrice={calculateFinalPrice(
              product.priceBrutto,
              bestDiscount ? bestDiscount.percentage : 0,
              1,
            )}
            fullPriceWithoutDiscount={calculateFinalPrice(
              product.priceBrutto,
              0,
              1,
            )}
          />
        )}
        <div className="prices">
          <span
            className={`price-brutto${bestDiscount ? " before-discount" : ""}`}
          >
            {product.priceBrutto} zł
          </span>
          {priceAfterDiscount && (
            <span className={`discount-price`}>{priceAfterDiscount} zł</span>
          )}
        </div>
      </div>
      <div className={"labels"}>
        {!available &&
          (isMobile ? (
            <FontAwesomeIcon
              icon={faBan}
              title={t("not-available") || undefined}
              className={`not-available-label`}
            />
          ) : (
            <span className={`not-available-label`}>{t("not-available")}</span>
          ))}
        {isNewDate(product.createdAt) &&
          available &&
          (isMobile ? (
            <FontAwesomeIcon
              className="new-label"
              title={t("new-label") || undefined}
              icon={faClock}
            />
          ) : (
            <div className={"new-label"}>{t("new-label")}</div>
          ))}
        {bestDiscount &&
          (isMobile ? (
            <FontAwesomeIcon
              icon={faPercent}
              title={`${bestDiscount.percentage} %`}
              className={"discount-label"}
            />
          ) : (
            <div className={"discount-label"}>{bestDiscount.percentage}%</div>
          ))}
      </div>
    </div>
  );
};

export default ProductTile;
