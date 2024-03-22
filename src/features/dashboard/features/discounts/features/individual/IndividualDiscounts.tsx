import React, { useRef, useState } from "react";
import { IDiscount } from "../../../../../../api/types/IDiscount";
import { DiscountsRefFunctions } from "./features/showing/types/DiscountsRefFunctions";

import "./styles/individual-discounts.css";
import PickType from "./components/PickType";
import AddDiscountForm from "./features/adding/AddDiscountForm";
import Discounts from "./features/showing/Discounts";

const IndividualDiscounts = () => {
  const displayRef = useRef<DiscountsRefFunctions>(null);
  const [form, setForm] = useState({ show: false, type: "" });

  const addDiscount = (discount: IDiscount) => {
    if (displayRef.current) displayRef.current.addDiscount(discount);
  };

  return (
    <div className="individual-discounts">
      <PickType
        changeForm={(show: boolean, type: string) => setForm({ show, type })}
        selectedType={form.type}
      />
      {form.type !== "" && <Discounts ref={displayRef} type={form.type} />}
      {form.show && (
        <AddDiscountForm type={form.type} addDiscount={addDiscount} />
      )}
    </div>
  );
};

export default IndividualDiscounts;
