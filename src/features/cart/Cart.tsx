import Header from "./components/Header";

import "./styles/styles";
import QuickSummary from "./features/quick-summary/QuickSummary";

const Cart = () => {
  return (
    <section className={`cart bck-smooth`}>
      <Header />
      <QuickSummary type={"in-cart"} withColumns={true} />
    </section>
  );
};

export default Cart;
