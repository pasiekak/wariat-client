import { useEffect, useState } from "react"

import imageActions from "../../../../../../api/imageActions";

import Logo from "../../../../../common/logo/Logo";

import './product-tile.css';
import { useNavigate } from "react-router-dom";

const ProductTile = ({product}) => {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    useEffect(() => {
        if(product.Images.length !== 0) {
            imageActions.getImage(product.Images.find(image => image.main === true).id).then(res => setImage(res));
        }
    },[product]);

    return (
        <div className="card" onClick={() => navigate(`product/${product.id}`)}>
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
                <span className="card-description">{product.description}</span>
                <span className="card-price">{product.price} zł</span>
            </div>
        </div>
    )
}

export default ProductTile;