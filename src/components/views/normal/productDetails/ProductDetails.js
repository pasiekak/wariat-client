import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageGallery from "react-image-gallery";
import FadeLoader from "react-spinners/FadeLoader";
import Button from 'react-bootstrap/Button';

import { CartContext } from "../../../../context/cart";

import './product-details.css';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetails = () => {
    const { t: tCart } = useTranslation(null, { keyPrefix: "components.cart" });

    const location = useLocation();
    let product = location.state?.product;
    let mainImageId = product?.mainImageId;

    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
    //Carousel states
    const [slides, setSlides] = useState([]);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [noImages, setNoImages] = useState(false);

    useEffect(() => {
        if(product && mainImageId) {
            for (let i = 0; i < product.Images.length; i++) {
                let image = product.Images[i];
                if(image.id === mainImageId) setGalleryStartIndex(i);
                let imageURL = `/api/images/${image.id}`;
                setSlides((prevValues) => [...prevValues, { original: imageURL }]);
            }
        }
    }, [product, mainImageId])

    useEffect(() => {
        if(product) {
            if (product.Images.length === 0) {
                setNoImages(true);
            } else if (product.Images.length === slides.length) {
                setShowLightbox(true);
            }
        }
    }, [slides, product])

    return (
        <div className="ProductDetails bck-smooth">
            <div className="product-wrapper">
                {!noImages && <div className="left">
                    <div className="gallery">
                        {showLightbox ?
                        <ImageGallery 
                            items={slides}
                            showPlayButton={false}
                            slideInterval={1000}
                            useBrowserFullscreen={false}
                            lazyLoad={true}
                            startIndex={galleryStartIndex}
                        />
                        :
                        <FadeLoader color="white"/>
                        }
                    </div>
                </div>}
                <div className="right">
                    <span className="title">{product && product.name}</span>
                    <span className="description">{product && product.description}</span>
                    <span className="price">{product && product.priceBrutto} zł Brutto</span>
                    <div className="buttons">
                        {product && <Button 
                        variant="dark" 
                        onClick={() => addToCart(product)}
                        title={tCart('add-to-cart-button')}
                        disabled={isInCart(product)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                        </Button>}
                        {product && <Button 
                        variant="dark" 
                        onClick={() => removeFromCart(product)}
                        title={tCart('remove-from-cart-button')}
                        disabled={!isInCart(product)}>
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