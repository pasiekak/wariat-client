import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

import imageActions from "../../../../../api/imageActions";

import { CartContext } from "../../../../../context/cart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const ListItem = ({item}) => {
    const { t: tCart } = useTranslation(null, {keyPrefix: 'components.cart'})
    const [customInput, setCustomInput] = useState(false);
    const [customInputValue, setCustomInputValue] = useState(item.quantity);
    const { updateQuantityInCart, removeFromCart } = useContext(CartContext);

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
                <img src={`/api/images/${item.mainImageId}`} alt=""/>
                <Link to={`/products/product/${item.id}`}>
                    <span className="name">{item.name}</span>        
                </Link>
                <Button 
                    variant="outline-secondary" 
                    onClick={() => removeFromCart(item)}
                    title={tCart('remove-from-cart-button')}
                    id="remove-button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                    </svg>
                </Button>
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