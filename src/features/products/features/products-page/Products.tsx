import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../types/IOutletContext";
import ItemsPerPagePicker from "../../../pagination/components/ItemsPerPagePicker";

import "./styles";
import SearchWordMiniForm from "./components/SearchWordMiniForm";
import ProductTile from "./components/ProductTile";
import { useTranslation } from "react-i18next";
import CheckboxFilters from "./components/CheckboxFilters";
import PriceRangePicker from "./components/PriceRangePicker";
import SortingPicker from "./components/SortingPicker";
import { orderOptions } from "../../data/orderOptions";
import DisplayPicker from "./components/DisplayPicker";

const Products = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.products" });
  const context = useOutletContext<IOutletContext>();

  return (
    <section className="products bck-smooth">
      <div className="left">
        <SearchWordMiniForm
          searchWord={context.searchWord}
          changeFn={context.changeSearchWord}
          disabled={context.loading}
          withTitle={true}
        />
        <div className="filters">
          <h4 className="filters-title">{t("filters.title")}</h4>
          <CheckboxFilters
            items={context.categories}
            selectedItems={context.selectedCategories}
            type="category"
          />
          <CheckboxFilters
            items={context.marks}
            selectedItems={context.selectedMarks}
            type={"mark"}
          />
          <PriceRangePicker />
        </div>
        <div className="sorting">
          <h4 className="sorting-title">{t("sorting.title")}</h4>
          <SortingPicker options={orderOptions} />
        </div>
      </div>
      <div className="middle">
        <h1 className="title">{t("title")}</h1>
        <div className={`products-wrapper ${context.display}`}>
          {context.products.map((product) => (
            <ProductTile {...product} key={product.id} />
          ))}
        </div>
      </div>
      <div className="right">
        <ItemsPerPagePicker
          listOfValues={[10, 20, 40, 80]}
          changeFn={context.changeItemsPerPage}
          selectedValue={context.itemsPerPage}
          withText={true}
        />
        <DisplayPicker />
      </div>
    </section>
  );
};

export default Products;
