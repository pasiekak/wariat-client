import ProductTile from "./components/ProductTile";

import './styles/products-table.css';

const ProductsTable = ({products}) => {
    return (
        <div className="ProductsTable">
            {products && products.map((product, id) => (
                <ProductTile key={id} product={product}/>
            ))}
        </div>
    )
}

export default ProductsTable;