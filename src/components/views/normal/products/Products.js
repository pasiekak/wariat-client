import React, { useEffect } from 'react';

import productsApi from '../../../../api/productsApi.js';
import SearchBar from '../../../common/search/SearchBar.js';
import './products.css';

const Products = () => {
    useEffect(() => {
        productsApi.getAllProducts().then((response) => {
            if(response?.success) {
                console.log(response);
            } else {
                console.error(response.message);
            }
        })
    }, []);
    
    return (
        <div className="Products">
            <SearchBar />
        </div>
    );
}

export default Products;