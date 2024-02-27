import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from 'react';

import productActions from '../../api/productActions';

import SearchBar from './components/search-bar/SearchBar';
import Filters from './features/filtering/Filters';
import ProductsTable from './features/products-grid/ProductsTable';
import ProductsList from "./features/products-list/ProductsList";

import './styles/products.css';

const Products = () => {
    const isMobile = useMediaQuery({maxWidth: 767})
    const [componentRendered, setComponentRendered] = useState(false);
    //SeachBar state
    const [searchWord, setSearchWord] = useState(null);
    //Filters state
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedMarks, setSelectedMarks] = useState(null);
    //Layout
    const [layout, setLayout] = useState('grid');
    //Table, List state
    const [productsToDisplay, setProductsToDisplay] = useState(null); 

    const refresh = () => {
        updateProductsToDisplay();
    }

    const updateProductsToDisplay = async () => {
        let options = null
        if (selectedCategories || selectedMarks || searchWord) {
            options = {
                categories: selectedCategories ? Object.keys(selectedCategories).filter(category => selectedCategories[category]) : null,
                marks: selectedMarks ? Object.keys(selectedMarks).filter(mark => selectedMarks[mark]) : null,
                searchWord: searchWord === "" ? undefined : searchWord
            }
        }
        let res = await productActions.getAllProducts(options);
        setProductsToDisplay(res.body)
    }

    useEffect(() => {
        if(!componentRendered) {
            productActions.getAllProducts({categories: null, marks: null, searchWord: undefined}).then(res => setProductsToDisplay(res.body));
        }
        setComponentRendered(true);
    }, [componentRendered])


    return (
        
        <div className='Products bck-smooth'>
            {!isMobile &&
            <Filters updateSelectedCategories={setSelectedCategories} updateSelectedMarks={setSelectedMarks} refresh={refresh}/>}
            <div className='content'>
                <SearchBar updateSearchWord={setSearchWord} refresh={refresh} layout={layout} setLayout={setLayout}/>
                {
                isMobile && 
                <Filters updateSelectedCategories={setSelectedCategories} updateSelectedMarks={setSelectedMarks} refresh={refresh}/>
                }
                {layout === 'grid' && <ProductsTable products={productsToDisplay} />}
                {layout === 'list' && <ProductsList products={productsToDisplay} />}
            </div>
        </div>
    );
}

export default Products;