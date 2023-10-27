import { useEffect, useState } from "react"

import imageActions from "../../../../../../api/imageActions";

import Logo from "../../../../../common/logo/Logo";

import './product-tile.css';
import { useNavigate } from "react-router-dom";

const ProductTile = ({product}) => {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    useEffect(() => {
        if(product.Images.length > 0) {
            let mainImageId;
            let mainImage = product.Images.find(image => image.main === true);
            if(!mainImage) { mainImageId = product.Images[0].id } else { mainImageId = mainImage.id }
            imageActions.getImage(mainImageId).then(res => setImage(res));
        }
    },[product]);

    return (
        <div className="cardd" onClick={() => navigate(`/products/product/${product.id}`)}>
            <div className="card-image">
                {image ? 
                <div className="card-image-wrapper">
                    <img src={image} alt={`${product.name}`}/> 
                </div>
                : 
                <Logo/>}
            </div>
            <div className="card-content">
                <span className="card-title">{product.name}</span>
                <span className="card-price">{product.price} zł</span>
            </div>
        </div>
    )
}

export default ProductTile;