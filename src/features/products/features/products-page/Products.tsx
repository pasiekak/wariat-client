import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../types/IOutletContext";
import ItemsPerPagePicker from "../../../pagination/ItemsPerPagePicker";

import "./styles";

const Products = () => {
  const context = useOutletContext<IOutletContext>();

  return (
    <section className="products bck-smooth">
      <ItemsPerPagePicker
        listOfValues={[10, 20, 40, 80]}
        changeFn={context.changeItemsPerPage}
        selectedValue={context.itemsPerPage}
        withText={true}
      />
    </section>
  );
};

export default Products;
