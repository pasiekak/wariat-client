export interface IDelivery {
  id: number;
  name: string;
  price: number;
  description: string | null;
  company: string | null;
  modifiable: boolean;
  icon: string;
}
