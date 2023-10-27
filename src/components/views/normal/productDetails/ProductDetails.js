import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import FadeLoader from "react-spinners/FadeLoader";
import Button from 'react-bootstrap/Button';

import productActions from "../../../../api/productActions";

import './product-details.css';
import "react-image-gallery/styles/css/image-gallery.css";

import imageActions from "../../../../api/imageActions";

const ProductDetails = () => {
    const { productId } = useParams();
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
                    <Button variant="primary">Zamów</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;