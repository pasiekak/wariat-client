import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IProduct } from "../../../../api/types/IProduct";
import useProduct from "../../../../api/hooks/product/useProduct";
import ImageCarousel from "../../../image-carousel/ImageCarousel";

import "./styles";
import useBestDiscount from "../../../../api/hooks/discounts/useBestDiscount";
import FinalPrice from "./components/FinalPrice";
import AddToCartActions from "./components/AddToCartActions";
import OrderMiniInfo from "./components/OrderMiniInfo";
import Description from "./components/Description";
import Attributes from "./components/Attributes";
import Details from "./components/Details";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../cart/context/CartContext";

const Product = ({ id }: { id: number }) => {
  const { getProductFromCart } = useContext(CartContext);
  const [product, setProduct] = useState<IProduct>();
  const [available, setAvailable] = useState<boolean>(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const bestDiscount = useBestDiscount({ productID: id });
  const { data, error } = useProduct(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.product) {
      setProduct({
        ...data.product,
        createdAt: new Date(data.product.createdAt),
        updatedAt: new Date(data.product.updatedAt),
      });
      setAvailable(data.product.maxQuantity > 0);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      navigate("/not-found", { replace: true });
    }
  }, [error, navigate]);

  useEffect(() => {
    const cartProduct = getProductFromCart(id);
    if (cartProduct) {
      setSelectedQuantity(cartProduct.quantity);
    }
  }, [getProductFromCart, id]);

  const changeSelectedQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (product && newValue >= 1 && newValue <= product.maxQuantity)
      setSelectedQuantity(parseInt(e.target.value));
  };

  return (
    <section className="product bck-smooth">
      {product && (
        <>
          <section>
            <div className={`left`}>
              <ImageCarousel
                entityID={product.id}
                entityPlural={"products"}
                showMiniatures={true}
              />
            </div>
            <div className={`right`}>
              <h1 className={"name"}>{product.name}</h1>
              <div className={`add-to-cart-wrapper`}>
                <FinalPrice
                  bestDiscount={bestDiscount}
                  selectedQuantity={selectedQuantity}
                  priceBrutto={product.priceBrutto}
                  available={available}
                />

                <AddToCartActions
                  selectedQuantity={selectedQuantity}
                  onChange={changeSelectedQuantity}
                  bestDiscount={bestDiscount}
                  product={product}
                  available={available}
                />

                <OrderMiniInfo
                  available={available}
                  bestDiscount={bestDiscount}
                />
              </div>
            </div>
          </section>
          <Description description={product.description} />
          <Attributes id={product.id} attributePlural={"categories"} />
          <Attributes id={product.id} attributePlural={"marks"} />
          <Details productID={product.id} />
        </>
      )}
    </section>
  );
};

export default Product;
