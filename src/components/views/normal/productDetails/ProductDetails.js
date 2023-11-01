import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageGallery from "react-image-gallery";
import FadeLoader from "react-spinners/FadeLoader";
import Button from 'react-bootstrap/Button';

import productActions from "../../../../api/productActions";
import imageActions from "../../../../api/imageActions";

import { CartContext } from "../../../../context/cart";

import './product-details.css';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetails = () => {
    const { t: tCart } = useTranslation(null, { keyPrefix: "components.cart" });
    const { productId } = useParams();
    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
    const [data, setData] = useState(null);
    const [showLightbox, setShowLightbox] = useState(false);

    //Lightbox states
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        productActions.getProduct(productId).then(res => {
            setData(res.body);
        })
    }, [productId])

    useEffect(() => {
        if(data) {
            productActions.getSingleProductImages(productId).then(res => {
                uploadImages(res.body)
            })
        }
    }, [data, productId])

    const uploadImages = async (imageDetails) => {
        for (let i = 0; i < imageDetails.length; i++) {
            let image = imageDetails[i];
            imageActions.getImage(image.id).then(res => {
                setSlides((prevValues) => [...prevValues, { original: res }]);
            })
        }
    }

    useEffect(() => {
        if(slides.length > 0) setShowLightbox(true);
    }, [slides])

    return (
        <div className="ProductDetails bck-smooth">
            <div className="product-wrapper">
                <div className="left">
                    <div className="gallery">
                        {showLightbox ?
                        <ImageGallery 
                            items={slides}
                            showPlayButton={false}
                            slideInterval={1000}
                            useBrowserFullscreen={false}
                            lazyLoad={true}
                        />
                        :
                        <FadeLoader color="white"/>
                        }
                    </div>
                </div>
                <div className="right">
                    <span className="title">{data && data.name}</span>
                    <span className="description">{data && data.description}</span>
                    <span className="price">{data && data.price} zł Brutto</span>
                    <div className="buttons">
                        {data && <Button 
                        variant="dark" 
                        onClick={() => addToCart(data)}
                        title={tCart('add-to-cart-button')}
                        disabled={isInCart(data)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                        </Button>}
                        {data && <Button 
                        variant="dark" 
                        onClick={() => removeFromCart(data)}
                        title={tCart('remove-from-cart-button')}
                        disabled={!isInCart(data)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;