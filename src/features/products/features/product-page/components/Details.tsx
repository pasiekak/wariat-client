import useAxiosGet from "../../../../../api/hooks/useAxiosGet";
import { IProductDetails } from "../../../../../api/types/IProductDetails";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeKeys, removeNulls } from "../../../../../utils/refactorObject";

const Details = (props: { productID: number }) => {
  const [details, setDetails] = useState<IProductDetails>();
  const { data } = useAxiosGet<{
    success: boolean;
    message: string;
    details: IProductDetails;
  }>({ url: `/api/products/${props.productID}/details` });
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.product.details",
  });

  useEffect(() => {
    if (data) {
      setDetails(removeNulls(removeKeys(data.details, ["id", "ProductId"])));
    }
  }, [data]);
  return (
    <div className={`product-details`}>
      <h4>{t("title")}</h4>
      {details &&
        Object.keys(details).map((key, index) => {
          return (
            <div className="detail" key={index}>
              <span className="label">{t(key)}</span>
              <span className="value">
                {details[key as keyof IProductDetails]}
              </span>
            </div>
          );
        })}
      {JSON.stringify(details) === "{}" && <h6>{t("no-details")}</h6>}
    </div>
  );
};
export default Details;
