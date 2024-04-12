import { useEffect, useState } from "react";
import { IProductDetails } from "../../../../../../../../../api/types/IProductDetails";
import useAxiosGet from "../../../../../../../../../api/hooks/useAxiosGet";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { IBanner } from "../../../../../../../../message-banner/types/IBanner";
import { useOutletContext } from "react-router-dom";

import "../styles/modify-product-details.css";
import {
  refactorEmptyStrings,
  refactorZeros,
  removeKeys,
} from "../../../../../../../../../utils/refactorObject";

interface IOutletContext {
  addBanner: (banner: IBanner) => void;
}

const ModifyProductDetails = ({ productID }: { productID: number }) => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<IProductDetails>();

  const { register, handleSubmit, reset } = useForm<IProductDetails>();

  const { addBanner } = useOutletContext<IOutletContext>();
  const { data } = useAxiosGet<{
    success: boolean;
    message: string;
    details: IProductDetails;
  }>({
    url: `/api/products/${productID}/details`,
  });

  useEffect(() => {
    if (data) {
      setProductDetails(data.details);
    }
  }, [data]);

  useEffect(() => {
    if (productDetails) {
      reset(productDetails);
    }
  }, [productDetails, reset]);

  const onSubmit = (data: IProductDetails) => {
    setLoading(true);
    const refactoredData = removeKeys(
      refactorZeros(refactorEmptyStrings(data)),
      ["id", "ProductId"],
    );
    axios
      .put(`/api/products/${productID}/details`, refactoredData)
      .then((res) => {
        if (res.status === 204) {
          reset(refactoredData);
          addBanner({
            type: "success",
            message: "Zmieniono szczegółowe dane dotyczące produktu.",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  if (productDetails) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`modify-product-details`}
      >
        <h3>Specyfikacja produktu</h3>
        {Object.keys(productDetails).map((key, index) => {
          return (
            <InputField
              key={index}
              disabled={loading}
              register={register}
              name={key as keyof IProductDetails}
            />
          );
        })}
        <Button type="submit" disabled={loading} variant="dark">
          Zatwierdź zmiany
        </Button>
      </form>
    );
  }
  return null;
};
export default ModifyProductDetails;
