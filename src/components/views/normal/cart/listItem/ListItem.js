import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import imageActions from "../../../../../api/imageActions";

import { CartContext } from "../../../../../context/cart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const ListItem = ({item}) => {
    const [image, setImage] = useState(null);
    const [customInput, setCustomInput] = useState(false);
    const [customInputValue, setCustomInputValue] = useState(item.quantity);
    const { updateQuantityInCart } = useContext(CartContext);

    useEffect(() => {
        imageActions.getImage(item.mainImageId).then(res => setImage(res));
    })

    const handleQuantityChange = (e, itemId) => {
        if (e.target.value === 'custom') {
            setCustomInput(true)
        } else if(e.target.type === 'number') {
            let optionValues = ['1','2','3','4','5','6','7','8','9'];
            let parsedValue = parseInt(e.target.value);
            if(parsedValue > 0) { updateQuantityInCart(parsedValue, itemId); }
            else { setCustomInputValue(item.quantity) }
            if(optionValues.includes(e.target.value)) setCustomInput(false);
        } else {
            let parsedValue = parseInt(e.target.value);
            updateQuantityInCart(parsedValue, itemId);
        }
    }

    return (
        <ListGroup.Item key={item.id}>
            <div className="item-left">
                {image && <img src={image} alt=""/>}
                <Link to={`/products/product/${item.id}`}>
                    <span className="name">{item.name}</span>        
                </Link>
            </div>
            <div className="item-right">
                {customInput || item.quantity > 9 ?  
                <Form.Control
                type="number"
                id="customInput"
                min="1"
                value={customInputValue}
                onBlur={(e) => handleQuantityChange(e, item.id)}
                onChange={(e) => setCustomInputValue(parseInt(e.target.value))}
                >    
                </Form.Control>
                : 
                <Form.Select 
                value={item.quantity} 
                onChange={(e) => handleQuantityChange(e, item.id)}
                name="quantity-select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="custom">9+</option>
                </Form.Select>}
                <span className="price">{item.price*item.quantity} zł</span>
            </div>
        </ListGroup.Item>
    )
}

export default ListItem;