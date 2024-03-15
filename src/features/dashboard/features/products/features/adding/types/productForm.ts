interface IProductForm {
  name: string;
  description: string;
  priceBrutto: number;
  priceNetto: number;
  maxQuantity: number;
  published: boolean;
  images: File[];
}

export default IProductForm;
