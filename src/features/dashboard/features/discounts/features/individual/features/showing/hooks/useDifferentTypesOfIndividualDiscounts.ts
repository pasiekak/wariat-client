import { IDiscount } from "../../../../../../../../../api/types/IDiscount";
import { useEffect, useState } from "react";

const useDifferentTypesOfIndividualDiscounts = (props: {
  discounts: IDiscount[];
}) => {
  const [userForAllProductsDiscounts, setUserForAllDiscounts] = useState<
    IDiscount[]
  >([]);
  const [userForCategoryDiscounts, setUserForCategoryDiscounts] = useState<
    IDiscount[]
  >([]);
  const [userForOneProductDiscounts, setUserForOneProductDiscounts] = useState<
    IDiscount[]
  >([]);
  const [allUsersForOneCategory, setAllUsersForOneCategory] = useState<
    IDiscount[]
  >([]);
  const [allUsersForOneProduct, setAllUsersForOneProduct] = useState<
    IDiscount[]
  >([]);

  useEffect(() => {
    if (props.discounts.length) {
      setUserForAllDiscounts(
        props.discounts.filter(
          (d) =>
            d.UserId !== null && d.CategoryId === null && d.ProductId === null,
        ),
      );
      setUserForCategoryDiscounts(
        props.discounts.filter(
          (d) =>
            d.UserId !== null && d.CategoryId !== null && d.ProductId === null,
        ),
      );
      setUserForOneProductDiscounts(
        props.discounts.filter(
          (d) =>
            d.UserId !== null && d.CategoryId === null && d.ProductId !== null,
        ),
      );
      setAllUsersForOneCategory(
        props.discounts.filter(
          (d) =>
            d.UserId === null && d.CategoryId !== null && d.ProductId === null,
        ),
      );
      setAllUsersForOneProduct(
        props.discounts.filter(
          (d) =>
            d.UserId === null && d.CategoryId === null && d.ProductId !== null,
        ),
      );
    }
  }, [props.discounts]);

  return {
    userForAllProductsDiscounts,
    userForCategoryDiscounts,
    userForOneProductDiscounts,
    allUsersForOneCategory,
    allUsersForOneProduct,
  };
};

export default useDifferentTypesOfIndividualDiscounts;