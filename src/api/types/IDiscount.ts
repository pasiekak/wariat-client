export interface IDiscount {
  id: number;
  expires: Date;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
  CategoryId: number | null;
  UserId: number | null;
  ProductId: number | null;
}
