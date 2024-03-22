export interface IProduct {
  id: number;
  name: string;
  description: string;
  priceBrutto: number;
  priceNetto: number;
  maxQuantity: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}