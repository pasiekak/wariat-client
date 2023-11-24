import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { CartContext } from "../../../../../context/cart";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "./listItem/ListItem";

import './cart.css';

const Cart = ({dispatch, access}) => {
    const { t } = useTranslation(null, { keyPrefix: "components.order.cart" })
    const { cartItems, priceGetters, getCartCount } = useContext(CartContext);
    return (
        <div className="Cart Order bck-smooth">
            <div className="order-wrapper">
                <h4 className="title">{t('title')}</h4>
                <div className="cart-wrapper">
                    <div className="cart-summary">
                        <div className="cart-products-list">
                            {getCartCount() > 0 ? 
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
                        {!(access) && <div className="not-logged-wrapper">
                            <span id="not-logged-message">{t('not-logged')}</span>
                            <Button href="/login?redirect=order">Zaloguj się</Button>
                        </div>}
                        {(getCartCount() === 0 && (access)) && 
                        <div className="empty-cart-wrapper">
                            <span id="empty-cart-message">{t('empty-cart-button-disabled')}</span>
                        </div>
                        }
                        <div className="next-wrapper">
                            <div className="total-price-wrapper">
                                <div className="total-normal">
                                    <span className="total-message">{t('total')}:</span>
                                    <span className="total">{priceGetters.getProductsBrutto().toFixed(2)} zł</span> 
                                </div>
                                {priceGetters.getCartAfterGroupDiscount() === priceGetters.getProductsBrutto() && <div className="total-disc">
                                    <span className="total-disc-message">{t('total-disc')}:</span>
                                    <span className="total">{priceGetters.getCartAfterGroupDiscount().toFixed(2)} zł</span>
                                </div>}
                            </div>
                            <Button variant="success" 
                            disabled={(!(access) || getCartCount() === 0)}
                            onClick={() => dispatch({type: 'inc'})}>
                                {(access) ? t('order-button') : t('not-logged')}
                            </Button>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Cart;