import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import { CartContext } from '../../../../../../context/cart';

import './product-row.css';

const ProductRow = ({product}) => {
    const { t: tCart } = useTranslation(null, {keyPrefix: 'components.cart'})
    const [mainImageId, setMainImageId] = useState(0);
    const navigate = useNavigate();
    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
 
    useEffect(() => {
        if(product.Images.length > 0) {
            let mainImageId;
            let mainImage = product.Images.find(image => image.main === true);
            if(!mainImage) { mainImageId = product.Images[0].id } else { mainImageId = mainImage.id }
            product.mainImageId = mainImageId;
            setMainImageId(mainImageId);
        }
    },[product]);

    return (
        <div className="product-row">
            <div className='left-row'>
                {mainImageId && <img src={`/api/images/${mainImageId}`} alt=''/>}
            </div>
            <div className='line'>
                
            </div>
            <div className='right-row'>
                <div className='name-and-buttons'>
                    <span id='name' onClick={() => navigate(`/products/product/${product.id}`, { state: {
                        product, mainImageId
                    }})}>{product.name}</span>
                    {isInCart(product) ? 
                        <Button 
                        variant="outline-dark" 
                        onClick={() => removeFromCart(product)}
                        title={tCart('remove-from-cart-button')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                        </Button>
                    :
                        <Button 
                        variant="outline-dark" 
                        onClick={() => addToCart(product)}
                        title={tCart('add-to-cart-button')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                        </Button>
                    }
                </div>
                <span id='price'>{product.price} zł</span>
            </div>
        </div>
    )
}

export default ProductRow;