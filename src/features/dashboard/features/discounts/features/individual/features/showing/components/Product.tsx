import useProduct from "../../../../../../../../../api/hooks/product/useProduct";

const Product = ({ productID }: { productID: number }) => {
  const { data, error, loading } = useProduct(productID);

  return (
    <div className="product-info">
      {loading && <span>Ładowanie...</span>}
      {error && <span>Błąd...</span>}
      {data?.product?.name && (
        <>
          <span>Nazwa przedmiotu</span>
          <span>{data.product.name}</span>
        </>
      )}
    </div>
  );
};

export default Product;
