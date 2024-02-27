import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { CartContext } from "./context/cart";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "./components/ListItem";

import './styles/cart.css';

const Cart = ({dispatch}) => {
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
                        {getCartCount() === 0 &&
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
                            disabled={getCartCount() === 0}
                            onClick={() => dispatch({type: 'inc'})}>
                                {t('order-button')}
                            </Button>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Cart;