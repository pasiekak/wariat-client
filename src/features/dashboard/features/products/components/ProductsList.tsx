import SingleProduct from "./SingleProduct";
import { IProductsList } from "../types/product";

const ProductsList = ({
  products,
  openedProduct,
  setOpen,
  updateAttribute,
  marks,
  categories,
}: IProductsList) => {
  return (
    <div className="items">
      {products.map((product, index) => (
        <SingleProduct
          id={product.id}
          name={product.name}
          description={product.description}
          maxQuantity={product.maxQuantity}
          priceBrutto={parseFloat(product.priceBrutto.toFixed(2))}
          priceNetto={parseFloat(product.priceNetto.toFixed(2))}
          published={product.published}
          createdAt={new Date(product.createdAt)}
          updatedAt={new Date(product.updatedAt)}
          key={index}
          setOpen={setOpen}
          openedProduct={openedProduct}
          categories={categories}
          marks={marks}
          updateAttribute={updateAttribute}
        />
      ))}
    </div>
  );
};

export default ProductsList;
