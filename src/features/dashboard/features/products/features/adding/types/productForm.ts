interface IProductForm {
  name: string;
  description: string;
  priceBrutto: number;
  priceNetto: number;
  maxQuantity: number;
  published: boolean;
  youtubeURL: string | null;
  images: File[];
}

export default IProductForm;
