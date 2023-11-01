import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from 'react';

import productActions from '../../../../api/productActions';

import SearchBar from './searchBar/SearchBar';
import Filters from './filters/Filters';
import ProductsTable from './productsTable/ProductsTable';

import './products.css';

const Products = () => {
    const isMobile = useMediaQuery({maxWidth: 767})
    const [productsToDisplay, setProductsToDisplay] = useState(null); 
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedMarks, setSelectedMarks] = useState(null);
    const [searchWord, setSearchWord] = useState(null);
    const [refreshProducts, setRefreshProducts] = useState(false);

    const refresh = () => {
        setRefreshProducts(!refreshProducts);
    }

    
    const updateProductsToDisplay = async () => {
        let options = null
        if (selectedCategories || selectedMarks || searchWord) {
            options = {
                categories: selectedCategories ? Object.keys(selectedCategories) : null,
                marks: selectedMarks ? Object.keys(selectedMarks) : null,
                searchWord: searchWord === "" ? undefined : searchWord
            }
        }
        let res = await productActions.getAllProducts(options);
        setProductsToDisplay(res.body)
    }

    useEffect(() => {
        updateProductsToDisplay();
    },[refreshProducts])

    return (
        
        <div className='Products bck-smooth'>
            {!isMobile &&
            <Filters updateSelectedCategories={setSelectedCategories} updateSelectedMarks={setSelectedMarks} refresh={refresh}/>}
            <div className='content'>
                <SearchBar updateSearchWord={setSearchWord} refresh={refresh}/>
                {isMobile && 
                <Filters updateSelectedCategories={setSelectedCategories} updateSelectedMarks={setSelectedMarks} refresh={refresh}/>}
                <ProductsTable products={productsToDisplay} />
            </div>
        </div>
    );
}

export default Products;