import ProductTile from "./productTile/ProductTile";

import './products-table.css';

const ProductsTable = ({products}) => {
    return (
        <div className="ProductsTable">
            {console.log(products)}
            {products && products.map((product, id) => (
                <ProductTile key={id} product={product}/>
            ))}
        </div>
    )
}

export default ProductsTable;