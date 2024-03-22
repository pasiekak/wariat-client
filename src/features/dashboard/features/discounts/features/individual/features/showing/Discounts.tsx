import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useIndividualDiscount from "../../../../../../../../api/hooks/discounts/useIndividualDiscounts";
import { IDiscount } from "../../../../../../../../api/types/IDiscount";
import { DiscountsRefFunctions } from "./types/DiscountsRefFunctions";
import useDifferentTypesOfIndividualDiscounts from "./hooks/useDifferentTypesOfIndividualDiscounts";
import SingleDiscount from "./components/SingleDiscount";

import "../showing/styles/discounts-wrapper.css";

type DiscountsProps = {
  type: string;
};

const generateHeaderMessage = (type: string) => {
  switch (type) {
    case "user_for_all":
      return "Zniżki na wszystkie produkty przypisane pojedynczym klientom.";
    case "user_for_category":
      return "Zniżki na produkty danej kategorii przypisane pojedynczym klientom.";
    case "user_for_product":
      return "Zniżki na konkretny produkt przypisane pojedynczym klientom.";
    case "all_users_for_category":
      return "Zniżki na kategorię dla wszystkich klientów.";
    case "all_users_for_product":
      return "Zniżki na produkt dla wszystkich klientów.";
    default:
      break;
  }
};

const Discounts = forwardRef<DiscountsRefFunctions, DiscountsProps>(
  (props, ref) => {
    const { data, error, loading } = useIndividualDiscount();
    const [discounts, setDiscounts] = useState<IDiscount[]>([]);
    const {
      userForAllProductsDiscounts,
      userForCategoryDiscounts,
      userForOneProductDiscounts,
      allUsersForOneCategory,
      allUsersForOneProduct,
    } = useDifferentTypesOfIndividualDiscounts({ discounts });

    useEffect(() => {
      if (data && data.discounts) {
        setDiscounts(data.discounts);
      }
    }, [data]);

    const onDelete = (id: number) => {
      setDiscounts((discounts) => discounts.filter((d) => d.id !== id));
    };

    const pickProperDiscounts = (type: string) => {
      if (type === "user_for_all") return userForAllProductsDiscounts;
      if (type === "user_for_category") return userForCategoryDiscounts;
      if (type === "user_for_product") return userForOneProductDiscounts;
      if (type === "all_users_for_category") return allUsersForOneCategory;
      if (type === "all_users_for_product") return allUsersForOneProduct;
      return discounts;
    };

    useImperativeHandle(ref, () => ({
      addDiscount(discount: IDiscount) {
        setDiscounts((prev) => {
          if (prev) return [...prev, discount];
          return prev;
        });
      },
    }));

    return (
      <div className="display">
        {loading && <h2>Ładowanie</h2>}
        {error && <h2>Wystąpił błąd.</h2>}
        <h1 className="discounts-content">
          {generateHeaderMessage(props.type)}
        </h1>
        <div className="discounts-wrapper">
          {pickProperDiscounts(props.type).map((d) => (
            <SingleDiscount
              {...d}
              type={props.type}
              onDelete={onDelete}
              key={d.id}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default Discounts;
