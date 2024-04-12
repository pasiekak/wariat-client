export interface IProductDetails {
  id: number;
  ProductId: number;
  code: string | null;
  // MM - Milimeters
  height: number | null;
  // MM - Milimeters
  width: number | null;
  // MM - Milimeters
  depth: number | null;
  // KG - Kilograms
  weight: number | null;
  // MM - Milimeters
  thickness: number | null;
  // MM - Milimeters
  diameter: number | null;
  // L - liters
  capacity: number | null;
  // HP - horsepower
  power: number | null;
  color: string | null;
}
