interface IProductForm {
  name: string;
  description: string;
  priceBrutto: number;
  priceNetto: number;
  youtubeURL: string | null;
  maxQuantity: number;
  published: boolean;
}

export default IProductForm;
