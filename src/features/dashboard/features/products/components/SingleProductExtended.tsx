import Images from "../../images/Images";
import ProductModifyForm from "../features/manage/features/modifying/modify";
import { ISingleProductExtended } from "../types/product";
import Attributes from "../../attributes/Attributes";
import ModifyProductDetails from "../features/manage/features/modifying/components/ModifyProductDetails";

const SingleProductExtended = (props: ISingleProductExtended) => {
  return (
    <div
      className={`single-product-extended${props.openedProduct === props.id ? " open" : ""}`}
    >
      <div className="single-product-extended-inner">
        <ProductModifyForm {...props} />
        <Attributes
          productID={props.id}
          attributeNameMany="categories"
          attributes={props.categories}
          updateAttribute={props.updateAttribute}
        />
        <Attributes
          productID={props.id}
          attributeNameMany="marks"
          attributes={props.marks}
          updateAttribute={props.updateAttribute}
        />
        <Images id={props.id} entityPlural="products" />
        <ModifyProductDetails productID={props.id} />
      </div>
    </div>
  );
};

export default SingleProductExtended;
