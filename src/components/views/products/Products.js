import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css';
import SearchBar from '../../common/searchBar/SearchBar.js';

const Products = () => {
    const [listOfProducts, setListOfProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products/allProducts')
            .then(res => {
                setListOfProducts(res.data)
            })
    }, []);
    
    return (
        <div className="Products">
            <SearchBar />
            <div className='list'>
                {listOfProducts.map((product, key) => {
                    return (
                        <div className='product' key={key}>
                            {/* <img src={`data:image/jpeg;base64,${product.image.toString('base64')}`} alt={product.shortDescription}/> */}
                            <div className='productName'>{product.name}</div>
                            <div className='productPrice'>{product.price} zł</div>
                        </div>
                        ) 
                })}
            </div>
        </div>
    );
}

export default Products;