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
import PagePicker from "../../../pagination/components/PagePicker";
import ClearButton from "./components/ClearButton";

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
          <ClearButton />
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
            <ProductTile
              product={{
                ...product,
                createdAt: new Date(product.createdAt),
                updatedAt: new Date(product.updatedAt),
              }}
              key={product.id}
            />
          ))}
        </div>
        <PagePicker
          currentPage={context.page}
          maxPage={context.maxPage}
          loading={context.loading}
          changePage={context.changePage}
        />
      </div>
      <div className="right">
        <ItemsPerPagePicker
          listOfValues={[10, 20, 40, 80]}
          changeFn={context.changeItemsPerPage}
          selectedValue={context.itemsPerPage}
          withText={true}
        />
        <div className="display">
          <h4>{t("display.title")}</h4>
          <DisplayPicker />
        </div>
      </div>
    </section>
  );
};

export default Products;
