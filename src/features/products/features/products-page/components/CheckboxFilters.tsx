import { ICategory } from "../../../../../api/types/ICategory";
import { IMark } from "../../../../../api/types/IMark";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../../types/IOutletContext";

type checkboxFiltersProps = {
  items: (ICategory | IMark)[];
  selectedItems: (ICategory | IMark)[];
  type: "category" | "mark";
};

const CheckboxFilters = (props: checkboxFiltersProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.filters",
  });
  const context = useOutletContext<IOutletContext>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: ICategory | IMark,
  ) => {
    const checked = e.target.checked;
    if (checked) {
      if (props.type === "category") context.addCategoryFilter(item);
      if (props.type === "mark") context.addMarkFilter(item);
    } else {
      if (props.type === "category") context.removeCategoryFilter(item);
      if (props.type === "mark") context.removeMarkFilter(item);
    }
  };

  return (
    <div className="checkbox-filters">
      {props.type === "category" && (
        <h5 className="title">{t("title-categories")}</h5>
      )}
      {props.type === "mark" && <h5 className="title">{t("title-marks")}</h5>}
      {props.items.map((val, index) => {
        return (
          <div className="filter-field" key={index}>
            <input
              id={`${props.type}${val.id}`}
              disabled={context.loading}
              checked={props.selectedItems.some((o) => o.id === val.id)}
              type="checkbox"
              onChange={(e) => handleChange(e, val)}
            />
            <label htmlFor={`${props.type}${val.id}`}>{val.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxFilters;
