import React from "react";

import ProductRow from "./components/ProductRow";

import "./styles/products-list.css";

const ProductsList = ({ products }) => {
  return (
    <div className="ProductsList">
      {products &&
        products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductsList;
