import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

import { CartContext } from "../../../../context/cart";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "./listItem/ListItem";

import './cart.css';

const Cart = () => {
    const { t } = useTranslation(null, { keyPrefix: "components.cart" })
    const { cartItems, getCartTotal } = useContext(CartContext);
    const [cookies, , removeCookie] = useCookies();

    return (
        <div className="Cart bck-smooth">
            <div className="cart-title-wrapper">
                <h4 className="title">{t('title')}</h4>
                <div className="cart-wrapper">
                    <div className="cart-summary">
                        <div className="cart-products-list">
                            {cartItems.length > 0 ? 
                            <ListGroup>
                                {cartItems.map(item => {
                                    return <ListItem item={item} key={item.id}/>
                            })}           
                            </ListGroup>:
                            <h6>{t('empty-cart-message')}</h6>
                            }
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="cart-actions">
                        {!(cookies.user) && <div className="not-logged-wrapper">
                            <span id="not-logged-message">{t('not-logged')}</span>
                            <Button href="/login?redirect=cart">Zaloguj się</Button>
                        </div>}
                        <div className="order-wrapper">
                            <div className="total-price-wrapper">
                                <span className="total-message">{t('total')}:</span>
                                <span className="total">{getCartTotal()} zł</span> 
                            </div>
                            <Button variant="success" 
                            disabled={!(cookies.user)}>{(cookies.user) ? t('order-button') : t('not-logged')}</Button>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Cart;