import useAxiosGet from "../../../../../../../../../api/hooks/useAxiosGet";
import { useEffect, useState } from "react";
import { RegisterOptions } from "react-hook-form";
import { ICategory } from "../../../../../../../../../api/types/ICategory";

import "../styles/field.css";

type CategoriesSelectProps = {
  register: (name: "CategoryId", registerOptions: RegisterOptions) => object;
  changeCategoriesEmpty: (count: number) => void;
};

const CategoriesSelect = ({
  register,
  changeCategoriesEmpty,
}: CategoriesSelectProps) => {
  const { data } = useAxiosGet({ url: "/api/categories" });
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
      changeCategoriesEmpty(data.categories.length);
    } else {
      changeCategoriesEmpty(0);
    }
  }, [data, changeCategoriesEmpty]);
  if (categories) {
    return (
      <div className="field select-wrapper">
        <label>Wybierz kategorię</label>
        {categories.length > 0 ? (
          <select required {...register("CategoryId", { valueAsNumber: true })}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                ID kategorii: {category.id} nazwa: {category.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="empty">
            Brak kategorii, których mogła by dotyczyć zniżka
          </span>
        )}
      </div>
    );
  }
  return null;
};

export default CategoriesSelect;
