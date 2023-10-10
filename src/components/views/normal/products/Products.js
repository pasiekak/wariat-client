import SearchBar from './searchBar/SearchBar';
import ProductsList from './productsList/ProductsList';

import './products.css';


const Products = () => {
    
    return (
        <div className="Products bck-smooth">
            <SearchBar/>
            <ProductsList/>
        </div>
    );
}

export default Products;