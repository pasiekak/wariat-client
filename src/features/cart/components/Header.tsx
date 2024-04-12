import ClearCart from "./ClearCart";
import CartTitle from "./CartTitle";

const Header = () => {
  return (
    <div className={`header`}>
      <CartTitle withCount={true} />
      <ClearCart />
    </div>
  );
};

export default Header;
